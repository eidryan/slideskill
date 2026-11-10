import copy
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.validate_art_direction import validate

SAMPLE = json.loads((ROOT / "projects/biocer-materiais/art_direction_v4.json").read_text(encoding="utf-8"))

class ArtDirectionTests(unittest.TestCase):
    def test_pivot_sample_structural_validity_and_pending_assets(self):
        e, w = validate(SAMPLE)
        self.assertFalse(e, e)
        self.assertGreaterEqual(len(w), 3)

    def test_reject_primitive_diagrams(self):
        a = copy.deepcopy(SAMPLE)
        a["slides"][2]["legacy_primitive_design"] = True
        e, _ = validate(a)
        self.assertTrue(any("legacy primitive" in x for x in e))

    def test_reject_unlicensed_ready_photo(self):
        a = copy.deepcopy(SAMPLE)
        a["slides"][4]["asset_status"] = "cleared_asset"
        a["slides"][4]["license_status"] = "not_checked"
        e, _ = validate(a)
        self.assertTrue(any("license verified" in x for x in e))

    def test_reject_fake_production_ready(self):
        a = copy.deepcopy(SAMPLE)
        a["status"] = "PRODUCTION_READY"
        e, _ = validate(a)
        self.assertTrue(any("pending asset" in x for x in e))

    def test_keep_data_chart_with_source(self):
        a = copy.deepcopy(SAMPLE)
        d = [x for x in a["slides"] if x["id"] == "15"][0]
        self.assertEqual(d["primary_medium"], "data_chart")
        e, _ = validate(a)
        self.assertFalse(e, e)

if __name__ == "__main__":
    unittest.main()
