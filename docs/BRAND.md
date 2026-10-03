# Brand breakdown

Extracted from `Erik_PortFolio_2025.pdf` (48 pages) and the 2026 CV, then laid out in the language of the visual reference Erik picked (a cobalt "Base Club" landing page: rounded panels, frosted cards, hand-drawn arrows, a rotating sticker).

## Identity

| Element | In the PDF | On the site |
| --- | --- | --- |
| Wordmark | Wide "PORT / FOLIO" with "Erik Prayoga" in orange script | "ERIK" in a pill + "Prayoga" in an orange speech bubble (`Wordmark.tsx`). White pill on cobalt, cobalt pill on white. |
| Mascot | Illustrated self-portrait: blue hair, round glasses, wink | Round face avatar (`/brand/face.webp`) on the profile cards; full avatar on About and in the footer. |
| Motto | "Berkarya untuk Bercanda" | About page and the footer voice. |
| Doodles | Marker arrows ("It's Me!", "My Fiancee") | Orange hand-drawn arrows and squiggles (`Doodle.tsx`) that draw themselves in. |
| Sticker | n/a | Round orange badge with "Open for work • Let's talk" running around it, linking to contact (`Sticker.tsx`). |

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--cobalt` | `#0039C1` | Panels, primary buttons, headings on white |
| `--orange` | `#F27600` | Doodles, stickers, speech-bubble tags, `#` accents. Text on orange is always ink. |
| `--orange-text` | `#D45F00` | Orange for large text on white (3.4:1) |
| `--paper` | `#EEF2FF` | Page background (the lavender from the PDF) |
| `--surface` / `--surface-2` | `#FFFFFF` / `#EEF2FD` | White sheets, and the light cards that sit on them |
| `--ink` | `#141A33` | Body text |

The reference uses lime green as its accent. The site uses Erik's orange in that role so it stays his brand; changing `--orange` in `globals.css` swaps it everywhere.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display | Archivo variable, weight 900, width 125%, **upright** | Upright reads friendlier than the PDF's italic, and matches the reference. |
| Script | Caveat Bold | "Prayoga", "Halo!", the motto. Blank Script (PDF) is commercial. |
| Body / UI | Archivo, normal width | One family for everything except the script. |

If Erik owns web licences for Creato Display or Blank Script, drop the woff2 files into `src/fonts/` and point the `localFont` calls in `src/app/layout.tsx` at them.

## Shape rule

One radius scale, used everywhere:

| Name | Radius | For |
| --- | --- | --- |
| pill | 999px | Buttons, nav, tags, filters, timeline rows |
| soft (`rounded-soft`) | 18px | Inputs, small boxes |
| card (`rounded-card`) | 28px | Cards and every image |
| panel (`rounded-panel`) | 40px (28px on phones) | Cobalt panels and the white sheets |

## Surfaces

- **Cobalt panel** (`.panel-cobalt`): inset from the window edge, faint 64px grid, white type. Every page opens with one, and the footer is one.
- **White sheet**: overlaps the bottom of the panel, holds the content.
- **Frosted card** (`.frost`): translucent white with blur, floats over cobalt. Falls back to solid blue for `prefers-reduced-transparency`.
- **Speech bubble** (`.bubble`): orange pill with a tail, for short labels.

## Work images

Covers are shown whole, at their own aspect ratio, in a masonry layout. Nothing uses `object-cover`. Where a PDF page mixes a text column with artwork, the cover is cropped to the artwork only, with crop boxes measured on a gridded render (`scripts/render-seed-images.py`). The case page still shows the full page underneath.

## Voice

Friendly, a bit goofy, English with Bahasa sprinkled in ("Halo!", "Nyasar?", "Makasih!"). Copy went through a humanizer pass: no "thrilled", no "embark on this journey", no em dashes, no stacked adjectives.
