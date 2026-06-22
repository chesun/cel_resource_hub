# Scribe & SSH setup

My CEL analysis runs on **Scribe**, the UC Davis SSDS server — the restricted data and the
right Stata setup live only there, so my pipelines run on Scribe, not on a laptop.

!!! info "Status: seeded outline"
    Seeded from `va_consolidated`/`csac2025` notes. Confirm the host string and the IT
    contact at offboarding time.

## One-time setup

1. **Get an SSH account** from CEL lab IT (see [Contacts](../resources/contacts.md)). They
   issue a username; the host is `Scribe.ssds.ucdavis.edu`. Password-prompt SSH is fine — no
   `~/.ssh/config` alias or key setup is required.
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

### GUI over X11 (for quick interactive poking only)

You can also run the full Stata GUI on the server and have its windows appear on your laptop,
via X11 forwarding:

1. **Install an X server on your laptop** — [XQuartz](https://www.xquartz.org/) on macOS,
   or VcXsrv/X410 on Windows. (Linux already has one.)
2. **Connect with X11 forwarding** and launch the GUI:

    ```bash
    ssh -X <your_username>@Scribe.ssds.ucdavis.edu
    cd /home/research/ca_ed_lab/projects/<project>
    xstata-mp &                    # the GUI Stata binary (falls back to `stata-mp` for the console)
    ```

!!! warning "The costs of working this way"
    The GUI over X11 is fine for a quick look at the data, but it is a bad place to *write* your
    analysis:

    - **Work typed into the console is lost if the connection drops** — and X11 sessions drop
      often (laptop sleep, Wi-Fi blip).
    - It is **slow** — every window redraw travels over the network.
    - Interactive console work leaves **no reproducible script** behind.

    Rule of thumb: explore in the GUI if you must, but anything you want to keep goes into a
    saved `.do` file and runs in batch. See [Editing Stata in VSCode](editing-stata-vscode.md).

!!! todo "To add"
    - Exact lab-IT contact + escalation path (recorded per project at offboarding).
    - Where each project lives on Scribe (cross-link from each repo's detail page).
    - Troubleshooting: `stata-mp not found`, wrong working directory (`r(601)`), missing SSC package (`r(199)`).
    - Confirm the GUI binary name on Scribe (`xstata-mp` vs `stata-mp` launched under X11).
