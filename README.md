# File Combiner v3

**A private, browser-based code file combiner for AI prompts, code review, debugging, and documentation.**

[Open File Combiner](https://file-combiner.netlify.app/) · [Developer guides](https://file-combiner.netlify.app/guides/) · [SEO launch checklist](SEO-LAUNCH-CHECKLIST.md)

File Combiner turns a selected project folder or a group of text files into one clean **Markdown**, **XML**, or **plain-text** context file. It runs locally in the browser: there is no account, file-upload endpoint, tracking SDK, or server-side project processing.

> Review every generated result before you paste it into an external AI service. The built-in safety checks reduce risk; they cannot guarantee that content is safe to share.

## Highlights

### Local-first project intake

- Choose a folder, choose multiple individual files, or drop folders/files into the browser.
- Recursively reads nested folders when the browser exposes the File System Entry API.
- Skips known binary formats and processes text-based project files locally.
- Supports empty source files, duplicate filename disambiguation, progress feedback, and large-project chunking.

### Focused project context

- Standard, Minimal, None, and Aggressive exclusion presets.
- Custom glob-style exclusion patterns, maximum file size, searchable file list, language filters, path selection, and sorting.
- The Standard preset skips dependencies, build output, caches, locks, common environment files, and common private-key filenames.
- Auto-selects eligible files on a new project load, while retaining full manual selection control.
- Optional folder tree and safe whitespace compaction.

### AI-friendly output

- Markdown, XML, and plain-text output modes.
- Clear file boundaries and language-aware Markdown fences.
- Dynamic fences prevent source text containing backticks from breaking Markdown output.
- Practical context-size estimate and **Fit selection to budget** helper.
- Prompt templates, a project brief starter, custom prompts, copy, and format-aware download.

### Privacy and safety

- Uses browser File APIs only; the app does not upload selected source content.
- Optional likely-secret masking in **generated output** for common private keys, cloud keys, GitHub tokens, Slack tokens, JWTs, and explicit credential assignments.
- Output warning when likely values were masked.
- No third-party scripts, fonts, analytics, or dependencies.

### Production foundation

- Accessible keyboard navigation, focus-trapped dialogs, skip link, reduced-motion support, and responsive layout.
- Light/dark theme persisted in local storage.
- Installable offline shell (PWA) that caches public app assets only—not user files.
- Security headers, CSP, `robots.txt`, XML sitemap, canonical URLs, Open Graph/Twitter metadata, JSON-LD, custom 404 page, favicon, and app icons.
- Two indexable, internally linked developer guides for long-tail search intent.

## Use it

1. **Choose a folder** or drag in a folder/files.
2. Review the **inclusion settings**. Keep the Standard preset unless the task needs something it skips.
3. Search, filter, sort, paste paths, or toggle individual files to create a focused selection.
4. Choose output format and optional file tree. Keep **Mask likely secrets in output** enabled unless you have a specific reason not to.
5. Choose a context budget. Use **Fit selection to budget** if the selection is too large.
6. Click **Create output**, inspect it, then copy or download it.
7. Add an AI prompt or project brief only after the generated content is visible.

Keyboard shortcuts:

- <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> — focus file search
- <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd> — create output
- <kbd>Escape</kbd> — close an open dialog

## Run locally

No package installation or build step is required.

```bash
git clone https://github.com/Manan-49/file-combiner.git
cd file-combiner
python -m http.server 8000
```

Open <http://localhost:8000>. A local HTTP server is recommended because browsers limit some file and service-worker features when opening `index.html` directly from disk.

## Validate before deployment

The project intentionally has no runtime dependency tree. At minimum, validate JavaScript syntax and static assets:

```bash
node --check script.js
node --check theme.js
node --check sw.js
python -m http.server 8000
```

Then test these browser flows:

- Folder selection and multi-file selection
- Nested folder drag-and-drop in a Chromium browser
- Standard preset exclusion, a custom exclusion, and changed maximum size
- Search/filter/sort/selection, output in all three formats, and a download
- A file containing an obvious dummy secret to confirm output masking
- Keyboard-only modal navigation and mobile layout
- Offline reload after the first successful visit

## Deploy to Netlify

The repository is configured as a static site through `netlify.toml`:

- **Build command:** leave blank
- **Publish directory:** `.`
- **Node version:** not required

Push the changes to the repository branch connected to Netlify, or deploy the directory with the Netlify CLI. Confirm that these public URLs return `200` after deployment:

```text
/
/robots.txt
/sitemap.xml
/manifest.webmanifest
/guides/
/guides/combine-code-files-for-ai.html
/guides/share-code-with-ai-safely.html
```

## SEO and launch

The codebase ships the technical SEO foundation, but no website can honestly guarantee a #1 ranking. Rankings depend on query intent, competition, search-engine indexing, helpfulness, reputation, links, and user satisfaction.

The initial keyword focus is intentionally specific:

- **combine code files for AI**
- **codebase to prompt**
- **private code file combiner**
- **combine folder files into Markdown**
- **share code with AI safely**

Before promoting the site, complete the concrete owner actions in [SEO-LAUNCH-CHECKLIST.md](SEO-LAUNCH-CHECKLIST.md): verify the deployed domain in Google Search Console, submit the sitemap, request indexing, monitor queries and Core Web Vitals, and earn relevant editorial links. If a custom domain replaces `file-combiner.netlify.app`, update every canonical, Open Graph URL, sitemap URL, robots sitemap line, and JSON-LD URL in the project before deploying it.

## Project structure

```text
file-combiner/
├── index.html                         # App, semantic landing page, FAQ, internal links
├── script.js                          # Browser-only application logic
├── styles.css                         # App, content, responsive, and accessibility styles
├── theme.js                           # Early persisted-theme setup
├── sw.js                              # Static offline-shell cache only
├── netlify.toml                       # Netlify publish and security headers
├── robots.txt                         # Crawl policy and sitemap discovery
├── sitemap.xml                        # Home and guide URLs
├── manifest.webmanifest               # PWA metadata
├── favicon.svg
├── assets/og-file-combiner.png        # Social preview image
├── icons/                             # PWA icons
├── guides/                            # Indexable workflow and privacy guides
├── 404.html
├── llms.txt                           # Plain product context for AI crawlers/readers
└── SEO-LAUNCH-CHECKLIST.md
```

## Browser support

The core file selection and output flow works in current evergreen browsers. Dragging a nested folder directly onto the page relies on browser-specific File System Entry APIs, so the **Choose folder** path remains the reliable cross-browser option.

## License

[MIT](LICENSE)
