# Local ↔ server sync

Your code is written on your laptop and runs on Scribe, so it has to move between the two.
There are **two ways I move code**, and they trade off simplicity against safety and history.
Here's how I think about both so you can pick deliberately.

!!! info "Direction matters"
    You sync **code** laptop → Scribe, and code changes Scribe → laptop. You **never** move
    data Scribe → laptop. Keeping data on the server is the whole game — see
    [Data safety](data-safety.md).

## The two methods at a glance

| | **A. File transfer (FileZilla)** | **B. git** |
|---|---|---|
| What it is | Drag `.do` files between laptop and Scribe in a transfer client (FileZilla, Cyberduck, `scp`/`rsync`) | `git push` from laptop, `git pull` on Scribe (and back) |
| Setup cost | Almost none — install the client, enter your SSH login | One-time: install git, a GitHub token for pushing, optionally a Scribe-side clone |
| Learning curve | None | Real — pull/push/commit, and the occasional merge conflict |
| Version history | **None** on the round trip | **Full** — every change recoverable, with who/when |
| "Which side is newer?" | You track it by hand; easy to overwrite the wrong file | git tells you; conflicts are surfaced, not silently lost |
| Data-leak protection | Manual discipline only — nothing stops you dragging `dta/` off the server | Structural — `git pull` brings only code; a [pre-push guard](data-safety.md) can block data files |
| Best for | A quick one-file fix; someone who doesn't use git | The normal workflow; anything you want preserved and auditable |

## Method A — FileZilla (manual transfer)

In FileZilla, open **Site Manager → New Site**: Protocol **SFTP**, Host `Scribe.ssds.ucdavis.edu`,
Logon Type **Ask for Password**, and your **Kerberos** username. Connect (with the DSS VPN on),
navigate to the project folder, and drag the changed `.do` files across. To save a change made
on Scribe, drag it back the same way.

**Costs to keep in mind:**

- No history. If you overwrite a file with an older copy, the newer version is just gone.
- No safety net against data egress. The client will just as happily drag `dta/` to your
  laptop as it drags `.do` files up — *you* are the only thing preventing that. Never select
  data folders.
- Two-way drift. If you edited on both sides, you have to remember which file is current.

!!! tip "Do not copy `.git/` to Scribe"
    If you transfer the repo folder, exclude the `.git/` directory. GitHub credentials don't
    belong on the restricted server — it's the [data-separation principle](data-safety.md) I
    stick to.

## Method B — git

```bash
# On Scribe, get the latest code:
cd /home/research/ca_ed_lab/projects/<project>
git pull --rebase origin main

# Save a change (made on either side), then send it to GitHub:
git add do/path/to/changed_file.do
git commit -m "short description of the change"
git push origin main
```

**Why it's the better default:**

- `git pull` brings down **only code, never data** — the data folders aren't tracked, so the
  common mistake of copying restricted data onto a laptop can't happen through git.
- Some repos add a **pre-push hook** that refuses any push containing a `dta/` or `data/` file
  (you may see `refusing to push — restricted data files…` — that's the guard working).
- Every change is versioned and recoverable.

**Costs:** a real learning curve, one-time auth setup (a GitHub personal access token for
pushing), and occasional merge/rebase conflicts. See [Git for newcomers](git-for-newcomers.md)
for the commands, common errors, and a glossary.

!!! note "Either works; I default to git"
    I treat the transfer mechanism as a free choice — both work. I default to git because it
    gives me history and a structural barrier against data leaving the server, and I fall back
    to FileZilla for a quick one-off when I don't want the git overhead. Your call.
</content>
