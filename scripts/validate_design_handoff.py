#!/usr/bin/env python3
"""Structural gate for a reviewed image-first design; not an aesthetic score."""
import argparse, hashlib, json, struct, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
def validate(p, root=ROOT, require_approved=False):
    errors=[]; warnings=[]
    if not isinstance(p,dict) or p.get('schema_version')!='0.1-design-handoff':
        return ['Invalid design handoff schema'], []
    refs=p.get('precedents')
    if not isinstance(refs,list) or len(refs)<2:
        errors.append('At least two real visual precedents required')
    else:
        urls=set()
        for r in refs:
            if not r.get('url','').startswith('https://') or not r.get('learning'):
                errors.append('Precedent must include URL and learning')
            if r.get('url') in urls:errors.append('Duplicate precedent')
            urls.add(r.get('url'))
    if not p.get('claim') or not p.get('source_data'): errors.append('Missing claim or source data')
    ready=p.get('stage')=='APPROVED_DESIGN'
    if not ready:
        if require_approved:errors.append('BLOCKED_DESIGN: not approved for PPTX reconstruction')
        else:warnings.append('PENDING_DESIGN: no production PPTX is authorized')
        return errors,warnings
    review=p.get('human_review') or {}
    if review.get('status')!='accepted' or not review.get('record_url','').startswith('https://'):
        errors.append('Explicit human acceptance with review URL required')
    cands=p.get('candidates',[])
    if len(cands)<2:errors.append('Two separate design-image candidates required')
    selected=p.get('selected') or {}
    if not selected.get('id') or selected.get('id') not in [c.get('id') for c in cands]:
        errors.append('Selected design must match a candidate')
    for c in cands:
        ident=c.get('id','?')
        rel=c.get('image_path'); expected=c.get('sha256')
        if not rel or not isinstance(expected,str) or len(expected)!=64:
            errors.append(f'{ident}: image file and SHA256 required');continue
        fp=(Path(root)/rel).resolve()
        if not fp.is_relative_to(Path(root).resolve()):
            errors.append(f'{ident}: path outside repository');continue
        try:
            contents=fp.read_bytes()
        except OSError:
            errors.append(f'{ident}: image file unavailable');continue
        if hashlib.sha256(contents).hexdigest()!=expected:
            errors.append(f'{ident}: design image hash mismatch')
        if not contents.startswith(bytes.fromhex('89504e470d0a1a0a')) or len(contents)<24:
            errors.append(f'{ident}: expected a full PNG design image');continue
        width,height=struct.unpack('>II',contents[16:24])
        if width<1280 or height<720 or abs(width/height-16/9)>.03:
            errors.append(f'{ident}: design image must be high-resolution 16:9')
        if not c.get('rationale'):errors.append(f'{ident}: editorial rationale required')
    if not p.get('reconstruction'):errors.append('Reconstruction plan required')
    return errors,warnings

def main():
    arg=argparse.ArgumentParser();arg.add_argument('manifest',type=Path)
    arg.add_argument('--require-approved',action='store_true')
    x=arg.parse_args()
    try: obj=json.loads(x.manifest.read_text(encoding='utf-8'))
    except (OSError,ValueError) as exc:
        print('ERROR:',exc,file=sys.stderr);return 2
    e,w=validate(obj,require_approved=x.require_approved)
    for item in w:print('WARNING:',item)
    for item in e:print('ERROR:',item,file=sys.stderr)
    print('PASS: structural handoff only; artistic quality not verified' if not e else 'FAIL')
    return int(bool(e))

if __name__=='__main__':raise SystemExit(main())
