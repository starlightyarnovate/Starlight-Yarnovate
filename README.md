# Starlight Yarnovate

Single-page landing website for Starlight Yarnovate, an online crochet education brand.

Static site: HTML5, CSS3, and vanilla JavaScript. No build step, no packages, no backend.

## Project structure

```
/
├── index.html              Page markup and metadata
├── css/styles.css          Design tokens, components, responsive styles
├── js/site-content.js      EDITABLE content (text, contact details, gallery, social links)
├── js/main.js              Renders content, mobile menu, footer year
├── assets/
│   ├── logo/logo-placeholder.svg   TEMPORARY wordmark (replace with official logo)
│   └── images/hero-yarn.svg        Decorative illustration (not a product photo)
├── favicon.svg
└── robots.txt
```

## Editing content

Open `js/site-content.js`. Rules built into the page:

- Any value starting with `[` is an unresolved placeholder. It is **not shown** on the live page; a neutral fallback is shown instead.
- An empty `gallery.items` array hides the Creations section and its nav link.
- An empty `socialLinks` array hides the social links in the footer.

To add gallery photos, add entries such as:

```js
{ src: "assets/images/gallery/granny-square.webp", alt: "Crocheted granny square blanket in warm cream and gold yarn", caption: "" }
```

Use only photographs of the owner's own work, or mark illustrative images as such.

## Running locally

Any static server works. Opening `index.html` directly also works, since the content is loaded by a plain script, not `fetch`.

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying to GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then save.
4. After a minute the site is available at `https://<owner>.github.io/Starlight-Yarnovate/`.

No build command is needed. The site uses only relative paths, so it works from a repository subpath.

## Before going live

- Replace `assets/logo/logo-placeholder.svg` with the official logo, and set `brand.logo` in `js/site-content.js`.
- Add a favicon in `.ico` format if required. Currently `favicon.svg` is used.
- Add an Open Graph image and a canonical URL once the production domain is confirmed.
- Add a `sitemap.xml` once the production domain is confirmed.
- Fill in the learning description, instructor name, and biography with owner-approved text.
- Add only verified social profile links.
