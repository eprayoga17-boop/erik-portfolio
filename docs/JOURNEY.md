# Customer journey and motion plan

## The problem this layout solves

Most visitors (recruiters, HR, brand owners) want three answers fast: **who is he, where has he worked, what has he made**. The first version made them scroll through a loader, a pinned manifesto and a carousel for one to two minutes to find out. This version answers all three within the first two screens.

## Who visits, and what they need

| Visitor | Wants | Gets it at |
| --- | --- | --- |
| Recruiter / HR | Level, current job, CV | Screen 1 (role, current job, years) and the Summary sheet (Download CV) |
| Brand owner / marketing lead | "Has he done my kind of brand?" | Industry chips under Selected work, then `/work?c=...` |
| Creative director | Range and craft | Selected work, then case pages |

## Home, top to bottom

1. **Hero (screen 1).** "#Brand & Social Designer", a profile card (name, current role and company), a work card (50+ brands, ID · SG · MY · AU), one sentence of intro, "The quick version" and "Download CV".
2. **Summary sheet (screen 2).** Three cards side by side, overlapping the hero like the reference:
   - *Who I am*: face, city, two-line bio, "Open to full-time & freelance", Download CV.
   - *Where I've worked*: the four most relevant roles with years and country, link to the full timeline.
   - *What I make*: 7+ years / 50+ brands / 4 countries, six skill chips, link to the work.
3. **Selected work.** Six whole covers in a masonry, plus four industry shortcuts with counts.
4. **Brands.** One row of client names as pills.
5. **Footer panel.** "Your brand, on my desk?", Let's talk / WhatsApp / CV, links.

## Site map

```
/                 Home (above)
/work             All client work, filterable (?c=clinic|beauty|fnb|service)
/work/[slug]      Case: title, summary, facts, whole cover, what I did, every page, next case
/about            Quick facts, bio, vertical timeline (#experience), toolbox, trophies
/side-quests      Trophies, personal projects
/contact          Direct channels (WhatsApp first) and the form
/privacy          UU PDP notice
/admin/*          CMS
```

One label per intent across the site: "See work", "Let's talk", "Download CV".

## Motion

Taken from the reference: things pop, draw and float; nothing hijacks the scroll.

| Moment | What happens |
| --- | --- |
| Page header | Headline lines rise out of a mask, frosted cards and stickers pop in with a small overshoot, doodles draw themselves. |
| Pointer | On desktop, floating cards lean slightly toward the cursor. |
| Scroll | Header cards drift at their own speed (light parallax). Cards below pop up as they enter. |
| Sticker | Ring of text turns slowly. |
| Navigation | Orange then cobalt rounded sheets slide up, cover, and carry on upward. |
| Header | Transparent over the cobalt panel, becomes a white floating pill bar once you scroll. Hides on scroll down. |

Removed from v1 because they cost the visitor time: the boot loader, the pinned manifesto, the horizontal-scroll timeline, and the carousel.

Smooth scroll is Lenis on GSAP's ticker. All motion sits inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`; with reduced motion everything is simply visible and nothing moves. If the JS bundle fails to load within 4 seconds, an inline script unhides everything.
