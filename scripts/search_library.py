#!/usr/bin/env python3
"""Deterministic semantic shortlist for the annotated reference catalog (stdlib only).

This is *not* image retrieval, embedding search, or quality judgment.
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CATALOG = ROOT / "references" / "catalog.jsonl"


def tokens(value):
    return set(re.findall(r"[a-zà-ÿ0-9_]+", str(value).lower()))


def load_catalog(path):
    result, seen = [], set()
    with Path(path).open(encoding="utf-8") as handle:
        for number, raw in enumerate(handle, 1):
            if not raw.strip():
                continue
            try:
                entry = json.loads(raw)
            except json.JSONDecodeError as exc:
                raise ValueError(f"Invalid catalog JSON at line {number}: {exc}") from exc
            for key in ("id", "purpose", "relation", "layout", "use_when", "avoid_when"):
                if not isinstance(entry.get(key), str) or not entry[key].strip():
                    raise ValueError(f"Line {number} missing field: {key}")
            if entry["id"] in seen:
                raise ValueError(f"Duplicate catalog id: {entry['id']}")
            seen.add(entry["id"])
            result.append(entry)
    return result


def rank(entry, purpose="", relation="", query="", audience=""):
    score = 0.0
    why = []
    if purpose:
        if entry["purpose"] == purpose:
            score += 10
            why.append("purpose exact")
        elif tokens(purpose) & tokens(entry["purpose"]):
            score += 2
            why.append("purpose partial")
    if relation:
        if entry["relation"] == relation:
            score += 12
            why.append("relation exact")
        elif tokens(relation) & tokens(entry["relation"]):
            score += 2
            why.append("relation partial")
    if audience and audience in entry.get("audience", []):
        score += 3
        why.append("audience match")
    if query:
        query_terms = tokens(query)
        tags = tokens(" ".join(entry.get("tags", [])))
        description = tokens(" ".join(str(entry.get(k, "")) for k in
                                      ("claim_example", "visual_rationale", "use_when", "layout")))
        tag_hits = sorted(query_terms & tags)
        desc_hits = sorted(query_terms & description)
        score += 2 * len(tag_hits) + 0.4 * len(desc_hits)
        if tag_hits:
            why.append("tags: " + ", ".join(tag_hits))
        if desc_hits:
            why.append("description: " + ", ".join(desc_hits))
    return round(score, 2), why


def search(entries, purpose="", relation="", query="", audience="", limit=5):
    output = []
    for entry in entries:
        score, why = rank(entry, purpose, relation, query, audience)
        if (purpose or relation or query or audience) and score <= 0:
            continue
        output.append({
            "id": entry["id"], "layout": entry["layout"],
            "purpose": entry["purpose"], "relation": entry["relation"],
            "score": score, "why": why,
            "use_when": entry["use_when"], "avoid_when": entry["avoid_when"],
            "visual_rationale": entry.get("visual_rationale", ""),
        })
    output.sort(key=lambda item: (-item["score"], item["id"]))
    return output[:limit]


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--catalog", type=Path, default=DEFAULT_CATALOG)
    parser.add_argument("--purpose", default="")
    parser.add_argument("--relation", default="")
    parser.add_argument("--query", default="")
    parser.add_argument("--audience", default="")
    parser.add_argument("--limit", type=int, default=5)
    args = parser.parse_args(argv)
    if args.limit < 1:
        parser.error("--limit must be positive")
    try:
        result = search(load_catalog(args.catalog), args.purpose, args.relation,
                        args.query, args.audience, args.limit)
    except (OSError, ValueError) as exc:
        print(f"Catalog error: {exc}", file=sys.stderr)
        return 2
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
