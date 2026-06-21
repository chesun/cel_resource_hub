# Scribe & SSH setup

The lab's analysis runs on **Scribe**, the UC Davis SSDS server. The restricted data and the
right Stata setup live only there, so pipelines run on Scribe, not on your laptop.

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

## Connecting and running

```bash
ssh <your_username>@Scribe.ssds.ucdavis.edu
cd /home/research/ca_ed_lab/projects/<project>/...
stata-mp -b do do/main.do          # always stata-mp on the server, never plain `stata`
```

For long runs, detach so the job survives logout:

```bash
nohup stata-mp -b do do/main.do &
tail -f log/main_*.smcl            # follow the live log
```

!!! todo "To add"
    - Exact lab-IT contact + escalation path (recorded per project at offboarding).
    - Where each project lives on Scribe (cross-link from each repo's detail page).
    - Troubleshooting: `stata-mp not found`, wrong working directory (`r(601)`), missing SSC package (`r(199)`).
