# Git for newcomers

You do **not** need git to run a CEL pipeline — the code is already on Scribe and runs as
ordinary Stata. You only need this page when you want to **pull a newer version of the code
from GitHub** or **save a change you made**.

## git vs GitHub

People use "git" and "GitHub" interchangeably, but they're two different things — and the
distinction makes everything below clearer:

| | What it is |
|---|---|
| **git** | A *tool* that runs on your own machine (your laptop, or Scribe). It tracks changes to your files and lets you save, undo, and sync them. It needs no internet to work. |
| **GitHub** | A *website* (`github.com`) that stores a shared copy of a repo online, so people can get the latest code and you control who has access. git is how you talk to it. |

In short: **git** is the program you run; **GitHub** is the place the shared copy lives. The
lab's repos all live under the **`chesun`** account — the
[Repositories index](../repositories/index.md) lists them and shows which are public vs private.

## Getting access & a copy from GitHub

Before you can pull or download a repo, you need to be able to **see** it on GitHub:

- **Public repos** (most of the lab's) are visible to anyone — no account needed just to read or
  download them.
- **Private repos** — **`csac_2024`** is the only private one — are invisible until you're granted
  access. Ask the repo owner to add you as a collaborator, then accept the invite (it arrives by
  email, or under `github.com/notifications`). You'll need a free GitHub account for this.

To get a copy of the code, you have two options — and you don't have to learn all of git for the
first one:

1. **Download a ZIP (no git).** On the repo's GitHub page, click the green **Code** button →
   **Download ZIP**, unzip it, and move the files onto Scribe with FileZilla. Simplest if you
   just want to *read* or *run* the code once.
2. **Clone it (git).** `git clone …` gives you a live copy that can `pull` updates later — see
   [First-time setup](#first-time-setup) below.

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

## Pushing: GitHub wants a token, not your password

The first time you `git push` to GitHub over HTTPS it asks for a username and **password** — but
your account password **won't work**. GitHub wants a **personal access token** (PAT) instead. You
make one once:

1. On GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained
   tokens** (the menu is under your profile picture, top-right).
2. **Generate a new token**, give it a name and an expiry, and grant it access to the repo(s) you
   push to — read/write on **Contents** is enough.
3. **Copy the token now** — GitHub shows it only once.
4. When `git push` prompts for a password, **paste the token** as the password.

!!! tip "So you don't paste it every time"
    Let git remember it: on a Mac, `git config --global credential.helper osxkeychain` (stores it
    in the Keychain); elsewhere, `credential.helper store` (saves it to a file). Tokens also
    **expire** — if pushes start failing later, generate a fresh one and paste it again.

## A 60-second glossary

| Term | What it means |
|---|---|
| **git** | The version-control tool you run on your machine or Scribe. |
| **GitHub** | The website (`github.com`) that hosts the shared copy of a repo. |
| **repository (repo)** | One project's folder of files plus its full change history. |
| **clone** | Make a local copy of a GitHub repo (do this once). |
| **commit** | Save a snapshot of your changes *locally*, with a message. |
| **push** | Send your local commits up to GitHub. |
| **pull** | Bring GitHub's latest commits down to your copy. |
| **branch** | A parallel line of work; `main` is the default. |
| **remote** | A named GitHub location; `origin` is the default. |
| **conflict** | Git can't auto-merge two changes to the same lines; it asks you to resolve. |
| **personal access token (PAT)** | A generated secret you paste instead of your password when pushing to GitHub over HTTPS. |

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
| Push asks for a password and your account password fails | GitHub needs a personal access token, not your login password | See [Pushing: GitHub wants a token](#pushing-github-wants-a-token-not-your-password) |

!!! tip "Commit messages"
    Keep them short and in the imperative: "Fix transfer-block display logic", "Add staff
    funding tabulations". One line is plenty for a lab analysis repo.
