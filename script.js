// Global state
let allFiles = [];
let selectedFiles = new Set();
let combinedContent = '';
let minifyOutput = false;

// Code file extensions
const codeExtensions = new Set([
    'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'php',
    'rb', 'go', 'rs', 'swift', 'kt', 'scala', 'html', 'css', 'scss',
    'sass', 'less', 'vue', 'svelte', 'md', 'json', 'xml', 'yaml', 'yml',
    'sql', 'sh', 'bash', 'ps1', 'bat', 'dockerfile', 'makefile'
]);

// Language mapping for code blocks
const languageMap = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'vue': 'vue',
    'svelte': 'svelte',
    'md': 'markdown',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'sql': 'sql',
    'sh': 'bash',
    'bash': 'bash',
    'ps1': 'powershell',
    'bat': 'batch',
    'dockerfile': 'dockerfile',
    'makefile': 'makefile'
};

// AI Prompt templates
const promptTemplates = {
    debug: "🐛 **DEBUG REQUEST**: Please analyze the following code and help me identify and fix any bugs or issues:\n\n",
    refactor: "♻️ **REFACTOR REQUEST**: Please review this code and suggest improvements for better readability, performance, and maintainability:\n\n",
    explain: "💡 **EXPLAIN REQUEST**: Please explain how this code works, including the main components, functions, and logic flow:\n\n",
    optimize: "⚡ **OPTIMIZATION REQUEST**: Please analyze this code and suggest performance optimizations and best practices:\n\n",
    convert: "🔄 **CONVERSION REQUEST**: Please help me convert or migrate this code (specify target framework/language in your message):\n\n",
    review: "👀 **CODE REVIEW**: Please provide a comprehensive code review including potential issues, suggestions, and best practices:\n\n",
    test: "🧪 **TEST REQUEST**: Please help me write unit tests for the following code:\n\n",
    document: "📚 **DOCUMENTATION REQUEST**: Please help me create comprehensive documentation for this code:\n\n",
    security: "🔒 **SECURITY AUDIT**: Please analyze this code for potential security vulnerabilities and suggest fixes:\n\n",
    architecture: "🏗️ **ARCHITECTURE REVIEW**: Please review the overall structure and architecture of this code and suggest improvements:\n\n"
};

// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate file list items on scroll
    gsap.from('.file-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.file-list',
            start: 'top 80%',
            toggleActions: 'play none none reset'
        }
    });
});

// Drop zone functionality
const dropZone = document.getElementById('dropZone');
const folderInput = document.getElementById('folderInput');

dropZone.addEventListener('click', () => folderInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
        handleFiles(files);
    }
});

folderInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

// File handling functions
function handleFiles(files) {
    allFiles = files.filter(file => file.size > 0); // Filter out directories
    selectedFiles.clear();
    displayFiles();
    updateStats();
    showFileList();
}

function displayFiles() {
    const fileItems = document.getElementById('fileItems');
    fileItems.innerHTML = '';

    allFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item fade-in';
        fileItem.setAttribute('role', 'listitem');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `file-${index}`;
        checkbox.setAttribute('aria-label', `Select ${file.name}`);
        checkbox.addEventListener('change', () => toggleFileSelection(index));

        const label = document.createElement('label');
        label.htmlFor = `file-${index}`;
        label.className = 'file-path';
        // Sanitize file path to prevent XSS
        label.textContent = (file.webkitRelativePath || file.name).replace(/[<>]/g, '');

        const size = document.createElement('span');
        size.className = 'file-size';
        size.textContent = formatFileSize(file.size);

        fileItem.appendChild(checkbox);
        fileItem.appendChild(label);
        fileItem.appendChild(size);
        fileItem.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                toggleFileSelection(index);
            }
        });

        fileItems.appendChild(fileItem);
    });
}

