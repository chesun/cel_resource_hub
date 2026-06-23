# Editing Stata in VSCode

Write your Stata code on your **laptop**, in a real editor, and save it to `.do` files. Then
[sync it to Scribe](local-server-sync.md) and [run it in batch](working-on-scribe.md). This
page explains why, and how to set up the editor.

## See it in action

A quick walkthrough — writing a `.do` file in VSCode (syntax highlighting, autocomplete, and
auto-indent as you type), then running it through the Stata binary in VSCode's **built-in
terminal**:

<figure class="md-video">
  <video muted loop playsinline preload="metadata" poster="../img/vscode-stata-demo-poster-v2.png">
    <source src="../img/vscode-stata-demo-v2.mp4" type="video/mp4">
    <a href="../img/vscode-stata-demo-v2.mp4">Download the clip</a>.
  </video>
  <figcaption>Editing a <code>.do</code> file in VSCode, then running it in the integrated terminal. (Plays when it scrolls into view; click the video to pause.)</figcaption>
</figure>

!!! warning "The habit I'd gently push back on"
    A lot of folks write their `.do` files in **Stata's do-file editor on the server** (often via
    the GUI over X11). That works — you still get saved scripts — but I'd nudge you to write on
    your laptop instead: a real editor, git history, and editing that doesn't depend on a live
    server connection. My take: treat the server as a place code *runs*, not the place you
    *write* it.

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

!!! tip "You don't run Stata inside VSCode (for lab work)"
    Because the data lives only on Scribe, you don't execute the analysis on your laptop — VSCode
    is for *writing and saving* `.do` files, and the run happens on Scribe in batch.

    You *can* wire VSCode to run Stata locally through its command-line interface (a couple of
    extensions let you send a line or selection to a local Stata install). For lab workflows that's
    only really useful for testing code locally before sending it to Scribe — the authoritative run
    is always the Scribe batch run. I can expand this section if there's real interest in the
    local-run setup.

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
    [Working on Scribe → Running Stata: batch vs GUI](working-on-scribe.md#running-stata-batch-vs-gui)
    for how, and its costs. The rule of thumb: explore interactively if you must, but **anything
    you want to keep goes into a saved `.do` file.**
</content>
