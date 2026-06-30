# pxm — parody landing page

A satirical dev-tool launch site. `pxm` "treats each install prompt as a first-class package."
It is not a real product. Do not `curl | sh` any of the URLs.

## Files

| File | What it is |
|------|------------|
| `index.html` | The whole page (hero, anatomy, registry, etc.) |
| `styles.css` | Styling (dark dev-tool aesthetic) |
| `script.js`  | Animated terminal, copy buttons, registry search |
| `.nojekyll`  | Tells GitHub Pages to serve files as-is (no Jekyll) |

No build step. No dependencies. Open `index.html` in a browser to preview.

## Deploy to GitHub Pages

1. Create a repo (e.g. `pxm-site`) and push these files to the `main` branch:

   ```bash
   cd C:/Users/kahlan/Desktop/pxm
   git init
   git add .
   git commit -m "pxm parody site"
   git branch -M main
   git remote add origin https://github.com/<you>/pxm-site.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment**.
   Set **Source** to *Deploy from a branch*, **Branch** to `main` / `/ (root)`, then **Save**.

3. Wait ~1 minute. Your site is live at `https://<you>.github.io/pxm-site/`.

### Custom domain (optional)

To serve it at `pxm.dev` (if you owned it), add a `CNAME` file containing the domain
and configure DNS per GitHub's docs. The parody assumes `get.pxm.dev` / `docs.pxm.dev`.
