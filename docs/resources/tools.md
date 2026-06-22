# Tools & access

What you need installed and how to get access to run a CEL pipeline.

!!! info "Status: seeded outline"
    Confirm supported versions and license arrangements at offboarding.

## Software

| Tool | What for | Notes |
|---|---|---|
| **Stata** | Running the analysis pipelines | Runs on Scribe as `stata-mp`. Stata 17 is the supported version for `va_consolidated`; confirm per project. |
| **SSH client** | Connecting to Scribe | Built into macOS/Linux (`ssh`); on Windows use the built-in OpenSSH or PuTTY. |
| **File-transfer client** | Moving code to/from Scribe | FileZilla, Cyberduck, or `scp`/`rsync`. Operator's choice. |
| **git** (optional) | Syncing code with GitHub | Not required to run; see [Git for newcomers](../workflow-tips/git-for-newcomers.md). |

## Access checklist for a new person

1. [ ] **Scribe SSH account** — request from your lab's IT contact.
2. [ ] **Access to the project folder on Scribe** — confirm with the data custodian.
3. [ ] **GitHub access** to the relevant repo(s) — if any are private.
4. [ ] **Stata packages installed** on your Scribe account — each repo lists what it needs.

!!! todo "To add"
    - Stata licensing details on Scribe (how access is granted).
    - The canonical Scribe host string and any VPN requirement.
    - Whether GitHub repos are public or private (per repo).
