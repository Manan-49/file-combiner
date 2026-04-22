// ── Constants ──
const codeExtensions = new Set([
    'js','jsx','ts','tsx','py','java','c','cpp','h','hpp','cs','php',
    'rb','go','rs','swift','kt','kts','scala','html','htm','css','scss',
    'sass','less','vue','svelte','astro','md','mdx','json','xml','yaml',
    'yml','sql','sh','bash','zsh','ps1','bat','cmd','dockerfile','makefile',
    'toml','ini','cfg','conf','graphql','gql','prisma','proto',
    'r','lua','perl','pl','dart','ex','exs','elm','hs','clj','erl',
    'tf','hcl','nix','zig','v','nim','env'
]);

const languageMap = {
    js:'javascript',jsx:'jsx',ts:'typescript',tsx:'tsx',py:'python',
    java:'java',c:'c',cpp:'cpp',h:'c',hpp:'cpp',cs:'csharp',
    php:'php',rb:'ruby',go:'go',rs:'rust',swift:'swift',
    kt:'kotlin',kts:'kotlin',scala:'scala',html:'html',htm:'html',
    css:'css',scss:'scss',sass:'sass',less:'less',vue:'vue',
    svelte:'svelte',astro:'astro',md:'markdown',mdx:'markdown',
    json:'json',xml:'xml',yaml:'yaml',yml:'yaml',sql:'sql',
    sh:'bash',bash:'bash',zsh:'zsh',ps1:'powershell',bat:'batch',
    cmd:'batch',dockerfile:'dockerfile',makefile:'makefile',
    toml:'toml',ini:'ini',cfg:'ini',conf:'nginx',graphql:'graphql',
    gql:'graphql',prisma:'prisma',proto:'protobuf',r:'r',
    lua:'lua',perl:'perl',pl:'perl',dart:'dart',ex:'elixir',
    exs:'elixir',elm:'elm',hs:'haskell',clj:'clojure',erl:'erlang',
    tf:'hcl',hcl:'hcl',nix:'nix',zig:'zig',v:'v',nim:'nim',env:'bash'
};

const promptTemplates = {
    debug:"🐛 **DEBUG REQUEST**: Analyze the following code and identify bugs or issues:\n\n",
    refactor:"♻️ **REFACTOR REQUEST**: Review this code and suggest improvements for readability, performance, and maintainability:\n\n",
    explain:"💡 **EXPLAIN REQUEST**: Explain how this code works, including main components and logic flow:\n\n",
    optimize:"⚡ **OPTIMIZATION REQUEST**: Suggest performance optimizations and best practices:\n\n",
    review:"👀 **CODE REVIEW**: Provide a comprehensive code review:\n\n",
    test:"🧪 **TEST REQUEST**: Write unit tests for the following code:\n\n",
    document:"📚 **DOCUMENTATION REQUEST**: Create comprehensive documentation:\n\n",
    security:"🔒 **SECURITY AUDIT**: Analyze for security vulnerabilities:\n\n",
    architecture:"🏗️ **ARCHITECTURE REVIEW**: Review the structure and suggest improvements:\n\n",
    convert:"🔄 **CONVERSION REQUEST**: Help convert/migrate this code:\n\n"
};

const excludePresets = {
    none: [],
    minimal: ['node_modules','.git'],
    standard: [
        'node_modules','.git','.next','.nuxt','.svelte-kit','.output',
        '.venv','venv','__pycache__','.cache','.turbo',
        'dist','build','out',
        '.DS_Store','Thumbs.db',
        '*.lock','*.log','*.pyc',
        'package-lock.json','yarn.lock','pnpm-lock.yaml',
        'coverage','.nyc_output','.env','.env.local'
    ],
    aggressive: [
        'node_modules','.git','.next','.nuxt','.svelte-kit','.output',
        '.venv','venv','env','__pycache__','.cache','.turbo','.parcel-cache',
        'dist','build','out','.vercel','.netlify',
        '.DS_Store','Thumbs.db','desktop.ini',
        '*.lock','*.log','*.pyc','*.pyo','*.class','*.o','*.obj',
        '*.min.js','*.min.css','*.map','*.chunk.js','*.chunk.css',
        'package-lock.json','yarn.lock','pnpm-lock.yaml','composer.lock',
        'Gemfile.lock','Cargo.lock','poetry.lock',
        'coverage','.nyc_output','.jest','.pytest_cache',
        '.idea','.vscode','.vs','.eclipse','.settings',
        '.terraform','.vagrant',
        'vendor','bower_components',
        'tmp','temp','.tmp',
        '*.sqlite','*.db',
        '*.ico','*.png','*.jpg','*.jpeg','*.gif','*.svg','*.webp','*.bmp',
        '*.woff','*.woff2','*.ttf','*.eot','*.otf',
        '*.mp3','*.mp4','*.wav','*.avi','*.mov','*.mkv',
        '*.zip','*.tar','*.gz','*.rar','*.7z',
        '*.exe','*.dll','*.so','*.dylib',
        '*.pdf','*.doc','*.docx','*.xls','*.xlsx',
        '.env','.env.local','.env.production','.env.development'
    ]
};

