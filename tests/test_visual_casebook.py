import copy,json,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
from scripts.check_visual_casebook import validate as check_gallery
from scripts.validate_visual_plan import validate as check_plan
sample=json.loads((ROOT/"projects/biocer-materiais/visual-plan-experiment.json").read_text())
class CasebookTest(unittest.TestCase):
 def test_casebook(self):
  errors,counts=check_gallery();self.assertEqual(errors,[]);self.assertGreaterEqual(counts["positive"],10)
 def test_positive_spec(self):
  errors,warnings=check_plan(sample);self.assertEqual(errors,[]);self.assertEqual(len(warnings),3)
 def test_generic_mechanism_blocked(self):
  x=copy.deepcopy(sample);x["slides"][1]["representation"]="generic_steps"
  self.assertTrue(any("generic steps" in e for e in check_plan(x)[0]))
 def test_semantic_color_conflict(self):
  x=copy.deepcopy(sample);x["slides"][1]["color_assignments"]=[{"role":"teal","meaning":"bioinertes"}]
  self.assertTrue(any("color conflict" in e for e in check_plan(x)[0]))
 def test_anti_reference_blocked(self):
  x=copy.deepcopy(sample);x["slides"][1]["reference_ids"]=["anti-01-passo-generico"]
  self.assertTrue(any("invalid/anti-positive" in e for e in check_plan(x)[0]))
if __name__=="__main__":unittest.main()