function toggleFileSelection(index) {
    const checkbox = document.getElementById(`file-${index}`);
    if (checkbox.checked) {
        selectedFiles.add(index);
    } else {
        selectedFiles.delete(index);
    }
    updateStats();
}

function selectAll() {
    allFiles.forEach((_, index) => {
        selectedFiles.add(index);
        document.getElementById(`file-${index}`).checked = true;
    });
    updateStats();
}

function selectNone() {
    selectedFiles.clear();
    allFiles.forEach((_, index) => {
        document.getElementById(`file-${index}`).checked = false;
    });
    updateStats();
}

function selectCodeFiles() {
    selectNone();
    allFiles.forEach((file, index) => {
        const extension = getFileExtension(file.name);
        if (codeExtensions.has(extension)) {
            selectedFiles.add(index);
            document.getElementById(`file-${index}`).checked = true;
        }
    });
    updateStats();
}

function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

function getLanguageFromExtension(extension) {
    return languageMap[extension] || extension;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Prompt and modal functions
function addPromptTemplate() {
    const modal = createPromptModal();
    document.body.appendChild(modal);
    // Animate modal entrance
    gsap.from(modal.children[0], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'back.out(1.7)'
    });
}

function createPromptModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); display: flex; align-items: center; 
        justify-content: center; z-index: 1000;
    `;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'AI Prompt Selection');

    const content = document.createElement('div');
    content.style.cssText = `
        background: white; padding: 30px; border-radius: 15px; 
        max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;
    `;

    content.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #667eea;">🤖 Choose AI Prompt Template</h3>
        ${Object.entries(promptTemplates).map(([key, template]) => `
            <button class="btn btn-secondary" style="width: 100%; margin-bottom: 10px; text-align: left;" 
                    onclick="applyPromptTemplate('${key}'); closeModal()"
                    aria-label="Select ${key} prompt">
                ${template.split(':')[0]}
            </button>
        `).join('')}
        <button class="btn btn-primary" onclick="closeModal()" style="width: 100%; margin-top: 15px;" aria-label="Close modal">
            ❌ Close
        </button>
    `;

    modal.appendChild(content);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    window.closeModal = () => {
        gsap.to(modal.children[0], {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'back.in(1.7)',
            onComplete: () => document.body.removeChild(modal)
        });
    };

    return modal;
}

function applyPromptTemplate(templateKey) {
    const template = promptTemplates[templateKey];
    const currentContent = document.getElementById('outputTextarea').value;
    document.getElementById('outputTextarea').value = template + currentContent;
}

function addProjectContext() {
    const context = `
## 📁 PROJECT CONTEXT
**Framework/Technology**: [Specify: React, Vue, Node.js, Python Django, etc.]
**Purpose**: [Brief description of what this project/feature does]
**Current Issue**: [Describe the problem you're facing]
**Goal**: [What you want to achieve]

---

`;
    const currentContent = document.getElementById('outputTextarea').value;
    document.getElementById('outputTextarea').value = context + currentContent;
}

function addCustomPrompt() {
    const customPrompt = prompt('Enter your custom prompt or instruction for ChatGPT:');
    if (customPrompt) {
        const currentContent = document.getElementById('outputTextarea').value;
        document.getElementById('outputTextarea').value = `**CUSTOM REQUEST**: ${customPrompt.replace(/[<>]/g, '')}\n\n${currentContent}`;
    }
}

function copyToClipboard() {
    const textarea = document.getElementById('outputTextarea');
    textarea.select();
    document.execCommand('copy');

    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function showTokenCount() {
    const content = document.getElementById('outputTextarea').value;
    const tokens = estimateTokens(content);
    document.getElementById('tokenCount').textContent = tokens.toLocaleString();
    document.getElementById('tokenCounter').style.display = 'block';
}

function estimateTokens(text) {
    const codeMultiplier = text.includes('```') ? 1.3 : 1.1;
    return Math.ceil((text.length / 4) * codeMultiplier);
}

function toggleMinifyFiles() {
    minifyOutput = !minifyOutput;
    const btn = event.target;
    btn.textContent = minifyOutput ? '📦 Minify: ON' : '📦 Minify Output';
    btn.style.background = minifyOutput ? '#4CAF50' : '';
}

function minifyCode(content) {
    return content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/^\s+/gm, '') // Remove leading whitespace
        .replace(/\n\s*\n/g, '\n') // Remove empty lines
        .trim();
}

