# quantum.pillow

A single-page product site for the fictional **quantum.pillow** — an ultra-high-tech
nano-foam sleep system.

## Features showcased

- Lucid dreaming engine (40 Hz binaural + REM-cycle scheduler)
- Active noise control (6-mic hybrid ANC)
- App connectivity (iOS & Android)
- EMF jammer
- Custom head mold
- Ultra-high-tech nano foam material

Plus a working cart with size / head-mold / core options, live price totals, a slide-out
cart drawer, and a deliberately fake checkout. Pressing **Checkout** runs a fake
"quantum bank" progress sequence and then reveals *ha ha — you were fooled.*

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
| `vercel.json` | Static hosting config and cache headers |
