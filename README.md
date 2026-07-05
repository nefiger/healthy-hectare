# Healthy Hectare — website

Standalone static site for the Healthy Hectare programme, built per
`reference/healthy-hectare/docs/website-spec.md` in the `unpoison-ecosystem` repo
(working docs and source material live there; this repo holds only the deployable site).

## Structure

```
index.html            Home — hero, positioning, outcomes, parcel model, traction, CTA
programme.html        The Programme — what it is, delivers, pilot model, how it works, timeframe
case-for-change.html  The Case for Change — the four converging pressures ("Why Now")
new-standard.html     The New Standard — the Standard vs. Healthy Hectare comparison matrix
evidence.html         The Evidence — measurement framework + study-design diagram (no results)
panel.html            The Panel — expert role cards, placeholder until appointments announced
get-involved.html     Get Involved — segmented tracks (farms / funders / regulators) + form
404.html              Not-found page (GitHub Pages picks this up automatically)
assets/css/site.css   Design system + all styling (tokens documented in BRAND.md)
assets/js/site.js     Nav, scroll reveal, form handling (FORM_ENDPOINT config at top)
assets/img/           Licensed stock imagery (placeholders — see notes below)
```

No build step. Any static host works; open `index.html` directly or serve the directory.

## Deployment

**Live at https://nefiger.github.io/healthy-hectare/** — deployed via GitHub Pages
(workflow build type; see `.github/workflows/deploy-pages.yml`). Every push to `main`
redeploys automatically. Cross-link from the main UnPoison presence when ready.

Note: the visual identity (see `BRAND.md`) and copy are still drafts pending Anna's
sign-off — the site is live for review/hosting purposes, not yet formally approved.

## Get Involved form (§7a of the spec — Option A built)

The spec left the capture mechanism open and defaulted to **Option A: form → email
notification**. That is what's built:

- The form posts to `FORM_ENDPOINT` (top of `assets/js/site.js`) with fields:
  name, organisation, email, segment, segment-specific optional fields, message,
  and a client-side timestamp. A honeypot field drops naive bots.
- **Setup:** create a form on a Formspree-style service (GitHub Pages cannot process
  POSTs itself), paste the endpoint URL into `FORM_ENDPOINT`, done.
- Until configured, submissions show a clear "not yet connected" notice rather than
  failing silently.

**Option B upgrade path (not a redesign):** the same form can later post to a small
serverless function that writes a `Lead` record to a database with an authenticated
admin list view, if the team wants structured triage like the ABA intake flow. Only
`FORM_ENDPOINT` and the backend change; the page does not.

## Image notes

All imagery is generic licensed stock — good enough for launch, flagged for replacement
once real pilot-site photography exists (each figure carries a caption saying so).

- `field-aerial.jpg` (spec's suggested hero) has a stock-gallery **watermark** baked into
  the bottom edge — swapped for the visually equivalent, clean `rows-alt-10.jpg`.
- `crop-closeup.jpg` has a black frame and "GRAIN" caption baked in — not used;
  `wheat-field.webp` (zoom-cropped via `.crop-frame`) covers that slot.
- `wheat-field` was WebP data with a `.jpg` extension in the source library; renamed
  to `.webp` here.

## Content constraints (binding — do not edit these away)

- No naming of the pilot farm ("our first pilot site" / "a leading commercial farm" only)
- Crop-agnostic — no wine, no specific crops in public copy (form intake fields may ask)
- No copy that presumes Healthy Hectare's entity status is resolved
- The Evidence section presents the **measurement framework**, never real/mock results —
  the baseline study has not run
- No naming or belittling of competitors, agrochemical companies, or certification bodies
- No specific regulatory citations (e.g. named regulations) unless confirmed
