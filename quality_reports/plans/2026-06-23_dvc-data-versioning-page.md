# Plan — Workflow-tips page: Versioning data with DVC (+ vendored scripts)

## Context

The user built and end-to-end tested a DVC (Data Version Control) infrastructure for the CEL Scribe
server — four self-contained scripts (no Claude Code needed) plus a polished, hub-shaped draft and a deep
learnings doc. She wants a `workflow-tips` page that is **useful and thought-provoking for lab folks** and
**integrates cleanly with the existing data pages**. Nothing in the hub currently covers versioning the
*data* (git deliberately never touches it); DVC fills that gap while keeping every byte on Scribe.

Source material (all read directly, not guessed), in `~/github_repos/claude-research-workflow/`:

- `quality_reports/dvc-guide-draft.md` — a near-final single-page guide already written in hub MkDocs voice
  (admonitions, Mermaid, cross-links). Has a "porting note" TODO at the bottom.
- `quality_reports/dvc-setup-learnings.md` — the why: the BDD pilot, the gitignore root-vs-nested mechanics
  (§3), the Scribe architecture (§7), the two-audience framing (§8), the dangling-pointer lesson (§5).
- `templates/dvc/` — the 4 tested scripts + `README.md`: `setup-dvc-server.sh`, `dvc-egress-guard.sh`,
  `dvc-sync-check.sh`, `githooks-pre-push` (validated 29/29). This repo is a **fork of a collaborator's
  repo** (`hugosantanna/clo-author`), so the scripts have **no public home** — hence the hosting decision.

### Decisions locked

- **Script hosting = vendor into the hub repo** (user choice). Scripts go in a top-level `dvc-scripts/`,
  which is **outside `docs/`** so MkDocs excludes it from the built site (confirmed: `docs_dir` defaults to
  `docs/`). The page links to them via GitHub blob/raw URLs on `chesun/cel_resource_hub`.
- **git is a prerequisite** (decided in the source work): the page presents DVC as a layer on top of git,
  cross-linking `git-for-newcomers.md` / `local-server-sync.md`. No `--no-scm` path.
- **Voice:** personal experiment / optional power tool — "I built and tested this," not lab policy. The one
  firm rule (DVC remote must stay on Scribe) IS the lab data-safety standard — stated firmly. Adoption is
  "the lab's call." **Do not name the lab data manager** ("Kramer" in the internal learnings) on the public
  page — genericize to "whoever stewards the shared datastore."

## Files to change

### 1. Vendor the scripts — `dvc-scripts/` (new top-level dir, 5 files)

