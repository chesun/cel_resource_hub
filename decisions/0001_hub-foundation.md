# ADR-0001: Found the hub — name, tooling, hosting, fresh repo

**Date:** 2026-06-21
**Status:** Decided

## Context

The California Education Lab needs a single place that links to its code repositories
(especially offboarding deliverables: `va_consolidated`, `calpads`, `csac`, `csac_2024`,
`csac2025`, `ccylc_2025`) and collects reusable workflow guidance for whoever inherits them.
The audience is a project successor comfortable with Stata, often new to git/Claude Code,
running analysis on the Scribe server.

Work started in a folder named `cel_offboard`, which turned out to be a clone of the
`claude-research-workflow` template (its git remote pointed at that repo and it carried the
research scaffolding: `paper/`, `talks/`, research `docs/`).

## Decision

1. **Name:** `cel_resource_hub` — neutral and durable, not tied to a single offboarding event.
2. **Tooling:** MkDocs + Material theme — purpose-built for a docs/reference site (YAML nav, search, simple GitHub Pages deploy).
3. **Hosting/visibility:** public GitHub Pages site at `chesun/cel_resource_hub`. Linked private repos still gate at their own access.
4. **Repo setup:** a **fresh** repo in a new sibling directory `~/github_repos/cel_resource_hub` with new git history and no research-template scaffolding — built non-destructively, leaving the old `cel_offboard` clone untouched for later deletion.
5. **Infrastructure:** port the *useful subset* of the research workflow — session logging, ADRs, git-safety + plan/output hooks, and a `docs-writer`/`docs-critic` agent pair — and drop everything research-specific (LaTeX/Stata conventions, primary-source/citation hooks, evidence-ledger machinery, paper/talk agents).

## Consequences

- The hub is self-documenting: decisions, plans, session logs, and reviews live in-repo.
- The first-pass content is a skeleton (landing page, repository index, seeded stubs); detail
  pages for `calpads`, `csac_2024`, and `ccylc_2025` carry `TODO`s pending source facts.
- Once the GitHub repo exists, set **Settings → Pages → Source = gh-pages** and fill the
  `site_url` in `mkdocs.yml`.
