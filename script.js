<<<<<<< HEAD
/*
 * File Combiner v3
 * A dependency-free, browser-only code-context builder.
 */
=======
// ─────────────────────────────────────────────────────────────────────────────
// File Combiner v2 — script.js
// ─────────────────────────────────────────────────────────────────────────────
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb

(function () {
  "use strict";

<<<<<<< HEAD
  const FENCE_CHARACTER = "`";
  const PROCESSING_CHUNK_SIZE = 350;
  const PREVIEW_LIMIT = 50000;
  const SETTINGS_KEY = "fc-v3-settings";
  const COLLATOR = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  const CODE_EXTENSIONS = new Set([
    "js", "jsx", "mjs", "cjs", "ts", "tsx", "py", "java", "c", "cpp",
    "cc", "h", "hpp", "cs", "php", "rb", "go", "rs", "swift", "kt", "kts",
    "scala", "html", "htm", "css", "scss", "sass", "less", "vue", "svelte",
    "astro", "md", "mdx", "json", "jsonc", "xml", "yaml", "yml", "sql", "sh",
    "bash", "zsh", "fish", "ps1", "bat", "cmd", "dockerfile", "makefile", "toml",
    "ini", "cfg", "conf", "graphql", "gql", "prisma", "proto", "r", "lua", "perl",
    "pl", "dart", "ex", "exs", "elm", "hs", "clj", "erl", "tf", "hcl", "nix",
    "zig", "v", "nim", "env", "sol", "scss", "styl",
  ]);

  const BINARY_EXTENSIONS = new Set([
    "7z", "a", "avi", "bin", "bmp", "class", "dll", "doc", "docx", "eot", "exe",
    "gif", "gz", "ico", "jar", "jpeg", "jpg", "mkv", "mov", "mp3", "mp4", "o", "otf",
    "pdf", "png", "rar", "so", "tar", "ttf", "wav", "webm", "webp", "woff", "woff2",
    "xls", "xlsx", "zip", "dylib", "p12", "pfx", "sqlite", "db",
  ]);

  const LANGUAGE_MAP = {
    js: "javascript", jsx: "jsx", mjs: "javascript", cjs: "javascript",
    ts: "typescript", tsx: "tsx", py: "python", java: "java", c: "c", cpp: "cpp",
    cc: "cpp", h: "c", hpp: "cpp", cs: "csharp", php: "php", rb: "ruby", go: "go",
    rs: "rust", swift: "swift", kt: "kotlin", kts: "kotlin", scala: "scala",
    html: "html", htm: "html", css: "css", scss: "scss", sass: "sass", less: "less",
    vue: "vue", svelte: "svelte", astro: "astro", md: "markdown", mdx: "mdx",
    json: "json", jsonc: "json", xml: "xml", yaml: "yaml", yml: "yaml", sql: "sql",
    sh: "bash", bash: "bash", zsh: "zsh", fish: "fish", ps1: "powershell", bat: "batch",
    cmd: "batch", dockerfile: "dockerfile", makefile: "makefile", toml: "toml", ini: "ini",
    cfg: "ini", conf: "nginx", graphql: "graphql", gql: "graphql", prisma: "prisma",
    proto: "protobuf", r: "r", lua: "lua", perl: "perl", pl: "perl", dart: "dart",
    ex: "elixir", exs: "elixir", elm: "elm", hs: "haskell", clj: "clojure", erl: "erlang",
    tf: "hcl", hcl: "hcl", nix: "nix", zig: "zig", v: "v", nim: "nim", env: "bash",
    sol: "solidity", styl: "stylus",
  };

  const PROMPT_TEMPLATES = {
    "Code review": "Review this project context as a senior engineer. Identify correctness, maintainability, and reliability issues. Prioritize the findings, explain why they matter, and propose concrete fixes.\n\n",
    Debug: "Analyze this project context to find the most likely cause of the described bug. Trace relevant control flow, call out assumptions, and give a minimal, safe fix.\n\n",
    Refactor: "Propose a practical refactor for this project context. Preserve behavior, reduce complexity, and present the changes in a sensible implementation order.\n\n",
    Security: "Perform a defensive security review of this project context. Identify likely attack paths, insecure data handling, missing validation, and high-impact remediation steps.\n\n",
    Tests: "Write a focused test plan for this project context. Cover important behavior, edge cases, failures, and the highest-risk paths before suggesting implementation details.\n\n",
    Explain: "Explain this project context clearly. Start with the architecture and data flow, then describe the most important files and their responsibilities.\n\n",
    Documentation: "Create concise developer documentation from this project context: setup, architecture, important flows, configuration, and common troubleshooting notes.\n\n",
    Migration: "Plan a safe migration for this project context. State assumptions, identify breaking changes, propose incremental steps, and include verification checks.\n\n",
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
  };

  const EXCLUDE_PRESETS = {
    none: [],
    minimal: ["node_modules", ".git", ".agents"],
    standard: [
<<<<<<< HEAD
      "node_modules", ".git", ".agents", ".next", ".nuxt", ".svelte-kit", ".output",
      ".venv", "venv", "__pycache__", ".cache", ".turbo", "dist", "build", "out",
      ".DS_Store", "Thumbs.db", "*.lock", "*.log", "*.pyc", "package-lock.json",
      "yarn.lock", "pnpm-lock.yaml", "coverage", ".nyc_output", ".env", ".env.*",
      "*.pem", "*.key", "*.p12", "*.pfx", "id_rsa", "id_ed25519",
    ],
    aggressive: [
      "node_modules", ".git", ".agents", ".next", ".nuxt", ".svelte-kit", ".output",
      ".venv", "venv", "env", "__pycache__", ".cache", ".turbo", ".parcel-cache",
      "dist", "build", "out", ".vercel", ".netlify", ".DS_Store", "Thumbs.db",
      "desktop.ini", "*.lock", "*.log", "*.pyc", "*.pyo", "*.class", "*.o", "*.obj",
      "*.min.js", "*.min.css", "*.map", "*.chunk.js", "*.chunk.css", "package-lock.json",
      "yarn.lock", "pnpm-lock.yaml", "composer.lock", "Gemfile.lock", "Cargo.lock", "poetry.lock",
      "coverage", ".nyc_output", ".jest", ".pytest_cache", ".idea", ".vscode", ".vs",
      ".eclipse", ".settings", ".terraform", ".vagrant", "vendor", "bower_components", "tmp",
      "temp", ".tmp", "*.sqlite", "*.db", "*.ico", "*.png", "*.jpg", "*.jpeg", "*.gif",
      "*.svg", "*.webp", "*.bmp", "*.woff", "*.woff2", "*.ttf", "*.eot", "*.otf",
      "*.mp3", "*.mp4", "*.wav", "*.avi", "*.mov", "*.mkv", "*.zip", "*.tar", "*.gz",
      "*.rar", "*.7z", "*.exe", "*.dll", "*.so", "*.dylib", "*.pdf", "*.doc", "*.docx",
      "*.xls", "*.xlsx", ".env", ".env.*", "*.pem", "*.key", "*.p12", "*.pfx",
      "id_rsa", "id_ed25519",
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    ],
  };

  const LANG_COLORS = [
<<<<<<< HEAD
    "#2563eb", "#7c3aed", "#db2777", "#d97706", "#059669", "#0891b2",
    "#ea580c", "#4f46e5", "#65a30d", "#dc2626", "#0f766e", "#9333ea",
  ];

  const filePathMap = new WeakMap();
  const fileItemCache = new Map();
  const dom = {};
=======
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

>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
  const state = {
    allRawFiles: [],
    allFiles: [],
    excludedFiles: [],
    selectedPaths: new Set(),
<<<<<<< HEAD
    excludePatterns: new Set(EXCLUDE_PRESETS.standard),
    minifyOutput: false,
    redactSecrets: true,
    activeFilter: "all",
    sortMode: "path",
    outputFormat: "markdown",
    isCombining: false,
    processingRun: 0,
    progressTimer: null,
    activeModal: null,
    lastFocusedElement: null,
    lastRedactionCount: 0,
    selectAllAfterProcess: false,
  };

  const $ = (id) => document.getElementById(id);

  function init() {
    const ids = [
      "workspaceStatus", "dropZone", "folderInput", "filesInput", "browseFolderBtn", "browseFilesBtn",
      "loadProgress", "loadProgressLabel", "loadProgressPct", "progressFill", "settingsPanel",
      "settingsPanelHeader", "settingsPanelBody", "langPanelHeader", "langPanelBody", "stats",
      "languageBreakdown", "searchWrapper", "fileList", "actionControls", "outputSection",
      "fileItems", "fileEmptyState", "excludeTags", "excludeInfo", "excludeInput", "addExcludeBtn",
      "maxFileSize", "redactSecrets", "searchInput", "searchClear", "sortFiles", "languageBars",
      "totalFiles", "selectedFiles", "totalSize", "excludedCount", "outputTextarea", "tokenCounter",
      "tokenCount", "tokenLimit", "tokenProgress", "tokenWarning", "tokenLimitSelect", "themeToggle",
      "iconMoon", "iconSun", "combineBtn", "downloadMdBtn", "copyBtn", "customPromptBtn",
      "promptTemplateBtn", "projectContextBtn", "pastePathsBtn", "fitBudgetBtn", "resetBtn", "minifyBtn",
      "minifyState", "selectAllBtn", "selectNoneBtn", "selectCodeBtn", "useCodeBlocks", "includeTree",
      "outputFormat", "secretScanInfo", "previewModal", "previewFileName", "previewContent",
      "previewTruncated", "closePreviewBtn", "promptModal", "closePromptBtn", "promptButtons",
      "customPromptModal", "customPromptInput", "applyCustomPromptBtn", "cancelCustomPromptBtn",
      "closeCustomPromptBtn", "pathModal", "pathTextarea", "matchSelectBtn", "matchAddBtn",
      "cancelPathBtn", "closePathBtn", "pathResults", "toastContainer",
    ];

    ids.forEach((id) => {
      dom[id] = $(id);
    });

    if (ids.some((id) => !dom[id])) {
      console.error("File Combiner: a required UI element is missing.");
      return;
    }
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb

    loadSettings();
    bindEvents();
    syncThemeIcon();
<<<<<<< HEAD
    syncFormatControls();
    updateFilePickerLabel();
    registerServiceWorker();
  }

  function bindEvents() {
    let dragDepth = 0;

    dom.dropZone.addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, a")) return;
      dom.folderInput.click();
    });

    dom.dropZone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dom.folderInput.click();
      }
    });

    dom.browseFolderBtn.addEventListener("click", () => dom.folderInput.click());
    dom.browseFilesBtn.addEventListener("click", () => dom.filesInput.click());

    dom.dropZone.addEventListener("dragenter", (event) => {
      event.preventDefault();
      dragDepth += 1;
      dom.dropZone.classList.add("dragover");
    });

    dom.dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
      dom.dropZone.classList.add("dragover");
    });

    dom.dropZone.addEventListener("dragleave", (event) => {
      event.preventDefault();
      dragDepth = Math.max(0, dragDepth - 1);
      if (!dragDepth) dom.dropZone.classList.remove("dragover");
    });

    dom.dropZone.addEventListener("drop", async (event) => {
      event.preventDefault();
      dragDepth = 0;
      dom.dropZone.classList.remove("dragover");
      try {
        setWorkspaceStatus("Reading dropped files locally…");
        const files = await collectDroppedFiles(event.dataTransfer);
        handleFiles(files, false);
      } catch (error) {
        console.error(error);
        setWorkspaceStatus("Could not read the dropped files.");
        showToast("Could not read the dropped files", "error");
      }
    });

    dom.folderInput.addEventListener("change", (event) => {
      handleFiles(Array.from(event.target.files || []), false);
      event.target.value = "";
    });

    dom.filesInput.addEventListener("change", (event) => {
      handleFiles(Array.from(event.target.files || []), state.allRawFiles.length > 0);
      event.target.value = "";
    });

    setupCollapsible(dom.settingsPanelHeader, dom.settingsPanelBody);
    setupCollapsible(dom.langPanelHeader, dom.langPanelBody);

    dom.addExcludeBtn.addEventListener("click", addExcludePattern);
    dom.excludeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addExcludePattern();
      }
    });
    dom.excludeTags.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-pattern]");
      if (button) removeExcludePattern(button.dataset.removePattern);
    });
    dom.maxFileSize.addEventListener("change", () => {
      saveSettings();
      invalidateOutput();
      void reprocessFiles();
    });
    dom.redactSecrets.addEventListener("change", () => {
      state.redactSecrets = dom.redactSecrets.checked;
      saveSettings();
      invalidateOutput();
    });

    document.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => applyPreset(button.dataset.preset));
    });

    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach((item) => {
          item.classList.remove("chip-active");
        });
        button.classList.add("chip-active");
        state.activeFilter = button.dataset.filter || "all";
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
        applySearchAndFilter();
      });
    });