// ── State ──
let allRawFiles = [];
let allFiles = [];
let excludedFiles = [];
let selectedFiles = new Set();
let excludePatterns = new Set();
let combinedContent = '';
let minifyOutput = false;

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initDropZone();
    initModals();
    initExcludeTagsDelegation();
    
    // Initial theme emoji fix (already handled in loadSettings)
    console.log('%c🚀 File Combiner v2 initialized successfully', 'color:#667eea;font-weight:bold');
});

function initDropZone() {
    const dz = document.getElementById('dropZone');
    const fi = document.getElementById('folderInput');
    
    dz.addEventListener('click', () => fi.click());
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
    dz.addEventListener('drop', e => {
        e.preventDefault();
        dz.classList.remove('dragover');
        handleFiles(Array.from(e.dataTransfer.files));
    });
    
    fi.addEventListener('change', e => handleFiles(Array.from(e.target.files)));
    
    // Enter key support for exclude input
    document.getElementById('excludeInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') addExcludePattern();
    });
}

function initModals() {
    // Close modals when clicking overlay
    const modals = ['previewModal', 'promptModal', 'pathModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', e => {
                if (e.target === modal) {
                    if (id === 'previewModal') closePreviewModal();
                    else if (id === 'promptModal') closePromptModal();
                    else if (id === 'pathModal') closePathModal();
                }
            });
        }
    });

    // Global Escape key support
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePreviewModal();
            closePromptModal();
            closePathModal();
        }
    });
}

function initExcludeTagsDelegation() {
    const tagsContainer = document.getElementById('excludeTags');
    tagsContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON' && e.target.closest('.exclude-tag')) {
            const pattern = e.target.dataset.pattern;
            if (pattern) removeExcludePattern(pattern);
        }
    });
}

// ── Theme ──
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', next);
    document.getElementById('themeToggle').textContent = next === 'dark' ? '☀️' : '🌙';
    saveSettings();
}

// ── Settings Persistence ──
function saveSettings() {
    try {
        localStorage.setItem('fc-exclude', JSON.stringify([...excludePatterns]));
        localStorage.setItem('fc-theme', document.documentElement.getAttribute('data-theme'));
        localStorage.setItem('fc-maxSize', document.getElementById('maxFileSize').value);
    } catch(e) {}
}

function loadSettings() {
    try {
        const savedExclude = localStorage.getItem('fc-exclude');
        excludePatterns = savedExclude 
            ? new Set(JSON.parse(savedExclude)) 
            : new Set(excludePresets.standard);

        const theme = localStorage.getItem('fc-theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';

        const maxSize = localStorage.getItem('fc-maxSize');
        if (maxSize) document.getElementById('maxFileSize').value = maxSize;
    } catch(e) {
        excludePatterns = new Set(excludePresets.standard);
    }
    renderExcludeTags();
}

// ── File Handling ──
function handleFiles(files) {
    allRawFiles = files.filter(f => f.size > 0);
    reprocessFiles();
    showSections();
    showToast(`Loaded ${allRawFiles.length} files`);
}

function reprocessFiles() {
    if (!allRawFiles.length) return;
    
    const maxSize = parseInt(document.getElementById('maxFileSize').value) || 0;
    allFiles = [];
    excludedFiles = [];

    allRawFiles.forEach(file => {
        const path = file.webkitRelativePath || file.name;
        const reason = getExclusionReason(path, file.size, maxSize);
        if (reason) {
            excludedFiles.push({ path, reason, size: file.size });
        } else {
            allFiles.push(file);
        }
    });

    selectedFiles.clear();
    displayFiles();
    updateStats();
    updateExcludeInfo();
    renderLanguageBreakdown();
}

function getExclusionReason(filePath, fileSize, maxSize) {
    if (maxSize > 0 && fileSize > maxSize) {
        return `Size > ${formatFileSize(maxSize)}`;
    }

    const segments = filePath.split('/');
    for (const pattern of excludePatterns) {
        if (pattern.includes('*')) {
            const regexStr = '^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*');
            const re = new RegExp(regexStr, 'i');
            if (segments.some(s => re.test(s))) return `Pattern: ${pattern}`;
        } else {
            if (segments.some(s => s === pattern)) return `Pattern: ${pattern}`;
        }
    }
    return null;
}

