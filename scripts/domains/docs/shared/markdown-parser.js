#!/usr/bin/env node

/**
 * 📚 ENTERPRISE MARKDOWN PARSING UTILITIES
 * Γιώργου Παγώνη - Documentation Domain Shared Library
 *
 * Κοινές utilities για επεξεργασία markdown αρχείων
 * Χρησιμοποιείται από όλα τα documentation validation scripts
 */

const fs = require('fs');
const path = require('path');

/**
 * 📖 Εξάγει code blocks από markdown content
 * @param {string} content - Το markdown content
 * @param {string} language - Η γλώσσα προγραμματισμού (προαιρετικό)
 * @returns {Array} - Λίστα με code blocks
 */
function extractCodeBlocks(content, language = null) {
  const codeBlocks = [];

  // Regex για fenced code blocks (```)
  const fencedRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = fencedRegex.exec(content)) !== null) {
    const blockLanguage = match[1] || 'text';
    const code = match[2].trim();

    // Αν καθορίστηκε συγκεκριμένη γλώσσα, φιλτράρουμε
    if (!language || blockLanguage === language) {
      codeBlocks.push({
        language: blockLanguage,
        code: code,
        lineStart: content.substring(0, match.index).split('\n').length,
        lineEnd: content.substring(0, match.index + match[0].length).split('\n').length
      });
    }
  }

  return codeBlocks;
}

/**
 * 🔗 Εξάγει όλα τα links από markdown content
 * @param {string} content - Το markdown content
 * @returns {Array} - Λίστα με links
 */
function extractLinks(content) {
  const links = [];

  // Markdown links [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      type: 'markdown',
      lineNumber: content.substring(0, match.index).split('\n').length
    });
  }

  // Reference style links [text][ref]
  const refLinkRegex = /\[([^\]]+)\]\[([^\]]+)\]/g;
  while ((match = refLinkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      reference: match[2],
      type: 'reference',
      lineNumber: content.substring(0, match.index).split('\n').length
    });
  }

  // HTML links <a href="url">text</a>
  const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"(?:[^>]*?)>([^<]*)<\/a>/gi;
  while ((match = htmlLinkRegex.exec(content)) !== null) {
    links.push({
      text: match[2],
      url: match[1],
      type: 'html',
      lineNumber: content.substring(0, match.index).split('\n').length
    });
  }

  return links;
}

/**
 * 📝 Εξάγει headers από markdown content
 * @param {string} content - Το markdown content
 * @returns {Array} - Λίστα με headers
 */
function extractHeaders(content) {
  const headers = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // ATX headers (# ## ###)
    const atxMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (atxMatch) {
      headers.push({
        level: atxMatch[1].length,
        text: atxMatch[2].trim(),
        lineNumber: index + 1,
        type: 'atx'
      });
    }

    // Setext headers (underlined with = or -)
    if (index < lines.length - 1) {
      const nextLine = lines[index + 1];
      if (/^=+$/.test(nextLine)) {
        headers.push({
          level: 1,
          text: line.trim(),
          lineNumber: index + 1,
          type: 'setext'
        });
      } else if (/^-+$/.test(nextLine)) {
        headers.push({
          level: 2,
          text: line.trim(),
          lineNumber: index + 1,
          type: 'setext'
        });
      }
    }
  });

  return headers;
}

/**
 * 🎯 Εξάγει imports από TypeScript/JavaScript code blocks
 * @param {string} code - Ο κώδικας
 * @returns {Array} - Λίστα με imports
 */
function extractImports(code) {
  const imports = [];

  // ES6 imports
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"](.*?)['"];?/g;
  let match;

  while ((match = importRegex.exec(code)) !== null) {
    imports.push({
      module: match[1],
      statement: match[0],
      lineNumber: code.substring(0, match.index).split('\n').length
    });
  }

  // CommonJS requires
  const requireRegex = /(?:const|let|var)\s+(?:\{[^}]*\}|\w+)\s*=\s*require\s*\(\s*['"](.*?)['\"]\s*\);?/g;
  while ((match = requireRegex.exec(code)) !== null) {
    imports.push({
      module: match[1],
      statement: match[0],
      type: 'commonjs',
      lineNumber: code.substring(0, match.index).split('\n').length
    });
  }

  return imports;
}

/**
 * 🔍 Ψάχνει για specific patterns στο markdown
 * @param {string} content - Το markdown content
 * @param {Array} patterns - Λίστα με RegExp patterns
 * @returns {Array} - Λίστα με matches
 */
function findPatterns(content, patterns) {
  const matches = [];

  patterns.forEach(pattern => {
    const regex = pattern.pattern;
    let match;

    while ((match = regex.exec(content)) !== null) {
      matches.push({
        pattern: pattern.name || pattern.pattern.toString(),
        match: match[0],
        groups: match.slice(1),
        lineNumber: content.substring(0, match.index).split('\n').length,
        columnNumber: match.index - content.lastIndexOf('\n', match.index - 1),
        severity: pattern.severity || 'INFO',
        description: pattern.description || 'Pattern found'
      });
    }
  });

  return matches;
}

/**
 * 📊 Στατιστικά markdown αρχείου
 * @param {string} content - Το markdown content
 * @returns {Object} - Στατιστικά
 */
function getMarkdownStats(content) {
  const lines = content.split('\n');
  const words = content.split(/\s+/).filter(word => word.length > 0);

  return {
    lines: lines.length,
    words: words.length,
    characters: content.length,
    charactersNoSpaces: content.replace(/\s/g, '').length,
    headers: extractHeaders(content).length,
    codeBlocks: extractCodeBlocks(content).length,
    links: extractLinks(content).length,
    isEmpty: content.trim().length === 0
  };
}

module.exports = {
  extractCodeBlocks,
  extractLinks,
  extractHeaders,
  extractImports,
  findPatterns,
  getMarkdownStats
};