<<<<<<< HEAD
    dom.searchInput.addEventListener("input", debounce(() => {
      dom.searchClear.classList.toggle("hidden", !dom.searchInput.value.trim());
      applySearchAndFilter();
    }, 120));
=======
    // Search
    dom.searchInput.addEventListener(
      "input",
      debounce(() => {
        dom.searchClear.classList.toggle("hidden", !dom.searchInput.value);
        applySearchAndFilter();
      }, 150),
    );
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    dom.searchClear.addEventListener("click", () => {
      dom.searchInput.value = "";
      dom.searchClear.classList.add("hidden");
      applySearchAndFilter();
      dom.searchInput.focus();
    });

<<<<<<< HEAD
    dom.sortFiles.addEventListener("change", () => {
      state.sortMode = dom.sortFiles.value;
      sortFiles();
      displayFiles();
      applySearchAndFilter();
      saveSettings();
    });

    dom.selectAllBtn.addEventListener("click", selectAllVisible);
    dom.selectNoneBtn.addEventListener("click", selectNoneVisible);
    dom.selectCodeBtn.addEventListener("click", selectCodeVisible);

    dom.combineBtn.addEventListener("click", combineFiles);
    dom.copyBtn.addEventListener("click", copyToClipboard);
    dom.downloadMdBtn.addEventListener("click", downloadOutput);
=======
    // Selection
    dom.selectAllBtn.addEventListener("click", selectAll);
    dom.selectNoneBtn.addEventListener("click", selectNone);
    dom.selectCodeBtn.addEventListener("click", selectCodeFiles);

    // Actions
    dom.combineBtn.addEventListener("click", combineFiles);
    dom.downloadMdBtn.addEventListener("click", downloadMarkdown);
    dom.downloadTxtBtn.addEventListener("click", downloadText);
    dom.copyBtn.addEventListener("click", copyToClipboard);
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    dom.customPromptBtn.addEventListener("click", openCustomPromptModal);
    dom.promptTemplateBtn.addEventListener("click", openPromptModal);
    dom.projectContextBtn.addEventListener("click", addProjectContext);
    dom.pastePathsBtn.addEventListener("click", openPathSelector);
