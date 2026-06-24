# Versioning data with DVC

Git versions your **code**; it deliberately never touches the restricted **data** (see
[Data safety](data-safety.md)). But sometimes you want the data versioned too — to be able to ask
*"which exact dataset produced the numbers in the March draft?"* and get it back. **DVC**
(Data Version Control) adds that, while keeping every byte of restricted data on Scribe. It's the
data half of [reproducibility](reproducible-pipelines.md): a saved `main.do` reproduces the *steps*,
a versioned dataset reproduces the *inputs* those steps ran on.

!!! info "Status — an optional power tool"
    This is a personal experiment, not a lab requirement. DVC is worth it for a project with
    **evolving data you'll want to revisit** (re-runs, new waves, cleaning fixes). For a stable
    one-shot dataset, the normal gitignore-it-and-leave-it approach is simpler — skip this page.
    Drawn from a pilot on a real project and an end-to-end test of the Scribe setup.

!!! warning "git is a prerequisite"
    DVC's whole value comes from **git tracking a small pointer over time** (below). There's no
    point using DVC without git. If git on Scribe is new to you, read
    [Version control using git](git-for-newcomers.md) and [Local ↔ server sync](local-server-sync.md)
    first — this page assumes you're using git (Method B).

## The idea in one picture

DVC splits one dataset into two tracked things:

