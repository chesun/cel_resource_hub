# Plan — Revise local-server-sync.md: GitHub-as-middleman diagram, va_consolidated context, the data-protection hook

## Context

The user reviewed `local-server-sync.md` and wants Method B (git) revised to reflect how it
actually works and why:

1. **Method B routes through GitHub as a middleman.** The page currently implies a direct
   laptop⇄Scribe git sync; in reality the laptop and Scribe never sync directly — both push/pull
   to **GitHub (the remote)**. A visual diagram would make this clear.
2. **Method B is so far implemented only for `va_consolidated`** — that project's code
   consolidation is complex enough that version history + an audit trail pay off, and it's
   worked really well. The lab default for simpler/lower-velocity projects stays FileZilla.
3. **The data-protection git hook** (pre-push) needs to be documented. It lives **on the Scribe
   clone** — because the restricted data is on Scribe and the egress risk is pushing it off the
   server to the public GitHub repo.

Sources (all derived, not guessed): `va_consolidated/.githooks/pre-push`, the handoff doc
`va_consolidated/quality_reports/handoff/2026-05-26_scribe-git-stata-workflow-learnings.md`
(§2 three-layer isolation, §5 hook file-vs-config, §10 canonical setup), and ADR-0022 context.

## What changes

### A. `mkdocs.yml` — enable Mermaid diagrams (one config change)

Convert the bare `- pymdownx.superfences` line to the configured form with a mermaid custom
fence (Material renders it natively, same `!!python/name:` style already used by `pymdownx.emoji`):

```yaml
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
```

### B. `docs/workflow-tips/local-server-sync.md` — the substantive edits

1. **Add a Mermaid diagram under "Method B — git"** showing GitHub as the middleman:
   laptop —`git push`→ GitHub —`git pull`→ Scribe, and Scribe —`git push (logs)`→ GitHub
   —`git pull`→ laptop. Caption: in Method B you never sync laptop↔Scribe directly; GitHub is
   the hub both ends talk to (contrast Method A's direct FileZilla transfer).

2. **Add a "Why I use this (and where)" note** — Method B is set up so far only for
   `va_consolidated`, because the consolidation is complex enough that history + a committed-log
   audit trail are worth the git overhead, and it's worked really well there. For simpler,
   low-velocity projects FileZilla (Method A) is still the sensible default. (Personal-project
   voice, consistent with ADR-0003.)

3. **Add a "Protecting data on the server: the pre-push hook" subsection.** Cover:
   - **Where it runs and why:** the data lives on Scribe, so the leak risk is a `git push`
     *from Scribe* carrying a `data/`/`estimates/` file to the public repo. The hook is armed on
     the **Scribe clone** to block exactly that.
   - **What it does:** scans the push's commit range; aborts the push if any non-`.gitkeep` file
     under `data/` or `estimates/` is present. It's the independent second guard behind
     `.gitignore` (gitignore stops `git add`; the hook still catches a `git add -f` bypass) —
     two intentional overrides would be needed to leak.
   - **Arm it (per machine):** `git config core.hooksPath .githooks` (+ `chmod +x .githooks/pre-push`).
   - **Trip-test it** (a guard you haven't tested isn't a guard): the `data/test_leak.dta` →
     `git add -f` → `git push` → expect `refusing to push…` → `git reset --hard HEAD~1` recipe.
   - **Override (audited):** `git push --no-verify`.
   - Cross-link to [gitignore setup](gitignore-setup.md) and [Data safety](data-safety.md) for
     the gitignore layer (don't re-explain it here).

4. **Tighten the existing Method B bullet + comparison-table "Data-leak protection" row** to
   point at the new subsection instead of the vague "a pre-push guard can block data files."

### C. Optional one-liners for consistency

Update the vague "some repos add a push guard" line in `data-safety.md` (and the `.gitignore`
"structural fix" note in `gitignore-setup.md`) to point at the new hook subsection. Minor; keeps
the three pages consistent.

## Scope guard

Keep it digestible for an inheriting researcher: feature the **pre-push hook** and the
**gitignore-as-layer-1** pairing. Do **not** import the full three-layer architecture
(sparse-checkout internals, DVC/LFS, the `--no-checkout` pitfalls) — that's `va_consolidated`
operator depth, out of scope for the hub.

## Verification

1. `source .venv/bin/activate && mkdocs build --strict` → exit 0, no warnings.
2. Confirm the diagram actually renders: grep the built HTML for a `class="mermaid"` block in
   `site/workflow-tips/local-server-sync/index.html` and that Material's mermaid loader is wired
   in (the diagram is JS-rendered; strict build won't catch a broken fence, so check the markup).
3. Update `TODO.md` (Done entry) + append to today's session log.
4. Commit; offer to push (push triggers the public Pages deploy).