<<<<<<< HEAD
    dom.fitBudgetBtn.addEventListener("click", fitSelectionToBudget);
    dom.resetBtn.addEventListener("click", reset);
    dom.minifyBtn.addEventListener("click", toggleMinify);

    [dom.useCodeBlocks, dom.includeTree].forEach((control) => {
      control.addEventListener("change", () => {
        saveSettings();
        invalidateOutput();
      });
    });

    dom.outputFormat.addEventListener("change", () => {
      state.outputFormat = dom.outputFormat.value;
      syncFormatControls();
      saveSettings();
      invalidateOutput();
    });

    dom.outputTextarea.addEventListener("input", debounce(() => {
      if (!dom.outputSection.classList.contains("hidden")) {
        dom.tokenCounter.classList.remove("hidden");
        dom.secretScanInfo.classList.add("hidden");
        updateTokenDisplay();
      }
    }, 160));
    dom.tokenLimitSelect.addEventListener("change", updateTokenDisplay);

    dom.themeToggle.addEventListener("click", toggleTheme);

    dom.closePreviewBtn.addEventListener("click", () => closeModal("previewModal"));
    dom.closePromptBtn.addEventListener("click", () => closeModal("promptModal"));
    dom.closeCustomPromptBtn.addEventListener("click", () => closeModal("customPromptModal"));
    dom.cancelCustomPromptBtn.addEventListener("click", () => closeModal("customPromptModal"));
    dom.closePathBtn.addEventListener("click", () => closeModal("pathModal"));
    dom.cancelPathBtn.addEventListener("click", () => closeModal("pathModal"));

    dom.applyCustomPromptBtn.addEventListener("click", applyCustomPrompt);
    dom.customPromptInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        applyCustomPrompt();
      }
    });

    dom.matchSelectBtn.addEventListener("click", () => matchAndSelectPaths(false));
    dom.matchAddBtn.addEventListener("click", () => matchAndSelectPaths(true));

    ["previewModal", "promptModal", "customPromptModal", "pathModal"].forEach((id) => {
      const modal = $(id);
      modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal(id);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.activeModal) {
        closeModal(state.activeModal);
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (!dom.searchWrapper.classList.contains("hidden")) {
          event.preventDefault();
          dom.searchInput.focus();
        }
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        if (!state.activeModal && !dom.actionControls.classList.contains("hidden")) {
          event.preventDefault();
          void combineFiles();
        }
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
      }
    });
  }

<<<<<<< HEAD
  function setupCollapsible(header, body) {
    const toggle = () => {
      const open = !body.classList.contains("collapsed");
      body.classList.toggle("collapsed", open);
      header.setAttribute("aria-expanded", String(!open));
      const chevron = header.querySelector(".chevron");
      if (chevron) chevron.classList.toggle("chevron-up", !open);
    };

    header.addEventListener("click", toggle);
    // Native buttons already provide Enter/Space keyboard activation. Retain a
    // fallback only if a consumer replaces the header with a non-button element.
    if (header.tagName !== "BUTTON") {
      header.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    }
  }

  function loadSettings() {
    let settings = {};
    try {
      settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") || {};
    } catch (error) {
      console.warn("File Combiner: could not load saved settings.", error);
    }

    try {
      const legacyExclude = localStorage.getItem("fc-exclude");
      const savedPatterns = Array.isArray(settings.excludePatterns)
        ? settings.excludePatterns
        : legacyExclude
          ? JSON.parse(legacyExclude)
          : EXCLUDE_PRESETS.standard;
      state.excludePatterns = new Set(
        Array.isArray(savedPatterns) ? savedPatterns.filter((item) => typeof item === "string") : EXCLUDE_PRESETS.standard,
      );
    } catch {
      state.excludePatterns = new Set(EXCLUDE_PRESETS.standard);
    }

    state.minifyOutput = Boolean(settings.minifyOutput);
    state.redactSecrets = settings.redactSecrets !== false;
    state.sortMode = ["path", "size", "type"].includes(settings.sortMode) ? settings.sortMode : "path";
    state.outputFormat = ["markdown", "xml", "text"].includes(settings.outputFormat)
      ? settings.outputFormat
      : "markdown";

    dom.maxFileSize.value = settings.maxFileSize || localStorage.getItem("fc-maxSize") || "524288";
    dom.redactSecrets.checked = state.redactSecrets;
    dom.sortFiles.value = state.sortMode;
    dom.outputFormat.value = state.outputFormat;
    dom.useCodeBlocks.checked = settings.useCodeBlocks !== false;
    dom.includeTree.checked = Boolean(settings.includeTree);

    const preferredTheme = settings.theme || localStorage.getItem("fc-theme");
    if (preferredTheme === "dark" || preferredTheme === "light") {
      document.documentElement.setAttribute("data-theme", preferredTheme);
    }

    syncMinifyButton();
    renderExcludeTags();
    syncActivePreset();
  }

  function saveSettings() {
    try {
      const settings = {
        theme: document.documentElement.getAttribute("data-theme") || "light",
        excludePatterns: [...state.excludePatterns],
        maxFileSize: dom.maxFileSize.value,
        redactSecrets: state.redactSecrets,
        minifyOutput: state.minifyOutput,
        sortMode: state.sortMode,
        outputFormat: state.outputFormat,
        useCodeBlocks: dom.useCodeBlocks.checked,
        includeTree: dom.includeTree.checked,
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn("File Combiner: could not save settings.", error);
    }
  }

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    syncThemeIcon();
    saveSettings();
  }

  function syncThemeIcon() {
<<<<<<< HEAD
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    dom.iconMoon.classList.toggle("hidden", isDark);
    dom.iconSun.classList.toggle("hidden", !isDark);
    dom.themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", isDark ? "#0d0d0d" : "#111827");
  }

  async function collectDroppedFiles(dataTransfer) {
    if (!dataTransfer) return [];
    const items = Array.from(dataTransfer.items || []);
    const entries = items
      .map((item) => (typeof item.webkitGetAsEntry === "function" ? item.webkitGetAsEntry() : null))
      .filter(Boolean);

    if (entries.length) {
      const collected = [];
      for (const entry of entries) {
        // eslint-disable-next-line no-await-in-loop
        await walkEntry(entry, collected);
      }
      if (collected.length) return collected;
    }

    return Array.from(dataTransfer.files || []);
  }

  async function walkEntry(entry, collected) {
    if (!entry) return;

    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
      const path = normalizePath(entry.fullPath || file.webkitRelativePath || file.name);
      setFilePath(file, path);
      collected.push(file);
      return;
    }

    if (!entry.isDirectory) return;
    const reader = entry.createReader();
    let batch = [];
    do {
      // readEntries may return a directory in multiple batches.
      // eslint-disable-next-line no-await-in-loop
      batch = await new Promise((resolve, reject) => reader.readEntries(resolve, reject));
      for (const child of batch) {
        // eslint-disable-next-line no-await-in-loop
        await walkEntry(child, collected);
      }
    } while (batch.length);
  }

  function handleFiles(files, append) {
    const validFiles = files.filter((file) => file && typeof file.name === "string");
    if (!validFiles.length) {
      setWorkspaceStatus("No readable files were found.");
      showToast("No readable files found", "warning");
      return;
    }

    const baseline = append ? state.allRawFiles : [];
    const normalised = assignUniquePaths(validFiles, baseline);
    if (!normalised.length) {
      showToast("No new readable files found", "warning");
      return;
    }

    state.allRawFiles = append ? [...baseline, ...normalised] : normalised;
    if (!append) {
      state.selectedPaths.clear();
      state.selectAllAfterProcess = true;
    }
    invalidateOutput();
    showSections();
    updateFilePickerLabel();
    setWorkspaceStatus(`Scanning ${state.allRawFiles.length.toLocaleString()} local file${state.allRawFiles.length === 1 ? "" : "s"}…`);
    void reprocessFiles();
    showToast(`${append ? "Added" : "Loaded"} ${normalised.length.toLocaleString()} file${normalised.length === 1 ? "" : "s"}`);
  }

  function assignUniquePaths(files, baseline) {
    const used = new Set((baseline || []).map(getFilePath));
    const result = [];

    files.forEach((file) => {
      let path = normalizePath(getFilePath(file));
      if (!path) return;
      if (used.has(path)) {
        let counter = 2;
        const original = path;
        do {
          path = addPathSuffix(original, counter);
          counter += 1;
        } while (used.has(path));
      }
      used.add(path);
      setFilePath(file, path);
      result.push(file);
    });

    return result;
  }

  async function reprocessFiles() {
    if (!state.allRawFiles.length) return;

    const runId = ++state.processingRun;
    const maxSize = Number.parseInt(dom.maxFileSize.value, 10) || 0;
    state.allFiles = [];
    state.excludedFiles = [];
    showProgress(0, "Scanning files…");

    const total = state.allRawFiles.length;
    for (let start = 0; start < total; start += PROCESSING_CHUNK_SIZE) {
      if (runId !== state.processingRun) return;
      const end = Math.min(start + PROCESSING_CHUNK_SIZE, total);
      for (let index = start; index < end; index += 1) {
        const file = state.allRawFiles[index];
        const path = getFilePath(file);
        const reason = getExclusionReason(file, path, maxSize);
        if (reason) state.excludedFiles.push({ file, path, reason, size: file.size || 0 });
        else state.allFiles.push(file);
      }

      const percentage = Math.round((end / total) * 100);
      showProgress(percentage, `Scanning files… ${end.toLocaleString()} / ${total.toLocaleString()}`);
      // Give the browser an opportunity to paint the progress state.
      // eslint-disable-next-line no-await-in-loop
      await nextFrame();
    }

    if (runId !== state.processingRun) return;

    const availablePaths = new Set(state.allFiles.map(getFilePath));
    const removedSelections = [...state.selectedPaths].filter((path) => !availablePaths.has(path));
    removedSelections.forEach((path) => state.selectedPaths.delete(path));

    if (state.selectAllAfterProcess) {
      state.allFiles.forEach((file) => state.selectedPaths.add(getFilePath(file)));
      state.selectAllAfterProcess = false;
    }

    sortFiles();
    displayFiles();
    updateStats();
    updateExcludeInfo();
    renderLanguageBreakdown();
    applySearchAndFilter();
    hideProgress();
    setWorkspaceStatus(`${state.allFiles.length.toLocaleString()} text file${state.allFiles.length === 1 ? "" : "s"} ready. Everything remains local.`);

    if (removedSelections.length) {
      showToast(`${removedSelections.length} selected file${removedSelections.length === 1 ? " was" : "s were"} skipped by the current settings`, "warning");
    }
  }

  function getExclusionReason(file, path, maxSize) {
    if (isKnownBinary(file, path)) return "Known binary file type";
    if (maxSize > 0 && file.size > maxSize) return `Size exceeds ${formatFileSize(maxSize)}`;

    const segments = normalizePath(path).split("/");
    for (const pattern of state.excludePatterns) {
      if (matchesPattern(path, segments, pattern)) return `Pattern: ${pattern}`;
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    }
    return null;
  }

