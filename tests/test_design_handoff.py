import copy,json,tempfile,unittest,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
from scripts.validate_design_handoff import validate
BASE=json.loads((ROOT/'projects/biocer-materiais/design_handoff_v7.json').read_text(encoding='utf-8'))
class DesignHandoff(unittest.TestCase):
 def test_pending_passes_manifest_but_warns(self):
  errors,warnings=validate(BASE);self.assertFalse(errors,errors);self.assertEqual(len(warnings),1)
 def test_pending_blocks_production(self):
  errors,_=validate(BASE,require_approved=True);self.assertTrue(any('BLOCKED_DESIGN' in x for x in errors))
 def test_reject_missing_precedents(self):
  x=copy.deepcopy(BASE);x['precedents']=[]
  errors,_=validate(x);self.assertTrue(any('visual precedents' in e for e in errors))
 def test_reject_fake_human_approval(self):
  x=copy.deepcopy(BASE);x['stage']='APPROVED_DESIGN';x['human_review']={'status':'accepted','record_url':None}
  e,_=validate(x,require_approved=True);self.assertTrue(any('human acceptance' in item for item in e))
 def test_reject_approval_without_actual_images(self):
  x=copy.deepcopy(BASE);x['stage']='APPROVED_DESIGN'
  x['human_review']={'status':'accepted','record_url':'https://github.com/eidryan/slideskill/issues/7'}
  x['candidates']=[{'id':'a','image_path':'missing1.png','sha256':'0'*64,'rationale':'a'},{'id':'b','image_path':'missing2.png','sha256':'0'*64,'rationale':'b'}]
  x['selected']={'id':'a'}
  e,_=validate(x,require_approved=True);self.assertTrue(any('image file unavailable' in item for item in e))
if __name__=='__main__':unittest.main()
