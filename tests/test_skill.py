import copy
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.search_library import load_catalog, search  # noqa: E402
from scripts.validate_manifest import validate  # noqa: E402

DEMO = json.loads((ROOT / "examples" / "demo-consulting.json").read_text(encoding="utf-8"))


class ManifestTests(unittest.TestCase):
    def test_demo_is_valid(self):
        errors, warnings = validate(DEMO)
        self.assertEqual(errors, [])
        self.assertTrue(any("Illustrative" in w for w in warnings))

    def test_duplicate_id_blocked(self):
        deck = copy.deepcopy(DEMO)
        deck["slides"][1]["id"] = deck["slides"][0]["id"]
        errors, _ = validate(deck)
        self.assertTrue(any("duplicate slide id" in e for e in errors))

    def test_wrong_visual_relation_blocked(self):
        deck = copy.deepcopy(DEMO)
        deck["slides"][1]["relation"] = "comparison"
        errors, _ = validate(deck)
        self.assertTrue(any("does not encode" in e for e in errors))

    def test_unsourced_evidence_blocked_in_sourced_mode(self):
        deck = copy.deepcopy(DEMO)
        deck["meta"]["data_status"] = "sourced"
        del deck["slides"][0]["evidence"][0]["source"]
        errors, _ = validate(deck)
        self.assertTrue(any("requires source" in e for e in errors))

    def test_negative_bars_blocked(self):
        deck = copy.deepcopy(DEMO)
        deck["slides"][3]["visual_plan"]["series"][0]["value"] = -5
        errors, _ = validate(deck)
        self.assertTrue(any("nonnegative" in e for e in errors))

    def test_cli(self):
        result = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "validate_manifest.py"),
             str(ROOT / "examples" / "demo-consulting.json")],
            capture_output=True, text=True, check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


class CatalogTests(unittest.TestCase):
    def test_catalog_nonempty_and_unique(self):
        entries = load_catalog(ROOT / "references" / "catalog.jsonl")
        self.assertGreaterEqual(len(entries), 10)
        self.assertEqual(len({e["id"] for e in entries}), len(entries))

    def test_retrieval_by_relation(self):
        entries = load_catalog(ROOT / "references" / "catalog.jsonl")
        result = search(entries, purpose="explain_mechanism",
                        relation="decomposition", limit=3)
        self.assertEqual(result[0]["id"], "original-driver-tree-01")
        self.assertIn("relation exact", result[0]["why"])

    def test_unmatched_query_returns_empty(self):
        entries = load_catalog(ROOT / "references" / "catalog.jsonl")
        self.assertEqual(search(entries, query="nonexistentxyz"), [])


if __name__ == "__main__":
    unittest.main()
