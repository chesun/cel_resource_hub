# CEL Resource Hub

A central, browsable hub for the **California Education Lab (UC Davis)** — one place
that links to the lab's code repositories (especially offboarding deliverables) and
collects reusable workflow guidance for the people who inherit and run them.

The content lives in [`docs/`](docs/) and is published as a [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
site via GitHub Pages.

> **Live site:** _set after the GitHub repo + Pages are created_ —
> `https://chesun.github.io/cel_resource_hub/`

---

## Who this is for

People who **inherit a CEL project** — an incoming researcher, PI, or successor — plus
the lab's data-management custodian and lab IT. The typical reader is comfortable with
**Stata**, may **never have used git or Claude Code**, and runs analysis on the lab's
**Scribe server over SSH**. See [`docs/index.md`](docs/index.md) for the full framing.

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

## Status — first pass (2026-06-21)

This is the initial **skeleton**: site scaffold, a landing page, a repository index
linking every offboard repo, and **outlined stubs** for the workflow-tips and resources
guides. Open items are marked inline with `TODO` admonitions. Known gaps:

- `calpads` — GitHub URL / description still needed (repo is not in `~/github_repos` locally).
- `csac_2024` and `ccylc_2025` — no upstream README; descriptions here are best-effort and need confirmation.
- Workflow-tips and resources pages are outlines to be filled in.
