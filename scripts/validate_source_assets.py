#!/usr/bin/env python3
"""Require source bytes, hash, source page and license before admitting empirical images."""
import argparse, hashlib, json, re, sys
from pathlib import Path

def validate(data, root=None, require_ready=False):
    root = Path(root or Path(__file__).resolve().parents[1]).resolve()
    errors, warnings = [], []
    if not isinstance(data, dict) or not isinstance(data.get('assets'), list):
        return ['assets must be a list'], []
    ids=set()
    for asset in data['assets']:
        aid = asset.get('id','?')
        if aid in ids: errors.append(f'{aid}: duplicate id')
        ids.add(aid)
        for field in ('type','source_page','creator','license','supported_claim','unsupported_claim'):
            if not isinstance(asset.get(field),str) or not asset[field].strip():
                errors.append(f'{aid}: {field} required')
        if asset.get('status')=='blocked':
            if not asset.get('blocker'): errors.append(f'{aid}: blocker explanation required')
            if require_ready: errors.append(f'{aid}: BLOCKED_ASSET')
            else: warnings.append(f'{aid}: BLOCKED_ASSET')
            continue
        if asset.get('status')!='cleared_asset':
            errors.append(f'{aid}: invalid status'); continue
        rel=asset.get('local_path'); expected=asset.get('sha256')
        if not rel or not isinstance(expected,str) or not re.fullmatch('[a-f0-9]{64}',expected):
            errors.append(f'{aid}: cleared asset requires local_path and sha256'); continue
        p=(root/rel).resolve()
        if not p.is_relative_to(root): errors.append(f'{aid}: unsafe path'); continue
        if not p.is_file(): errors.append(f'{aid}: missing source file bytes'); continue
        found=hashlib.sha256(p.read_bytes()).hexdigest()
        if found!=expected: errors.append(f'{aid}: hash mismatch')
    return errors,warnings

if __name__=='__main__':
    cli=argparse.ArgumentParser();cli.add_argument('manifest',type=Path);cli.add_argument('--require-ready',action='store_true')
    args=cli.parse_args();obj=json.loads(args.manifest.read_text(encoding='utf-8'))
    failures,warnings=validate(obj,require_ready=args.require_ready)
    for m in warnings: print('WARNING:',m)
    for m in failures: print('ERROR:',m,file=sys.stderr)
    print('PASS: structural provenance preflight only' if not failures else 'FAIL')
    sys.exit(bool(failures))
