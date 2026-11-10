import copy
import tempfile
import unittest
import zipfile
from pathlib import Path
from scripts.validate_evidence_release import REQUIRED, validate

def demo():
    return {"schema_version": "evidence-gates-v1", "status": "REJECTED",
            "producer": "author-agent", "renderer": "LibreOffice",
            "requires_native_chart": True, "pptx_path": None,
            "gates": {x: {"status": "blocked", "reason": "not verified"} for x in REQUIRED}}

class EvidenceReleaseTests(unittest.TestCase):
    def test_rejected_auditable_without_release(self):
        errors, warnings = validate(demo(), Path.cwd())
        self.assertFalse(errors)
        self.assertEqual(len(warnings), len(REQUIRED))

    def test_reject_unfulfilled_release(self):
        errors, _ = validate(demo(), Path.cwd(), release=True)
        self.assertIn("Deck not READY_FOR_RELEASE", errors)

    def test_fake_pass_requires_evidence(self):
        x = demo()
        x["gates"]["storyline_scqa"] = {"status": "pass", "reviewed_by": "other",
                                         "evidence_paths": ["missing.md"]}
        errors, _ = validate(x, Path.cwd())
        self.assertTrue(any("evidence file missing" in y for y in errors))

    def test_detect_self_review_and_non_native_chart(self):
        x = demo()
        x.update(status="READY_FOR_RELEASE", renderer="Microsoft PowerPoint", producer="same",
                 pptx_path="slide.pptx")
        x["gates"] = {g: {"status": "pass", "reviewed_by": "same",
                          "evidence_paths": ["check.md"]} for g in REQUIRED}
        with tempfile.TemporaryDirectory() as d:
            p = Path(d)
            (p / "check.md").write_text("review", encoding="utf-8")
            with zipfile.ZipFile(p / "slide.pptx", "w") as z:
                z.writestr("ppt/slides/slide1.xml", "<slide/>")
            errors, _ = validate(x, p, release=True)
            self.assertTrue(any("reviewer must differ" in y for y in errors))
            self.assertTrue(any("zero native charts" in y for y in errors))
