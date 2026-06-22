# CEL Resource Hub

A hub I (**Christina Sun**) built while offboarding from the **California Education Lab (UC
Davis)**. It links the CEL code repositories I'm handing off and documents the workflows I
developed for building and running them. I think they're genuinely useful and worth adopting —
but they're my recommendations, not official lab policy, so take what helps and adapt the rest.

The content lives in [`docs/`](docs/) and is published as a [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
site via GitHub Pages.

> **Live site:** _set after the GitHub repo + Pages are created_ —
> `https://chesun.github.io/cel_resource_hub/`

---

## Who this is for

Whoever **inherits one of my CEL projects** — an incoming researcher, PI, or successor — plus
the lab's data-management custodian and IT. The typical reader is comfortable with **Stata**,
may **never have used git or Claude Code**, and runs analysis on the lab's **Scribe server over
SSH**. See [`docs/index.md`](docs/index.md) for the full framing.

---

## Repository structure

```
cel_resource_hub/
├── mkdocs.yml                 # site config + navigation
├── requirements.txt          # mkdocs-material
├── .github/workflows/         # GitHub Pages deploy
└── docs/
    ├── index.md               # landing page
    ├── repositories/          # one page per linked CEL repo + an index table
    ├── workflow-tips/         # reusable how-to guides (git, Scribe, data safety, …)
    └── resources/             # contacts, tools, access
```

## Editing and previewing locally

```bash
# one-time: create a virtual environment and install MkDocs Material
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# live preview at http://127.0.0.1:8000 (auto-reloads on save)
mkdocs serve

# one-off build into site/ (what CI does)
mkdocs build
```

## Publishing

A push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to the `gh-pages` branch. In the GitHub repo, set **Settings → Pages →
Source** to the `gh-pages` branch.

---

## Status (2026-06-21)

Site scaffold, landing page, and a repository index linking every offboard repo. The
**workflow-tips** section is now filled in as a comprehensive guide (edit-locally → sync → run
on Scribe, plus VSCode/git/data-safety pages); `ccylc_2025` ships a handoff README. Remaining
`TODO`s are marked inline. Known gaps:

- A few `TODO`s in `resources/` (lab-IT contact, custodian email, the canonical host string).
- `csac_2024` description is best-effort (private repo).
