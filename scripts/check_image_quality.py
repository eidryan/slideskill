#!/usr/bin/env python3
"""Mede a qualidade e o equilibrio das imagens de um PPTX (somente biblioteca padrao).

Para cada imagem inserida (<p:pic>) calcula os pixels visiveis (descontando o corte) e a
resolucao efetiva em dpi no tamanho em que ela aparece no slide. Um slide de 13,33 pol. projetado em
1920 px pede cerca de 144 dpi. Tambem conta quantos slides tem pelo menos uma imagem.

Nao julga composicao, direitos nem se a imagem e a certa. Serve para pegar miniatura esticada
(thumbnail do Wikimedia, por exemplo) e deck sem imagem nenhuma.

Uso:
  python scripts/check_image_quality.py deck.pptx [--min-dpi 144] [--warn-dpi 110]
                                        [--min-slides-with-image 6] [--json]
Saida 1 se houver imagem FAIL (< warn-dpi) ou se faltar o minimo de slides com imagem.
"""
from __future__ import annotations

import argparse
import json
import re
import struct
import sys
import zipfile
import xml.etree.ElementTree as ET

EMU = 914400
NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}
REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def image_size(data: bytes):
    """Largura e altura em pixels de PNG, JPEG, GIF ou BMP; None se nao reconhecer (SVG, EMF, WebP)."""
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", data[16:24])
    if data[:6] in (b"GIF87a", b"GIF89a"):
        return struct.unpack("<HH", data[6:10])
    if data[:2] == b"BM":
        w, h = struct.unpack("<ii", data[18:26])
        return w, abs(h)
    if data[:2] == b"\xff\xd8":
        i = 2
        while i < len(data) - 9:
            if data[i] != 0xFF:
                i += 1
                continue
            marker = data[i + 1]
            if marker in (0xD8, 0x01) or 0xD0 <= marker <= 0xD7:
                i += 2
                continue
            length = struct.unpack(">H", data[i + 2:i + 4])[0]
            if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                h, w = struct.unpack(">HH", data[i + 5:i + 9])
                return w, h
            i += 2 + length
    return None


def slide_number(name: str) -> int:
    return int(re.search(r"slide(\d+)\.xml$", name).group(1))


def inspect(path: str, min_dpi: float, warn_dpi: float):
    pictures, vector = [], []
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        slides = sorted((n for n in names if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)), key=slide_number)
        for sname in slides:
            n = slide_number(sname)
            rels = {}
            rname = f"ppt/slides/_rels/slide{n}.xml.rels"
            if rname in names:
                for rel in ET.fromstring(z.read(rname)).iter(f"{REL_NS}Relationship"):
                    rels[rel.attrib["Id"]] = rel.attrib["Target"]
            root = ET.fromstring(z.read(sname))
            for pic in root.iter(f"{{{NS['p']}}}pic"):
                blip = pic.find(".//a:blip", NS)
                ext = pic.find(".//a:xfrm/a:ext", NS)
                if blip is None or ext is None:
                    continue
                target = rels.get(blip.attrib.get(f"{{{NS['r']}}}embed", ""), "")
                media = "ppt/" + target.replace("../", "") if target else ""
                w_in, h_in = int(ext.attrib["cx"]) / EMU, int(ext.attrib["cy"]) / EMU
                if media.lower().endswith((".svg", ".emf", ".wmf")) or media not in names:
                    vector.append({"slide": n, "media": media})
                    continue
                size = image_size(z.read(media))
                if not size:
                    vector.append({"slide": n, "media": media})
                    continue
                crop = pic.find(".//a:srcRect", NS)
                l = int(crop.attrib.get("l", 0)) / 100000 if crop is not None else 0
                r = int(crop.attrib.get("r", 0)) / 100000 if crop is not None else 0
                t = int(crop.attrib.get("t", 0)) / 100000 if crop is not None else 0
                b = int(crop.attrib.get("b", 0)) / 100000 if crop is not None else 0
                vis_w, vis_h = size[0] * (1 - l - r), size[1] * (1 - t - b)
                dpi = min(vis_w / w_in, vis_h / h_in) if w_in > 0 and h_in > 0 else 0
                status = "PASS" if dpi >= min_dpi else "WARN" if dpi >= warn_dpi else "FAIL"
                pictures.append({
                    "slide": n, "media": media.split("/")[-1], "pixels": f"{size[0]}x{size[1]}",
                    "visible_px": f"{vis_w:.0f}x{vis_h:.0f}", "placed_in": f"{w_in:.2f}x{h_in:.2f}",
                    "dpi": round(dpi), "status": status,
                })
        total = len(slides)
    with_image = sorted({p["slide"] for p in pictures} | {v["slide"] for v in vector})
    return {"slides": total, "slides_with_image": with_image, "pictures": pictures, "vector_images": vector}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pptx")
    ap.add_argument("--min-dpi", type=float, default=144)
    ap.add_argument("--warn-dpi", type=float, default=110)
    ap.add_argument("--min-slides-with-image", type=int, default=0)
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()
    rep = inspect(args.pptx, args.min_dpi, args.warn_dpi)
    fails = [p for p in rep["pictures"] if p["status"] == "FAIL"]
    warns = [p for p in rep["pictures"] if p["status"] == "WARN"]
    short = len(rep["slides_with_image"]) < args.min_slides_with_image
    if args.json:
        print(json.dumps(rep, ensure_ascii=False, indent=2))
    else:
        print(f"{rep['slides']} slides; {len(rep['slides_with_image'])} com imagem: {rep['slides_with_image']}")
        for p in rep["pictures"]:
            print(f"  slide {p['slide']:>2}  {p['status']:<4} {p['dpi']:>4} dpi  {p['pixels']} (visivel {p['visible_px']}) em {p['placed_in']} pol  {p['media']}")
        for v in rep["vector_images"]:
            print(f"  slide {v['slide']:>2}  vetor/nao medido  {v['media']}")
        print(f"PASS {sum(p['status']=='PASS' for p in rep['pictures'])}  WARN {len(warns)}  FAIL {len(fails)}")
        if short:
            print(f"FALTA: so {len(rep['slides_with_image'])} slides com imagem, minimo {args.min_slides_with_image}")
    return 1 if fails or short else 0


if __name__ == "__main__":
    sys.exit(main())
