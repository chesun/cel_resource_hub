# Editing Stata in VSCode

Write your Stata code on your **laptop**, in a real editor, and save it to `.do` files. Then
[sync it to Scribe](local-server-sync.md) and [run it in batch](scribe-ssh-setup.md). This
page explains why, and how to set up the editor.

!!! warning "The habit I'd gently push back on"
    A lot of folks write Stata by SSHing to Scribe and typing into the **interactive Stata GUI**.
    I did too — until I lost work one too many times when the connection dropped, and the console
    leaves no reproducible script behind either. My take: treat the server as a place code
    *runs*, not a place you *write* it.

## Why a real editor + saved `.do` files

- **You never lose work.** The script is saved on your laptop (and in git). A dropped SSH
  session costs you nothing.
- **Everything is reproducible.** A saved `.do` file is the thing the next person re-runs. See
  [Reproducible pipelines](reproducible-pipelines.md).
- **You get version history.** Once the code is in git, every change is recoverable and you can
  see what changed and when. See [Git for newcomers](git-for-newcomers.md).
- **The editor helps you.** Syntax highlighting, find-across-files, and a side-by-side file
  tree make a multi-`do` pipeline far easier to read than the Stata do-file editor.

## Setting up VSCode for Stata

1. **Install [VSCode](https://code.visualstudio.com/).** Free, macOS/Windows/Linux.
2. **Add a Stata language extension** for syntax highlighting — open the Extensions panel
   (`Cmd/Ctrl+Shift+X`), search **"Stata"**, and install one (e.g. *Stata Enhanced*). This is
   cosmetic but makes `.do` files much more readable.
3. **Open the repo folder** (`File → Open Folder…`), not individual files — so you see the
   whole `do/` tree and can search across it.
4. **Turn on autosave** (`File → Auto Save`) so edits are never sitting unsaved in a buffer.

!!! tip "You don't run Stata inside VSCode"
    Because the data lives only on Scribe, you don't execute the analysis on your laptop. VSCode
    is for *writing and saving* `.do` files; the run happens on Scribe in batch. (If you happen
    to have Stata installed locally for syntax-only testing, that's fine — but the authoritative
    run is always the Scribe batch run.)

## The edit → run loop

This is the day-to-day rhythm once VSCode is set up:

1. Edit `.do` files in VSCode and save.
2. [Sync](local-server-sync.md) the changed files to Scribe (FileZilla or git).
3. On Scribe, run in batch: `stata-mp -b do do/main.do` (or the single sub-`do` you changed).
4. Read the resulting `log/...` file; fix; repeat.
5. When it's right, commit the change so it's preserved for whoever inherits the project.

!!! info "What about the GUI for quick exploration?"
    Sometimes you genuinely want an interactive session to poke at the data. You can run the
    Stata GUI on the server over X11 forwarding — see
    [Scribe & SSH setup → Running Stata: batch vs GUI](scribe-ssh-setup.md#running-stata-batch-vs-gui)
    for how, and its costs. The rule of thumb: explore interactively if you must, but **anything
    you want to keep goes into a saved `.do` file.**
</content>
