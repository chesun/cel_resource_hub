# Working on Scribe

My CEL analysis runs on **Scribe**, the UC Davis SSDS server — the restricted data and the
right Stata setup live only there, so my pipelines run on Scribe, not on a laptop. This page
covers getting set up, connecting, and running jobs (in batch, via the GUI, or under `screen`).

!!! info "Status"
    Drawn from the lab's onboarding guides (XStata-on-Windows, Scribe How-To, screen) plus
    `va_consolidated` notes.

## One-time setup

1. **Connect to the DSS VPN.** Scribe is only reachable over UC Davis's DSS VPN. Install
   [OpenVPN Connect](https://it.dss.ucdavis.edu/our-services/ls-vpn-service), connect to
   `vpn.dss.ucdavis.edu`, and sign in with your **Kerberos** (UC Davis) username and password.
2. **Get Scribe access** from CEL lab IT — they enable your Kerberos login for the lab's space.
   The host is `Scribe.ssds.ucdavis.edu`; password-prompt SSH is fine, no `~/.ssh/config` alias
   or key setup needed.
3. **Get your code onto Scribe** by transferring the repo into the project folder
   (FileZilla, `scp -r`, `rsync`, drag-and-drop — your choice). Do **not** copy the `.git/`
   folder onto Scribe.
4. **Install required Stata packages** once per account (each repo lists its packages, e.g.
   in `.claude/rules/stata-code-conventions.md` or the README).

## Connecting

Connect to the DSS VPN first, then SSH in and run `go_sbac`:

```bash
ssh <your_kerberos_username>@Scribe.ssds.ucdavis.edu
go_sbac                          # set lab group permissions (run this each login)
cd /home/research/ca_ed_lab/projects/<project>/...
```

!!! warning "Run `go_sbac` after logging in"
    `go_sbac` sets the correct group permissions for the CA Education Lab. If you skip it, files
    you create may not be readable by the rest of the lab.

!!! tip "Keep the connection from timing out"
    For long or idle sessions, add a keepalive so the link isn't dropped for inactivity:
    `ssh -o ServerAliveInterval=15 <user>@Scribe.ssds.ucdavis.edu` (the same flag works with
    `scp` / `sftp`).

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
forwarding. The GUI binaries on Scribe are `xstata-mp` (and `xstata-se`).

**Mac (XQuartz).** Install [XQuartz](https://www.xquartz.org/), connect to the VPN, then SSH with
trusted X11 forwarding (`-Y`):

```bash
ssh -Y <your_kerberos_username>@Scribe.ssds.ucdavis.edu
go_sbac
xstata-mp                        # or xstata-se
```

**Windows (Xming + PuTTY).** Install [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
and the [Xming](https://sourceforge.net/projects/xming/) X server, then:

1. Launch **Xming** (it minimizes to the system tray).
2. In **PuTTY**, set the Host Name to `Scribe.ssds.ucdavis.edu`.
3. Under **Category → Connection → SSH → X11**, check **Enable X11 forwarding** and set the
   remote authentication protocol to **MIT-Magic-Cookie-1**. (Optionally save this as a session.)
4. With the DSS VPN connected, click **Open**, log in, run `go_sbac`, then `xstata-mp`.

(The lab's full illustrated walkthrough — "How to use XStata GUI on Windows" — has a screenshot
for each PuTTY step.)

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

!!! tip "If you can't reattach after a dropped connection"
    Sometimes a session doesn't detach cleanly. `screen -list` shows your sessions (one may read
    `(Dead ???)` or `(Attached)`). Force-detach a stuck one with `screen -D`, then `screen -r` to
    resume; clear dead ones with `screen -wipe`. To kill a session outright,
    `screen -X -S <session> quit`.

!!! todo "To add"
    - Publish the lab's full illustrated Windows GUI walkthrough (PuTTY screenshots) as a page and link it here.
    - Where each project lives on Scribe (cross-link from each repo's detail page).
    - Troubleshooting: `stata-mp not found`, wrong working directory (`r(601)`), missing SSC package (`r(199)`).
