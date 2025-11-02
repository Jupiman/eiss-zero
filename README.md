# European Institute for Sound Studies (EISS)

A simple, static HTML5 landing page for a fictional institute.

## Features
- Plain HTML/CSS/JS — no build tools or dependencies
- Responsive, accessible design (semantic landmarks, skip link, focus styles)
- Sections: Hero, About, Research, Publications, Events, Contact
- Basic SEO (title/description, canonical, Open Graph/Twitter) pointing to `https://eiss-zero.eu`
- Favicon and social preview image (placeholders)
- robots.txt and a minimal sitemap.xml (update the domain before deploying)

## Structure
- `index.html` — main page
- `css/styles.css` — styles (light/dark aware)
- `js/main.js` — small enhancements (nav toggle, smooth scroll, active links, back-to-top)
- `assets/` — branding images; add your `icon.png`
- `favicon.svg` — site icon
- `robots.txt` / `sitemap.xml` — SEO helpers

## Use locally
Just open `index.html` in your browser.

Optionally, serve it locally (any static server works). For example, with PowerShell:

```powershell
# Optional local server (Python)
python -m http.server 5173
# Then open http://localhost:5173
```

## Deploy
- GitHub Pages: Serve from the repository root (main branch). Ensure `sitemap.xml` and `robots.txt` use your public URL.
- Netlify/Vercel/Static host: Deploy the repository root. No build command needed.

## Customize
- Place `assets/icon.png` (square logo used in header). The site will reference it automatically.
- Update any copy as needed. Canonical is set to `https://eiss-zero.eu`.

## License
MIT — see `LICENSE`.
