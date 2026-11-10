#!/usr/bin/env python3
"""Check PPTX objects outside the canvas and missing notes.

Structural OOXML preflight. Does NOT detect glyph overflow inside a text box,
poor visual design, unjustified claims, color conflicts, or PowerPoint differences.
"""
import argparse
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

EMU = 914400
NS = {
 "p":"http://schemas.openxmlformats.org/presentationml/2006/main",
 "a":"http://schemas.openxmlformats.org/drawingml/2006/main",
}

def inspect_pptx(filepath, require_notes=False):
    problems=[]
    metrics={"slides":0,"notes":0,"off_canvas":0,"text_shapes":0,"media":0}
    with zipfile.ZipFile(filepath) as z:
        bad=z.testzip()
        if bad: return [f"Corrupt archive member {bad}"],metrics
        all_files=z.namelist()
        root=ET.fromstring(z.read("ppt/presentation.xml"))
        sz=root.find(".//p:sldSz",NS)
        width=int(sz.attrib["cx"]);height=int(sz.attrib["cy"])
        slides=sorted(
            (p for p in all_files if re.fullmatch(r"ppt/slides/slide\d+\.xml",p)),
            key=lambda p:int(re.search(r"slide(\d+)",p).group(1))
        )
        metrics["slides"]=len(slides)
        metrics["notes"]=len([p for p in all_files if re.fullmatch(
            r"ppt/notesSlides/notesSlide\d+\.xml",p)])
        metrics["media"]=len([p for p in all_files if p.startswith("ppt/media/") and not p.endswith("/")])
        if require_notes and metrics["notes"]<metrics["slides"]:
            problems.append(f"Speaker notes missing: {metrics['notes']}/{metrics['slides']}")
        for p in slides:
            number=int(re.search(r"slide(\d+)",p).group(1))
            doc=ET.fromstring(z.read(p))
            objects=list(doc.findall(".//p:sp",NS))+list(doc.findall(".//p:pic",NS))+list(doc.findall(".//p:graphicFrame",NS))
            for obj in objects:
                if obj.tag.endswith("sp") and obj.find(".//a:t",NS) is not None: metrics["text_shapes"]+=1
                tr=obj.find("./p:spPr/a:xfrm",NS)
                if tr is None:tr=obj.find("./p:xfrm",NS)
                if tr is None:continue
                off=tr.find("./a:off",NS);ext=tr.find("./a:ext",NS)
                if off is None or ext is None:continue
                x,y,w,h=[int(v) for v in (off.attrib["x"],off.attrib["y"],ext.attrib["cx"],ext.attrib["cy"])]
                tol=18000
                if x < -tol or y < -tol or x+w > width+tol or y+h > height+tol:
                    metrics["off_canvas"]+=1
                    problems.append(f"Slide {number}: off-canvas object at {tuple(round(v/EMU,2) for v in (x,y,w,h))} inches")
    return problems,metrics

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("pptx",type=Path)
    p.add_argument("--require-notes",action="store_true")
    p.add_argument("--strict",action="store_true")
    args=p.parse_args()
    try:errors,stats=inspect_pptx(args.pptx,args.require_notes)
    except (OSError,ValueError,zipfile.BadZipFile,ET.ParseError,KeyError) as err:
        print("ERROR:",err,file=sys.stderr)
        return 2
    print("PPTX structural report:",stats)
    for item in errors:print("WARNING:",item)
    print("Visual QA and font-fit verification are still required.")
    return int(bool(args.strict and errors))

if __name__=="__main__":
    raise SystemExit(main())
