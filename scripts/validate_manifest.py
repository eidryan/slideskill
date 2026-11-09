#!/usr/bin/env python3
"""Validate critical Slide Director manifest invariants without external dependencies.

This is a targeted structural and semantic preflight, NOT a JSON Schema engine or
replacement for visual QA or independent review of sources.
"""
import argparse
import json
import sys
from pathlib import Path

LAYOUT_RELATIONS = {
    "thesis_cover": {"thesis"},
    "driver_tree": {"decomposition", "multiplicative"},
    "comparison_matrix": {"comparison"},
    "bar_chart": {"magnitude_comparison"},
    "sequence": {"sequence"},
    "recommendation": {"recommendation", "decision"},
}
REQUIRED_SLIDE = ("id", "role", "title", "claim", "relation", "layout",
                  "evidence", "visual_plan", "notes", "decision_log")


def nonempty(value):
    return isinstance(value, str) and bool(value.strip())


def validate(deck):
    errors, warnings = [], []
    if not isinstance(deck, dict):
        return ["Manifest must be a JSON object"], []
    if deck.get("schema_version") != "0.1":
        errors.append("schema_version must be 0.1")
    meta = deck.get("meta")
    if not isinstance(meta, dict):
        errors.append("meta must be an object")
        meta = {}
    for key in ("title", "audience", "purpose", "language"):
        if not nonempty(meta.get(key)):
            errors.append(f"meta.{key} is required")
    if meta.get("mode") not in ("live", "read_only", "hybrid"):
        errors.append("meta.mode must be live, read_only or hybrid")
    if meta.get("data_status") not in ("illustrative", "sourced"):
        errors.append("meta.data_status must be illustrative or sourced")
    slides = deck.get("slides")
    if not isinstance(slides, list) or len(slides) < 2:
        return errors + ["slides must contain at least two slides"], warnings

    ids, counts = set(), {}
    for i, slide in enumerate(slides, 1):
        prefix = f"slides[{i}]"
        if not isinstance(slide, dict):
            errors.append(f"{prefix} must be an object")
            continue
        for field in REQUIRED_SLIDE:
            if field not in slide:
                errors.append(f"{prefix}.{field} missing")
        slide_id = slide.get("id")
        if not nonempty(slide_id):
            errors.append(f"{prefix}.id empty")
        elif slide_id in ids:
            errors.append(f"duplicate slide id: {slide_id}")
        else:
            ids.add(slide_id)
        for field in ("role", "title", "claim"):
            if not nonempty(slide.get(field)):
                errors.append(f"{prefix}.{field} empty")
        layout, relation = slide.get("layout"), slide.get("relation")
        if layout not in LAYOUT_RELATIONS:
            errors.append(f"{prefix}.layout unsupported: {layout}")
        elif relation not in LAYOUT_RELATIONS[layout]:
            errors.append(f"{prefix}: {layout} does not encode {relation}")
        counts[layout] = counts.get(layout, 0) + 1
        evidence = slide.get("evidence")
        if not isinstance(evidence, list) or not evidence:
            errors.append(f"{prefix}.evidence must not be empty")
        else:
            for j, item in enumerate(evidence, 1):
                if not isinstance(item, dict) or not nonempty(item.get("text")):
                    errors.append(f"{prefix}.evidence[{j}] missing text")
                    continue
                if item.get("kind") not in ("conceptual", "qualitative", "quantitative"):
                    errors.append(f"{prefix}.evidence[{j}] invalid kind")
                if meta.get("data_status") == "sourced" and not nonempty(item.get("source")):
                    errors.append(f"{prefix}.evidence[{j}] requires source")
        vp = slide.get("visual_plan")
        if not isinstance(vp, dict) or not vp:
            errors.append(f"{prefix}.visual_plan required")
            vp = {}
        if layout == "driver_tree" and (not nonempty(vp.get("root")) or
                                        not isinstance(vp.get("drivers"), list) or
                                        len(vp["drivers"]) != 2):
            errors.append(f"{prefix}.driver_tree requires root and exactly 2 drivers")
        if layout == "comparison_matrix":
            if not isinstance(vp.get("headers"), list) or len(vp["headers"]) != 3:
                errors.append(f"{prefix}.comparison_matrix requires exactly 3 headers")
            if not isinstance(vp.get("rows"), list) or not vp["rows"] or any(
                    not isinstance(row, list) or len(row) != 3 for row in vp["rows"]):
                errors.append(f"{prefix}.comparison_matrix rows must have 3 cells")
        if layout == "bar_chart":
            series = vp.get("series")
            if not isinstance(series, list) or not series or any(
                    not isinstance(b, dict) or not nonempty(b.get("label")) or
                    isinstance(b.get("value"), bool) or
                    not isinstance(b.get("value"), (int, float)) or b["value"] < 0
                    for b in series):
                errors.append(f"{prefix}.bar_chart needs nonnegative numeric series")
            if not nonempty(vp.get("units")):
                errors.append(f"{prefix}.bar_chart units required")
        if layout == "sequence" and (not isinstance(vp.get("steps"), list) or
                                     not 2 <= len(vp["steps"]) <= 5):
            errors.append(f"{prefix}.sequence requires 2-5 steps")
        if layout == "recommendation" and (not nonempty(vp.get("decision")) or
                                           not isinstance(vp.get("actions"), list) or
                                           not vp["actions"]):
            errors.append(f"{prefix}.recommendation needs decision and actions")
        notes = slide.get("notes")
        if not isinstance(notes, list) or not notes or not all(map(nonempty, notes)):
            errors.append(f"{prefix}.notes must have nonempty speaker prompts")
        log = slide.get("decision_log")
        if not isinstance(log, dict) or not nonempty(log.get("selected_reason")):
            errors.append(f"{prefix}.decision_log.selected_reason required")
        elif not isinstance(log.get("alternatives_rejected"), list) or not log["alternatives_rejected"]:
            errors.append(f"{prefix}.decision_log must record a rejected alternative")
    for layout, count in counts.items():
        if count > max(2, len(slides) // 2):
            warnings.append(f"Review repetition: layout {layout} used {count} times")
    if meta.get("data_status") == "illustrative":
        warnings.append("Illustrative/demo deck: never present synthetic data as empirical")
    return errors, warnings


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    args = parser.parse_args(argv)
    try:
        deck = json.loads(args.manifest.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    errors, warnings = validate(deck)
    for warning in warnings:
        print("WARNING: " + warning)
    for error in errors:
        print("ERROR: " + error, file=sys.stderr)
    if errors:
        print(f"FAILED: {len(errors)} blocking preflight issue(s)", file=sys.stderr)
        return 1
    print(f"PASS: {len(deck['slides'])} slides passed structural preflight (not visual QA)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
