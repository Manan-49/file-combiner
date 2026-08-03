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

```bash
git clone https://github.com/Manan-49/file-combiner.git
cd file-combiner
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
