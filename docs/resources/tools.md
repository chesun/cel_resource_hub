# Tools & access

What you need installed and how to get access to run a CEL pipeline.

!!! info "Status: seeded outline"
    Confirm supported versions and license arrangements at offboarding.

## Software

| Tool | What for | Notes |
|---|---|---|
| **DSS VPN** (OpenVPN Connect) | Reaching Scribe at all | Required. [Download](https://it.dss.ucdavis.edu/our-services/ls-vpn-service); connect to `vpn.dss.ucdavis.edu` with your Kerberos login. |
| **Stata** | Running the analysis pipelines | Runs on Scribe as `stata-mp`. Stata 17 is the supported version for `va_consolidated`; confirm per project. |
| **SSH client** | Connecting to Scribe | Built into macOS/Linux (`ssh`); on Windows use the built-in OpenSSH or PuTTY (PuTTY is also what the X11/GUI setup uses). |
| **File-transfer client** | Moving code to/from Scribe | FileZilla, Cyberduck, or `scp`/`rsync`. Your choice. |
| **X server** (only for the GUI) | Running the Stata GUI over X11 | Mac: [XQuartz](https://www.xquartz.org/); Windows: [Xming](https://sourceforge.net/projects/xming/). See [Working on Scribe](../workflow-tips/working-on-scribe.md#gui-over-x11-for-quick-interactive-poking). |
| **git** (optional) | Syncing code with GitHub | Not required to run; see [Git for newcomers](../workflow-tips/git-for-newcomers.md). |

## Access checklist for a new person

1. [ ] **DSS VPN** — install OpenVPN Connect and connect to `vpn.dss.ucdavis.edu` (Kerberos login). Needed before you can reach Scribe.
2. [ ] **Scribe access** — your lab IT contact enables your Kerberos login for the lab's space (host `Scribe.ssds.ucdavis.edu`).
3. [ ] **Access to the project folder on Scribe** — confirm with the data custodian.
4. [ ] **GitHub access** to the relevant repo(s) — if any are private (only `csac_2024` is).
5. [ ] **Stata packages installed** on your Scribe account — each repo lists what it needs.

!!! todo "To add"
    - Stata licensing details on Scribe (how access is granted).
