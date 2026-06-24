# ADR-0004: Add a DVC data-versioning guide and vendor its server scripts in-repo

**Date:** 2026-06-23
**Status:** Decided

## Context

Git in this workflow deliberately never tracks the restricted data — only code. That leaves a real
gap: a project with *evolving* data (new survey waves, cleaning fixes, re-runs) has no way to answer
"which exact dataset produced these numbers?" and get that version back. I built and end-to-end tested
(29/29 cases) a DVC (Data Version Control) setup for Scribe that fills the gap **without breaking the
lab's data-safety model** — every byte stays on Scribe, pointers (hashes) ride the public GitHub repo.

It depends on four self-contained scripts (plain bash + git + dvc, no Claude Code): an idempotent
per-project `setup-dvc-server.sh`, a DVC-channel egress guard, a dangling-pointer sync check, and a
DVC-aware `pre-push` hook. Those scripts were developed in a fork of a collaborator's repo, so they had
no public home the hub could point to. Two questions had to be settled: (1) does a DVC guide belong in
the hub, and (2) where do the scripts live.

## Decision

1. **Add a single workflow-tips page** — `docs/workflow-tips/versioning-data-with-dvc.md` — as a sibling
   to `data-safety.md` / `gitignore-setup.md`, in the personal-project voice (ADR-0003): an *optional
   power tool*, not lab policy. Adoption is the lab's call.
2. **Vendor the four scripts + their README into the hub repo** at top-level `dvc-scripts/`, which sits
   outside `docs/` and is therefore excluded from the built MkDocs site. The page links to them via raw
   GitHub URLs so they're fetchable onto Scribe. This is the hub's first precedent of hosting *runnable
   scripts*, not just prose — accepted deliberately as the simplest single-source home.
3. **git is a prerequisite.** The guide presents DVC as a layer on top of git (no `--no-scm` path),
   cross-linking the git and sync pages.
4. **The on-Scribe remote rule is non-negotiable and stated firmly** (not as personal preference): a DVC
   remote must be a directory under `/home/research/ca_ed_lab/`, because `dvc push` is a second data
   channel the git pre-push hook can't see. The vendored egress guard enforces it.

## Consequences

- The hub now answers data-versioning, integrated with the existing data-safety pages (two-way
  cross-links to `data-safety.md`, `reproducible-pipelines.md`, `gitignore-setup.md`, the pre-push hook).
- The repo carries executable shell scripts under `dvc-scripts/`. They must stay outside `docs/` (or the
  build would try to serve them) and are maintained as a vendored copy — if the upstream tested scripts
  change, re-vendor them.
- DVC adoption remains opt-in per project; nothing here obliges anyone to use it. If the lab ever
  standardizes data versioning, that's a separate, explicit decision.
