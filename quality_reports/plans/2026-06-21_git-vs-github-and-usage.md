# Plan — Add git-vs-GitHub framing + GitHub-usage basics to git-for-newcomers.md

## Context

`git-for-newcomers.md` teaches the git *commands* well (clone/pull/commit/push, glossary,
common-errors table) but has two gaps a newcomer hits:

1. **It never defines git vs GitHub.** The page jumps straight into "two ways to move code"
   without ever saying git = the version-control tool running on your laptop/Scribe, GitHub =
   the website hosting the shared copy and controlling access.
2. **GitHub-the-platform is thin** — finding/accessing the repos isn't explained, and the
   #1 stumbling block (a Personal Access Token to push over HTTPS) is one cryptic line buried in
   the error table.

User's decision: keep it all in **one page** (extend `git-for-newcomers.md`), scoped to what this
lab's workflow needs. **Out of scope** (deliberately): pull requests, issues, Actions, forking,
branching strategy — the repos push straight to `main`, so general-GitHub-tutorial material would
just add noise.

## What changes — only `docs/workflow-tips/git-for-newcomers.md`

1. **New "git vs GitHub" section** (after the intro, before "Two ways to move code"). 2–3
   sentences + a tiny 2-row comparison table (git = local tool, tracks changes; GitHub = website,
   hosts the shared copy + controls access). End with: the lab's repos live under
   `github.com/chesun` → link to the **[Repositories index](../repositories/index.md)** rather
   than re-listing them (the index already lists all 6 with public/private status).

2. **New "Getting access & a copy from GitHub" section.** Covers: where the repos live (link to
   the Repositories index), public vs private (**`csac_2024` is the only private one** — request
   access / accept the invite before you can see it), and grabbing a copy **without git** via the
   web **Code → Download ZIP**. Cross-reference the existing `git clone` in "First-time setup" as
   the git alternative. Frame this as the *one-time* "get a copy" step vs the existing "Two ways
   to move code" which is *ongoing* sync — keep the two from reading as duplicates (the current
   Option A already mentions web download; tighten so it points here).

3. **New "Pushing needs a token, not your password" subsection** (near First-time setup / the
   push command). Expand the cryptic error-table line into a real mini-walkthrough: on push over
   HTTPS, GitHub asks for a **Personal Access Token**, not your account password. How to make one:
   GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens** →
   scope to the repo → generate → copy → paste it when git prompts for a password. Note tokens can
   expire. Keep the existing error-table row but point it at this subsection.

4. **Glossary additions** — add **git**, **GitHub**, **repository (repo)**, and **personal access
   token** rows to the existing "60-second glossary" table.

5. **Refresh the "Status: seeded outline" admonition** — the page is now substantive; soften or
   drop it (the tools.md expansion set the precedent of removing stale "seeded outline" notes).

## Notes / derived facts (no guessing)

- GitHub account `chesun`; `csac_2024` the only private repo — both confirmed from
  `docs/repositories/index.md` and the per-repo pages.
- PAT steps are general GitHub UI (not lab-specific); described robustly, not tied to volatile
  exact button labels.
- Reuse, don't duplicate: link to `../repositories/index.md` for the repo list.

## Verification

1. `source .venv/bin/activate && mkdocs build --strict` — must pass (exit 0); confirms the new
   `../repositories/index.md` cross-link resolves and no nav orphans. Report the result.
2. Eyeball the rendered section order reads logically (concept → get a copy → sync → push token).
3. Update `TODO.md` (add a Done entry) and append to today's session log.
4. Commit; offer to push (push triggers the public Pages deploy).

**Status:** Approved 2026-06-21.
