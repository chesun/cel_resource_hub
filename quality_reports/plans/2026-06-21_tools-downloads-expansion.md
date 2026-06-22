# Plan — Expand `docs/resources/tools.md` into a real downloads + setup hub

## Context

`tools.md` is the hub's "what you need installed and how to get access" page. Today it lists 6
tools in a table but only 3 have download links (VPN, XQuartz, Xming). VSCode, the SSH/PuTTY
clients, the file-transfer clients (FileZilla/Cyberduck), git, and Claude Code are all
documented *somewhere* in `workflow-tips/`, but a newcomer landing on "Tools & access" can't
download them from here. This is the backlog "Downloads & setup page" idea, scoped (per the
user's choice) into expanding `tools.md` rather than building a new page.

**Goal:** make `tools.md` the single "what to download, where, and what-for" page — every tool
has an official download link and a one-line cross-link to its deeper how-to guide. The deep
setup steps stay in `workflow-tips/`; `tools.md` is the index that points at them.

**Non-goal:** duplicating the step-by-step setup (that lives in `working-on-scribe.md`,
`editing-stata-vscode.md`, `local-server-sync.md`, `git-for-newcomers.md`, `claude-code-intro.md`).

## What changes

**Only `docs/resources/tools.md`** (one file; plus a one-line touch to `resources/index.md`).

1. **Reframe the intro + drop the "seeded outline" status.** After this it's a real page, not an
   outline. Keep it short.

2. **Restructure the software table into two groups for clarity:**
   - **Essentials (everyone)** — DSS VPN, an SSH client, a file-transfer client, VSCode (the
     editor), Stata (runs on Scribe). git listed as recommended-not-required.
   - **Situational** — X server + PuTTY (only for the Stata GUI over X11 / only on Windows),
     Claude Code (optional; internal link to `claude-code-intro.md`, not an external URL).

   Each row gets: **download link**, one-line *what for*, and a *→ how-to* cross-link to the
   relevant workflow-tips page.

3. **Download links** (all spot-checked this session; FileZilla 403 is a WAF bot-block of `curl`,
   the site is the canonical official one):
   - VSCode `https://code.visualstudio.com/` (already used in `editing-stata-vscode.md`)
   - PuTTY `https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html` (already in `working-on-scribe.md`)
   - FileZilla `https://filezilla-project.org/` · Cyberduck `https://cyberduck.io/`
   - git `https://git-scm.com/downloads`
   - Reuse existing: VPN, XQuartz, Xming links verbatim from current `tools.md`.

4. **Keep the access checklist** (VPN → Scribe → project folder → GitHub → Stata packages) — it's
   good. Lightly align wording with the regrouped table.

5. **Keep the one real `TODO`** — "Stata licensing details on Scribe (how access is granted)" —
   it can't be derived; leave it as a visible placeholder (per `no-assumptions.md`).

6. **`resources/index.md`** — update the one-line `tools.md` blurb so it mentions the editor +
   downloads, since the page is now broader. (Minor.)

## Notes / decisions baked in

- **Page keeps its title `Tools & access` and filename `tools.md`** — no rename, no nav churn,
  no link breakage. (The backlog "Downloads & setup" name folds into this page's content.)
- **Claude Code → internal link** to `claude-code-intro.md`, not an external install URL — avoids
  guessing the canonical external URL; that page already exists and frames it as optional.
- **Host string needs no fix** — audit confirmed every page already uses `Scribe.ssds.ucdavis.edu`
  consistently; the backlog "canonical host string" item is already resolved.

## Verification

1. `source .venv/bin/activate && mkdocs build --strict` — must pass (catches broken internal
   cross-links / nav orphans). Report the result.
2. The external download URLs were already spot-checked (7×200; FileZilla WAF-403 confirmed
   canonical). No new internal pages, so nav is unchanged.
3. Update `TODO.md` (move the tools.md item to Done; the Stata-licensing TODO remains tracked).
4. Append to the session log; commit.

**Status:** Approved 2026-06-21.
