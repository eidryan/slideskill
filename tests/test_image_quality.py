import importlib.util
import struct
import sys
import tempfile
import unittest
import zipfile
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("check_image_quality", ROOT / "scripts" / "check_image_quality.py")
cq = importlib.util.module_from_spec(spec)
sys.modules["check_image_quality"] = cq
spec.loader.exec_module(cq)


def png(w, h):
    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    raw = b"".join(b"\x00" + b"\x00\x00\x00" * w for _ in range(h))
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b"")


def make_pptx(path, pictures):
    """pictures: lista de (slide, pixels_w, pixels_h, polegadas_w, polegadas_h)."""
    ns = 'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
    with zipfile.ZipFile(path, "w") as z:
        slides = sorted({p[0] for p in pictures} | {1, 2})
        for n in slides:
            pics = [p for p in pictures if p[0] == n]
            body = ""
            rels = ""
            for k, (_, pw, ph, iw, ih) in enumerate(pics, 1):
                body += (f'<p:pic><p:blipFill><a:blip r:embed="rId{k}"/></p:blipFill><p:spPr><a:xfrm><a:off x="0" y="0"/>'
                         f'<a:ext cx="{int(iw * 914400)}" cy="{int(ih * 914400)}"/></a:xfrm></p:spPr></p:pic>')
                rels += f'<Relationship Id="rId{k}" Type="image" Target="../media/s{n}_{k}.png"/>'
                z.writestr(f"ppt/media/s{n}_{k}.png", png(pw, ph))
            z.writestr(f"ppt/slides/slide{n}.xml", f'<p:sld {ns}><p:cSld><p:spTree>{body}</p:spTree></p:cSld></p:sld>')
            z.writestr(f"ppt/slides/_rels/slide{n}.xml.rels", f'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{rels}</Relationships>')


class ImageQualityTest(unittest.TestCase):
    def run_check(self, pictures):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / "deck.pptx"
            make_pptx(path, pictures)
            return cq.inspect(str(path), 144, 110)

    def test_pass_warn_fail(self):
        rep = self.run_check([(1, 1440, 1000, 10, 6.9), (2, 1200, 800, 10, 6.6), (3, 400, 300, 10, 7)])
        status = {p["slide"]: p["status"] for p in rep["pictures"]}
        self.assertEqual(status, {1: "PASS", 2: "WARN", 3: "FAIL"})

    def test_counts_slides_with_image(self):
        rep = self.run_check([(1, 1920, 1080, 5, 3), (3, 1920, 1080, 5, 3)])
        self.assertEqual(rep["slides_with_image"], [1, 3])
        self.assertEqual(rep["slides"], 3)

    def test_png_size(self):
        self.assertEqual(cq.image_size(png(7, 5)), (7, 5))


if __name__ == "__main__":
    unittest.main()
