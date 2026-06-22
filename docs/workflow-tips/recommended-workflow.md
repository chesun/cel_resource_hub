# The recommended workflow

This page is the end-to-end picture: how to make a change to a CEL pipeline safely and
reproducibly, from your laptop to the Scribe server and back. The detail pages linked below
go deeper on each step; read this one first.

!!! abstract "The shape of it"
    **Write code locally → sync it to Scribe → run it in batch on Scribe → read the log →
    repeat.** Confidential data never leaves Scribe; code and shippable results live on GitHub.

## The mental model

Two machines, two jobs:

- **Your laptop** is where you *write and version code*. You have a real editor (VSCode), git,
  and no restricted data.
- **Scribe** is where the code *runs against the data*. The restricted student data lives only
  here, and the analysis runs here.

The connection between them is a **sync step** — you move `.do` files (and only `.do` files)
from laptop to Scribe, and you move code changes back. You never copy data the other way.

!!! info "The one rule everything serves"
    Code lives on **GitHub**. Confidential data lives only on **Scribe**. The two never mix.
    See [Data safety](data-safety.md).

## The loop, step by step

1. **Edit on your laptop in VSCode.** Open the repo, edit the `.do` files. Save. See
   [Editing Stata in VSCode](editing-stata-vscode.md).
2. **Sync the changed code to Scribe** — either drag the files over with FileZilla, or
   `git push` from your laptop and `git pull` on Scribe. See
   [Local ↔ server sync](local-server-sync.md) for the two methods and their trade-offs.
3. **Run it on Scribe in batch:**

    ```bash
    ssh <your_username>@Scribe.ssds.ucdavis.edu
    cd /home/research/ca_ed_lab/projects/<project>
    stata-mp -b do do/main.do
    ```

    Batch mode (`-b`) writes a `.log`/`.smcl` file and survives nothing else — but the *script*
    is saved, so a dropped connection costs you nothing. See
    [Scribe & SSH setup](scribe-ssh-setup.md) for `nohup` (long runs) and the GUI alternative.
4. **Read the log** that the run produced (`log/...`). Fix, and go back to step 1.
5. **When the change is good, commit it** so the next person inherits it — see
   [Git for newcomers](git-for-newcomers.md).

```
  laptop (VSCode, git, no data)                Scribe (data + Stata)
  ┌───────────────────────────┐               ┌──────────────────────────┐
  │ edit do/*.do  ── sync ──►  │  FileZilla    │  stata-mp -b do main.do  │
  │ git commit / push          │   or git      │  reads dta/  writes log/ │
  │            ◄── pull back ── │               │  data stays here         │
  └───────────────────────────┘               └──────────────────────────┘
```

## Why not just write code in Stata on the server?

The common lab habit is to SSH in, open the Stata GUI, and type commands interactively. It
feels fast, but it has three real costs:

- **You lose work when the connection drops.** Anything typed into the interactive console
  that you didn't paste from a saved `.do` file is gone when the server cuts off or your laptop
  sleeps. A batch run from a saved script can't lose your work — the script is the work.
- **There's no record of what you did.** Interactive history is not a reproducible script.
  The next person can't re-run "what you typed."
- **It isn't reproducible.** The whole point of the `do/main.do` pattern (see
  [Reproducible pipelines](reproducible-pipelines.md)) is that one command reproduces the
  analysis. Ad-hoc console work breaks that.

Writing in a saved `.do` file — in a real editor — and running it in batch fixes all three at
once. That's the entire argument for this workflow.

!!! tip "Where to go next"
    - [Editing Stata in VSCode](editing-stata-vscode.md) — the editor setup
    - [Local ↔ server sync](local-server-sync.md) — FileZilla vs git, with costs
    - [Scribe & SSH setup](scribe-ssh-setup.md) — connecting and running (batch and GUI)
    - [gitignore setup for data security](gitignore-setup.md) — keep data out of GitHub
</content>