function onMaxSizeChange() {
    saveSettings();
    reprocessFiles();
}

// ── Exclude Patterns ──
function addExcludePattern() {
    const input = document.getElementById('excludeInput');
    const val = input.value.trim();
    if (val && !excludePatterns.has(val)) {
        excludePatterns.add(val);
        input.value = '';
        renderExcludeTags();
        saveSettings();
        reprocessFiles();
    }
}

function removeExcludePattern(pattern) {
    excludePatterns.delete(pattern);
    renderExcludeTags();
    saveSettings();
    reprocessFiles();
}

function applyPreset(name, btn) {
    excludePatterns = new Set(excludePresets[name] || []);
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active-preset'));
    if (btn) btn.classList.add('active-preset');
    renderExcludeTags();
    saveSettings();
    reprocessFiles();
}

function renderExcludeTags() {
    const container = document.getElementById('excludeTags');
    if (!excludePatterns.size) {
        container.innerHTML = '<span class="no-patterns">No exclude patterns</span>';
        return;
    }

    container.innerHTML = [...excludePatterns].map(p => `
        <span class="exclude-tag">
            ${escapeHtml(p)}
            <button data-pattern="${escapeHtml(p)}" title="Remove">&times;</button>
        </span>
    `).join('');
}

function updateExcludeInfo() {
    const el = document.getElementById('excludeInfo');
    if (!excludedFiles.length) {
        el.innerHTML = '';
        return;
    }

    const items = excludedFiles.slice(0, 100).map(f => 
        `<li><code>${escapeHtml(f.path)}</code> — ${escapeHtml(f.reason)}</li>`
    ).join('');
    const more = excludedFiles.length > 100 
        ? `<li>...and ${excludedFiles.length - 100} more</li>` 
        : '';

    el.innerHTML = `
        <details>
            <summary>🚫 ${excludedFiles.length} file(s) excluded</summary>
            <ul>${items}${more}</ul>
        </details>
    `;
}

// ── Display Files ──
function displayFiles() {
    const container = document.getElementById('fileItems');
    container.innerHTML = '';

    allFiles.forEach((file, i) => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.setAttribute('role', 'listitem');

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.id = `file-${i}`;
        cb.addEventListener('change', () => toggleFileSelection(i));

        const label = document.createElement('label');
        label.htmlFor = `file-${i}`;
        label.className = 'file-path';
        label.textContent = file.webkitRelativePath || file.name;

        const sizeEl = document.createElement('span');
        sizeEl.className = 'file-size';
        sizeEl.textContent = formatFileSize(file.size);

        const previewBtn = document.createElement('button');
        previewBtn.className = 'preview-btn';
        previewBtn.textContent = '👁️';
        previewBtn.title = 'Preview';
        previewBtn.onclick = e => {
            e.stopPropagation();
            previewFile(i);
        };

        div.append(cb, label, sizeEl, previewBtn);
        
        // Click anywhere on row (except checkbox/preview) to toggle
        div.addEventListener('click', e => {
            if (e.target !== cb && e.target !== previewBtn) {
                cb.checked = !cb.checked;
                toggleFileSelection(i);
            }
        });

        container.appendChild(div);
    });
}

function showSections() {
    const sections = ['settingsPanel','stats','languageBreakdown','searchWrapper','fileList','actionControls'];
    sections.forEach(id => document.getElementById(id).classList.remove('hidden'));
}

function updateStats() {
    const totalSize = [...selectedFiles].reduce((sum, i) => sum + allFiles[i].size, 0);
    document.getElementById('totalFiles').textContent = allFiles.length;
    document.getElementById('selectedFiles').textContent = selectedFiles.size;
    document.getElementById('totalSize').textContent = formatFileSize(totalSize);
    document.getElementById('excludedCount').textContent = excludedFiles.length;
}