Copy verbatim (do **not** edit — they're tested 29/29), preserving the executable bit:
`setup-dvc-server.sh`, `dvc-egress-guard.sh`, `dvc-sync-check.sh`, `githooks-pre-push`, `README.md` from
`claude-research-workflow/templates/dvc/`. `setup-dvc-server.sh` resolves its own dir
(`here=$(dirname "$0")`), so the 4 siblings must stay together — copying the whole dir satisfies that.
Add one line to `dvc-scripts/README.md` pointing back to the hub page (optional, low-risk).

### 2. New page — `docs/workflow-tips/versioning-data-with-dvc.md`

Backbone = the draft (already excellent); port it, strip the porting note, and **enrich for the two stated
goals**. Outline:

1. **Hook** (from draft): *"which exact dataset produced the March-draft numbers?"* → DVC answers it.
   Add one line tying data-versioning to **reproducibility** (cross-link `reproducible-pipelines.md`).
2. **Status** admonition — optional power tool; when it's worth it vs. when plain gitignore wins.
3. **git-prerequisite** warning — cross-link `git-for-newcomers.md` + `local-server-sync.md`.
4. **The idea in one picture** — keep the Mermaid pointer/bytes split + two-push rhythm (Mermaid is
   configured — `mkdocs.yml:53`).
5. **The one rule: the DVC remote must stay on Scribe** — keep the `danger` admonition; this is the
   integration linchpin. Cross-link `local-server-sync.md#protecting-data-on-the-server-the-pre-push-hook`.
6. **Folder layout** — track *subdirectories* of `data/`, not the whole folder. **Enrich (thought-
   provoking + ties to an existing page):** a short `??? note` on *why* — the root-vs-nested `.gitignore`
   "git won't descend into a wholesale-ignored directory" rule (learnings §3, condensed), cross-linking
   `gitignore-setup.md`.
7. **One-time setup** — rewrite the draft's "scripts ship with this guide" for vendoring: a short block to
   fetch the four scripts from the in-repo `dvc-scripts/` (raw URLs) onto Scribe, then
   `REMOTE_PATH=/home/research/ca_ed_lab/data/<proj>/dvc-remote ./dvc-scripts/setup-dvc-server.sh`. **Derive
   the exact invocation by reading `setup-dvc-server.sh` at execution** (don't guess paths).
8. **Daily workflow** (two-push rhythm) · **Going back to an old version** · **Cache growth / `dvc gc`**
   (note the data-steward/retention-policy angle) · **Read-only gotcha** — all kept from the draft.
9. **How the guards protect you** — the two-channel story (git pre-push hook + the DVC-channel egress
   guard); integrate with `data-safety.md`.
10. **When NOT to bother** (keep — honest).
11. **Enrich — "Two scales to use this at"** (learnings §8, genericized): your own project folder (concrete,
    the architecture here) vs. the whole shared datastore (awareness-level, "here's the tool, the lab's
    call"). This is the thought-provoking invitation for lab readers. Short.

### 3. Wire into nav + index

- `mkdocs.yml` — add `- Versioning data with DVC: workflow-tips/versioning-data-with-dvc.md` under the
  Workflow Tips nav (in the data cluster, after `gitignore-setup`).
- `docs/workflow-tips/index.md` — add a bullet under **Keeping data safe** (after gitignore-setup).

### 4. Cross-links FROM existing pages (discoverability — keep to the natural few, not all)

- `reproducible-pipelines.md` — one line: reproducibility includes the *data*; to version it, see the DVC page.
- `data-safety.md` — one line near the egress/guard content: DVC adds a second data channel; see the DVC page.
  (Skip gitignore-setup/local-server-sync inbound links unless you want them — the new page links *out* to
  both already.)

### 5. ADR — `decisions/0004_dvc-data-versioning-guide.md`

Per `decision-log.md`, "what gets included in the hub" + the structural precedent of **hosting runnable
scripts in a docs repo** is ADR-worthy. Short: Context (data-versioning gap; tested infra), Decision (add
the guide; vendor scripts in `dvc-scripts/` excluded from the build; git prerequisite; remote-on-Scribe is
non-negotiable), Consequences. Update `decisions/README.md` index.

## Verification

1. `source .venv/bin/activate && mkdocs build --strict` → exit 0 (nav orphan + internal links + the
   `#…pre-push-hook` / `gitignore-setup` / `reproducible-pipelines` anchors). Filter the Material 2.0 banner.
2. Confirm the Mermaid diagram renders: grep built `site/workflow-tips/versioning-data-with-dvc/index.html`
   for a `class="mermaid"` block.
3. Confirm `dvc-scripts/` is **not** in the built site (`! test -e site/dvc-scripts`) and that the 4 scripts
   kept their exec bit (`git ls-files -s dvc-scripts/ | grep 100755`).
4. Spot-check the raw GitHub URLs are well-formed for `chesun/cel_resource_hub/main/dvc-scripts/...`.
5. Persist this plan to `quality_reports/plans/`, update `TODO.md` + today's session log; write ADR-0004.
6. Commit; push (triggers the Pages deploy).

## Open choices (defaulted unless you say otherwise)

- **Title / nav label:** "Versioning data with DVC" (default) vs "Data version control (DVC)".
- **Inbound cross-links:** reproducible-pipelines + data-safety (default) vs also gitignore-setup / local-server-sync.
- **Depth of the gitignore root-vs-nested aside:** a compact `??? note` (default) vs a fuller inline subsection.
