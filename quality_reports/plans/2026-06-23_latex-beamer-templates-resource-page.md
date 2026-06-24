# Plan — Resources page: LaTeX Beamer templates

## Context

The user built a `latex_templates` repo (`chesun/latex_templates`) of custom Beamer themes and
wants a hub **resource page** for them. Two motivations in her words: she *ported the lab's official
PowerPoint template to Beamer* so it's more universal/easier to use, and she *built her own
unofficial UC Davis Beamer template*. Right now nothing in the hub surfaces these — an inheriting
researcher who gives talks has no idea branded LaTeX decks exist. The page should let someone (a) see
what the templates look like, (b) pick one, and (c) get started fast, then hand off to the repo README
for the deep detail.

All facts below are derived from `~/github_repos/latex_templates/README.md` and the compiled
`*_theme_test.pdf` previews (read directly), not guessed.

### What the repo actually contains

Three themes, two brands:

- **UC Davis — XeLaTeX/LuaLaTeX** (`ucdavis_beamer_theme_xelatex/`), font Helvetica Neue via `fontspec`.
- **UC Davis — pdfLaTeX** (`ucdavis_beamer_theme_pdflatex/`), font Helvetica via `helvet`. Same theme as
  the XeLaTeX one; only the font setup differs. Both load with `\usetheme{ucdavis}`.
- **California Education Lab** (`ca_ed_lab_beamer_theme/`), pdfLaTeX, font Carlito (free Calibri clone).
  A faithful Beamer port of the lab's official CEL PowerPoint template — navy+gold, table of contents,
  automatic section dividers, works at 4:3 **and** 16:9 from one source. Loads with `\usetheme{caedlab}`.

Two ways to use (from the README):

- **Overleaf (recommended):** *New File → From External URL*, paste the theme's single bundled raw `.sty`
  URL from `dist/` on the `release` branch; for CEL also import `cel_logo.png`; `\usetheme{...}`; set
  Menu → Compiler (XeLaTeX vs pdfLaTeX). **Refresh** re-pulls; swap `release`→a tag (`v1`) to freeze a deck.
- **Local compile:** the same `dist/` bundle, or copy the four split `.sty` files (CEL also needs `assets/`);
  `xelatex`/`pdflatex`, twice if there's a TOC.

CEL extras: `\documentclass[aspectratio=43|169]{beamer}`; logo auto-placed on the title slide;
`\renewcommand{\acknowledgement}{...}` sets the funding note.

### Voice (per the personal-voice-not-lab memory)

Both themes are **unofficial** (the README states this; not affiliated with/endorsed by UC Davis). The
CEL theme *ports the lab's official PowerPoint template* — the source template is a real lab artifact, but
the Beamer port is Christina's unofficial work; do **not** imply the lab uses/endorses the Beamer version.
The UC Davis theme is Christina's own. Personal voice throughout; the page is her tooling, offered, not
lab policy.

## Placement

Under **Resources** — this is a tooling/templates repo, not an offboarding Stata pipeline, so it does
**not** go in the repositories index (which is explicitly "every CEL code repo I'm handing off"). Matches
the user's "resource page" ask.

## Files to change

1. **New page** `docs/resources/latex-beamer-templates.md`:
   - **Orientation** (1 short para): who it's for — anyone giving talks who writes (or wants to write)
     slides in LaTeX/Beamer and wants a branded UC Davis or CEL deck; state they're unofficial.
   - **Preview gallery**: one title-slide thumbnail per brand (UC Davis, CEL), each linking to the full
     compiled `*_theme_test.pdf` on GitHub.
   - **The three themes** — compact table: theme · brand · engine · font · `\usetheme{}` name · preview.
     Note the two UC Davis variants share `\usetheme{ucdavis}` and differ only by engine/font.
   - **Quickstart (Overleaf — the recommended path)**: condensed steps + the three raw `.sty` URLs (cited
     "from the repo README"), the CEL `cel_logo.png` import, `\usetheme{...}`, the compiler setting; one
     line each on Refresh-to-update and pin-a-tag-to-freeze.
   - **CEL specifics**: `aspectratio=43|169` from one source; auto logo; `\acknowledgement` funding note.
   - **Full detail → README**: local compiles, the split-file route, and the release-branch/publishing
     mechanics are linked, not reproduced (dedup). Repo: `https://github.com/chesun/latex_templates`.

2. **New assets** `docs/resources/img/` (hub images live in a sibling `img/` dir — confirmed
   `docs/workflow-tips/img/`). Generate two title-slide PNGs with `pdftoppm -png -f 1 -l 1 -r 150`:
   - `ucdavis_beamer_theme_xelatex/ucdavis_theme_test.pdf` → `ucdavis-beamer-preview.png`
   - `ca_ed_lab_beamer_theme/caedlab_theme_test_169.pdf` → `caedlab-beamer-preview.png`

   Reference as **markdown linked thumbnails** — `[![alt](img/foo.png)](github .pdf url)`. Markdown image
   paths *are* rewritten by MkDocs, so this avoids the raw-HTML `../img/` grey-box gotcha
   (mkdocs-raw-html-media-paths memory). Default layout: stacked. (If you want side-by-side I'll use a
   small CSS grid, which would need the `../img/` raw-HTML form instead.)

3. **`docs/resources/index.md`** — add a bullet linking to the new page, mirroring the Tools & access line.

4. **`mkdocs.yml`** — add `- LaTeX Beamer templates: resources/latex-beamer-templates.md` under the
   Resources nav group.

## Verification

1. `source .venv/bin/activate && mkdocs build --strict` → exit 0 (catches nav orphan + broken internal
   links). Filter the unrelated Material 2.0 banner from the warning grep.
2. Confirm both preview PNGs exist and render: grep the built `site/resources/latex-beamer-templates/index.html`
   for the two `<img ... src=".../img/...png">`; eyeball that the GitHub `.pdf` links are well-formed.
3. Update `TODO.md` (Done) + append to today's session log. No ADR (content addition, not a structural
   decision).
4. Commit; push (triggers the Pages deploy).

## Open choices (defaulted unless you say otherwise)

- **Preview layout**: stacked linked thumbnails (default, robust) vs side-by-side CSS grid.
- **UC Davis preview**: one thumbnail labeled "XeLaTeX/pdfLaTeX variants" (default — they're identical bar
  the font) vs showing both.
- **Cross-links**: Resources index + nav only (default); skip a homepage/tools pointer unless you want one.
