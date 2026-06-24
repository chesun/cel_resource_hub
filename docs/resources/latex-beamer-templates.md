# LaTeX Beamer templates

If you build presentations with **LaTeX Beamer** — or want to — these are two branded themes I made so a
deck comes out looking like UC Davis or California Education Lab slides without hand-tuning colors and
fonts. One is an **unofficial UC Davis theme** I built; the other is a Beamer **port of the lab's official
CEL PowerPoint template**, so a LaTeX deck can match the lab's standard slide look — handy if you'd rather
write slides in LaTeX than PowerPoint (e.g. building a talk straight from a paper). Both live in
**[chesun/latex_templates](https://github.com/chesun/latex_templates)**.

!!! note "Unofficial"
    These are unofficial and not affiliated with or endorsed by UC Davis; the CEL theme is a LaTeX port of
    the lab's own PowerPoint template.

## What they look like

[![UC Davis Beamer theme — title slide](img/ucdavis-beamer-preview.png)](https://github.com/chesun/latex_templates/blob/main/ucdavis_beamer_theme_xelatex/ucdavis_theme_test.pdf)

*UC Davis theme (XeLaTeX / pdfLaTeX variants) — click for the full sample deck.*

[![California Education Lab Beamer theme — title slide](img/caedlab-beamer-preview.png)](https://github.com/chesun/latex_templates/blob/main/ca_ed_lab_beamer_theme/caedlab_theme_test_169.pdf)

*California Education Lab theme, a port of the official CEL PowerPoint template — click for the full sample deck.*

## The three themes

| Theme | Brand | Engine | Font | Load with |
|---|---|---|---|---|
| UC Davis (XeLaTeX) | UC Davis | XeLaTeX / LuaLaTeX | Helvetica Neue (`fontspec`) | `\usetheme{ucdavis}` |
| UC Davis (pdfLaTeX) | UC Davis | pdfLaTeX | Helvetica (`helvet`) | `\usetheme{ucdavis}` |
| California Education Lab | CEL | pdfLaTeX | Carlito (free Calibri clone) | `\usetheme{caedlab}` |

The two UC Davis rows are the **same theme** — pick the one that matches your compiler; they differ only
in font setup. The CEL theme renders at **4:3 and 16:9 from the same source** (just change the
`aspectratio` option) and adds a table of contents and automatic section-divider slides.

## Quickstart on Overleaf (the easy path)

Overleaf is the least-fuss way to use these — you import one file by URL and you're done. From the
[repo README](https://github.com/chesun/latex_templates):

1. **New File → From External URL**, and paste the raw `.sty` URL for your theme:
    - UC Davis (XeLaTeX): `https://raw.githubusercontent.com/chesun/latex_templates/release/dist/ucdavis-xelatex/beamerthemeucdavis.sty`
    - UC Davis (pdfLaTeX): `https://raw.githubusercontent.com/chesun/latex_templates/release/dist/ucdavis-pdflatex/beamerthemeucdavis.sty`
    - California Education Lab: `https://raw.githubusercontent.com/chesun/latex_templates/release/dist/caedlab/beamerthemecaedlab.sty`
2. **CEL only** — import the logo the same way (the theme expects `cel_logo.png` at the project root):
    - `https://raw.githubusercontent.com/chesun/latex_templates/release/dist/caedlab/cel_logo.png`
3. In your preamble, add `\usetheme{ucdavis}` or `\usetheme{caedlab}`.
4. Set the compiler in **Menu → Compiler** — **XeLaTeX** for the UC Davis XeLaTeX theme, **pdfLaTeX** for
   the other two.

To pull later improvements, click the imported file and hit **Refresh**. To freeze a deck so it can't shift
under you (e.g. slides for a submitted paper), swap `release` in the URL for a version tag like `v1` — a
permanent snapshot that Refresh won't move.

## CEL theme specifics

- **4:3 or 16:9 from one source:** `\documentclass[aspectratio=43]{beamer}` (CEL native) or
  `aspectratio=169` (widescreen); the layout adapts automatically.
- **Logo** is placed on the title slide for you — no per-deck path edits.
- **Funding note:** set it with `\renewcommand{\acknowledgement}{...}`; it defaults to the official CEL
  placeholder text.

## Compiling locally, and the full guide

If you compile locally instead of on Overleaf — or you want the split-file setup, how updates get
published, or how to pin a frozen version — the **[repo README](https://github.com/chesun/latex_templates)**
covers all of it. The short version: drop the same bundled `.sty` (plus `cel_logo.png` for CEL) next to
your `.tex`, add `\usetheme{...}`, and compile with `xelatex` or `pdflatex` — run it **twice** if your deck
has a table of contents.
