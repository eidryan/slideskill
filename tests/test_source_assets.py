import copy,hashlib,json,tempfile,unittest
from pathlib import Path
from scripts.validate_source_assets import validate
ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'projects/biocer-materiais/source_assets_v5.json').read_text())
class TestSourceAssets(unittest.TestCase):
 def test_blocked_warn(self):
  e,w=validate(DATA);self.assertFalse(e,e);self.assertEqual(len(w),2)
 def test_production_block(self):
  e,w=validate(DATA,require_ready=True);self.assertEqual(len(e),2)
 def test_false_ready_without_bytes(self):
  d=copy.deepcopy(DATA);d['assets'][0].update(status='cleared_asset',local_path='missing.jpg',sha256='0'*64)
  e,_=validate(d);self.assertTrue(any('missing source' in x for x in e))
 def test_hash_verification(self):
  with tempfile.TemporaryDirectory() as td:
   p=Path(td);(p/'test.bin').write_bytes(b'test')
   d=copy.deepcopy(DATA);d['assets'][0].update(status='cleared_asset',local_path='test.bin',sha256=hashlib.sha256(b'test').hexdigest())
   e,_=validate(d,root=p);self.assertFalse(e,e)
