# gitignore setup for data security

A `.gitignore` file tells git which files to **never track**. In a CEL repo it is the first
line of defense that keeps confidential student data on Scribe and out of GitHub. This page is
the concrete setup: what to put in it, how to confirm it's working, and what to do if data
slips through.

!!! danger "Why this matters"
    CEL repos handle restricted student-level data (CALPADS, CSAC, CalSCHLS, NSC, conference
    surveys with respondent emails, …). If a data file is committed and pushed, it is on GitHub
    — and removing it from git history afterward is hard and never fully reliable. Prevention is
    the only safe option. See [Data safety](data-safety.md) for the policy this enforces.

## A starter `.gitignore` for a CEL Stata repo

Copy this into a file named `.gitignore` at the repo root. It blocks data, logs, and outputs
that can echo data, plus the usual OS/editor cruft. (Adjust folder names to your repo — some
use `dta/`, some use `data/`.)

```gitignore
# ─────────────────────────────────────────────────────────────
# DATA — restricted. Lives on Scribe only, NEVER in this repo.
# ─────────────────────────────────────────────────────────────
data/
dta/
*.dta
*.csv

# Stata logs and outputs (regenerable; can echo data)
log/
output/
out/
*.smcl
*.log

# OS / editor cruft
.DS_Store
*~
```

!!! tip "Keeping an empty folder in the repo"
    git won't track an empty directory. If you want `data/` to *exist* on a fresh clone (so the
    scripts have somewhere to write), add a placeholder and force-add it:

    ```bash
    touch data/.gitkeep
    git add -f data/.gitkeep
    ```

    The `.gitkeep` stub is tracked; the real data files in the folder stay ignored.

## Confirm it's actually working

Don't assume — check. From the repo root:

```bash
# 1. Is anything data-like staged or untracked-but-visible?
git status

# 2. What does git actually track? Data files must NOT appear here.
git ls-files | grep -iE '\.(dta|csv|smcl|log)$'   # expect: no output
git ls-files data/ dta/                            # expect: only .gitkeep, if any
```

If `git ls-files` lists a data file, it is **tracked** and will be pushed — fix it before you
commit again (next section).

## If data was committed by accident

!!! warning "Stop before pushing"
    If you have committed a data file but **not yet pushed**, you can still fix it locally.
    If you have **already pushed**, the data is on GitHub — treat it as exposed (tell the data
    custodian; the file may need to be considered compromised) and get help before attempting a
    history rewrite.

**Not yet pushed — remove it from tracking, keep the file on disk:**

```bash
git rm --cached path/to/leaked.dta     # untrack it (the file stays on disk)
echo "path/to/leaked.dta" >> .gitignore  # make sure it's ignored going forward
git commit -m "Stop tracking restricted data file"
```

This stops *future* commits from carrying it — but the file is still in the **earlier commit's
history**. For a file that never reached GitHub and was just added in your latest local commit,
amending or resetting that commit removes it. Rewriting deeper history (`git filter-repo`,
`filter-branch`) is destructive and easy to get wrong — **ask before doing it**.

!!! note "The structural fix"
    The reason the lab prefers [git over manual transfer](local-server-sync.md) for sync is
    exactly this: `git pull` only ever brings code down, and a pre-push hook can refuse a push
    that carries a data file. A correct `.gitignore` plus git's pull-only-code behavior makes
    the accident much harder to commit in the first place.
</content>
