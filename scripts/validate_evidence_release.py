#!/usr/bin/env python3
"""Structural release gate for evidence-led decks. Not a visual quality score."""
import argparse, json, re, sys, zipfile
from pathlib import Path

REQUIRED = (
    "backlog_coverage", "storyline_scqa", "storyboard_evidence",
    "source_audit", "visual_benchmark", "pptx_artifact",
    "technical_qa", "microsoft_powerpoint_render", "independent_review",
    "human_acceptance",
)
STATUSES = {"pass", "blocked", "fail"}

def safe_path(root, rel):
    if not isinstance(rel, str) or not rel.strip():
        return None
    root = Path(root).resolve()
    p = (root / rel).resolve()
    return p if p.is_relative_to(root) else None

def native_chart_count(pptx):
    with zipfile.ZipFile(pptx) as z:
        if z.testzip():
            raise ValueError("PPTX has corrupt entries")
        return sum(bool(re.fullmatch(r"ppt/charts/chart\d+\.xml", n))
                   for n in z.namelist())

def validate(manifest, root, release=False):
    errors, warnings = [], []
    if not isinstance(manifest, dict) or manifest.get("schema_version") != "evidence-gates-v1":
        return ["Invalid evidence gate schema"], []
    gates = manifest.get("gates")
    if not isinstance(gates, dict):
        return ["gates must be an object"], []
    for gate in REQUIRED:
        record = gates.get(gate)
        if not isinstance(record, dict):
            errors.append(f"{gate}: missing record")
            continue
        status = record.get("status")
        if status not in STATUSES:
            errors.append(f"{gate}: invalid status")
            continue
        if status == "pass":
            paths = record.get("evidence_paths")
            if not isinstance(paths, list) or not paths:
                errors.append(f"{gate}: pass needs evidence files")
            else:
                for path in paths:
                    p = safe_path(root, path)
                    if p is None or not p.is_file():
                        errors.append(f"{gate}: evidence file missing/unsafe: {path}")
            if not record.get("reviewed_by"):
                errors.append(f"{gate}: pass needs named reviewer")
        else:
            if not record.get("reason"):
                errors.append(f"{gate}: blocked/failed needs reason")
            message = f"{gate}: {status.upper()}"
            (errors if release else warnings).append(message)
    if release:
        if manifest.get("status") != "READY_FOR_RELEASE":
            errors.append("Deck not READY_FOR_RELEASE")
        producer = manifest.get("producer")
        reviewer = (gates.get("independent_review") or {}).get("reviewed_by")
        if not producer or not reviewer or producer == reviewer:
            errors.append("Independent reviewer must differ from producer")
        if manifest.get("renderer") != "Microsoft PowerPoint":
            errors.append("Microsoft PowerPoint render required")
        if manifest.get("requires_native_chart"):
            path = safe_path(root, manifest.get("pptx_path"))
            if path is None or not path.is_file():
                errors.append("PPTX file missing for native-chart test")
            else:
                try:
                    if native_chart_count(path) == 0:
                        errors.append("PPTX contains zero native charts")
                except (OSError, ValueError, zipfile.BadZipFile) as exc:
                    errors.append(f"PPTX chart check failed: {exc}")
    return errors, warnings

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("manifest", type=Path)
    ap.add_argument("--release", action="store_true")
    args = ap.parse_args()
    try:
        obj = json.loads(args.manifest.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        print("ERROR:", exc, file=sys.stderr)
        return 2
    errors, warnings = validate(obj, Path(__file__).resolve().parents[1], args.release)
    for issue in warnings:
        print("WARNING:", issue)
    for issue in errors:
        print("ERROR:", issue, file=sys.stderr)
    print("PASS structural gate only; a reviewer must assess content and aesthetics" if not errors else "FAIL")
    return int(bool(errors))

if __name__ == "__main__":
    raise SystemExit(main())