function filterFiles(filterType) {
    const items = document.querySelectorAll('.file-item');
    items.forEach((item, index) => {
        const filePath = allFiles[index].webkitRelativePath || allFiles[index].name;
        const extension = getFileExtension(filePath);
        let show = true;

        switch (filterType) {
            case 'components':
                show = filePath.includes('component') || filePath.includes('Component') ||
                       ['jsx', 'tsx', 'vue'].includes(extension);
                break;
            case 'styles':
                show = ['css', 'scss', 'sass', 'less', 'stylus'].includes(extension);
                break;
            case 'config':
                show = filePath.includes('config') || filePath.includes('.env') ||
                       ['json', 'yaml', 'yml', 'toml'].includes(extension) ||
                       filePath.includes('package.json') || filePath.includes('tsconfig');
                break;
            case 'all':
            default:
                show = true;
        }

        item.style.display = show ? 'flex' : 'none';
    });
}

function updateStats() {
    const totalSize = Array.from(selectedFiles).reduce((sum, index) => sum + allFiles[index].size, 0);

    document.getElementById('totalFiles').textContent = allFiles.length;
    document.getElementById('selectedFiles').textContent = selectedFiles.size;
    document.getElementById('totalSize').textContent = formatFileSize(totalSize);
}

function showFileList() {
    document.getElementById('stats').classList.remove('hidden');
    document.getElementById('fileList').classList.remove('hidden');
    document.getElementById('actionControls').classList.remove('hidden');
}

async function combineFiles() {
    if (selectedFiles.size === 0) {
        alert('Please select at least one file to combine.');
        return;
    }

    const useCodeBlocks = document.getElementById('useCodeBlocks').checked;
    combinedContent = '';
    const sortedFiles = Array.from(selectedFiles).sort();

    for (const index of sortedFiles) {
        const file = allFiles[index];
        const relativePath = (file.webkitRelativePath || file.name).replace(/[<>]/g, '');

        try {
            let content = await readFileContent(file);

            if (minifyOutput && codeExtensions.has(getFileExtension(file.name))) {
                content = minifyCode(content);
            }

            if (useCodeBlocks) {
                const extension = getFileExtension(file.name);
                const language = getLanguageFromExtension(extension);
                combinedContent += `${relativePath} - \n\`\`\`${language}\n// ${relativePath}\n\n${content}\n\`\`\`\n\n`;
            } else {
                combinedContent += `${relativePath} - \n// ${relativePath}\n\n${content}\n\n`;
            }
        } catch (error) {
            console.error(`Error reading file ${relativePath}:`, error);
            if (useCodeBlocks) {
                combinedContent += `${relativePath} - \n\`\`\`\n// Error reading file: ${error.message}\n\`\`\`\n\n`;
            } else {
                combinedContent += `${relativePath} - \n// Error reading file: ${error.message}\n\n`;
            }
        }
    }

    document.getElementById('outputTextarea').value = combinedContent;
    document.getElementById('outputSection').classList.remove('hidden');
}

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e.target.error);
        reader.readAsText(file);
    });
}

function downloadMarkdown() {
    if (!combinedContent) {
        alert('Please combine files first before downloading.');
        return;
    }

    const blob = new Blob([combinedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'combined-files.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function reset() {
    allFiles = [];
    selectedFiles.clear();
    combinedContent = '';
    minifyOutput = false;

    document.getElementById('folderInput').value = '';
    document.getElementById('outputTextarea').value = '';
    document.getElementById('fileItems').innerHTML = '';
}