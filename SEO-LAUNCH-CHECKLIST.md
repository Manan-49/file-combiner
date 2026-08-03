# File Combiner — SEO Launch Checklist

> **Reality check:** technical SEO makes a site crawlable, understandable, fast, and shareable. It does **not** guarantee a #1 position. Search results depend on query intent, competing pages, trust, links, user satisfaction, indexing, and time. Avoid anyone offering a guaranteed ranking, automated backlinks, or keyword stuffing.

This project now includes the technical foundation: semantic indexable content, unique title/description, canonical URL, Open Graph image, JSON-LD, `robots.txt`, `sitemap.xml`, a custom 404 page, internal links, two useful guides, PWA assets, and security/performance headers. The remaining work needs access to the deployed property and ongoing product promotion.

## 0. Before publishing

- [ ] Review all product claims on the home page and guides. In particular, confirm that “local browser processing” accurately matches the deployed app.
- [ ] Run the validation commands in `README.md` and manually test file selection, output, secret masking, downloads, dialogs, and mobile layout.
- [ ] Deploy a preview and check every item below with the browser Network panel open.
- [ ] Confirm there is no accidental public `.env`, secret, test data, archive, or build artifact in the Git repository.
- [ ] Keep the Netlify deployment on HTTPS.

## 1. Confirm the technical URLs after deployment

Open these on the production domain and ensure they return `200` with the expected content:

```text
/
/robots.txt
/sitemap.xml
/manifest.webmanifest
/favicon.svg
/assets/og-file-combiner.png
/guides/
/guides/combine-code-files-for-ai.html
/guides/share-code-with-ai-safely.html
```

Then inspect the root page source. Verify:

- [ ] There is one visible `<h1>` matching the product’s primary use case.
- [ ] The canonical URL is exactly `https://file-combiner.netlify.app/`.
- [ ] `og:url`, `og:image`, JSON-LD URLs, `robots.txt`, and `sitemap.xml` use the same host.
- [ ] The social preview image is reachable without login.
- [ ] No deploy preview URL is used as a canonical or sitemap URL.
- [ ] `robots.txt` does not block `Googlebot` or `Bingbot`.
- [ ] The sitemap parses as XML.
- [ ] The browser console has no CSP, service worker, CSS, or JavaScript errors.

## 2. If moving to a custom domain

A short, memorable custom domain is usually better for trust and sharing than a hosting subdomain. Do **not** split indexing across both domains.

1. Add the custom domain in Netlify and configure DNS/HTTPS.
2. Set the preferred domain so the other host permanently redirects to it.
3. Replace `https://file-combiner.netlify.app` everywhere in:
   - `index.html` canonical, Open Graph/Twitter URLs, and JSON-LD
   - each file in `guides/`
   - `robots.txt`
   - `sitemap.xml`
   - `llms.txt`
4. Deploy, test redirects, then submit the new sitemap in Search Console.
5. Keep redirects active permanently. Do not let both hosts serve indexable duplicates.

## 3. Google Search Console — owner action

This is the highest-priority post-deploy step.

- [ ] Create or open the relevant Google Search Console property.
- [ ] Verify the exact HTTPS URL-prefix property for the current Netlify domain, or verify a Domain property once a custom domain exists.
- [ ] Submit `https://file-combiner.netlify.app/sitemap.xml` in **Sitemaps**.
- [ ] Use **URL inspection** on the home page and each guide. Request indexing after the new production version is live.
- [ ] Wait for Google to crawl; do not repeatedly request the same URL every day.
- [ ] Check **Pages** for blocked, duplicate, redirect, soft-404, or canonical issues.
- [ ] Check **Core Web Vitals** and **Mobile Usability** after data accumulates.
- [ ] Add the same site to Bing Webmaster Tools and submit the sitemap there too.

## 4. Keyword map and page intent

Do not try to rank the home page for every broad “file merger” query. Those queries often mean PDF, Word, image, or generic document merging and bring the wrong audience.