<<<<<<< HEAD
  function isKnownBinary(file, path) {
    const extension = getFileExtension(path);
    if (BINARY_EXTENSIONS.has(extension)) return true;
    const type = String(file.type || "").toLowerCase();
    return /^(image|audio|video)\//.test(type) || type === "application/pdf" || type === "application/zip";
  }

  function matchesPattern(path, segments, rawPattern) {
    const pattern = normalizePath(rawPattern);
    if (!pattern) return false;
    const target = pattern.includes("/") ? normalizePath(path) : null;
    const candidates = target ? [target] : segments;
    const expression = globToRegExp(pattern);
    return candidates.some((candidate) => expression.test(candidate));
  }

  function globToRegExp(pattern) {
    const escaped = String(pattern)
      .replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
      .replace(/\*/g, ".*");
    return new RegExp(`^${escaped}$`, "i");
  }

  function addExcludePattern() {
    const pattern = normalizePath(dom.excludeInput.value.trim());
    if (!pattern) return;
    if (state.excludePatterns.has(pattern)) {
      showToast(`“${pattern}” is already active`, "warning");
      return;
    }

    state.excludePatterns.add(pattern);
=======
  // ── Exclude Patterns ──────────────────────────────────────────────────────

  function addExcludePattern() {
    const val = dom.excludeInput.value.trim();
    if (!val) return;
    if (state.excludePatterns.has(val)) {
      showToast(`"${val}" already exists`, "warning");
      return;
    }
    state.excludePatterns.add(val);
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    dom.excludeInput.value = "";
    renderExcludeTags();
    syncActivePreset();
    saveSettings();
<<<<<<< HEAD
    invalidateOutput();
    void reprocessFiles();
=======
    reprocessFiles();
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
  }

  function removeExcludePattern(pattern) {
    state.excludePatterns.delete(pattern);
    renderExcludeTags();
    syncActivePreset();
    saveSettings();
<<<<<<< HEAD
    invalidateOutput();
    void reprocessFiles();
  }

  function applyPreset(name) {
    state.excludePatterns = new Set(EXCLUDE_PRESETS[name] || []);
    renderExcludeTags();
    syncActivePreset();
    saveSettings();
    invalidateOutput();
    void reprocessFiles();
  }

  function syncActivePreset() {
    const current = JSON.stringify([...state.excludePatterns].sort());
    document.querySelectorAll("[data-preset]").forEach((button) => {
      const preset = JSON.stringify([...(EXCLUDE_PRESETS[button.dataset.preset] || [])].sort());
      button.classList.toggle("chip-active", current === preset);
    });
  }

  function renderExcludeTags() {
    dom.excludeTags.replaceChildren();
    if (!state.excludePatterns.size) {
      const empty = document.createElement("span");
      empty.className = "tag-empty";
      empty.textContent = "No patterns active";
      dom.excludeTags.appendChild(empty);
      return;
    }

    [...state.excludePatterns].sort(COLLATOR.compare).forEach((pattern) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      const text = document.createElement("span");
      text.className = "tag-text";
      text.textContent = pattern;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "tag-remove";
      remove.dataset.removePattern = pattern;
      remove.setAttribute("aria-label", `Remove ${pattern}`);
      remove.textContent = "×";
      tag.append(text, remove);
      dom.excludeTags.appendChild(tag);
    });
  }

  function updateExcludeInfo() {
    dom.excludeInfo.replaceChildren();
    if (!state.excludedFiles.length) return;

    const details = document.createElement("details");
    details.className = "info-details";
    const summary = document.createElement("summary");
    summary.textContent = `${state.excludedFiles.length.toLocaleString()} file${state.excludedFiles.length === 1 ? "" : "s"} skipped`;
    const list = document.createElement("ul");
    list.className = "info-list";

    state.excludedFiles.slice(0, 100).forEach(({ path, reason }) => {
      const item = document.createElement("li");
      const code = document.createElement("code");
      code.textContent = path;
      item.append(code, document.createTextNode(` — ${reason}`));
      list.appendChild(item);
    });

    if (state.excludedFiles.length > 100) {
      const more = document.createElement("li");
      more.className = "more-item";
      more.textContent = `…and ${(state.excludedFiles.length - 100).toLocaleString()} more`;
      list.appendChild(more);
    }

    details.append(summary, list);
    dom.excludeInfo.appendChild(details);
  }

  function showSections() {
    [
      dom.settingsPanel, dom.stats, dom.languageBreakdown, dom.searchWrapper,
      dom.fileList, dom.actionControls,
    ].forEach((element) => element.classList.remove("hidden"));
  }

  function sortFiles() {
    const pathOf = (file) => getFilePath(file);
    state.allFiles.sort((left, right) => {
      if (state.sortMode === "size") {
        return (right.size - left.size) || COLLATOR.compare(pathOf(left), pathOf(right));
      }
      if (state.sortMode === "type") {
        return getFileExtension(pathOf(left)).localeCompare(getFileExtension(pathOf(right)))
          || COLLATOR.compare(pathOf(left), pathOf(right));
      }
      return COLLATOR.compare(pathOf(left), pathOf(right));
    });
  }

  function displayFiles() {
    fileItemCache.clear();
    dom.fileItems.replaceChildren(dom.fileEmptyState);
    const fragment = document.createDocumentFragment();

    state.allFiles.forEach((file) => {
      const path = getFilePath(file);
      const row = document.createElement("li");
      row.className = "file-row";
      row.dataset.filePath = path;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.selectedPaths.has(path);
      checkbox.setAttribute("aria-label", `Select ${path}`);

      const name = document.createElement("span");
      name.className = "file-name";
      name.title = path;
      name.textContent = path;

      const meta = document.createElement("span");
      meta.className = "file-meta";
      meta.textContent = formatFileSize(file.size || 0);

      const preview = document.createElement("button");
      preview.type = "button";
      preview.className = "file-preview-btn";
      preview.title = "Preview locally";
      preview.setAttribute("aria-label", `Preview ${path}`);
      preview.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

      row.append(checkbox, name, meta, preview);
      row.addEventListener("click", (event) => {
        if (event.target === checkbox || event.target === preview || preview.contains(event.target)) return;
        checkbox.checked = !checkbox.checked;
        handleCheckboxChange(path, checkbox.checked);
      });
      checkbox.addEventListener("change", () => handleCheckboxChange(path, checkbox.checked));
      preview.addEventListener("click", (event) => {
        event.stopPropagation();
        void previewFile(file);
      });

      fileItemCache.set(path, { row, checkbox });
      fragment.appendChild(row);
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    });

    dom.fileItems.appendChild(fragment);
  }

  function handleCheckboxChange(path, checked) {
    if (checked) state.selectedPaths.add(path);
    else state.selectedPaths.delete(path);
    updateStats();
<<<<<<< HEAD
    invalidateOutput();
  }

  function updateStats() {
    const selectedFiles = state.allFiles.filter((file) => state.selectedPaths.has(getFilePath(file)));
    const selectedSize = selectedFiles.reduce((sum, file) => sum + (file.size || 0), 0);
    dom.totalFiles.textContent = state.allFiles.length.toLocaleString();
    dom.selectedFiles.textContent = selectedFiles.length.toLocaleString();
    dom.totalSize.textContent = formatFileSize(selectedSize);
    dom.excludedCount.textContent = state.excludedFiles.length.toLocaleString();
  }

  function renderLanguageBreakdown() {
    dom.languageBars.replaceChildren();
    const counts = new Map();
    state.allFiles.forEach((file) => {
      const extension = getFileExtension(getFilePath(file));
      const language = LANGUAGE_MAP[extension] || extension || "other";
      counts.set(language, (counts.get(language) || 0) + 1);
    });

    const languages = [...counts.entries()]
      .sort((left, right) => right[1] - left[1] || COLLATOR.compare(left[0], right[0]))
      .slice(0, 12);
    const total = state.allFiles.length || 1;

    languages.forEach(([language, count], index) => {
      const percent = (count / total) * 100;
      const row = document.createElement("div");
      row.className = "lang-row";
      const name = document.createElement("span");
      name.className = "lang-name";
      name.textContent = language;
      const track = document.createElement("div");
      track.className = "lang-track";
      track.setAttribute("role", "progressbar");
      track.setAttribute("aria-valuenow", percent.toFixed(1));
      track.setAttribute("aria-valuemin", "0");
      track.setAttribute("aria-valuemax", "100");
      track.setAttribute("aria-label", `${language}: ${percent.toFixed(1)}%`);
      const bar = document.createElement("div");
      bar.className = "lang-bar";
      bar.style.width = `${percent}%`;
      bar.style.background = LANG_COLORS[index % LANG_COLORS.length];
      const stat = document.createElement("span");
      stat.className = "lang-stat";
      stat.textContent = `${count} `;
      const percentage = document.createElement("span");
      percentage.className = "lang-pct";
      percentage.textContent = `${percent.toFixed(1)}%`;
      stat.appendChild(percentage);
      track.appendChild(bar);
      row.append(name, track, stat);
      dom.languageBars.appendChild(row);
    });
  }

  function applySearchAndFilter() {
    const query = dom.searchInput.value.toLocaleLowerCase().trim();
    let visibleCount = 0;

    fileItemCache.forEach(({ row }, path) => {
      const extension = getFileExtension(path);
      const visible = (!query || path.toLocaleLowerCase().includes(query))
        && filterMatches(path.toLocaleLowerCase(), extension, state.activeFilter);
      row.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    dom.fileEmptyState.classList.toggle("hidden", visibleCount > 0 || !state.allFiles.length);
  }

  function filterMatches(path, extension, filter) {
    switch (filter) {
      case "components":
        return path.includes("component") || ["jsx", "tsx", "vue", "svelte"].includes(extension);
      case "styles":
        return ["css", "scss", "sass", "less", "styl"].includes(extension);
      case "config":
        return path.includes("config") || ["json", "jsonc", "yaml", "yml", "toml", "ini", "env"].includes(extension);
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
      default:
        return true;
    }
  }

<<<<<<< HEAD
  function getVisiblePaths() {
    return [...fileItemCache.entries()]
      .filter(([, { row }]) => !row.hidden)
      .map(([path]) => path);
  }

  function selectAllVisible() {
    const paths = getVisiblePaths();
    if (!paths.length) {
      showToast("No visible files to select", "warning");
      return;
    }
    paths.forEach((path) => state.selectedPaths.add(path));
    syncCheckboxes();
    updateStats();
    invalidateOutput();
    showToast(`Selected ${paths.length.toLocaleString()} visible file${paths.length === 1 ? "" : "s"}`);
  }

  function selectNoneVisible() {
    getVisiblePaths().forEach((path) => state.selectedPaths.delete(path));
    syncCheckboxes();
    updateStats();
    invalidateOutput();
  }

  function selectCodeVisible() {
    const visiblePaths = new Set(getVisiblePaths());
    visiblePaths.forEach((path) => state.selectedPaths.delete(path));
    let selected = 0;
    state.allFiles.forEach((file) => {
      const path = getFilePath(file);
      if (visiblePaths.has(path) && CODE_EXTENSIONS.has(getFileExtension(path))) {
        state.selectedPaths.add(path);
        selected += 1;
      }
    });
    syncCheckboxes();
    updateStats();
    invalidateOutput();
    showToast(`Selected ${selected.toLocaleString()} code file${selected === 1 ? "" : "s"}`);
  }

  function syncCheckboxes() {
    fileItemCache.forEach(({ checkbox }, path) => {
      checkbox.checked = state.selectedPaths.has(path);
    });
  }

  function getSelectedFiles() {
    return state.allFiles.filter((file) => state.selectedPaths.has(getFilePath(file)));
  }

  async function combineFiles() {
    const selectedFiles = getSelectedFiles();
    if (!selectedFiles.length) {
      showToast("Select at least one text file first", "error");
=======
  // ── Combine ───────────────────────────────────────────────────────────────

  async function combineFiles() {
    if (!state.selectedPaths.size) {
      showToast("Select at least one file", "error");
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
      return;
    }
    if (state.isCombining) return;

    state.isCombining = true;
    dom.combineBtn.disabled = true;
<<<<<<< HEAD
    dom.combineBtn.innerHTML = '<span class="spinner"></span> Creating…';
    setWorkspaceStatus(`Reading ${selectedFiles.length.toLocaleString()} selected file${selectedFiles.length === 1 ? "" : "s"} locally…`);

    try {
      const readEntries = await mapWithConcurrency(selectedFiles, 8, async (file) => {
        try {
          let content = await readFileContent(file);
          let redactions = 0;
          if (state.redactSecrets) {
            const result = redactLikelySecrets(content);
            content = result.content;
            redactions = result.count;
          }
          if (state.minifyOutput) content = compactWhitespace(content);
          return { file, content, redactions, error: null };
        } catch (error) {
          return { file, content: "", redactions: 0, error };
        }
      });

      const successful = readEntries.filter((entry) => !entry.error);
      const failed = readEntries.filter((entry) => entry.error);
      if (!successful.length) throw new Error("None of the selected files could be read.");

      const combined = buildOutput(successful);
      const redactionCount = successful.reduce((sum, entry) => sum + entry.redactions, 0);
      state.lastRedactionCount = redactionCount;
      dom.outputTextarea.value = combined;
      dom.outputSection.classList.remove("hidden");
      dom.tokenCounter.classList.remove("hidden");
      updateSecretScanInfo(redactionCount);
      updateTokenDisplay();
      setWorkspaceStatus(`Created ${state.outputFormat} output from ${successful.length.toLocaleString()} local file${successful.length === 1 ? "" : "s"}.`);
      showToast(`Created output from ${successful.length.toLocaleString()} file${successful.length === 1 ? "" : "s"}`);
      if (failed.length) showToast(`${failed.length} file${failed.length === 1 ? " was" : "s were"} unreadable and skipped`, "warning");
      dom.outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error(error);
      setWorkspaceStatus("Could not create output. Your files are still local.");
      showToast("Could not create output", "error");
    } finally {
      state.isCombining = false;
      dom.combineBtn.disabled = false;
      dom.combineBtn.textContent = "Create output";
    }
  }

  function buildOutput(entries) {
    switch (state.outputFormat) {
      case "xml":
        return buildXmlOutput(entries);
      case "text":
        return buildTextOutput(entries);
      default:
        return buildMarkdownOutput(entries);
    }
  }

  function buildMarkdownOutput(entries) {
    let output = "# Combined project context\n\n";
    output += "> Generated locally with File Combiner. Review this output before sharing it with an external service.\n\n";

    if (dom.includeTree.checked) {
      const tree = generateTree(entries.map((entry) => entry.file));
      const fence = makeFence(tree);
      output += `## Selected file tree\n\n${fence}\n${tree}${fence}\n\n`;
    }

    entries.forEach(({ file, content }) => {
      const path = getFilePath(file);
      const extension = getFileExtension(path);
      const fence = makeFence(content);
      output += `## File: ${markdownCode(path)}\n\n${fence}${LANGUAGE_MAP[extension] || extension}\n${ensureTrailingNewline(content)}${fence}\n\n`;
    });

    return output;
  }

  function buildXmlOutput(entries) {
    let output = '<?xml version="1.0" encoding="UTF-8"?>\n';
    output += '<project-context generator="File Combiner" local-processing="true">\n';
    output += "  <notice>Review this output before sharing it with an external service.</notice>\n";

    if (dom.includeTree.checked) {
      output += `  <selected-file-tree><![CDATA[${toCdata(generateTree(entries.map((entry) => entry.file)))}]]></selected-file-tree>\n`;
    }

    entries.forEach(({ file, content }) => {
      const path = getFilePath(file);
      const language = LANGUAGE_MAP[getFileExtension(path)] || getFileExtension(path) || "text";
      output += `  <file path="${escapeXml(path)}" language="${escapeXml(language)}"><![CDATA[${toCdata(content)}]]></file>\n`;
    });

    output += "</project-context>\n";
    return output;
  }

  function buildTextOutput(entries) {
    let output = "COMBINED PROJECT CONTEXT\n";
    output += "Generated locally with File Combiner. Review before sharing externally.\n\n";

    if (dom.includeTree.checked) {
      output += `SELECTED FILE TREE\n${"=".repeat(18)}\n${generateTree(entries.map((entry) => entry.file))}\n`;
    }

    entries.forEach(({ file, content }) => {
      const path = getFilePath(file);
      output += `----- FILE: ${path} -----\n${ensureTrailingNewline(content)}\n`;
    });

    return output;
  }

  async function fitSelectionToBudget() {
    const limit = Number.parseInt(dom.tokenLimitSelect.value, 10) || 0;
    const selectedFiles = getSelectedFiles();
    if (!selectedFiles.length) {
      showToast("Select files before fitting to a budget", "error");
      return;
    }
    if (!limit) {
      showToast("Choose a token budget first", "warning");
      dom.tokenLimitSelect.focus();
      return;
    }

    const originalLabel = dom.fitBudgetBtn.textContent;
    dom.fitBudgetBtn.disabled = true;
    dom.fitBudgetBtn.innerHTML = '<span class="spinner"></span> Fitting…';

    try {
      const usableCharacters = Math.floor(limit * 4 * 0.9);
      let usedCharacters = 450 + (dom.includeTree.checked ? generateTree(selectedFiles).length : 0);
      const keptPaths = new Set();
      let unreadable = 0;

      for (const file of selectedFiles) {
        try {
          // eslint-disable-next-line no-await-in-loop
          let content = await readFileContent(file);
          if (state.redactSecrets) content = redactLikelySecrets(content).content;
          if (state.minifyOutput) content = compactWhitespace(content);
          const wrapper = state.outputFormat === "xml" ? 100 : 80;
          if (usedCharacters + content.length + wrapper <= usableCharacters) {
            keptPaths.add(getFilePath(file));
            usedCharacters += content.length + wrapper;
          }
        } catch {
          unreadable += 1;
        }
      }

      if (!keptPaths.size) {
        showToast("No complete selected file fits within that budget", "warning");
        return;
      }

      if (keptPaths.size === selectedFiles.length) {
        showToast("The current selection already fits the chosen budget");
        return;
      }

      state.selectedPaths = keptPaths;
      syncCheckboxes();
      updateStats();
      invalidateOutput();
      const suffix = unreadable ? `; ${unreadable} unreadable file${unreadable === 1 ? "" : "s"} skipped` : "";
      showToast(`Kept ${keptPaths.size} of ${selectedFiles.length} file${selectedFiles.length === 1 ? "" : "s"} for the budget${suffix}`);
    } finally {
      dom.fitBudgetBtn.disabled = false;
      dom.fitBudgetBtn.textContent = originalLabel;
    }
  }

  function redactLikelySecrets(input) {
    let content = String(input);
    let count = 0;
    const replace = (pattern, label) => {
      content = content.replace(pattern, () => {
        count += 1;
        return `[REDACTED: ${label}]`;
      });
    };

    replace(/-----BEGIN(?: [A-Z0-9]+)* PRIVATE KEY-----[\s\S]*?-----END(?: [A-Z0-9]+)* PRIVATE KEY-----/g, "private key");
    replace(/\bsk-[A-Za-z0-9_-]{20,}\b/g, "API key");
    replace(/\b(?:gh[pousr]|github_pat)_[A-Za-z0-9_]{20,}\b/g, "GitHub token");
    replace(/\bAKIA[0-9A-Z]{16}\b/g, "AWS access key");
    replace(/\bAIza[0-9A-Za-z_-]{35}\b/g, "Google API key");
    replace(/\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g, "Slack token");
    replace(/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g, "JWT");

    const sensitiveName = "(?:api[_-]?key|secret|client[_-]?secret|password|passwd|access[_-]?token|auth[_-]?token|private[_-]?key)";
    const quoted = new RegExp(`(\\b${sensitiveName}\\s*(?:=|:)\\s*)(["'])(?!\\[REDACTED)([^\\n"']{8,})\\2`, "gi");
    content = content.replace(quoted, (_match, prefix, quote) => {
      count += 1;
      return `${prefix}${quote}[REDACTED]${quote}`;
    });

    const dotenv = new RegExp(`^(\\s*(?:export\\s+)?${sensitiveName}\\s*=\\s*)(?!\\[REDACTED)([^\\s#]{8,})(\\s*(?:#.*)?)$`, "gim");
    content = content.replace(dotenv, (_match, prefix, _value, suffix) => {
      count += 1;
      return `${prefix}[REDACTED]${suffix}`;
    });

    return { content, count };
  }

  function compactWhitespace(content) {
    return String(content)
      .replace(/[ \t]+$/gm, "")
      .replace(/\n[ \t]*\n[ \t]*\n+/g, "\n\n")
      .trim();
  }

  function updateSecretScanInfo(count) {
    if (!state.redactSecrets || !count) {
      dom.secretScanInfo.classList.add("hidden");
      dom.secretScanInfo.textContent = "";
      return;
    }
    dom.secretScanInfo.textContent = `Safety check masked ${count.toLocaleString()} likely secret value${count === 1 ? "" : "s"} in this output. Review it before sharing.`;
    dom.secretScanInfo.classList.remove("hidden");
  }

  function updateTokenDisplay() {
    const content = dom.outputTextarea.value;
    const tokens = content ? estimateTokens(content) : 0;
    const limit = Number.parseInt(dom.tokenLimitSelect.value, 10) || 0;
    dom.tokenCount.textContent = tokens.toLocaleString();
    dom.tokenLimit.textContent = limit ? limit.toLocaleString() : "∞";

    if (!limit) {
      dom.tokenProgress.style.width = "0%";
      dom.tokenProgress.dataset.level = "safe";
      dom.tokenWarning.classList.add("hidden");
      return;
    }

    const percentage = Math.min((tokens / limit) * 100, 100);
    dom.tokenProgress.style.width = `${percentage}%`;
    dom.tokenProgress.dataset.level = percentage > 90 ? "danger" : percentage > 75 ? "warning" : "safe";
    dom.tokenWarning.classList.toggle("hidden", tokens <= limit);
  }

  async function previewFile(file) {
    try {
      const content = await readFileContent(file);
      const truncated = content.length > PREVIEW_LIMIT;
      dom.previewFileName.textContent = getFilePath(file);
      dom.previewContent.textContent = truncated ? content.slice(0, PREVIEW_LIMIT) : content;
      dom.previewTruncated.classList.toggle("hidden", !truncated);
      openModal("previewModal");
    } catch {
      showToast("This file cannot be previewed", "error");
    }
  }
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb

  async function copyToClipboard() {
    const text = dom.outputTextarea.value;
    if (!text) {
<<<<<<< HEAD
      showToast("Create output before copying", "error");
      return;
    }

=======
      showToast("Nothing to copy", "error");
      return;
    }
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch {
      try {
<<<<<<< HEAD
        dom.outputTextarea.focus();
        dom.outputTextarea.select();
        const copied = document.execCommand("copy");
        if (!copied) throw new Error("Copy command failed");
        showToast("Copied to clipboard");
      } catch {
        showToast("Copy failed — please select and copy manually", "error");
=======
        dom.outputTextarea.select();
        document.execCommand("copy");
        showToast("Copied to clipboard");
      } catch {
        showToast("Copy failed — please copy manually", "error");
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
      }
    }
  }

<<<<<<< HEAD
  function downloadOutput() {
    const content = dom.outputTextarea.value;
    if (!content) {
      showToast("Create output before downloading", "error");
      return;
    }

    const definitions = {
      markdown: { extension: "md", type: "text/markdown;charset=utf-8" },
      xml: { extension: "xml", type: "application/xml;charset=utf-8" },
      text: { extension: "txt", type: "text/plain;charset=utf-8" },
    };
    const definition = definitions[state.outputFormat] || definitions.markdown;
    const blob = new Blob([content], { type: definition.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `file-combiner-output.${definition.extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    showToast(`Downloaded file-combiner-output.${definition.extension}`);
  }

  function openPromptModal() {
    if (!dom.outputTextarea.value) {
      showToast("Create output before adding a prompt", "warning");
      return;
    }
    dom.promptButtons.replaceChildren();
    const fragment = document.createDocumentFragment();
    Object.entries(PROMPT_TEMPLATES).forEach(([label, prompt]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "prompt-btn";
      button.textContent = label;
      button.addEventListener("click", () => {
        dom.outputTextarea.value = prompt + dom.outputTextarea.value;
        dom.secretScanInfo.classList.add("hidden");
        updateTokenDisplay();
        closeModal("promptModal");
        showToast("Prompt template added");
      });
      fragment.appendChild(button);
    });
    dom.promptButtons.appendChild(fragment);
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    openModal("promptModal");
  }

  function addProjectContext() {
<<<<<<< HEAD
    if (!dom.outputTextarea.value) {
      showToast("Create output before adding a project brief", "warning");
      return;
    }
    const context = "## Project brief\n\n- **Framework / stack:** [add here]\n- **Purpose:** [add here]\n- **Current issue:** [add here]\n- **Desired outcome:** [add here]\n\n---\n\n";
    dom.outputTextarea.value = context + dom.outputTextarea.value;
    dom.secretScanInfo.classList.add("hidden");
    updateTokenDisplay();
    showToast("Project brief added");
  }

  function openCustomPromptModal() {
    if (!dom.outputTextarea.value) {
      showToast("Create output before adding a prompt", "warning");
      return;
    }
    dom.customPromptInput.value = "";
    openModal("customPromptModal");
    window.setTimeout(() => dom.customPromptInput.focus(), 0);
  }

  function applyCustomPrompt() {
    const prompt = dom.customPromptInput.value.trim();
    if (!prompt) {
      showToast("Write a prompt first", "warning");
      return;
    }
    dom.outputTextarea.value = `## Request\n\n${prompt}\n\n---\n\n${dom.outputTextarea.value}`;
    dom.secretScanInfo.classList.add("hidden");
    updateTokenDisplay();
    closeModal("customPromptModal");
    showToast("Custom prompt added");
  }

  function openPathSelector() {
    if (!state.allFiles.length) {
      showToast("Load files before selecting paths", "warning");
      return;
    }
    dom.pathTextarea.value = "";
    dom.pathResults.replaceChildren();
    dom.pathResults.classList.add("hidden");
    openModal("pathModal");
    window.setTimeout(() => dom.pathTextarea.focus(), 0);
  }

  function matchAndSelectPaths(addToExisting) {
    const paths = dom.pathTextarea.value
      .split("\n")
      .map((value) => normalizePath(value.trim()))
      .filter(Boolean);

    if (!paths.length) {
      showToast("Paste at least one path", "warning");
      return;
    }

    if (!addToExisting) state.selectedPaths.clear();
    let matched = 0;
    const unmatched = [];
    const ambiguous = [];

    paths.forEach((requestedPath) => {
      const lowerRequested = requestedPath.toLocaleLowerCase();
      const hits = state.allFiles.filter((file) => {
        const path = getFilePath(file).toLocaleLowerCase();
        return path === lowerRequested || path.endsWith(`/${lowerRequested}`);
      });

      if (!hits.length) {
        unmatched.push(requestedPath);
        return;
      }

      hits.forEach((file) => state.selectedPaths.add(getFilePath(file)));
      matched += 1;
      if (hits.length > 1) ambiguous.push({ path: requestedPath, count: hits.length });
    });

    syncCheckboxes();
    updateStats();
    invalidateOutput();
    renderPathResults(matched, paths.length, unmatched, ambiguous);
    showToast(`${matched} of ${paths.length} requested path${paths.length === 1 ? "" : "s"} matched`);
  }

  function renderPathResults(matched, total, unmatched, ambiguous) {
    dom.pathResults.replaceChildren();
    const summary = document.createElement("div");
    summary.className = "path-summary";
    const matchedText = document.createElement("span");
    matchedText.className = "match-ok";
    matchedText.textContent = `${matched} matched`;
    const missingText = document.createElement("span");
    missingText.className = "match-fail";
    missingText.textContent = `${unmatched.length} not found`;
    summary.append(matchedText, missingText);
    if (ambiguous.length) {
      const ambiguousText = document.createElement("span");
      ambiguousText.className = "match-warn";
      ambiguousText.textContent = `${ambiguous.length} ambiguous`;
      summary.appendChild(ambiguousText);
    }
    dom.pathResults.appendChild(summary);

    const appendDetails = (label, values, formatter) => {
      if (!values.length) return;
      const details = document.createElement("details");
      details.className = "info-details";
      const summaryElement = document.createElement("summary");
      summaryElement.textContent = label;
      const list = document.createElement("ul");
      list.className = "info-list";
      values.forEach((value) => {
        const item = document.createElement("li");
        const code = document.createElement("code");
        code.textContent = formatter(value).code;
        item.appendChild(code);
        if (formatter(value).suffix) item.appendChild(document.createTextNode(formatter(value).suffix));
        list.appendChild(item);
      });
      details.append(summaryElement, list);
      dom.pathResults.appendChild(details);
    };

    appendDetails("Not found", unmatched, (path) => ({ code: path, suffix: "" }));
    appendDetails("Ambiguous", ambiguous, (item) => ({ code: item.path, suffix: ` — ${item.count} matches` }));
    dom.pathResults.classList.remove("hidden");
  }

  function toggleMinify() {
    state.minifyOutput = !state.minifyOutput;
    syncMinifyButton();
    saveSettings();
    invalidateOutput();
  }

  function syncMinifyButton() {
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
    dom.minifyState.textContent = state.minifyOutput ? "On" : "Off";
    dom.minifyBtn.dataset.active = state.minifyOutput ? "true" : "false";
  }

<<<<<<< HEAD
  function syncFormatControls() {
    const markdown = state.outputFormat === "markdown";
    const codeFenceLabel = dom.useCodeBlocks.closest(".toggle-label");
    dom.useCodeBlocks.disabled = !markdown;
    if (codeFenceLabel) codeFenceLabel.classList.toggle("option-muted", !markdown);
    const extension = state.outputFormat === "xml" ? "xml" : state.outputFormat === "text" ? "txt" : "md";
    dom.downloadMdBtn.textContent = `Download .${extension}`;
  }

  function invalidateOutput() {
    if (dom.outputTextarea.value || !dom.outputSection.classList.contains("hidden")) {
      dom.outputTextarea.value = "";
      dom.outputSection.classList.add("hidden");
      dom.tokenCounter.classList.add("hidden");
      dom.secretScanInfo.classList.add("hidden");
      dom.tokenProgress.style.width = "0%";
    }
  }

  function reset() {
    state.processingRun += 1;
    state.allRawFiles = [];
    state.allFiles = [];
    state.excludedFiles = [];
    state.selectedPaths.clear();
    state.minifyOutput = false;
    state.activeFilter = "all";
    state.lastRedactionCount = 0;
    state.selectAllAfterProcess = false;
    fileItemCache.clear();

    dom.folderInput.value = "";
    dom.filesInput.value = "";
    dom.fileItems.replaceChildren(dom.fileEmptyState);
    dom.searchInput.value = "";
    dom.searchClear.classList.add("hidden");
    dom.languageBars.replaceChildren();
    dom.excludeInfo.replaceChildren();
    dom.outputTextarea.value = "";
    dom.pathResults.replaceChildren();
    dom.pathResults.classList.add("hidden");
    dom.tokenCounter.classList.add("hidden");
    dom.secretScanInfo.classList.add("hidden");
    syncMinifyButton();
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("chip-active"));
    document.querySelector('[data-filter="all"]')?.classList.add("chip-active");

    [
      dom.settingsPanel, dom.stats, dom.languageBreakdown, dom.searchWrapper,
      dom.fileList, dom.actionControls, dom.outputSection, dom.loadProgress,
    ].forEach((element) => element.classList.add("hidden"));

    updateFilePickerLabel();
    setWorkspaceStatus("Nothing leaves this browser.");
    showToast("Workspace reset");
  }

  function updateFilePickerLabel() {
    dom.browseFilesBtn.textContent = state.allRawFiles.length ? "Add files" : "Choose files";
  }

  function openModal(id) {
    const modal = $(id);
    if (!modal) return;
    if (state.activeModal && state.activeModal !== id) closeModal(state.activeModal, false);
    state.lastFocusedElement = document.activeElement;
    state.activeModal = id;
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    modal._trap = (event) => trapFocus(event, modal);
    modal.addEventListener("keydown", modal._trap);
    const focusable = modal.querySelector("button, input, textarea, select, [tabindex]:not([tabindex='-1'])");
    if (focusable) window.setTimeout(() => focusable.focus(), 0);
  }

  function closeModal(id, returnFocus = true) {
    const modal = $(id);
    if (!modal) return;
    modal.classList.add("hidden");
    if (modal._trap) {
      modal.removeEventListener("keydown", modal._trap);
      delete modal._trap;
    }
    if (state.activeModal === id) state.activeModal = null;
    if (!state.activeModal) document.body.classList.remove("modal-open");
    if (returnFocus && state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
      state.lastFocusedElement.focus();
    }
  }

  function trapFocus(event, modal) {
    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter((element) => !element.closest(".hidden"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function showProgress(percentage, label) {
    window.clearTimeout(state.progressTimer);
    dom.loadProgress.classList.remove("hidden", "progress-done");
    dom.progressFill.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
    dom.loadProgressLabel.textContent = label;
    dom.loadProgressPct.textContent = `${Math.round(percentage)}%`;
  }

  function hideProgress() {
    dom.loadProgress.classList.add("progress-done");
    state.progressTimer = window.setTimeout(() => {
      dom.loadProgress.classList.add("hidden");
      dom.loadProgress.classList.remove("progress-done");
      dom.progressFill.style.width = "0%";
    }, 350);
  }

  function setWorkspaceStatus(message) {
    dom.workspaceStatus.textContent = message;
  }
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);
<<<<<<< HEAD
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add("show")));
    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  function readFileContent(file) {
    if (typeof file.text === "function") return file.text();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(String(event.target?.result || ""));
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
      reader.readAsText(file);
    });
  }

  async function mapWithConcurrency(items, limit, mapper) {
    const results = new Array(items.length);
    let cursor = 0;
    const worker = async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        // eslint-disable-next-line no-await-in-loop
        results[index] = await mapper(items[index], index);
      }
    };
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
    return results;
  }

  function generateTree(files) {
    const root = {};
    files.forEach((file) => {
      let current = root;
      normalizePath(getFilePath(file)).split("/").forEach((part) => {
        if (!current[part]) current[part] = {};
        current = current[part];
      });
    });

    const render = (node, prefix = "") => Object.keys(node)
      .sort(COLLATOR.compare)
      .map((key, index, keys) => {
        const last = index === keys.length - 1;
        const child = Object.keys(node[key]).length
          ? render(node[key], `${prefix}${last ? "    " : "│   "}`)
          : "";
        return `${prefix}${last ? "└── " : "├── "}${key}\n${child}`;
      })
      .join("");

    return render(root);
  }

  function getFileExtension(path) {
    const filename = String(path).split("/").pop().toLowerCase();
    if (filename === "dockerfile") return "dockerfile";
    if (filename === "makefile") return "makefile";
    const index = filename.lastIndexOf(".");
    return index > -1 ? filename.slice(index + 1) : "";
  }

  function getFilePath(file) {
    return filePathMap.get(file) || normalizePath(file.webkitRelativePath || file.name || "untitled");
  }

  function setFilePath(file, path) {
    filePathMap.set(file, normalizePath(path));
  }

  function normalizePath(value) {
    return String(value || "")
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/+/g, "/")
      .replace(/^\.\//, "");
  }

  function addPathSuffix(path, number) {
    const slash = path.lastIndexOf("/");
    const directory = slash > -1 ? path.slice(0, slash + 1) : "";
    const filename = slash > -1 ? path.slice(slash + 1) : path;
    const dot = filename.lastIndexOf(".");
    if (dot <= 0) return `${directory}${filename} (${number})`;
    return `${directory}${filename.slice(0, dot)} (${number})${filename.slice(dot)}`;
  }

  function formatFileSize(bytes) {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const amount = bytes / (1024 ** index);
    return `${Number(amount.toFixed(index ? 1 : 0))} ${units[index]}`;
  }

  function estimateTokens(content) {
    return Math.ceil(String(content).length / 4);
  }

  function makeFence(content) {
    const runs = String(content).match(/`+/g) || [];
    const longest = runs.reduce((length, run) => Math.max(length, run.length), 0);
    return FENCE_CHARACTER.repeat(Math.max(3, longest + 1));
  }

  function ensureTrailingNewline(content) {
    const value = String(content);
    return value.endsWith("\n") ? value : `${value}\n`;
  }

  function markdownCode(value) {
    const text = String(value);
    const longest = (text.match(/`+/g) || []).reduce((size, run) => Math.max(size, run.length), 0);
    const ticks = "`".repeat(Math.max(1, longest + 1));
    return `${ticks}${text}${ticks}`;
  }

  function escapeXml(value) {
    return String(value)
=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
<<<<<<< HEAD
      .replace(/'/g, "&apos;");
  }

  function toCdata(value) {
    // Split the CDATA terminator so arbitrary source text remains valid XML.
    return String(value).replace(/]]>/g, "]]" + "]]><![CDATA[>");
  }

  function debounce(callback, delay) {
    let timer;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => callback(...args), delay);
    };
  }

  function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.warn("File Combiner: offline cache registration failed.", error);
      });
    }, { once: true });
  }

=======
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
>>>>>>> 2c0303af1287c6537f17a1e2e5d5ec49992092eb
  document.addEventListener("DOMContentLoaded", init);
})();
