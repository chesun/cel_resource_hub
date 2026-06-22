# Working on Scribe

My CEL analysis runs on **Scribe**, the UC Davis SSDS server — the restricted data and the
right Stata setup live only there, so my pipelines run on Scribe, not on a laptop. This page
covers getting set up, connecting, and running jobs (in batch, via the GUI, or under `screen`).

!!! info "Status: seeded outline"
    Seeded from `va_consolidated`/`csac2025` notes. Confirm the host string and the IT
    contact at offboarding time.

## One-time setup

1. **Get an SSH account** from CEL lab IT. They issue a username; the host is
   `Scribe.ssds.ucdavis.edu`. Password-prompt SSH is fine — no `~/.ssh/config` alias or key
   setup is required.
2. **Get your code onto Scribe** by transferring the repo into the project folder
   (FileZilla, `scp -r`, `rsync`, drag-and-drop — operator's choice). Do **not** copy the
   `.git/` folder onto Scribe.
3. **Install required Stata packages** once per account (each repo lists its packages, e.g.
   in `.claude/rules/stata-code-conventions.md` or the README).

## Connecting

```bash
ssh <your_username>@Scribe.ssds.ucdavis.edu
cd /home/research/ca_ed_lab/projects/<project>/...
```

## Running Stata: batch vs GUI

There are two ways to run Stata on Scribe. **Batch is the recommended one**; the GUI is there
for quick interactive exploration, with real costs.

### Batch (recommended)

```bash
stata-mp -b do do/main.do          # always stata-mp on the server, never plain `stata`
```

`-b` runs the script non-interactively and writes a log file. The win: **the script is saved,
so a dropped connection can't cost you any work.** This is the mode the whole
[recommended workflow](recommended-workflow.md) is built around — write the `.do` locally, sync
it, run it in batch.

For long runs, detach so the job survives logout:

```bash
nohup stata-mp -b do do/main.do &
tail -f log/main_*.smcl            # follow the live log
```

### GUI over X11 (for quick interactive poking)

You can run the full Stata GUI on the server with its windows showing on your laptop, via X11
forwarding. I wrote step-by-step setup guides for this:

- **Windows** — X11 forwarding with **Xming + PuTTY** (this is the standard lab onboarding guide). _TODO: link_
- **Mac** — X11 forwarding with **XQuartz**. _TODO: link_

Once your X server is running and you've connected with forwarding on, launch Stata's GUI from
the project folder on Scribe.

!!! warning "Good for a look, not for writing code"
    The GUI over X11 is handy for eyeballing the data, but it's a poor place to *write* your
    analysis: work typed into the console is lost if the connection drops, it's slow over the
    network, and it leaves no reproducible script behind. Explore interactively if you want, but
    anything you want to keep goes into a saved `.do` file and runs in batch — see
    [Editing Stata in VSCode](editing-stata-vscode.md).

## Keeping a session alive: `screen`

A dropped SSH connection normally kills whatever you were running. `screen` keeps a session
alive *on the server*, so you can detach, log off, and reattach later — handy for long jobs and
for keeping an interactive console open across disconnects.

```bash
screen -S ccylc          # start a named session
# ...launch your work, e.g.  stata-mp -b do do/main.do ...
# detach and leave it running: press Ctrl-a, then d
screen -ls               # list your sessions
screen -r ccylc          # reattach later (even after logging out and back in)
```

When you reattach, everything is exactly as you left it. (`tmux` does the same job if you prefer
it.)

!!! tip "screen vs. nohup"
    For a fire-and-forget batch run, `nohup stata-mp -b do do/main.do &` (above) is simplest.
    Reach for `screen` when you want to come back to a *live* session — to watch progress, run
    several things, or keep a console open across disconnects.

!!! todo "To add"
    - Links to the lab's GUI guides — Windows (Xming + PuTTY) and Mac (XQuartz).
    - Where each project lives on Scribe (cross-link from each repo's detail page).
    - Troubleshooting: `stata-mp not found`, wrong working directory (`r(601)`), missing SSC package (`r(199)`).
