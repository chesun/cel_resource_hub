# Tools & access

Everything you need to download to work on a CEL pipeline, and how to get access to run it on
Scribe. Each tool links to its official download and to the deeper how-to guide where one exists.

## Essentials — everyone needs these

| Tool | Download | What for | How-to |
|---|---|---|---|
| **DSS VPN** (OpenVPN Connect) | [it.dss.ucdavis.edu](https://it.dss.ucdavis.edu/our-services/ls-vpn-service) | Reaching Scribe at all — connect to `vpn.dss.ucdavis.edu` with your Kerberos login | [Working on Scribe](../workflow-tips/working-on-scribe.md#one-time-setup) |
| **VSCode** | [code.visualstudio.com](https://code.visualstudio.com/) | Writing and saving `.do` files on your laptop, in a real editor | [Editing Stata in VSCode](../workflow-tips/editing-stata-vscode.md) |
| **SSH client** | built in (`ssh` on macOS/Linux; OpenSSH or [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) on Windows) | Connecting to Scribe to run jobs | [Working on Scribe](../workflow-tips/working-on-scribe.md#connecting) |
| **File-transfer client** | [FileZilla](https://filezilla-project.org/) · [Cyberduck](https://cyberduck.io/) · or `scp`/`rsync` (built in) | Moving code between your laptop and Scribe | [Local ↔ server sync](../workflow-tips/local-server-sync.md) |
| **Stata** | runs **on Scribe** (`stata-mp`) — nothing to install locally | Running the analysis pipelines | [Working on Scribe → batch vs GUI](../workflow-tips/working-on-scribe.md#running-stata-batch-vs-gui) |

!!! tip "git is recommended, not required"
    You can run a pipeline with just the tools above. **git** ([git-scm.com](https://git-scm.com/downloads))
    adds version history and is the cleaner way to sync code — worth setting up, but optional.
    See [Git for newcomers](../workflow-tips/git-for-newcomers.md).

## Situational — only if your setup calls for it

| Tool | Download | When you need it |
|---|---|---|
| **X server** | Mac: [XQuartz](https://www.xquartz.org/) · Windows: [Xming](https://sourceforge.net/projects/xming/) | Only to run the **Stata GUI** over X11 — see [Working on Scribe → GUI over X11](../workflow-tips/working-on-scribe.md#gui-over-x11-for-quick-interactive-poking). Batch runs don't need it. |
| **PuTTY** | [chiark.greenend.org.uk](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) | On **Windows**, for SSH and for X11 forwarding to the Stata GUI — see the [illustrated Xming + PuTTY guide](../workflow-tips/xstata-gui-windows.md). |
| **Claude Code** | optional productivity tool | Some repos carry a `.claude/` folder from it; you never need it to run the analysis — see [Claude Code intro](../workflow-tips/claude-code-intro.md). |

## Access checklist for a new person

Work top to bottom — each step depends on the one above it.

1. [ ] **DSS VPN** — install OpenVPN Connect and connect to `vpn.dss.ucdavis.edu` (Kerberos login). Needed before you can reach Scribe.
2. [ ] **Scribe access** — your lab IT contact enables your Kerberos login for the lab's space (host `Scribe.ssds.ucdavis.edu`).
3. [ ] **Access to the project folder on Scribe** — confirm with the data custodian.
4. [ ] **GitHub access** to the relevant repo(s) — only needed if any are private (just `csac_2024` is).
5. [ ] **Stata packages installed** on your Scribe account — each repo lists what it needs.

!!! todo "To add"
    - Stata licensing details on Scribe (how access is granted).
