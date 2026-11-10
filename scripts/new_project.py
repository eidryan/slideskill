#!/usr/bin/env python3
"""Cria projects/<slug>/ a partir de projects/_template/."""
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROJECTS = ROOT / "projects"


def main(argv):
    if len(argv) != 2 or not re.fullmatch(r"[a-z0-9][a-z0-9-]*", argv[1]):
        print("uso: new_project.py <slug>   (minúsculas, números e hífen)", file=sys.stderr)
        return 2
    slug = argv[1]
    dest = PROJECTS / slug
    if dest.exists():
        print(f"já existe: {dest}", file=sys.stderr)
        return 1
    shutil.copytree(PROJECTS / "_template", dest)
    for md in dest.glob("*.md"):
        md.write_text(md.read_text(encoding="utf-8").replace("<Nome do projeto>", slug), encoding="utf-8")
    print(f"criado {dest}\nPreencha README.md e brief.md primeiro e adicione a linha em projects/README.md.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
