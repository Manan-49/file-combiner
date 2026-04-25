// ─────────────────────────────────────────────────────────────────────────────
// File Combiner v2 — script.js
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  "use strict";

  // ── Constants ─────────────────────────────────────────────────────────────

  const FENCE = "```";

  const CODE_EXTENSIONS = new Set([
    "js",
    "jsx",
    "ts",
    "tsx",
    "py",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
    "cs",
    "php",
    "rb",
    "go",
    "rs",
    "swift",
    "kt",
    "kts",
    "scala",
    "html",
    "htm",
    "css",
    "scss",
    "sass",
    "less",
    "vue",
    "svelte",
    "astro",
    "md",
    "mdx",
    "json",
    "xml",
    "yaml",
    "yml",
    "sql",
    "sh",
    "bash",
    "zsh",
    "ps1",
    "bat",
    "cmd",
    "dockerfile",
    "makefile",
    "toml",
    "ini",
    "cfg",
    "conf",
    "graphql",
    "gql",
    "prisma",
    "proto",
    "r",
    "lua",
    "perl",
    "pl",
    "dart",
    "ex",
    "exs",
    "elm",
    "hs",
    "clj",
    "erl",
    "tf",
    "hcl",
    "nix",
    "zig",
    "v",
    "nim",
    "env",
  ]);

  const MINIFY_SAFE_EXTENSIONS = new Set([
    "js",
    "jsx",
    "ts",
    "tsx",
    "css",
    "scss",
    "sass",
    "less",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
    "cs",
    "php",
    "go",
    "rs",
    "swift",
    "kt",
    "kts",
    "scala",
  ]);

  const LANGUAGE_MAP = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    py: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    h: "c",
    hpp: "cpp",
    cs: "csharp",
    php: "php",
    rb: "ruby",
    go: "go",
    rs: "rust",
    swift: "swift",
    kt: "kotlin",
    kts: "kotlin",
    scala: "scala",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",
    vue: "vue",
    svelte: "svelte",
    astro: "astro",
    md: "markdown",
    mdx: "markdown",
    json: "json",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
    sql: "sql",
    sh: "bash",
    bash: "bash",
    zsh: "zsh",
    ps1: "powershell",
    bat: "batch",
    cmd: "batch",
    dockerfile: "dockerfile",
    makefile: "makefile",
    toml: "toml",
    ini: "ini",
    cfg: "ini",
    conf: "nginx",
    graphql: "graphql",
    gql: "graphql",
    prisma: "prisma",
    proto: "protobuf",
    r: "r",
    lua: "lua",
    perl: "perl",
    pl: "perl",
    dart: "dart",
    ex: "elixir",
    exs: "elixir",
    elm: "elm",
    hs: "haskell",
    clj: "clojure",
    erl: "erlang",
    tf: "hcl",
    hcl: "hcl",
    nix: "nix",
    zig: "zig",
    v: "v",
    nim: "nim",
    env: "bash",
  };

  const PROMPT_TEMPLATES = {
    Debug:
      "**DEBUG REQUEST**: Analyze the following code and identify bugs or issues:\n\n",
    Refactor:
      "**REFACTOR REQUEST**: Review this code and suggest improvements for readability, performance, and maintainability:\n\n",
    Explain:
      "**EXPLAIN REQUEST**: Explain how this code works, including main components and logic flow:\n\n",
    Optimize:
      "**OPTIMIZATION REQUEST**: Suggest performance optimizations and best practices:\n\n",
    Review: "**CODE REVIEW**: Provide a comprehensive code review:\n\n",
    "Write tests":
      "**TEST REQUEST**: Write unit tests for the following code:\n\n",
    Document:
      "**DOCUMENTATION REQUEST**: Create comprehensive documentation:\n\n",
    Security: "**SECURITY AUDIT**: Analyze for security vulnerabilities:\n\n",
    Architecture:
      "**ARCHITECTURE REVIEW**: Review the structure and suggest improvements:\n\n",
    Convert: "**CONVERSION REQUEST**: Help convert/migrate this code:\n\n",
  };

  const EXCLUDE_PRESETS = {
    none: [],
    minimal: ["node_modules", ".git", ".agents"],
    standard: [
      "node_modules",
      ".git",
      ".agents",
      ".next",
      ".nuxt",
      ".svelte-kit",
      ".output",
      ".venv",
      "venv",
      "__pycache__",
      ".cache",
      ".turbo",
      "dist",
      "build",
      "out",
      ".DS_Store",
      "Thumbs.db",
      "*.lock",
      "*.log",
      "*.pyc",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "coverage",
      ".nyc_output",
      ".env",
      ".env.local",
    ],
    aggressive: [
      "node_modules",
      ".git",
      ".agents",
      ".next",
      ".nuxt",
      ".svelte-kit",
      ".output",
      ".venv",
      "venv",
      "env",
      "__pycache__",
      ".cache",
      ".turbo",
      ".parcel-cache",
      "dist",
      "build",
      "out",
      ".vercel",
      ".netlify",
      ".DS_Store",
      "Thumbs.db",
      "desktop.ini",
      "*.lock",
      "*.log",
      "*.pyc",
      "*.pyo",
      "*.class",
      "*.o",
      "*.obj",
      "*.min.js",
      "*.min.css",
      "*.map",
      "*.chunk.js",
      "*.chunk.css",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "composer.lock",
      "Gemfile.lock",
      "Cargo.lock",
      "poetry.lock",
      "coverage",
      ".nyc_output",
      ".jest",
      ".pytest_cache",
      ".idea",
      ".vscode",
      ".vs",
      ".eclipse",
      ".settings",
      ".terraform",
      ".vagrant",
      "vendor",
      "bower_components",
      "tmp",
      "temp",
      ".tmp",
      "*.sqlite",
      "*.db",
      "*.ico",
      "*.png",
      "*.jpg",
      "*.jpeg",
      "*.gif",
      "*.svg",
      "*.webp",
      "*.bmp",
      "*.woff",
      "*.woff2",
      "*.ttf",
      "*.eot",
      "*.otf",
      "*.mp3",
      "*.mp4",
      "*.wav",
      "*.avi",
      "*.mov",
      "*.mkv",
      "*.zip",
      "*.tar",
      "*.gz",
      "*.rar",
      "*.7z",
      "*.exe",
      "*.dll",
      "*.so",
      "*.dylib",
      "*.pdf",
      "*.doc",
      "*.docx",
      "*.xls",
      "*.xlsx",
      ".env",
      ".env.local",
      ".env.production",
      ".env.development",
    ],
  };

  const LANG_COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#f97316",
    "#6366f1",
    "#84cc16",
    "#ef4444",
    "#14b8a6",
    "#a78bfa",
  ];

  // ── State ─────────────────────────────────────────────────────────────────

  const state = {
    allRawFiles: [],
    allFiles: [],
    excludedFiles: [],
    selectedPaths: new Set(),
    excludePatterns: new Set(),
    minifyOutput: false,
    isCombining: false,
    activeFilter: "all",
  };

  // O(1) checkbox sync — keyed by file path
  const fileItemCache = new Map();

  // ── DOM Refs ──────────────────────────────────────────────────────────────

  const $ = (id) => document.getElementById(id);

  // dom is populated in init() after DOMContentLoaded fires
  const dom = {};

  // ── Init ──────────────────────────────────────────────────────────────────

  function init() {
    // Populate all DOM refs now that the document is ready
    dom.dropZone = $("dropZone");
    dom.folderInput = $("folderInput");
    dom.loadProgress = $("loadProgress");
    dom.loadProgressLabel = $("loadProgressLabel");
    dom.loadProgressPct = $("loadProgressPct");
    dom.progressFill = $("progressFill");
    dom.settingsPanel = $("settingsPanel");
    dom.settingsPanelHeader = $("settingsPanelHeader");
    dom.settingsPanelBody = $("settingsPanelBody");
    dom.langPanelHeader = $("langPanelHeader");
    dom.langPanelBody = $("langPanelBody");
    dom.stats = $("stats");
    dom.languageBreakdown = $("languageBreakdown");
    dom.searchWrapper = $("searchWrapper");
    dom.fileList = $("fileList");
    dom.actionControls = $("actionControls");
    dom.outputSection = $("outputSection");
    dom.fileItems = $("fileItems");
    dom.fileEmptyState = $("fileEmptyState");
    dom.excludeTags = $("excludeTags");
    dom.excludeInfo = $("excludeInfo");
    dom.excludeInput = $("excludeInput");
    dom.addExcludeBtn = $("addExcludeBtn");
    dom.maxFileSize = $("maxFileSize");
    dom.searchInput = $("searchInput");
    dom.searchClear = $("searchClear");
    dom.languageBars = $("languageBars");
    dom.totalFiles = $("totalFiles");
    dom.selectedFiles = $("selectedFiles");
    dom.totalSize = $("totalSize");
    dom.excludedCount = $("excludedCount");
    dom.outputTextarea = $("outputTextarea");
    dom.tokenCounter = $("tokenCounter");
    dom.tokenCount = $("tokenCount");
    dom.tokenLimit = $("tokenLimit");
    dom.tokenProgress = $("tokenProgress");
    dom.tokenWarning = $("tokenWarning");
    dom.tokenLimitSelect = $("tokenLimitSelect");
    dom.themeToggle = $("themeToggle");
    dom.iconMoon = $("iconMoon");
    dom.iconSun = $("iconSun");
    dom.combineBtn = $("combineBtn");
    dom.downloadMdBtn = $("downloadMdBtn");
    dom.downloadTxtBtn = $("downloadTxtBtn");
    dom.copyBtn = $("copyBtn");
    dom.customPromptBtn = $("customPromptBtn");
    dom.promptTemplateBtn = $("promptTemplateBtn");
    dom.projectContextBtn = $("projectContextBtn");
    dom.pastePathsBtn = $("pastePathsBtn");
    dom.resetBtn = $("resetBtn");
    dom.minifyBtn = $("minifyBtn");
    dom.minifyState = $("minifyState");
    dom.selectAllBtn = $("selectAllBtn");
    dom.selectNoneBtn = $("selectNoneBtn");
    dom.selectCodeBtn = $("selectCodeBtn");
    dom.useCodeBlocks = $("useCodeBlocks");
    dom.includeTree = $("includeTree");
    dom.previewModal = $("previewModal");
    dom.previewFileName = $("previewFileName");
    dom.previewContent = $("previewContent");
    dom.previewTruncated = $("previewTruncated");
    dom.closePreviewBtn = $("closePreviewBtn");
    dom.promptModal = $("promptModal");
    dom.closePromptBtn = $("closePromptBtn");
    dom.promptButtons = $("promptButtons");
    dom.customPromptModal = $("customPromptModal");
    dom.customPromptInput = $("customPromptInput");
    dom.applyCustomPromptBtn = $("applyCustomPromptBtn");
    dom.cancelCustomPromptBtn = $("cancelCustomPromptBtn");
    dom.closeCustomPromptBtn = $("closeCustomPromptBtn");
    dom.pathModal = $("pathModal");
    dom.pathTextarea = $("pathTextarea");
    dom.matchSelectBtn = $("matchSelectBtn");
    dom.matchAddBtn = $("matchAddBtn");
    dom.cancelPathBtn = $("cancelPathBtn");
    dom.closePathBtn = $("closePathBtn");
    dom.pathResults = $("pathResults");
    dom.toastContainer = $("toastContainer");

    loadSettings();
    bindEvents();
    syncThemeIcon();
  }

  // ── Event Binding ─────────────────────────────────────────────────────────

  function bindEvents() {
    // Drop zone
    dom.dropZone.addEventListener("click", () => dom.folderInput.click());
    dom.dropZone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dom.folderInput.click();
      }
    });
    dom.dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dom.dropZone.classList.add("dragover");
    });
    dom.dropZone.addEventListener("dragleave", (e) => {
      if (!dom.dropZone.contains(e.relatedTarget))
        dom.dropZone.classList.remove("dragover");
    });
    dom.dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dom.dropZone.classList.remove("dragover");
      handleFiles(Array.from(e.dataTransfer.files));
    });
    dom.folderInput.addEventListener("change", (e) =>
      handleFiles(Array.from(e.target.files)),
    );

    // Collapsible panels
    setupCollapsible(dom.settingsPanelHeader, dom.settingsPanelBody);
    setupCollapsible(dom.langPanelHeader, dom.langPanelBody);

    // Exclude patterns
    dom.addExcludeBtn.addEventListener("click", addExcludePattern);
    dom.excludeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addExcludePattern();
    });
    dom.excludeTags.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remove-pattern]");
      if (btn) removeExcludePattern(btn.dataset.removePattern);
    });
    dom.maxFileSize.addEventListener("change", () => {
      saveSettings();
      reprocessFiles();
    });

    // Preset chips
    document.querySelectorAll("[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.dataset.preset, btn));
    });

    // Filter buttons
    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll("[data-filter]")
          .forEach((b) => b.classList.remove("chip-active"));
        btn.classList.add("chip-active");
        state.activeFilter = btn.dataset.filter;
        applySearchAndFilter();
      });
    });

    // Search
    dom.searchInput.addEventListener(
      "input",
      debounce(() => {
        dom.searchClear.classList.toggle("hidden", !dom.searchInput.value);
        applySearchAndFilter();
      }, 150),
    );
    dom.searchClear.addEventListener("click", () => {
      dom.searchInput.value = "";
      dom.searchClear.classList.add("hidden");
      applySearchAndFilter();
      dom.searchInput.focus();
    });

    // Selection
    dom.selectAllBtn.addEventListener("click", selectAll);
    dom.selectNoneBtn.addEventListener("click", selectNone);
    dom.selectCodeBtn.addEventListener("click", selectCodeFiles);

    // Actions
    dom.combineBtn.addEventListener("click", combineFiles);
    dom.downloadMdBtn.addEventListener("click", downloadMarkdown);
    dom.downloadTxtBtn.addEventListener("click", downloadText);
    dom.copyBtn.addEventListener("click", copyToClipboard);
    dom.customPromptBtn.addEventListener("click", openCustomPromptModal);
    dom.promptTemplateBtn.addEventListener("click", openPromptModal);
    dom.projectContextBtn.addEventListener("click", addProjectContext);
    dom.pastePathsBtn.addEventListener("click", openPathSelector);
    dom.resetBtn.addEventListener("click", reset);
    dom.minifyBtn.addEventListener("click", toggleMinify);

    // Output textarea — live token update
    dom.outputTextarea.addEventListener(
      "input",
      debounce(() => {
        if (!dom.outputSection.classList.contains("hidden")) {
          dom.tokenCounter.classList.remove("hidden");
          updateTokenDisplay();
        }
      }, 200),
    );
    dom.tokenLimitSelect.addEventListener("change", updateTokenDisplay);

    // Theme
    dom.themeToggle.addEventListener("click", toggleTheme);

    // Modal close buttons
    dom.closePreviewBtn.addEventListener("click", () =>
      closeModal("previewModal"),
    );
    dom.closePromptBtn.addEventListener("click", () =>
      closeModal("promptModal"),
    );
    dom.closeCustomPromptBtn.addEventListener("click", () =>
      closeModal("customPromptModal"),
    );
    dom.cancelCustomPromptBtn.addEventListener("click", () =>
      closeModal("customPromptModal"),
    );
    dom.closePathBtn.addEventListener("click", () => closeModal("pathModal"));
    dom.cancelPathBtn.addEventListener("click", () => closeModal("pathModal"));

    // Custom prompt
    dom.applyCustomPromptBtn.addEventListener("click", applyCustomPrompt);
    dom.customPromptInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) applyCustomPrompt();
    });

    // Path modal
    dom.matchSelectBtn.addEventListener("click", () =>
      matchAndSelectPaths(false),
    );
    dom.matchAddBtn.addEventListener("click", () => matchAndSelectPaths(true));

    // Overlay click-to-close
    ["previewModal", "promptModal", "customPromptModal", "pathModal"].forEach(
      (id) => {
        const el = $(id);
        el.addEventListener("click", (e) => {
          if (e.target === el) closeModal(id);
        });
      },
    );

    // Global keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        [
          "previewModal",
          "promptModal",
          "customPromptModal",
          "pathModal",
        ].forEach(closeModal);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!dom.actionControls.classList.contains("hidden")) combineFiles();
      }
    });
  }

  // ── Collapsible Panels ────────────────────────────────────────────────────

  function setupCollapsible(header, body) {
    header.addEventListener("click", () => toggleCollapsible(header, body));
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCollapsible(header, body);
      }
    });
  }

  function toggleCollapsible(header, body) {
    const isOpen = !body.classList.contains("collapsed");
    body.classList.toggle("collapsed", isOpen);
    header.setAttribute("aria-expanded", String(!isOpen));
    header.querySelector(".chevron").classList.toggle("chevron-up", !isOpen);
  }

  // ── Theme ─────────────────────────────────────────────────────────────────

  function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    syncThemeIcon();
    saveSettings();
  }

  function syncThemeIcon() {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    dom.iconMoon.classList.toggle("hidden", isDark);
    dom.iconSun.classList.toggle("hidden", !isDark);
    dom.themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  // ── Settings ──────────────────────────────────────────────────────────────

  function saveSettings() {
    try {
      localStorage.setItem(
        "fc-exclude",
        JSON.stringify([...state.excludePatterns]),
      );
      localStorage.setItem(
        "fc-theme",
        document.documentElement.getAttribute("data-theme"),
      );
      localStorage.setItem("fc-maxSize", dom.maxFileSize.value);
    } catch (e) {
      console.warn("File Combiner: Could not save settings.", e);
    }
  }

  function loadSettings() {
    try {
      const savedExclude = localStorage.getItem("fc-exclude");
      state.excludePatterns = savedExclude
        ? new Set(JSON.parse(savedExclude))
        : new Set(EXCLUDE_PRESETS.standard);

      const theme = localStorage.getItem("fc-theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);

      const maxSize = localStorage.getItem("fc-maxSize");
      if (maxSize) dom.maxFileSize.value = maxSize;
    } catch (e) {
      console.warn("File Combiner: Could not load settings.", e);
      state.excludePatterns = new Set(EXCLUDE_PRESETS.standard);
    }
    renderExcludeTags();
    syncActivePreset();
  }

  function syncActivePreset() {
    const current = JSON.stringify([...state.excludePatterns].sort());
    document.querySelectorAll("[data-preset]").forEach((btn) => {
      const preset = JSON.stringify(
        [...(EXCLUDE_PRESETS[btn.dataset.preset] || [])].sort(),
      );
      btn.classList.toggle("chip-active", current === preset);
    });
  }

  // ── File Handling ─────────────────────────────────────────────────────────

  function handleFiles(files) {
    if (!files.length) return;
    state.allRawFiles = files.filter((f) => f.size > 0);
    if (!state.allRawFiles.length) {
      showToast("No readable files found", "warning");
      return;
    }
    reprocessFiles();
    showSections();
    showToast(
      `Loaded ${state.allRawFiles.length} file${state.allRawFiles.length !== 1 ? "s" : ""}`,
    );
  }

  function reprocessFiles() {
    if (!state.allRawFiles.length) return;

    // Show progress bar
    showProgress(0, "Scanning files…");

    const maxSize = parseInt(dom.maxFileSize.value) || 0;
    state.allFiles = [];
    state.excludedFiles = [];

    const total = state.allRawFiles.length;

    // Process in chunks to allow UI to update and progress to render
    let i = 0;
    const CHUNK = 500;

    function processChunk() {
      const end = Math.min(i + CHUNK, total);
      for (; i < end; i++) {
        const file = state.allRawFiles[i];
        const path = file.webkitRelativePath || file.name;
        const reason = getExclusionReason(path, file.size, maxSize);
        if (reason) {
          state.excludedFiles.push({ path, reason, size: file.size });
        } else {
          state.allFiles.push(file);
        }
      }
      const pct = Math.round((i / total) * 100);
      showProgress(pct, `Scanning files… ${i} / ${total}`);

      if (i < total) {
        requestAnimationFrame(processChunk);
      } else {
        // Done scanning — preserve selections
        const currentPaths = new Set(
          state.allFiles.map((f) => f.webkitRelativePath || f.name),
        );
        const removed = [...state.selectedPaths].filter(
          (p) => !currentPaths.has(p),
        );
        removed.forEach((p) => state.selectedPaths.delete(p));

        if (removed.length) {
          showToast(
            `${removed.length} selected file${removed.length > 1 ? "s" : ""} removed by filter`,
            "warning",
          );
        }

        // Build DOM
        showProgress(100, "Building file list…");
        // slight delay so 100% renders before DOM work begins
        setTimeout(() => {
          displayFiles();
          updateStats();
          updateExcludeInfo();
          renderLanguageBreakdown();
          applySearchAndFilter();
          hideProgress();
        }, 80);
      }
    }

    requestAnimationFrame(processChunk);
  }

  // ── Progress Bar ──────────────────────────────────────────────────────────

  function showProgress(pct, label) {
    dom.loadProgress.classList.remove("hidden");
    dom.progressFill.style.width = `${pct}%`;
    dom.loadProgressLabel.textContent = label;
    dom.loadProgressPct.textContent = `${pct}%`;
  }

  function hideProgress() {
    // Fade out
    dom.loadProgress.classList.add("progress-done");
    setTimeout(() => {
      dom.loadProgress.classList.add("hidden");
      dom.loadProgress.classList.remove("progress-done");
      dom.progressFill.style.width = "0%";
    }, 400);
  }

  // ── Exclusion ─────────────────────────────────────────────────────────────

  function getExclusionReason(filePath, fileSize, maxSize) {
    if (maxSize > 0 && fileSize > maxSize) {
      return `Size > ${formatFileSize(maxSize)}`;
    }
    const segments = filePath.split("/");
    for (const pattern of state.excludePatterns) {
      if (pattern.includes("*")) {
        const escaped = pattern
          .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*");
        const re = new RegExp(`^${escaped}$`, "i");
        if (segments.some((s) => re.test(s))) return `Pattern: ${pattern}`;
      } else {
        if (segments.some((s) => s === pattern)) return `Pattern: ${pattern}`;
      }
    }
    return null;
  }

  // ── Exclude Patterns ──────────────────────────────────────────────────────

  function addExcludePattern() {
    const val = dom.excludeInput.value.trim();
    if (!val) return;
    if (state.excludePatterns.has(val)) {
      showToast(`"${val}" already exists`, "warning");
      return;
    }
    state.excludePatterns.add(val);
    dom.excludeInput.value = "";
    renderExcludeTags();
    syncActivePreset();
    saveSettings();
    reprocessFiles();
  }

  function removeExcludePattern(pattern) {
    state.excludePatterns.delete(pattern);
    renderExcludeTags();
    syncActivePreset();
    saveSettings();
    reprocessFiles();
  }

  function applyPreset(name, btn) {
    state.excludePatterns = new Set(EXCLUDE_PRESETS[name] || []);
    document
      .querySelectorAll("[data-preset]")
      .forEach((b) => b.classList.remove("chip-active"));
    if (btn) btn.classList.add("chip-active");
    renderExcludeTags();
    saveSettings();
    reprocessFiles();
  }

  function renderExcludeTags() {
    if (!state.excludePatterns.size) {
      dom.excludeTags.innerHTML =
        '<span class="tag-empty">No patterns active</span>';
      return;
    }
    dom.excludeTags.innerHTML = [...state.excludePatterns]
      .map(
        (p) => `<span class="tag">
          <span class="tag-text">${escapeHtml(p)}</span>
          <button class="tag-remove" data-remove-pattern="${escapeHtml(p)}" aria-label="Remove ${escapeHtml(p)}">&times;</button>
        </span>`,
      )
      .join("");
  }

  function updateExcludeInfo() {
    if (!state.excludedFiles.length) {
      dom.excludeInfo.innerHTML = "";
      return;
    }
    const items = state.excludedFiles
      .slice(0, 100)
      .map(
        (f) =>
          `<li><code>${escapeHtml(f.path)}</code> — ${escapeHtml(f.reason)}</li>`,
      )
      .join("");
    const more =
      state.excludedFiles.length > 100
        ? `<li class="more-item">…and ${state.excludedFiles.length - 100} more</li>`
        : "";
    dom.excludeInfo.innerHTML = `
      <details class="info-details">
        <summary>${state.excludedFiles.length} file${state.excludedFiles.length !== 1 ? "s" : ""} excluded</summary>
        <ul class="info-list">${items}${more}</ul>
      </details>`;
  }

  // ── Display Files ─────────────────────────────────────────────────────────

  function displayFiles() {
    fileItemCache.clear();
    dom.fileItems.innerHTML = "";
    dom.fileItems.appendChild(dom.fileEmptyState);

    const fragment = document.createDocumentFragment();

    state.allFiles.forEach((file, i) => {
      const path = file.webkitRelativePath || file.name;
      const isSelected = state.selectedPaths.has(path);

      const row = document.createElement("div");
      row.className = "file-row";
      row.setAttribute("role", "listitem");
      row.dataset.fileIndex = i;
      row.dataset.filePath = path;

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = `f-${i}`;
      cb.checked = isSelected;
      cb.setAttribute("aria-label", `Select ${path}`);

      const label = document.createElement("label");
      label.htmlFor = `f-${i}`;
      label.className = "file-name";
      label.title = path;
      label.textContent = path;

      const meta = document.createElement("span");
      meta.className = "file-meta";
      meta.textContent = formatFileSize(file.size);

      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "file-preview-btn";
      prevBtn.title = "Preview";
      prevBtn.setAttribute("aria-label", `Preview ${path}`);
      prevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

      row.append(cb, label, meta, prevBtn);

      row.addEventListener("click", (e) => {
        if (
          e.target === cb ||
          e.target === prevBtn ||
          prevBtn.contains(e.target)
        )
          return;
        cb.checked = !cb.checked;
        handleCheckboxChange(path, cb.checked);
      });
      cb.addEventListener("change", () =>
        handleCheckboxChange(path, cb.checked),
      );
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        previewFile(i);
      });

      fragment.appendChild(row);
      fileItemCache.set(path, { row, cb });
    });

    dom.fileItems.appendChild(fragment);
  }

  function handleCheckboxChange(path, checked) {
    if (checked) state.selectedPaths.add(path);
    else state.selectedPaths.delete(path);
    updateStats();
  }

  function showSections() {
    [
      dom.settingsPanel,
      dom.stats,
      dom.languageBreakdown,
      dom.searchWrapper,
      dom.fileList,
      dom.actionControls,
    ].forEach((el) => el.classList.remove("hidden"));
  }

  function updateStats() {
    const selectedSize = state.allFiles
      .filter((f) => state.selectedPaths.has(f.webkitRelativePath || f.name))
      .reduce((acc, f) => acc + f.size, 0);

    dom.totalFiles.textContent = state.allFiles.length;
    dom.selectedFiles.textContent = state.selectedPaths.size;
    dom.totalSize.textContent = formatFileSize(selectedSize);
    dom.excludedCount.textContent = state.excludedFiles.length;
  }

  // ── Language Breakdown ────────────────────────────────────────────────────

  function renderLanguageBreakdown() {
    const counts = {};
    state.allFiles.forEach((f) => {
      const ext = getFileExtension(f.name);
      const lang = LANGUAGE_MAP[ext] || ext || "other";
      counts[lang] = (counts[lang] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
    const total = state.allFiles.length || 1;

    dom.languageBars.innerHTML = sorted
      .map(([lang, count], i) => {
        const pct = ((count / total) * 100).toFixed(1);
        return `<div class="lang-row">
          <span class="lang-name">${escapeHtml(lang)}</span>
          <div class="lang-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(lang)}: ${pct}%">
            <div class="lang-bar" style="width:${pct}%;background:${LANG_COLORS[i % LANG_COLORS.length]}"></div>
          </div>
          <span class="lang-stat">${count} <span class="lang-pct">${pct}%</span></span>
        </div>`;
      })
      .join("");
  }

  // ── Selection ─────────────────────────────────────────────────────────────

  function selectAll() {
    const visible = getVisiblePaths();
    if (!visible.length) {
      showToast("No visible files", "warning");
      return;
    }
    visible.forEach((p) => state.selectedPaths.add(p));
    syncCheckboxes();
    updateStats();
    showToast(
      `Selected ${visible.length} file${visible.length !== 1 ? "s" : ""}`,
    );
  }

  function selectNone() {
    getVisiblePaths().forEach((p) => state.selectedPaths.delete(p));
    syncCheckboxes();
    updateStats();
  }

  function selectCodeFiles() {
    const visible = new Set(getVisiblePaths());
    visible.forEach((p) => state.selectedPaths.delete(p));
    let count = 0;
    state.allFiles.forEach((f) => {
      const path = f.webkitRelativePath || f.name;
      if (visible.has(path) && CODE_EXTENSIONS.has(getFileExtension(f.name))) {
        state.selectedPaths.add(path);
        count++;
      }
    });
    syncCheckboxes();
    updateStats();
    showToast(`Selected ${count} code file${count !== 1 ? "s" : ""}`);
  }

  function getVisiblePaths() {
    const paths = [];
    dom.fileItems.querySelectorAll(".file-row").forEach((row) => {
      if (row.style.display !== "none") paths.push(row.dataset.filePath);
    });
    return paths;
  }

  function syncCheckboxes() {
    fileItemCache.forEach(({ cb }, path) => {
      cb.checked = state.selectedPaths.has(path);
    });
  }

  // ── Search & Filter ───────────────────────────────────────────────────────

  function applySearchAndFilter() {
    const query = dom.searchInput.value.toLowerCase().trim();
    const filter = state.activeFilter;
    let visible = 0;

    dom.fileItems.querySelectorAll(".file-row").forEach((row) => {
      const idx = parseInt(row.dataset.fileIndex, 10);
      if (isNaN(idx) || idx >= state.allFiles.length) return;
      const file = state.allFiles[idx];
      const path = (file.webkitRelativePath || file.name).toLowerCase();
      const ext = getFileExtension(file.name);
      const show =
        (!query || path.includes(query)) && filterMatch(path, ext, filter);
      row.style.display = show ? "" : "none";
      if (show) visible++;
    });

    dom.fileEmptyState.classList.toggle(
      "hidden",
      visible > 0 || !state.allFiles.length,
    );
  }

  function filterMatch(path, ext, filter) {
    switch (filter) {
      case "components":
        return (
          path.includes("component") ||
          ["jsx", "tsx", "vue", "svelte"].includes(ext)
        );
      case "styles":
        return ["css", "scss", "sass", "less", "styl"].includes(ext);
      case "config":
        return (
          path.includes("config") ||
          ["json", "yaml", "yml", "toml", "ini", "env"].includes(ext)
        );
      default:
        return true;
    }
  }

  // ── Combine ───────────────────────────────────────────────────────────────

  async function combineFiles() {
    if (!state.selectedPaths.size) {
      showToast("Select at least one file", "error");
      return;
    }
    if (state.isCombining) return;

    state.isCombining = true;
    dom.combineBtn.disabled = true;
    dom.combineBtn.innerHTML = `<span class="spinner"></span> Combining…`;

    const useCodeBlocks = dom.useCodeBlocks.checked;
    const includeTree = dom.includeTree.checked;

    const selectedFiles = state.allFiles
      .filter((f) => state.selectedPaths.has(f.webkitRelativePath || f.name))
      .sort((a, b) => {
        const pa = a.webkitRelativePath || a.name;
        const pb = b.webkitRelativePath || b.name;
        return pa.localeCompare(pb);
      });

    try {
      const fileContents = await Promise.all(
        selectedFiles.map((f) =>
          readFileContent(f).catch(() => "[Error reading file]"),
        ),
      );

      let combined = "";

      if (includeTree) {
        const root = getRootFolderName(selectedFiles);
        combined += `## Folder Structure\n\n${FENCE}\n${root}\n${generateTree(selectedFiles)}${FENCE}\n\n---\n\n`;
      }

      selectedFiles.forEach((file, i) => {
        const path = escapeHtml(file.webkitRelativePath || file.name);
        const ext = getFileExtension(file.name);
        let content = fileContents[i];
        if (state.minifyOutput && MINIFY_SAFE_EXTENSIONS.has(ext))
          content = minifyCode(content);
        if (useCodeBlocks) {
          combined += `### ${path}\n${FENCE}${LANGUAGE_MAP[ext] || ext}\n${content}\n${FENCE}\n\n`;
        } else {
          combined += `### ${path}\n${content}\n\n`;
        }
      });

      dom.outputTextarea.value = combined;
      dom.outputSection.classList.remove("hidden");
      dom.tokenCounter.classList.remove("hidden");
      updateTokenDisplay();
      showToast(
        `Combined ${selectedFiles.length} file${selectedFiles.length !== 1 ? "s" : ""}`,
      );
      dom.outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error(err);
      showToast("Error combining files", "error");
    } finally {
      state.isCombining = false;
      dom.combineBtn.disabled = false;
      dom.combineBtn.textContent = "Combine Files";
    }
  }

  function readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error(`Failed to read: ${file.name}`));
      reader.readAsText(file);
    });
  }

  function getRootFolderName(files) {
    if (!files.length) return "";
    const parts = (files[0].webkitRelativePath || files[0].name).split("/");
    return parts.length > 1 ? parts[0] + "/" : "";
  }

  function generateTree(files) {
    const tree = {};
    files.forEach((file) => {
      let cur = tree;
      (file.webkitRelativePath || file.name).split("/").forEach((part) => {
        if (!cur[part]) cur[part] = {};
        cur = cur[part];
      });
    });
    function render(node, prefix = "") {
      return Object.keys(node)
        .map((key, i, arr) => {
          const last = i === arr.length - 1;
          const line = `${prefix}${last ? "└── " : "├── "}${key}\n`;
          const child = Object.keys(node[key]).length
            ? render(node[key], prefix + (last ? "    " : "│   "))
            : "";
          return line + child;
        })
        .join("");
    }
    return render(tree);
  }

  function minifyCode(content) {
    return content
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/^\s+/gm, "")
      .replace(/\n\s*\n/g, "\n")
      .trim();
  }

  // ── Output ────────────────────────────────────────────────────────────────

  async function copyToClipboard() {
    const text = dom.outputTextarea.value;
    if (!text) {
      showToast("Nothing to copy", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch {
      try {
        dom.outputTextarea.select();
        document.execCommand("copy");
        showToast("Copied to clipboard");
      } catch {
        showToast("Copy failed — please copy manually", "error");
      }
    }
  }

  function downloadFile(content, filename, type) {
    if (!content) {
      showToast("Combine files first", "error");
      return;
    }
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  }

  function downloadMarkdown() {
    downloadFile(
      dom.outputTextarea.value,
      "combined-files.md",
      "text/markdown",
    );
  }
  function downloadText() {
    downloadFile(dom.outputTextarea.value, "combined-files.txt", "text/plain");
  }

  // ── Prompts ───────────────────────────────────────────────────────────────

  function openPromptModal() {
    dom.promptButtons.innerHTML = "";
    const frag = document.createDocumentFragment();
    Object.entries(PROMPT_TEMPLATES).forEach(([label, template]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "prompt-btn";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        dom.outputTextarea.value = template + dom.outputTextarea.value;
        updateTokenDisplay();
        closeModal("promptModal");
        showToast("Template applied");
      });
      frag.appendChild(btn);
    });
    dom.promptButtons.appendChild(frag);
    openModal("promptModal");
  }

  function addProjectContext() {
    const ctx = `## PROJECT CONTEXT
**Framework**: [Specify]
**Purpose**: [Brief description]
**Current Issue**: [Describe the problem]
**Goal**: [What you want to achieve]

---

`;
    dom.outputTextarea.value = ctx + dom.outputTextarea.value;
    updateTokenDisplay();
    showToast("Context added");
  }

  function openCustomPromptModal() {
    dom.customPromptInput.value = "";
    openModal("customPromptModal");
    setTimeout(() => dom.customPromptInput.focus(), 50);
  }

  function applyCustomPrompt() {
    const text = dom.customPromptInput.value.trim();
    if (!text) {
      showToast("Enter a prompt", "error");
      return;
    }
    dom.outputTextarea.value =
      `**CUSTOM REQUEST**: ${text}\n\n` + dom.outputTextarea.value;
    updateTokenDisplay();
    closeModal("customPromptModal");
    showToast("Prompt applied");
  }

  // ── Token Counter ─────────────────────────────────────────────────────────

  function updateTokenDisplay() {
    const content = dom.outputTextarea.value;
    if (!content) return;
    const tokens = Math.ceil(content.length / 4);
    const limit = parseInt(dom.tokenLimitSelect.value) || 0;
    dom.tokenCount.textContent = tokens.toLocaleString();
    dom.tokenLimit.textContent = limit > 0 ? limit.toLocaleString() : "∞";
    const bar = dom.tokenProgress;
    const warning = dom.tokenWarning;
    if (limit > 0) {
      const pct = Math.min((tokens / limit) * 100, 100);
      bar.style.width = `${pct}%`;
      bar.dataset.level = pct > 90 ? "danger" : pct > 75 ? "warning" : "safe";
      warning.classList.toggle("hidden", tokens <= limit);
    } else {
      bar.style.width = "0%";
      bar.dataset.level = "safe";
      warning.classList.add("hidden");
    }
  }

  // ── Preview ───────────────────────────────────────────────────────────────

  async function previewFile(index) {
    const file = state.allFiles[index];
    if (!file) return;
    try {
      const content = await readFileContent(file);
      const truncated = content.length > 50000;
      dom.previewFileName.textContent = file.webkitRelativePath || file.name;
      dom.previewContent.textContent = truncated
        ? content.substring(0, 50000)
        : content;
      dom.previewTruncated.classList.toggle("hidden", !truncated);
      openModal("previewModal");
    } catch {
      showToast("Cannot preview this file", "error");
    }
  }

  // ── Minify ────────────────────────────────────────────────────────────────

  function toggleMinify() {
    state.minifyOutput = !state.minifyOutput;
    dom.minifyState.textContent = state.minifyOutput ? "On" : "Off";
    dom.minifyBtn.dataset.active = state.minifyOutput ? "true" : "false";
  }

  // ── Reset ─────────────────────────────────────────────────────────────────

  function reset() {
    Object.assign(state, {
      allRawFiles: [],
      allFiles: [],
      excludedFiles: [],
      selectedPaths: new Set(),
      minifyOutput: false,
      isCombining: false,
      activeFilter: "all",
      // excludePatterns preserved intentionally
    });

    fileItemCache.clear();
    dom.folderInput.value = "";
    dom.outputTextarea.value = "";
    dom.fileItems.innerHTML = "";
    dom.fileItems.appendChild(dom.fileEmptyState);
    dom.searchInput.value = "";
    dom.searchClear.classList.add("hidden");
    dom.languageBars.innerHTML = "";
    dom.excludeInfo.innerHTML = "";
    dom.minifyState.textContent = "Off";
    dom.minifyBtn.dataset.active = "false";
    dom.tokenCounter.classList.add("hidden");
    dom.tokenProgress.style.width = "0%";
    dom.combineBtn.disabled = false;
    dom.combineBtn.textContent = "Combine Files";
    dom.loadProgress.classList.add("hidden");

    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.remove("chip-active"));
    document.querySelector('[data-filter="all"]')?.classList.add("chip-active");

    [
      dom.settingsPanel,
      dom.stats,
      dom.languageBreakdown,
      dom.searchWrapper,
      dom.fileList,
      dom.actionControls,
      dom.outputSection,
    ].forEach((el) => el.classList.add("hidden"));

    showToast("Reset");
  }

  // ── Path Selector ─────────────────────────────────────────────────────────

  function openPathSelector() {
    if (!state.allFiles.length) {
      showToast("Load a folder first", "error");
      return;
    }
    dom.pathTextarea.value = "";
    dom.pathResults.classList.add("hidden");
    openModal("pathModal");
    setTimeout(() => dom.pathTextarea.focus(), 50);
  }

  function matchAndSelectPaths(addToExisting) {
    const raw = dom.pathTextarea.value.trim();
    if (!raw) {
      showToast("Paste file paths first", "error");
      return;
    }

    const inputPaths = raw
      .split("\n")
      .map((l) => l.trim().replace(/\\/g, "/"))
      .filter(Boolean);

    if (!addToExisting) state.selectedPaths.clear();

    let matched = 0;
    const unmatched = [];
    const multiMatch = [];

    inputPaths.forEach((inp) => {
      const hits = state.allFiles.filter((file) => {
        const fp = (file.webkitRelativePath || file.name).replace(/\\/g, "/");
        return fp === inp || fp.endsWith("/" + inp) || fp.endsWith(inp);
      });
      if (!hits.length) {
        unmatched.push(inp);
      } else {
        if (hits.length > 1) multiMatch.push({ path: inp, count: hits.length });
        hits.forEach((f) =>
          state.selectedPaths.add(f.webkitRelativePath || f.name),
        );
        matched++;
      }
    });

    syncCheckboxes();
    updateStats();

    let html = `<div class="path-summary">
      <span class="match-ok">${matched} matched</span>
      <span class="match-fail">${unmatched.length} not found</span>
      ${multiMatch.length ? `<span class="match-warn">${multiMatch.length} ambiguous</span>` : ""}
    </div>`;

    if (unmatched.length) {
      html += `<details class="info-details"><summary>Unmatched</summary><ul class="info-list">`;
      unmatched.forEach(
        (p) => (html += `<li><code>${escapeHtml(p)}</code></li>`),
      );
      html += `</ul></details>`;
    }
    if (multiMatch.length) {
      html += `<details class="info-details"><summary>Ambiguous</summary><ul class="info-list">`;
      multiMatch.forEach(
        ({ path, count }) =>
          (html += `<li><code>${escapeHtml(path)}</code> — ${count} matches</li>`),
      );
      html += `</ul></details>`;
    }

    dom.pathResults.innerHTML = html;
    dom.pathResults.classList.remove("hidden");
    showToast(`${matched} of ${inputPaths.length} matched`);
  }

  // ── Modal ─────────────────────────────────────────────────────────────────

  function openModal(id) {
    const el = $(id);
    if (!el) return;
    el.classList.remove("hidden");
    const focusable = el.querySelector("button, input, textarea, select");
    if (focusable) setTimeout(() => focusable.focus(), 50);
    el._trap = (e) => trapFocus(e, el);
    el.addEventListener("keydown", el._trap);
  }

  function closeModal(id) {
    const el = $(id);
    if (!el) return;
    el.classList.add("hidden");
    if (el._trap) {
      el.removeEventListener("keydown", el._trap);
      delete el._trap;
    }
  }

  function trapFocus(e, modal) {
    if (e.key !== "Tab") return;
    const els = Array.from(
      modal.querySelectorAll(
        'button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.closest(".hidden"));
    if (!els.length) return;
    const first = els[0],
      last = els[els.length - 1];
    if (
      e.shiftKey
        ? document.activeElement === first
        : document.activeElement === last
    ) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  }

  // ── Toast ─────────────────────────────────────────────────────────────────

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => toast.classList.add("show")),
    );
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ── Utils ─────────────────────────────────────────────────────────────────

  function getFileExtension(name) {
    const lower = name.toLowerCase();
    if (lower === "dockerfile") return "dockerfile";
    if (lower === "makefile") return "makefile";
    const parts = name.split(".");
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024,
      sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function debounce(fn, delay) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);
})();
