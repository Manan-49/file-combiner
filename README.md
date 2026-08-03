<<<<<<< HEAD
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
=======
# 🚀 File Combiner v2

![File Combiner v2 Demo](https://github.com/user-attachments/assets/12715ddd-65a5-4de3-b302-264c9fa3f3e0)

A lightweight, zero-dependency web application that lets you drag and drop a folder of code files, auto-exclude unwanted files (`node_modules`, `.git`, `.next`, `.venv`, etc.), select specific files, and combine them into a single markdown file with optional AI prompt templates. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools.

🔗 **Live Demo**: [file-combiner.netlify.app](https://file-combiner.netlify.app)

---

## ✨ Features

### Core

- **Drag-and-Drop Upload** — Drop a folder or click to browse
- **Smart Auto-Exclude** — Automatically filters out `node_modules`, `.git`, `.next`, `.venv`, `__pycache__`, `dist`, `build`, lock files, binaries, images, and 70+ other patterns
- **Exclude Presets** — Choose from None, Minimal, Standard, or Aggressive exclusion levels
- **Custom Exclude Patterns** — Add/remove your own patterns (supports wildcards like `*.log`)
- **Max File Size Filter** — Skip files larger than a configurable limit (50KB–10MB)
- **File Selection** — Select all, none, code files only, or filter by type (components, styles, config)
- **Search** — Real-time search bar to find files instantly

### Output

- **Markdown Generation** — Combine files into markdown with optional fenced code blocks and language-specific syntax highlighting
- **Folder Tree View** — Optionally include a visual folder structure in the output
- **Minification** — Strip comments and whitespace from code output
- **AI Prompt Templates** — 10 pre-built prompts (debug, refactor, explain, optimize, review, test, document, security, architecture, convert)
- **Custom Prompts** — Add your own prompt or project context template
- **Copy to Clipboard** — One-click copy using modern Clipboard API
- **Download** — Export as `.md` or `.txt`

### Intelligence

- **Token Counter** — Estimates token count for AI model compatibility
- **Token Limit Selector** — Presets for GPT-3.5 (4K/16K), GPT-4 (8K), GPT-4 Turbo (128K), Claude 3.5 (200K), Gemini 1.5 (1M)
- **Token Progress Bar** — Visual indicator with safe/warning/danger states
- **Language Breakdown** — Bar chart showing file type distribution across your project

### UI/UX

- **Dark/Light Theme** — Toggle with persistent preference
- **File Preview** — Click the 👁️ icon to preview any file before combining
- **Toast Notifications** — Non-intrusive feedback for all actions
- **Responsive Design** — Mobile-first layout that works on all screen sizes
- **Accessibility** — ARIA attributes and keyboard navigation
- **Persistent Settings** — Theme, exclude patterns, and max size saved to localStorage
- **Zero Dependencies** — Pure HTML/CSS/JS, no frameworks or build tools

### Excluded File Info

- **Transparency** — See exactly which files were excluded and why
- **Expandable Details** — Collapsible list showing excluded file paths and reasons

---

## 📊 Auto-Exclude Patterns (Standard Preset)

| Category             | Patterns                                                           |
| -------------------- | ------------------------------------------------------------------ |
| **Package Managers** | `node_modules`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` |
| **Build Output**     | `dist`, `build`, `out`, `.next`, `.nuxt`, `.svelte-kit`, `.output` |
| **Version Control**  | `.git`                                                             |
| **Python**           | `.venv`, `venv`, `__pycache__`, `*.pyc`                            |
| **Cache**            | `.cache`, `.turbo`                                                 |
| **System**           | `.DS_Store`, `Thumbs.db`                                           |
| **Logs**             | `*.log`, `*.lock`                                                  |
| **Test Coverage**    | `coverage`, `.nyc_output`                                          |
| **Environment**      | `.env`, `.env.local`                                               |

The **Aggressive** preset adds 70+ more patterns including images, fonts, binaries, IDE folders, and compiled files.

---

## 🛠️ Tech Stack

| Technology            | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| **HTML5**             | Semantic structure with ARIA accessibility                     |
| **CSS3**              | CSS variables, dark mode, responsive design, custom animations |
| **JavaScript (ES6+)** | File processing, UI interactions, markdown generation          |
| **Netlify**           | Static site hosting with continuous deployment                 |

**Zero external dependencies** — no React, no Tailwind, no GSAP, no build step.

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Git](https://git-scm.com/) for version control
- A [Netlify](https://www.netlify.com/) account for deployment (optional)

### Installation
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb

```bash
git clone https://github.com/Manan-49/file-combiner.git
cd file-combiner
<<<<<<< HEAD
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
=======
```

### Run Locally

Just open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

### Deploy to Netlify

1. Push to GitHub
2. Connect the repository on [Netlify](https://app.netlify.com)
3. Set publish directory to `.` (root)
4. Deploy — no build command needed

---

## 📁 Project Structure

```
file-combiner/
├── index.html          # Main HTML structure
├── script.js           # All application logic
├── styles.css          # Styles with CSS variables & dark mode
├── netlify.toml        # Netlify deployment config
└── README.md           # This file
```

---

## 📝 Usage

1. **Drop a folder** onto the drop zone (or click to browse)
2. **Configure exclusions** — Choose a preset or add custom patterns
3. **Select files** — Use Select All, Code Files, or pick individually
4. **Search & filter** — Find specific files by name or type
5. **Preview** — Click 👁️ to view file contents before combining
6. **Set options** — Toggle code blocks, folder tree, minification
7. **Combine** — Click "🔗 Combine Files" to generate output
8. **Add AI context** — Apply a prompt template or project context
9. **Check tokens** — Select your AI model and verify token count
10. **Export** — Copy to clipboard or download as `.md` / `.txt`

---

## 🔄 Changelog

### v2.0.0 (Latest)

- ✅ Auto-exclude patterns (70+ for node_modules, .git, .next, .venv, etc.)
- ✅ Configurable exclude UI with presets (None/Minimal/Standard/Aggressive)
- ✅ Custom exclude patterns with wildcard support
- ✅ Max file size filter
- ✅ Excluded files transparency panel
- ✅ Real-time file search
- ✅ Dark/Light theme toggle
- ✅ File preview modal
- ✅ Language breakdown chart
- ✅ Token limit selector (GPT-3.5/4/Claude/Gemini)
- ✅ Token progress bar with warnings
- ✅ Folder tree view in output
- ✅ Download as .txt
- ✅ Toast notifications
- ✅ localStorage persistence
- ✅ Modern Clipboard API
- ✅ Removed GSAP dependency (zero dependencies)
- ✅ Bug fixes (event handling, proper reset, accessibility)

### v1.0.0

- Initial release with drag-and-drop, file selection, code blocks, and AI prompts

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Manan** — [GitHub](https://github.com/Manan-49)
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
