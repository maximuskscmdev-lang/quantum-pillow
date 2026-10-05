# quantum.pillow

A single-page product site for the fictional **quantum.pillow** — an ultra-high-tech
nano-foam sleep system.

## Features showcased

- AI-powered sleep tracking (quality sleep hours, posture/head-position change detection,
  personalized insights, via a dedicated AI mobile app)
- Personalized pillow design (customizable to face shape and head shape, adjustable support
  and contours, better head and neck support)
- 30-day free trial before committing
- Active noise cancellation (6-mic hybrid ANC, −28 dB active)
- White noise and sound library (40+ presets, per-layer volume, timed fade-out)
- Lucid dream control (40 Hz binaural, REM-timed audio/light cues, dream journal)

## The science

- Cooling fills (bamboo charcoal, graphene) conduct heat away from the body multiple times
  faster than copper, which is what prevents night sweats
- Bioclay / memory foam core with slow rebound — a property traditional pillows don't have

Plus a working cart with size / head-mold / core options, live price totals, a slide-out
cart drawer, and a deliberately fake checkout. Pressing **Checkout** runs a fake
"quantum bank" progress sequence and then shows an image.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

No build step or framework — `vercel.json` handles headers and clean URLs. Connect the
repo in the Vercel dashboard and it deploys on every push.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Markup for all sections + cart drawer + prank modal |
| `style.css` | Dark theme, grid layouts, animations, responsive rules |
| `app.js` | Cart state, option pricing, drawer, prank sequence |
| `prank.jpg` | Image shown in the checkout reveal |
| `vercel.json` | Static hosting config and cache headers |
