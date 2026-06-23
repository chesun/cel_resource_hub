# Version control using git

**You don't need git to run a CEL pipeline** — the code is already on Scribe and runs as ordinary
Stata. If you just want to run the analysis, you can skip this page.

So what *is* it? **git** is a **version-control** tool — it tracks every change you make to your code
so you can see what changed, undo to any earlier point, and stop hoarding `_FINAL_v2` files. It's how
*I* manage my code (my own setup — not something the lab uses or requires; I'm the only one who
versions these repos this way). **GitHub** is an *optional* add-on: a website where you can also back
up and share that history online. The next section pins down the two — and you can get real value
from git with **no GitHub at all**.

## git vs GitHub

People use "git" and "GitHub" interchangeably, but they're two different things — and the
distinction makes everything below clearer:

| | What it is |
|---|---|
| **git** | A *tool* that runs on your own machine (your laptop, or Scribe). It tracks changes to your files and lets you save, undo, and sync them. It needs no internet to work. |
| **GitHub** | A *website* (`github.com`) that stores a shared copy of a repo online, so people can get the latest code and you control who has access. git is how you talk to it. |

In short: **git** is the program you run — and it works fine with nothing but your own machine;
**GitHub** is an optional online place the shared copy can *also* live. My CEL repos live under my
own **`chesun`** GitHub account — the [Repositories index](../repositories/index.md) lists the ones
I'm handing off.

## Why bother with git at all?

If you've ever grown a folder like this —

```
clean.do
clean_v2.do
clean_v2_fixed.do
clean_FINAL.do
clean_FINAL_actually_final.do
clean_FINAL_use_this_one.do
```

— then you already get the problem git solves. git keeps **one** file (`clean.do`) and quietly
remembers every version of it behind the scenes, each with a short note on what changed and when. You
get the whole history — and the ability to jump back to any point — without a single `_FINAL` in sight.

What that buys you:

- **A folder that stays sane** — one `clean.do`, not twelve near-identical copies you're scared to delete.
- **"What did I change last week?" has an answer** — every change is logged with a message and a date.
- **Real undo** — recover any earlier version exactly, instead of praying that `clean_v2_fixed` was the good one.
- **One source of truth** — whoever inherits the project pulls the current code, not "wait, which `.zip` did I email you?"

None of this is required to run the analysis — but it's why I put up with the learning curve.

## Two ways to use git: on its own, or with GitHub

git is useful **by itself**, and more useful with GitHub. The two are separable, and it helps to know
which you're doing:

- **git only (local — no account, no internet).** Run git on the machine where your code lives (your
  laptop, or Scribe) and it tracks your changes right there; nothing gets pushed anywhere. This alone
  solves the `_FINAL` graveyard above — **local-only version control is already far better than
  nothing.** If you never touch GitHub, you still get the full history and undo.
- **git + GitHub (back up and share online).** Once you're committing locally, you can `push` that
  history up to GitHub to keep an **off-machine backup**, **sync** the same code between your laptop
  and Scribe, and hand a clean copy to whoever inherits the project. This is what I do.

Start local; add GitHub when you want the backup or the sharing.

!!! note "The code itself is already on Scribe"
    You don't need GitHub to *get* the code — it's in the project folder on Scribe, which is the
    canonical copy. git is for **versioning** that code, not for fetching it. (My GitHub copies hold
    only code, never data — the lab's project folders and restricted data stay secure on Scribe. See
    [Data safety](data-safety.md).)

## The commands you'll actually use

**First-time setup** (once per machine):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global pull.rebase true     # keep history linear when you pull
```

**The local loop** — this is all of using git on its own, no GitHub required:

```bash
cd /path/to/your/project              # wherever the code lives (e.g. on Scribe)
git init                              # once, if the folder isn't a repo yet
git add do/the_file_you_changed.do    # stage what you changed
git commit -m "short description of the change"   # save a labeled snapshot
```

Edit → `git add` → `git commit`, as often as you like. Each commit is a snapshot you can return to.

**Syncing with GitHub** (only if you're using it) — send your commits up, bring others' down:

```bash
git pull --rebase origin main    # bring GitHub's latest into your copy
git push origin main             # send your local commits up to GitHub
```

Your first `push` asks for a token instead of your password — see
[Pushing](#pushing-github-wants-a-token-not-your-password) just below. (For moving code between your
laptop and Scribe specifically — git vs FileZilla — see [Local ↔ server sync](local-server-sync.md).)

### If you want my GitHub copy

You don't need this — the code's already on Scribe — but if you want *my* latest version from GitHub:

- **Most of my repos are public** (anything without sensitive info, which is all the CEL repos in
  this hub), so you can grab one without an account: **download a ZIP** (the green **Code** button →
  **Download ZIP**) to just read or run it, or **`git clone https://github.com/chesun/<repo>.git`**
  for a live copy you can `pull` updates into later.
- A repo I keep **private** (when it holds something sensitive) stays invisible until I add you as a
  collaborator and you accept the invite.

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

## git on Scribe, not just your laptop

You don't have to use git only locally — **Scribe has git installed too.** You can set up a git repo
right inside a project folder on the server, commit your changes there, and `push`/`pull` it to GitHub
straight from the server, exactly as you would on a laptop. (I didn't even realize git was available
on Scribe until I tried it for [`va_consolidated`](../repositories/va-consolidated.md) — it is.)

That's also how the laptop ↔ Scribe sync works: commit and push on one machine, pull on the other,
with GitHub in the middle. The full setup — the Scribe-side clone and the data-safety guards — is on
**[Local ↔ server sync](local-server-sync.md)**.

!!! info "“git on the server, talking to the internet — isn't that *worse* for the data?”"
    It sounds alarming, but with the guardrails in place it's actually **safer** than moving files by
    hand. git only ever transmits what's **tracked**, and the restricted `data/` and `estimates/`
    folders aren't tracked — so `git pull` brings down only code, `git push` sends up only code, and
    the data just stays on Scribe. A **pre-push hook** is the backstop: it refuses any push that would
    carry a data file off the server, even one force-added with `git add -f`. Compare that to FileZilla,
    where nothing but your own attention stops you dragging a `dta/` folder onto your laptop. The risk
    was never the connection — it's *unguarded* file movement, and git is the option with the guards
    built in. See
    **[Local ↔ server sync](local-server-sync.md#protecting-data-on-the-server-the-pre-push-hook)** for
    the hook and **[Data safety](data-safety.md)** for the policy.

## If something looks wrong

If `git pull` ever reports a **conflict** or any state you don't recognize, **stop and ask**
rather than improvising — a wrong move there can be hard to undo.

### Common errors and fixes

These recur on Scribe (adapted from the [`va_consolidated`](../repositories/va-consolidated.md) Scribe-setup notes):

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
