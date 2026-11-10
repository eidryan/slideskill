#!/usr/bin/env python3
"""Preflight check of object/relation semantics; does NOT inspect pixels."""
from pathlib import Path
import sys,json
ROOT=Path(__file__).resolve().parents[1]
MECHANISMS={"physical_mechanism","spatial_structure","state_transition"}
def validate(data):
    errors=[];warnings=[]
    if not isinstance(data,dict) or not data.get("slides"):return ["slides required"],[]
    roles=data.get("semantic_color_register",{})
    catalog={json.loads(x)["id"]:json.loads(x) for x in
        (ROOT/"examples/visual-casebook/catalog.jsonl").read_text(encoding="utf-8").splitlines() if x.strip()}
    for slide in data["slides"]:
        sid=str(slide.get("id","?"));tag=f"slide {sid}"
        for field in ("claim","ontology","why_selected","source_ids","visual_objects","visual_relations","reference_ids","alternatives_rejected"):
            if not slide.get(field):errors.append(f"{tag}: missing {field}")
        ont=slide.get("ontology","")
        if ont in MECHANISMS:
            if slide.get("representation") in ("generic_steps","generic_cards","text_only"):
                errors.append(f"{tag}: generic steps/cards cannot represent {ont}")
            if len(slide.get("visual_objects",[]))<3 or len(slide.get("visual_relations",[]))<2:
                errors.append(f"{tag}: insufficient physical objects or relations")
        if ont=="magnitude" and (not slide.get("units") or slide.get("scale_status") not in ("linear","log","explicit_split")):
            errors.append(f"{tag}: units and honest scale required")
        for ref in slide.get("reference_ids",[]):
            if ref not in catalog or catalog[ref].get("anti"):errors.append(f"{tag}: invalid/anti-positive reference {ref}")
        for item in slide.get("color_assignments",[]):
            role=item.get("role")
            if role in roles and roles[role]!=item.get("meaning"):errors.append(f"{tag}: semantic color conflict for {role}")
        if not slide.get("render_inspected"):warnings.append(f"{tag}: screenshot QA unverified")
    return errors,warnings
def main():
    try: data=json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    except (IndexError,ValueError,OSError) as e:print(e,file=sys.stderr);return 2
    errors,warnings=validate(data)
    for w in warnings:print("WARNING",w)
    for e in errors:print("ERROR",e,file=sys.stderr)
    print("PASS semantic preflight (not visual QA)" if not errors else "FAIL")
    return bool(errors)
if __name__=="__main__":sys.exit(main())
