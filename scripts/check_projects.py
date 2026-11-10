#!/usr/bin/env python3
"""Confere a estrutura de projects/ e procura dados que nao devem ir ao repositorio publico."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ROOT / "projects"
REQUIRED = ["README.md", "brief.md", "sources.md", "storyboard.md"]
TEXT_SUFFIXES = {".md", ".json", ".csv", ".mjs", ".txt"}

# Padroes que indicam dado privado. _shared/ fica fora da varredura de texto porque cita termos proibidos como exemplo.
PRIVACY = [
    (re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+"), "e-mail"),
    (re.compile(r"\b\d{8,10}:[A-Za-z0-9_-]{30,}\b"), "token de bot"),
    (re.compile(r"\b(?:gh[pousr]_|sk-)[A-Za-z0-9_-]{20,}"), "token de API"),
    (re.compile(r"[A-Za-z]:[\\/]+Users[\\/]+\w+", re.I), "caminho de disco pessoal"),
    (re.compile(r"\bwhatsapp\b|\btelegram\b", re.I), "mensageiro"),
]


def project_dirs() -> list[Path]:
    return sorted(p for p in PROJECTS.iterdir() if p.is_dir()) if PROJECTS.exists() else []


def check_structure(project: Path) -> list[str]:
    errors = [f"{project.name}: falta {name}" for name in REQUIRED if not (project / name).is_file()]
    if (project / "content.json").is_file():
        if not (project / "notes.json").is_file():
            errors.append(f"{project.name}: content.json sem notes.json")
        for name in ("content.json", "notes.json"):
            path = project / name
            if path.is_file():
                try:
                    json.loads(path.read_text(encoding="utf-8"))
                except json.JSONDecodeError as exc:
                    errors.append(f"{project.name}/{name}: JSON invalido ({exc})")
    return errors


def check_privacy(project: Path) -> list[str]:
    errors = []
    for path in sorted(project.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES or "node_modules" in path.parts:
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for pattern, label in PRIVACY:
            match = pattern.search(text)
            if match:
                errors.append(f"{path.relative_to(ROOT)}: {label} ({match.group(0)[:40]!r})")
    return errors


def main() -> int:
    errors: list[str] = []
    projects = [p for p in project_dirs() if p.name != "_shared"]
    for project in projects:
        errors += check_structure(project)
        errors += check_privacy(project)
    if errors:
        print("\n".join(errors))
        return 1
    print(f"{len(projects)} pastas de projeto conferidas (incluindo _template).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