// ── Language Breakdown ──
function renderLanguageBreakdown() {
    const counts = {};
    allFiles.forEach(f => {
        const ext = getFileExtension(f.name);
        const lang = languageMap[ext] || ext || 'other';
        counts[lang] = (counts[lang] || 0) + 1;
    });

    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12);

    const total = allFiles.length || 1;
    const colors = ['#667eea','#764ba2','#f093fb','#4facfe','#43e97b','#fa709a','#fee140','#a18cd1','#fbc2eb','#ff9a9e'];

    document.getElementById('languageBars').innerHTML = sorted.map(([lang, count], i) => {
        const pct = ((count / total) * 100).toFixed(1);
        return `
            <div class="lang-row">
                <span class="lang-name">${lang}</span>
                <div class="lang-track">
                    <div class="lang-fill" style="width:${pct}%;background:${colors[i % colors.length]}"></div>
                </div>
                <span class="lang-count">${count} (${pct}%)</span>
            </div>`;
    }).join('');
}

// ── Selection ──
function toggleFileSelection(i) {
    const cb = document.getElementById(`file-${i}`);
    if (cb.checked) selectedFiles.add(i);
    else selectedFiles.delete(i);
    updateStats();
}

function selectAll() {
    selectedFiles = new Set(allFiles.map((_, i) => i));
    allFiles.forEach((_, i) => {
        const cb = document.getElementById(`file-${i}`);
        if (cb) cb.checked = true;
    });
    updateStats();
}

function selectNone() {
    selectedFiles.clear();
    allFiles.forEach((_, i) => {
        const cb = document.getElementById(`file-${i}`);
        if (cb) cb.checked = false;
    });
    updateStats();
}

function selectCodeFiles() {
    selectNone();
    allFiles.forEach((f, i) => {
        if (codeExtensions.has(getFileExtension(f.name))) {
            selectedFiles.add(i);
            const cb = document.getElementById(`file-${i}`);
            if (cb) cb.checked = true;
        }
    });
    updateStats();
}

// ── Search & Filter ──
function searchFiles() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    document.querySelectorAll('.file-item').forEach(item => {
        const pathEl = item.querySelector('.file-path');
        const path = pathEl ? pathEl.textContent.toLowerCase() : '';
        item.style.display = path.includes(query) ? 'flex' : 'none';
    });
}

function filterFiles(type) {
    document.querySelectorAll('.file-item').forEach((item, i) => {
        if (i >= allFiles.length) return;
        const file = allFiles[i];
        const path = (file.webkitRelativePath || file.name).toLowerCase();
        const ext = getFileExtension(file.name);
        let show = true;

        if (type === 'components') {
            show = path.includes('component') || ['jsx','tsx','vue','svelte'].includes(ext);
        } else if (type === 'styles') {
            show = ['css','scss','sass','less','styl'].includes(ext);
        } else if (type === 'config') {
            show = path.includes('config') || ['json','yaml','yml','toml','ini','env'].includes(ext);
        } else if (type === 'all') {
            show = true;
        }

        item.style.display = show ? 'flex' : 'none';
    });
}

// ── Combine Files ──
async function combineFiles() {
    if (!selectedFiles.size) {
        showToast('Please select at least one file', 'error');
        return;
    }

    const useCodeBlocks = document.getElementById('useCodeBlocks').checked;
    const includeTree = document.getElementById('includeTree').checked;
    const fence = '```';

    combinedContent = '';

    if (includeTree) {
        combinedContent += `## 📁 Folder Structure\n\n${fence}\n${generateTree()}${fence}\n\n---\n\n`;
    }

    const sorted = [...selectedFiles].sort((a, b) => {
        const pa = allFiles[a].webkitRelativePath || allFiles[a].name;
        const pb = allFiles[b].webkitRelativePath || allFiles[b].name;
        return pa.localeCompare(pb);
    });

    for (const idx of sorted) {
        const file = allFiles[idx];
        const path = (file.webkitRelativePath || file.name).replace(/[<>]/g, '');
        try {
            let content = await readFileContent(file);
            if (minifyOutput && codeExtensions.has(getFileExtension(file.name))) {
                content = minifyCode(content);
            }
            if (useCodeBlocks) {
                const lang = getLanguageFromExtension(getFileExtension(file.name));
                combinedContent += `### ${path}\n${fence}${lang}\n${content}\n${fence}\n\n`;
            } else {
                combinedContent += `### ${path}\n${content}\n\n`;
            }
        } catch (err) {
            combinedContent += `### ${path}\n${fence}\n[Error reading file]\n${fence}\n\n`;
        }
    }

    document.getElementById('outputTextarea').value = combinedContent;
    document.getElementById('outputSection').classList.remove('hidden');
    showTokenCount();
    showToast(`Combined ${sorted.length} files`);
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth' });
}

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

