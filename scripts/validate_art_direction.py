#!/usr/bin/env python3
"""Check visual-first art-direction plans for honesty and source readiness.

This gate is a structural/factual-risk preflight. It cannot judge style or the
actual evidence in a photograph. A pending asset MUST NOT be considered render-ready.
"""
import argparse
import json
import sys
from pathlib import Path

VISUAL = {"real_photo", "micrograph", "published_figure", "technical_illustration"}
DATA = {"data_chart"}
ALLOWED = VISUAL | DATA | {"process_visual", "typography_only"}
PHYSICAL = {"physical_mechanism", "spatial_structure", "state_transition"}
READY = {"ready_from_data", "cleared_asset"}
PENDING = {"candidate", "blocked"}
LICENSES = {"verified_page_pd", "verified_cc_by", "own_calculation", "own_data_summary",
            "needs_specific_figure_check", "not_checked", "licensed_other"}

def validate(payload):
    errors = []
    warnings = []
    if not isinstance(payload, dict) or not isinstance(payload.get("slides"), list):
        return ["slides must be a list"], []
    if payload.get("schema_version") != "0.1-art-direction":
        errors.append("Unsupported schema_version")
    ids = set()
    for i, slide in enumerate(payload["slides"], 1):
        key = f"slide {slide.get('id', i)}"
        sid = slide.get("id")
        if not sid or sid in ids:
            errors.append(f"{key}: duplicate/missing id")
        ids.add(sid)
        medium = slide.get("primary_medium")
        status = slide.get("asset_status")
        if medium not in ALLOWED:
            errors.append(f"{key}: primary_medium missing/unsupported")
        if slide.get("legacy_primitive_design") is not False:
            errors.append(f"{key}: legacy primitive design is not allowed as default")
        for field in ("claim", "claim_supported", "claim_not_supported", "layout_direction"):
            if not isinstance(slide.get(field), str) or len(slide[field].strip()) < 8:
                errors.append(f"{key}: missing {field}")
        if medium in VISUAL:
            if status not in PENDING | {"cleared_asset"}:
                errors.append(f"{key}: image requires candidate, blocked or cleared_asset status")
            if status == "cleared_asset":
                if not slide.get("asset_ref") or not slide.get("credit"):
                    errors.append(f"{key}: cleared image needs ref and credit")
                if slide.get("license_status") not in {"verified_page_pd", "verified_cc_by", "licensed_other"}:
                    errors.append(f"{key}: cleared image needs license verified")
            else:
                if not slide.get("blocker"):
                    errors.append(f"{key}: pending image requires blocker")
                warnings.append(f"{key}: asset status {status}; NOT READY for production")
            if slide.get("ontology") in PHYSICAL and medium == "technical_illustration":
                if slide.get("scientific_review") is not True:
                    errors.append(f"{key}: technical illustration of physical claim needs scientific review")
        if medium in DATA:
            if status != "ready_from_data":
                errors.append(f"{key}: data chart should reference ready_from_data")
            if not slide.get("source_data") or not slide.get("units") or not slide.get("scale"):
                errors.append(f"{key}: data chart needs source_data, units and scale")
            if slide.get("source_data") and not (Path(__file__).resolve().parents[1] / slide["source_data"]).exists():
                warnings.append(f"{key}: source_data not present in this environment")
        if slide.get("license_status") not in LICENSES:
            errors.append(f"{key}: missing/unsupported license status")
    if payload.get("status") == "PRODUCTION_READY":
        pending = [s.get("id") for s in payload["slides"] if s.get("asset_status") not in READY]
        if pending:
            errors.append(f"Production-ready plan contains pending asset(s): {','.join(pending)}")
    return errors, warnings

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("plan", type=Path)
    args = p.parse_args()
    try:
        payload = json.loads(args.plan.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    errors, warnings = validate(payload)
    for w in warnings: print("WARNING:", w)
    for e in errors: print("ERROR:", e, file=sys.stderr)
    if errors: return 1
    print(f"PASS: art-direction structure; {len(warnings)} pending-asset warning(s). Not visual QA.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
