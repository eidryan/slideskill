#!/usr/bin/env python3
"""Validate SVG casebook integrity, not editorial quality."""
from pathlib import Path
import json,sys,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
def validate(root=ROOT):
    catalog=root/"examples/visual-casebook/catalog.jsonl"
    folder=catalog.parent/"svg"
    try: records=[json.loads(line) for line in catalog.read_text(encoding="utf-8").splitlines() if line.strip()]
    except (OSError,ValueError) as e:return [f"catalog invalid: {e}"],{}
    errors=[];ids=set();stats={"positive":0,"anti":0}
    for item in records:
        id=item.get("id")
        if not id or id in ids:errors.append(f"duplicate/missing id: {id}")
        ids.add(id)
        for k in ("filename","title","ontology","when","avoid","why","source","license"):
            if not str(item.get(k,"")).strip():errors.append(f"{id}: missing {k}")
        stats["anti" if item.get("anti") else "positive"]+=1
        if item.get("anti") and item.get("quality")!="rejected":errors.append(f"{id}: anti must be rejected")
        try:
            xml=ET.parse(folder/item["filename"]).getroot()
            if not xml.tag.endswith("svg") or not xml.get("viewBox") or not xml.get("aria-label"):
                errors.append(f"{id}: invalid SVG accessibility/root")
        except (OSError,ValueError,ET.ParseError,KeyError) as e:errors.append(f"{id}: invalid SVG {e}")
    if stats["positive"]<10 or stats["anti"]<3:errors.append("Insufficient positive/anti count")
    return errors,stats
if __name__=="__main__":
    e,n=validate()
    for problem in e:print("ERROR",problem,file=sys.stderr)
    print(f"Visual casebook: {n} (editorial QA not implied)")
    sys.exit(bool(e))