function generateTree() {
    const paths = [...selectedFiles].map(i => allFiles[i].webkitRelativePath || allFiles[i].name);
    const tree = {};

    paths.forEach(p => {
        let current = tree;
        p.split('/').forEach(part => {
            if (!current[part]) current[part] = {};
            current = current[part];
        });
    });

    function render(node, prefix = '') {
        const keys = Object.keys(node);
        let output = '';
        keys.forEach((key, i) => {
            const isLast = i === keys.length - 1;
            const hasChildren = Object.keys(node[key]).length > 0;
            output += `${prefix}${isLast ? '└── ' : '├── '}${key}\n`;
            if (hasChildren) {
                output += render(node[key], prefix + (isLast ? '    ' : '│   '));
            }
        });
        return output;
    }

    return render(tree);
}

function minifyCode(content) {
    return content
        .replace(/\/\*[\s\S]*?\*\//g, '')           // Remove block comments
        .replace(/\/\/.*$/gm, '')                   // Remove line comments
        .replace(/^\s+/gm, '')                      // Trim leading whitespace
        .replace(/\n\s*\n/g, '\n')                  // Remove empty lines
        .trim();
}

// ── Output Actions ──
async function copyToClipboard() {
    const text = document.getElementById('outputTextarea').value;
    if (!text) {
        showToast('Nothing to copy', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showToast('✅ Copied to clipboard!');
    } catch (err) {
        // Fallback for older browsers
        const ta = document.getElementById('outputTextarea');
        ta.select();
        document.execCommand('copy');
        showToast('✅ Copied to clipboard!');
    }
}

function downloadFile(content, filename, type) {
    if (!content) {
        showToast('Combine files first', 'error');
        return;
    }
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
}

function downloadMarkdown() {
    downloadFile(combinedContent, 'combined-files.md', 'text/markdown');
}

function downloadText() {
    downloadFile(combinedContent, 'combined-files.txt', 'text/plain');
}

// ── Prompts ──
function addPromptTemplate() {
    const container = document.getElementById('promptButtons');
    container.innerHTML = Object.entries(promptTemplates).map(([key, template]) => `
        <button class="btn btn-secondary" style="width:100%;margin-bottom:8px;text-align:left;" 
                onclick="applyPromptTemplate('${key}');closePromptModal()">
            ${template.split(':')[0]}
        </button>
    `).join('');
    document.getElementById('promptModal').classList.remove('hidden');
}

function closePromptModal() {
    document.getElementById('promptModal').classList.add('hidden');
}

function applyPromptTemplate(key) {
    const textarea = document.getElementById('outputTextarea');
    textarea.value = promptTemplates[key] + textarea.value;
    combinedContent = textarea.value;
    updateTokenDisplay();
}

function addProjectContext() {
    const context = `## 📁 PROJECT CONTEXT
**Framework**: [Specify]
**Purpose**: [Brief description]
**Current Issue**: [Describe]
**Goal**: [What you want]

---

`;
    const textarea = document.getElementById('outputTextarea');
    textarea.value = context + textarea.value;
    combinedContent = textarea.value;
    showToast('Project context template added');
}

function addCustomPrompt() {
    const promptText = prompt('Enter your custom prompt:');
    if (promptText) {
        const textarea = document.getElementById('outputTextarea');
        textarea.value = `**CUSTOM REQUEST**: ${promptText}\n\n` + textarea.value;
        combinedContent = textarea.value;
        showToast('Custom prompt added');
    }
}

// ── Token Counter ──
function showTokenCount() {
    const content = document.getElementById('outputTextarea').value;
    if (!content) return;
    document.getElementById('tokenCounter').style.display = 'block';
    updateTokenDisplay();
}

function updateTokenDisplay() {
    const content = document.getElementById('outputTextarea').value;
    const tokens = estimateTokens(content);
    const limit = parseInt(document.getElementById('tokenLimitSelect').value) || 0;

    document.getElementById('tokenCount').textContent = tokens.toLocaleString();
    document.getElementById('tokenLimit').textContent = limit > 0 ? limit.toLocaleString() : '∞';

    const bar = document.getElementById('tokenProgress');
    const warning = document.getElementById('tokenWarning');

    if (limit > 0) {
        const pct = Math.min((tokens / limit) * 100, 100);
        bar.style.width = `${pct}%`;
        bar.className = `token-bar-fill ${pct > 90 ? 'danger' : pct > 75 ? 'warning' : 'safe'}`;
        warning.classList.toggle('hidden', tokens <= limit);
    } else {
        bar.style.width = '0%';
        bar.className = 'token-bar-fill safe';
        warning.classList.add('hidden');
    }
}

function estimateTokens(text) {
    return Math.ceil(text.length / 4 * (text.includes('```') ? 1.3 : 1.1));
}

// ── Preview ──
async function previewFile(index) {
    const file = allFiles[index];
    try {
        const content = await readFileContent(file);
        document.getElementById('previewFileName').textContent = file.webkitRelativePath || file.name;
        document.getElementById('previewContent').textContent = 
            content.length > 50000 
                ? content.substring(0, 50000) + '\n\n... [truncated for preview]' 
                : content;
        document.getElementById('previewModal').classList.remove('hidden');
    } catch (e) {
        showToast('Cannot preview this file', 'error');
    }
}

function closePreviewModal() {
    document.getElementById('previewModal').classList.add('hidden');
}

// ── Minify Toggle ──
function toggleMinifyFiles() {
    minifyOutput = !minifyOutput;
    const btn = document.getElementById('minifyBtn');
    btn.textContent = minifyOutput ? '📦 Minify: ON' : '📦 Minify';
    btn.classList.toggle('active-toggle', minifyOutput);
}

// ── Reset ──
function reset() {
    allRawFiles = [];
    allFiles = [];
    excludedFiles = [];
    selectedFiles.clear();
    combinedContent = '';
    minifyOutput = false;

    document.getElementById('folderInput').value = '';
    document.getElementById('outputTextarea').value = '';
    document.getElementById('fileItems').innerHTML = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('languageBars').innerHTML = '';
    document.getElementById('excludeInfo').innerHTML = '';
    document.getElementById('minifyBtn').textContent = '📦 Minify';
    document.getElementById('minifyBtn').classList.remove('active-toggle');
    document.getElementById('tokenCounter').style.display = 'none';

    ['settingsPanel','stats','languageBreakdown','searchWrapper','fileList','actionControls','outputSection']
        .forEach(id => document.getElementById(id).classList.add('hidden'));

    showToast('Reset complete');
}

// ── Helpers ──
function getFileExtension(name) {
    const lower = name.toLowerCase();
    if (lower === 'dockerfile') return 'dockerfile';
    if (lower === 'makefile') return 'makefile';
    const parts = name.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function getLanguageFromExtension(ext) {
    return languageMap[ext] || ext;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ── Path Selector ──
function openPathSelector() {
    if (!allFiles.length) {
        showToast('Load a folder first', 'error');
        return;
    }
    document.getElementById('pathTextarea').value = '';
    document.getElementById('pathResults').classList.add('hidden');
    document.getElementById('pathModal').classList.remove('hidden');
}

function closePathModal() {
    document.getElementById('pathModal').classList.add('hidden');
}

function matchAndSelectPaths(addToExisting = false) {
    const rawText = document.getElementById('pathTextarea').value.trim();
    if (!rawText) {
        showToast('Paste some file paths first', 'error');
        return;
    }

    const inputPaths = rawText.split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => line.replace(/\\/g, '/'));

    if (!addToExisting) selectNone();

    let matched = 0;
    let unmatched = [];

    inputPaths.forEach(inputPath => {
        let found = false;
        allFiles.forEach((file, i) => {
            const filePath = (file.webkitRelativePath || file.name).replace(/\\/g, '/');
            
            // Improved matching: exact, ends with, or contains the path
            if (filePath === inputPath || 
                filePath.endsWith('/' + inputPath) || 
                filePath.endsWith(inputPath)) {
                selectedFiles.add(i);
                const cb = document.getElementById(`file-${i}`);
                if (cb) cb.checked = true;
                found = true;
            }
        });
        if (found) matched++;
        else unmatched.push(inputPath);
    });

    updateStats();

    // Show results
    const resultsDiv = document.getElementById('pathResults');
    let html = `<div class="path-summary">
        <span class="path-matched">✅ ${matched} matched</span>
        <span class="path-unmatched">❌ ${unmatched.length} not found</span>
    </div>`;

    if (unmatched.length) {
        html += `<details class="path-details"><summary>Show unmatched paths</summary><ul>`;
        unmatched.forEach(p => html += `<li><code>${escapeHtml(p)}</code></li>`);
        html += `</ul></details>`;
    }

    resultsDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');

    showToast(`Selected ${matched} of ${inputPaths.length} paths`);
}

// ── Toast ──
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 3000);
}