| Page | Primary intent | Natural phrases to monitor |
| --- | --- | --- |
| `/` | Use a browser tool now | `combine code files for AI`, `private code file combiner`, `codebase to prompt`, `combine folder files markdown` |
| `/guides/combine-code-files-for-ai.html` | Learn a workflow | `how to combine code files for AI`, `how to give codebase to ChatGPT`, `AI code context` |
| `/guides/share-code-with-ai-safely.html` | Learn privacy practice | `share code with AI safely`, `remove secrets before ChatGPT`, `code privacy AI` |
| `/guides/` | Browse topical content | `AI code context guide`, `code prompt guide` |

- [ ] Use these phrases naturally in future release notes, GitHub documentation, and genuinely useful articles.
- [ ] Do not add hidden text, repeated keyword lists, doorway pages, or copied competitor content.
- [ ] Do not create low-value pages just to target every variation of “file combiner.” Publish only pages that solve a real developer question.

## 5. Earn credible discovery and links

A new tool does not become first merely by adding metadata. It needs people who use and mention it.

Recommended, non-spammy launch sequence:

- [ ] Improve the GitHub repository description, topics, social preview, and README with the live URL.
- [ ] Create a tagged GitHub release describing v3’s local-first, output-format, safety, and SEO improvements.
- [ ] Write one original launch post that demonstrates a real workflow: selecting a bug’s relevant files, respecting a token budget, and reviewing the result before using an AI tool.
- [ ] Share the post where it is genuinely relevant: a personal developer blog, dev community profile, relevant GitHub discussions, or a useful answer to a question you can substantively solve.
- [ ] Encourage real users to bookmark, star, fork, report issues, or link to the tool when it is useful. Never buy links or reviews.
- [ ] Add a short “File Combiner vs. manual copy/paste” comparison only if it is honest, maintained, and materially useful.

Quality mentions from relevant developer communities are much more valuable than a large number of low-quality directory listings.

## 6. Measure what happens, then improve

Review Search Console monthly once there is data. Track queries, impressions, clicks, click-through rate, and landing pages.

| Signal | What it can mean | Product/content response |
| --- | --- | --- |
| Impressions but low CTR | Title/description does not match the query | Rewrite the title/description for the actual query; do not keyword-stuff. |
| Ranking for generic document merging | Wrong audience intent | Strengthen code/AI wording and avoid promises about PDFs or Office files. |
| Guide gets impressions but not clicks | Intro is too vague or title is weak | Add a clearer practical outcome and a more specific title. |
| Users load then leave | Onboarding or output quality is weak | Watch feedback, reduce friction, improve defaults, and add examples. |
| Queries mention a missing use case | There is real demand | Build the feature or write one in-depth, accurate guide. |

Suggested checkpoints:

- **Week 1:** Confirm indexing, sitemap discovery, and error-free rendering.
- **Week 4:** Review first query/impression data and refine snippets only where data supports it.
- **Days 60–90:** Publish one substantial update or guide based on real user feedback; measure whether it earns links and returning use.

## 7. Keep the site technically healthy

- [ ] Update `sitemap.xml` and each page’s `lastmod`/structured data date when publishing a meaningful guide or major update.
- [ ] Increment `CACHE_NAME` in `sw.js` when changing the offline app shell, so returning users receive the new assets.
- [ ] Re-test CSP after adding any service, analytics, form, font, or third-party asset. Do not weaken the policy to `*` just to make something work.
- [ ] Keep dependencies at zero unless a dependency clearly improves reliability, security, or accessibility.
- [ ] Re-run mobile and keyboard testing after every notable UI change.
- [ ] Keep privacy claims accurate as the architecture evolves.

## What has already been shipped in this version

- Search-focused page title, description, canonical, social cards, and JSON-LD (`SoftwareApplication`, `WebSite`, `FAQPage`, and `Article`/`FAQPage` for guides).
- Semantic homepage copy, FAQ, privacy details, and internal links.
- Three useful indexable guide URLs, with unique copy and clear search intent.
- `robots.txt`, multi-URL XML sitemap, and `llms.txt`.
- Custom social preview image, favicon, PWA manifest, static offline shell, and custom 404 page.
- Netlify CSP, referrer, permission, anti-sniffing, framing, and cache headers.

The code is ready for deployment. Search visibility now requires verification, indexing, relevant promotion, and consistent product quality.
