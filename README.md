# Taj Hotel — Landing Page

A responsive, multi-section landing page for a fictional luxury heritage hotel,
built with plain HTML, CSS and JavaScript (no frameworks, no build step).

## Structure

```
taj-hotel/
├── index.html          # Single-page site (navbar, hero, about, rooms, amenities, gallery, testimonials, booking, footer)
├── css/
│   └── style.css        # All styling, mobile-first, custom properties for theme
├── js/
│   └── script.js         # Nav toggle, smooth scroll, testimonial slider, booking form validation, scroll reveal
└── images/               # (optional) place local images here if you don't want to use remote URLs
```

## Run locally

Just open `index.html` in a browser — no build tools or dependencies required.

Or serve it locally:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Design notes

- **Palette**: ivory, ink navy, antique gold and deep maroon — inspired by Mughal
  marble-and-inlay architecture rather than a generic template palette.
- **Signature motif**: a scalloped arch shape (echoing Mughal archways) used to
  frame images and divide sections.
- **Typography**: a serif display face paired with a clean grotesque body face.

## Deploying to GitHub

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```