- **A pointer** — `data/raw.dvc`, about five lines (a content hash + size). Tiny, text,
  **git-tracked**, safe on public GitHub (it's a hash, not data).
- **The bytes** — stored in a content-addressed **cache**, and copied to a **remote** (a plain
  directory on Scribe). The real data folder stays **gitignored** — DVC does that for you.

So every data change is a **two-push rhythm** — git carries the pointer, DVC carries the bytes:

```mermaid
flowchart LR
    W["data/raw/ (the bytes)<br/>gitignored, on Scribe"]
    P["data/raw.dvc<br/>tiny pointer"]
    G[("GitHub<br/>public — pointer only")]
    R[("DVC remote<br/>a dir on Scribe — the bytes")]
    W -- "dvc add" --> P
    P -- "git push" --> G
    W -- "dvc push" --> R
```

Because git versions the pointer at every commit, `git log data/raw.dvc` **is** your data's
version history — git does the small text, DVC stores the big bytes for each version.

!!! danger "The one rule that matters: the DVC remote must stay on Scribe"
    The lab's safety model — *code on GitHub, restricted data only on Scribe* — is enforced on the
    **git** channel ([the pre-push hook](local-server-sync.md#protecting-data-on-the-server-the-pre-push-hook)).
    `dvc push` is a **second channel** that hook can't see. If a DVC remote ever pointed off-Scribe
    (S3, Google Drive, a laptop), `dvc push` would send restricted student data off the server — a
    FERPA-class leak. **Always keep the DVC remote a directory under `/home/research/ca_ed_lab/`.**
    The setup below configures and *enforces* this.

## Folder layout

Track the **subdirectories** of `data/`, not the whole folder — so `data/` itself stays in git
(for the pointers and docs) while the actual data is ignored:

```
data/
├── raw/            ← dvc add data/raw   → bytes go to DVC; "/raw" added to data/.gitignore
├── raw.dvc         ← pointer (git-tracked, safe to push)
├── cleaned/        ← dvc add data/cleaned
├── cleaned.dvc
├── MANIFEST.md     ← what's here (git-tracked)
├── PROVENANCE.md   ← where it came from; IRB / access (git-tracked)
└── CHANGELOG.md    ← why versions changed (git-tracked)
```

The pointers and the `MANIFEST/PROVENANCE/CHANGELOG` docs are safe to commit; the data isn't. The
[pre-push hook](#how-the-guards-protect-you) knows that distinction.

??? note "Why subdirectories, not the whole `data/` folder? (a `.gitignore` subtlety)"
    Git **won't descend into a directory it ignores wholesale.** If the root `.gitignore` excludes
    the *directory itself* (`/data_local`), git never looks inside — so a nested `data_local/.gitignore`
    is dead, and you can't git-track a `MANIFEST.md` in there even with a negation. Excluding the
    *contents* (`/data/*`, or per-subdir `/raw`) lets git descend and read a nested `data/.gitignore`.

    DVC writes the ignore rule into the `.gitignore` **of the directory containing what you tracked**:

    - `dvc add data/raw` → adds `/raw` to a nested **`data/.gitignore`**, so `data/` stays tracked and
      the pointers + docs can live right next to the data. ✅
    - `dvc add data` (the whole folder) → adds `/data` to the **root** `.gitignore`, wholesale-ignoring
      `data/` — now nothing git-tracked can live inside it. ✋

    So tracking subdirectories isn't a style choice; it's what keeps the data docs next to the data.
    See [gitignore setup](gitignore-setup.md) for the base rules this builds on.

## One-time setup

The four scripts that make this safe live in this repo under
[`dvc-scripts/`](https://github.com/chesun/cel_resource_hub/tree/main/dvc-scripts) (`setup-dvc-server.sh`,
`dvc-egress-guard.sh`, `dvc-sync-check.sh`, and the `githooks-pre-push` hook) — plain bash + git + dvc,
no Claude Code needed. Grab them onto Scribe and run the setup from inside your project folder (with git
already set up):

```bash
# in your project folder on Scribe:
mkdir -p dvc-scripts && cd dvc-scripts
base=https://raw.githubusercontent.com/chesun/cel_resource_hub/main/dvc-scripts
for f in setup-dvc-server.sh dvc-egress-guard.sh dvc-sync-check.sh githooks-pre-push; do
  curl -fsSLO "$base/$f"
done
chmod +x *.sh githooks-pre-push
cd ..

# run setup (idempotent), pointing at an on-Scribe remote dir under the lab root:
REMOTE_PATH=/home/research/ca_ed_lab/data/<project>/dvc-remote ./dvc-scripts/setup-dvc-server.sh
```

`setup-dvc-server.sh` does it all: checks you're in a git repo, runs `dvc init`, configures a
**group-shared, hardlinked cache** (so members on the shared project folder don't each duplicate the
data), adds the **on-Scribe remote**, verifies it isn't off-server, and installs the **DVC-aware
`pre-push` hook + guards** into `.githooks/`. It refuses a `REMOTE_PATH` that isn't under the lab root,
and it never clobbers an existing `pre-push` hook — if the lab's data-egress hook is already there, it
prints the two lines to add by hand instead.

## Daily workflow

```bash
# after the data changes (a new wave, a cleaning fix, ...)
dvc add data/raw                       # re-hash → updates data/raw.dvc + caches the bytes
dvc push                               # bytes → the on-Scribe remote   ← don't forget this half

git add data/raw.dvc data/raw/.gitignore
git commit -m "data: refreshed raw extract"
git push                               # pointer → GitHub

# before you log off
./.githooks/dvc-sync-check.sh          # "in sync" = safe; warns if bytes weren't pushed
```

!!! tip "The forgotten `dvc push` is the classic mistake"
    `git push` and `dvc push` are **two separate operations**. If you push the pointer but forget
    the bytes, anyone who clones gets a pointer to data that exists only on your machine — a
    *dangling pointer*. `dvc-sync-check.sh` (and the pre-push hook) catch this; `dvc status -c`
    is the one-line manual check.

## Going back to an old version

```bash
git checkout <old-commit> -- data/raw.dvc   # restore the old pointer
dvc checkout data/raw.dvc                    # materialize the data that pointer names
# ... when done, return to the latest:
git checkout HEAD -- data/raw.dvc && dvc checkout data/raw.dvc
```

!!! tip "Tag the versions you must never lose"
    Tag the commit behind a submitted paper (`git tag jmp-submission`). Then the cache cleanup
    below can never drop that data version.

## Keeping the cache from snowballing

The cache keeps every version's bytes, so it grows — but with **churn, not size × versions**:
identical files across versions are stored once, so editing 2 of 200 files adds ~2 files, not a
whole new copy. When it needs trimming:

```bash
dvc gc -A          # prune blobs not referenced by ANY git commit/branch/tag (conservative)
dvc gc -A -c       # also prune the on-Scribe remote
```

!!! warning "`dvc gc` deletes"
    Anything not referenced by the scope you choose is gone. `-A` (all commits) keeps every version
    your git history points to — pair it with the tagging habit above. On a shared project this is
    a natural data-steward task; "keep everything forever" vs "gc to tagged releases" is a policy to
    decide per project, not drift into.

## A gotcha: tracked files are read-only

With the hardlinked cache, DVC checks data files out **read-only** (to protect the shared cache).
Stata scripts that *regenerate* outputs to fresh files are fine. But to edit a tracked file **in
place** you must unlock it first:

```bash
dvc unprotect data/raw        # make it writable
# ... edit / overwrite ...
dvc add data/raw              # capture the new version
```

## How the guards protect you

Setup installs one `pre-push` hook that does two jobs (it extends the lab's existing data-egress
hook, so install it where you don't already have one — otherwise add its two guard calls to yours):

1. **Blocks restricted data on the git channel** — refuses a push carrying a real file under
   `data/` or `estimates/`, *with a carve-out* so `*.dvc` pointers, `data/.gitignore`, and the
   `MANIFEST/PROVENANCE/CHANGELOG` docs go through. (Faithful to the hook in
   [Data safety](data-safety.md) / [Local ↔ server sync](local-server-sync.md).)
2. **Blocks the DVC channel** — `dvc-egress-guard.sh` refuses the push if any DVC remote points
   off-Scribe, and `dvc-sync-check.sh` warns about unpushed bytes.

To override in a genuine emergency (audited via shell history): `git push --no-verify`.

## Two scales to use this at

DVC isn't all-or-nothing — there are two quite different ways a lab could use it, and they're worth
thinking about separately:

- **Your own project folder (concrete, what this page sets up).** Per-project DVC: the remote is a
  directory under your project's access-controlled space on Scribe, the pointers ride along on the
  public GitHub repo, and the version history is just `git log` on the `.dvc` files. This slots onto
  the git-on-Scribe workflow ([Method B](local-server-sync.md)) with no new infrastructure.
- **The whole shared datastore (awareness-level, someone else's call).** Whoever stewards the lab's
  canonical `data/` could in principle put the entire store under DVC — versioned, deduplicated,
  integrity-checked, with one git repo of pointers as the index. That's a bigger commitment (it
  changes how everyone reads those files) and a genuine policy decision, not something to drift into.
  Flagging it as a possibility, not a recommendation.

## When NOT to bother

- The dataset is stable and you'll never revisit old versions → plain gitignore is simpler.
- You don't use git → DVC has nothing to hang its versioning on; start with
  [git](git-for-newcomers.md) first.
- You only need an off-machine backup, not history → that's a job for the lab's normal backup, not DVC.
