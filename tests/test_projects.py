import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts import check_projects  # noqa: E402


class ProjectsTests(unittest.TestCase):
    def test_repository_projects_are_clean(self):
        errors = []
        for project in check_projects.project_dirs():
            if project.name == "_shared":
                continue
            errors += check_projects.check_structure(project)
            errors += check_projects.check_privacy(project)
        self.assertEqual(errors, [])

    def test_template_exists(self):
        self.assertTrue((ROOT / "projects" / "_template" / "brief.md").is_file())

    def test_missing_file_is_reported(self):
        with tempfile.TemporaryDirectory() as tmp:
            project = Path(tmp) / "demo"
            project.mkdir()
            (project / "README.md").write_text("x", encoding="utf-8")
            errors = check_projects.check_structure(project)
            self.assertTrue(any("brief.md" in e for e in errors))

    def test_privacy_pattern_catches_email_and_path(self):
        with tempfile.TemporaryDirectory() as tmp:
            project = Path(tmp) / "demo"
            project.mkdir()
            (project / "sources.md").write_text("contato fulano@example.com em C:\\Users\\fulano\\x", encoding="utf-8")
            check_projects.ROOT = Path(tmp)
            try:
                errors = check_projects.check_privacy(project)
            finally:
                check_projects.ROOT = ROOT
            self.assertTrue(any("e-mail" in e for e in errors))
            self.assertTrue(any("caminho" in e for e in errors) or len(errors) >= 1)


if __name__ == "__main__":
    unittest.main()
