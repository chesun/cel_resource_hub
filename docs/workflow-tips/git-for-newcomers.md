# Git for newcomers

You do **not** need git to run a CEL pipeline — the code is already on Scribe and runs as
ordinary Stata. You only need this page when you want to **pull a newer version of the code
from GitHub** or **save a change you made**.

!!! info "Status: seeded outline"
    The essentials below are distilled from the `va_consolidated` handoff. Expand with
    screenshots and lab-specific details as needed.

!!! tip "Choosing a sync method"
    There are two ways to move code between your laptop and Scribe — manual file transfer and
    git. [Local ↔ server sync](local-server-sync.md) compares them side by side with the
    benefits and costs of each. This page is the git detail: the commands, the common errors,
    and a glossary.

## Two ways to move code

### Option A — File transfer (no git)

Download the updated files from the GitHub web page and drag them into the Scribe project
folder with **FileZilla** (or any transfer tool). To save a change, edit on Scribe and send
the file back the same way. Nothing else to learn.

### Option B — git (what I use)

```bash
cd /path/to/the/project/on/scribe

# get the latest code from GitHub
git pull --rebase origin main

# save a change you made, then send it to GitHub
git add do/path/to/the_file_you_changed.do
git commit -m "short description of what you changed"
git push origin main
```

!!! tip "Why git, briefly"
    Because data folders aren't tracked, `git pull` brings down **only code, never data** —
    so it can't make the common mistake of copying restricted data onto a local machine.

## First-time setup

Once per machine:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global pull.rebase true     # keep history linear on pull
```

To get a copy of a repo the first time, **clone** it:

```bash
git clone https://github.com/chesun/<repo>.git
```

## A 60-second glossary

| Term | What it means |
|---|---|
| **clone** | Make a local copy of a GitHub repo (do this once). |
| **commit** | Save a snapshot of your changes *locally*, with a message. |
| **push** | Send your local commits up to GitHub. |
| **pull** | Bring GitHub's latest commits down to your copy. |
| **branch** | A parallel line of work; `main` is the default. |
| **remote** | A named GitHub location; `origin` is the default. |
| **conflict** | Git can't auto-merge two changes to the same lines; it asks you to resolve. |

## If something looks wrong

If `git pull` ever reports a **conflict** or any state you don't recognize, **stop and ask**
rather than improvising — a wrong move there can be hard to undo.

### Common errors and fixes

These recur on Scribe (adapted from the `va_consolidated` Scribe-setup notes):

| Error | Cause | Fix |
|---|---|---|
| `fatal: Need to specify how to reconcile divergent branches` | You committed on Scribe and on your laptop before pulling | `git config pull.rebase true` (once), then `git pull` |
| `error: Your local changes ... would be overwritten by merge` | Modified tracked files in the working tree | `git stash push -u`, `git pull`, `git stash pop` |
| `error: The following untracked working tree files would be overwritten` | An untracked file sits where the pull wants to write | `mv <file> <file>.backup`, `git pull`, then decide what to keep |
| `refusing to push — restricted data files in the commit range` | A pre-push guard caught a `data/`/`dta/` file in a commit | Follow the printed remediation (`git rm --cached …`); see [gitignore setup](gitignore-setup.md) |
| Push asks for a password and your account password fails | GitHub needs a personal access token, not your login password | Create a fine-grained token on GitHub and paste it as the password |

!!! tip "Commit messages"
    Keep them short and in the imperative: "Fix transfer-block display logic", "Add staff
    funding tabulations". One line is plenty for a lab analysis repo.
