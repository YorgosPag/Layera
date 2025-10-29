#!/usr/bin/env node

/**
 * 📁 ENTERPRISE FILE SCANNING UTILITIES
 * Γιώργου Παγώνη - Documentation Domain Shared Library
 *
 * Windows-compatible file scanning με enterprise features
 * Χρησιμοποιείται από όλα τα documentation validation scripts
 */

const fs = require('fs');
const path = require('path');

/**
 * 🔍 Σάρωση για markdown αρχεία με φιλτράρισμα
 * @param {string} rootDir - Η ρίζα του project
 * @param {Object} options - Επιλογές σάρωσης
 * @returns {Array} - Λίστα με file paths
 */
function findMarkdownFiles(rootDir = '.', options = {}) {
  const defaultOptions = {
    excludeNodeModules: true,
    excludeBackups: true,
    excludeDotFiles: true,
    includePatterns: ['**/*.md'],
    excludePatterns: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    maxDepth: 10,
    followSymlinks: false
  };

  const opts = { ...defaultOptions, ...options };
  const files = [];

  function scanDirectory(dir, currentDepth = 0) {
    if (currentDepth > opts.maxDepth) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(rootDir, fullPath);

        // Skip based on options
        if (opts.excludeNodeModules && entry.name === 'node_modules') continue;
        if (opts.excludeDotFiles && entry.name.startsWith('.') && entry.name !== '.github') continue;
        if (opts.excludeBackups && entry.name.includes('.backup.')) continue;

        // Skip patterns
        const shouldExclude = opts.excludePatterns.some(pattern => {
          return relativePath.includes(pattern.replace('**/', '').replace('/**', ''));
        });
        if (shouldExclude) continue;

        if (entry.isDirectory()) {
          scanDirectory(fullPath, currentDepth + 1);
        } else if (entry.isFile()) {
          // Check if file matches include patterns
          const matchesPattern = opts.includePatterns.some(pattern => {
            if (pattern === '**/*.md') return entry.name.endsWith('.md');
            if (pattern === '**/*.js') return entry.name.endsWith('.js');
            if (pattern === '**/*.ts') return entry.name.endsWith('.ts');
            if (pattern === '**/*.tsx') return entry.name.endsWith('.tsx');
            if (pattern === '**/*.json') return entry.name.endsWith('.json');
            return entry.name.includes(pattern);
          });

          if (matchesPattern) {
            files.push({
              path: fullPath,
              relativePath: relativePath,
              name: entry.name,
              size: fs.statSync(fullPath).size,
              modified: fs.statSync(fullPath).mtime
            });
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not scan ${dir}:`, error.message);
    }
  }

  scanDirectory(rootDir);
  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

/**
 * 📊 Στατιστικά directory
 * @param {string} dir - Η διαδρομή
 * @returns {Object} - Στατιστικά
 */
function getDirectoryStats(dir) {
  const stats = {
    totalFiles: 0,
    totalDirs: 0,
    totalSize: 0,
    fileTypes: {},
    largestFile: null,
    oldestFile: null,
    newestFile: null
  };

  function scan(currentDir) {
    try {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          stats.totalDirs++;
          scan(fullPath);
        } else if (entry.isFile()) {
          const fileStat = fs.statSync(fullPath);
          const ext = path.extname(entry.name) || 'no-extension';

          stats.totalFiles++;
          stats.totalSize += fileStat.size;

          // File types
          stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1;

          // Largest file
          if (!stats.largestFile || fileStat.size > stats.largestFile.size) {
            stats.largestFile = { path: fullPath, size: fileStat.size };
          }

          // Oldest and newest files
          if (!stats.oldestFile || fileStat.mtime < stats.oldestFile.modified) {
            stats.oldestFile = { path: fullPath, modified: fileStat.mtime };
          }
          if (!stats.newestFile || fileStat.mtime > stats.newestFile.modified) {
            stats.newestFile = { path: fullPath, modified: fileStat.mtime };
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not scan ${currentDir}:`, error.message);
    }
  }

  scan(dir);
  return stats;
}

/**
 * 🔎 Αναζήτηση αρχείων με περιεχόμενο
 * @param {string} rootDir - Η ρίζα
 * @param {string|RegExp} searchPattern - Το pattern αναζήτησης
 * @param {Object} options - Επιλογές
 * @returns {Array} - Αποτελέσματα αναζήτησης
 */
function searchInFiles(rootDir, searchPattern, options = {}) {
  const files = findMarkdownFiles(rootDir, options);
  const results = [];

  const regex = typeof searchPattern === 'string'
    ? new RegExp(searchPattern, 'gi')
    : searchPattern;

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file.path, 'utf8');
      const lines = content.split('\n');
      const matches = [];

      lines.forEach((line, index) => {
        let match;
        while ((match = regex.exec(line)) !== null) {
          matches.push({
            lineNumber: index + 1,
            line: line.trim(),
            match: match[0],
            position: match.index
          });
        }
        regex.lastIndex = 0; // Reset για επόμενη γραμμή
      });

      if (matches.length > 0) {
        results.push({
          file: file,
          matches: matches,
          totalMatches: matches.length
        });
      }
    } catch (error) {
      console.warn(`⚠️  Could not read ${file.path}:`, error.message);
    }
  });

  return results;
}

/**
 * 💾 Δημιουργία backup αρχείου
 * @param {string} filePath - Η διαδρομή του αρχείου
 * @param {string} suffix - Το suffix για το backup (προαιρετικό)
 * @returns {string} - Η διαδρομή του backup
 */
function createBackup(filePath, suffix = null) {
  const timestamp = Date.now();
  const backupSuffix = suffix || `backup.${timestamp}`;
  const backupPath = `${filePath}.${backupSuffix}`;

  try {
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  } catch (error) {
    throw new Error(`Failed to create backup for ${filePath}: ${error.message}`);
  }
}

/**
 * 🧹 Καθαρισμός παλιών backup αρχείων
 * @param {string} rootDir - Η ρίζα
 * @param {number} maxAge - Μέγιστη ηλικία σε ημέρες
 * @returns {Array} - Λίστα με διαγραμμένα αρχεία
 */
function cleanupBackups(rootDir, maxAge = 7) {
  const backupFiles = findMarkdownFiles(rootDir, {
    includePatterns: ['**/*.backup.*'],
    excludeBackups: false
  });

  const cutoffTime = Date.now() - (maxAge * 24 * 60 * 60 * 1000);
  const deletedFiles = [];

  backupFiles.forEach(file => {
    if (file.modified.getTime() < cutoffTime) {
      try {
        fs.unlinkSync(file.path);
        deletedFiles.push(file.path);
      } catch (error) {
        console.warn(`⚠️  Could not delete ${file.path}:`, error.message);
      }
    }
  });

  return deletedFiles;
}

/**
 * 🔍 Γενική σάρωση για όλους τους τύπους αρχείων
 * @param {string} rootDir - Η ρίζα του project
 * @param {Object} options - Επιλογές σάρωσης
 * @returns {Array} - Λίστα με file objects {path, name, ext, size}
 */
function findAllFiles(rootDir = '.', options = {}) {
  const defaultOptions = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.md'],
    excludeNodeModules: true,
    excludeBackups: true,
    excludeDotFiles: true,
    patterns: [],
    excludePatterns: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**'],
    maxDepth: 10,
    followSymlinks: false
  };

  const opts = { ...defaultOptions, ...options };
  const results = [];

  function scanDirectory(dir, currentDepth = 0) {
    if (currentDepth > opts.maxDepth) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(rootDir, fullPath);

        // Skip dot files if option is set
        if (opts.excludeDotFiles && entry.name.startsWith('.')) {
          continue;
        }

        // Skip excluded patterns
        if (opts.excludePatterns.some(pattern =>
          relativePath.includes(pattern.replace(/\*\*/g, '').replace(/\*/g, ''))
        )) {
          continue;
        }

        if (entry.isDirectory()) {
          if (!opts.followSymlinks && entry.isSymbolicLink()) {
            continue;
          }
          scanDirectory(fullPath, currentDepth + 1);
        } else if (entry.isFile()) {
          const fileExt = path.extname(entry.name);

          // Check extension filter
          if (opts.extensions.length > 0 && !opts.extensions.includes(fileExt)) {
            continue;
          }

          // Check pattern filter if provided
          if (opts.patterns.length > 0) {
            const matchesPattern = opts.patterns.some(pattern => {
              const regex = new RegExp(pattern.replace(/\*/g, '.*').replace(/\?/g, '.'));
              return regex.test(relativePath);
            });
            if (!matchesPattern) continue;
          }

          try {
            const stats = fs.statSync(fullPath);
            results.push({
              path: fullPath,
              relativePath: relativePath,
              name: entry.name,
              ext: fileExt,
              size: stats.size,
              modified: stats.mtime,
              directory: path.dirname(relativePath)
            });
          } catch (error) {
            console.warn(`Could not get stats for ${fullPath}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.warn(`Could not read directory: ${dir}`, error.message);
    }
  }

  scanDirectory(rootDir);
  return results.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

/**
 * 📈 File watching (για real-time validation)
 * @param {string} rootDir - Η ρίζα
 * @param {Function} callback - Callback για αλλαγές
 * @param {Object} options - Επιλογές watching
 */
function watchFiles(rootDir, callback, options = {}) {
  const opts = {
    fileTypes: ['.md'],
    debounceMs: 500,
    ...options
  };

  const watchers = [];
  let debounceTimeout;

  function handleChange(eventType, filename, filePath) {
    // Debounce multiple rapid changes
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (opts.fileTypes.some(ext => filename.endsWith(ext))) {
        callback(eventType, filename, filePath);
      }
    }, opts.debounceMs);
  }

  // Watch the root directory and subdirectories
  function setupWatchers(dir) {
    try {
      const watcher = fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          const fullPath = path.join(dir, filename);
          handleChange(eventType, filename, fullPath);
        }
      });

      watchers.push(watcher);
    } catch (error) {
      console.warn(`⚠️  Could not watch ${dir}:`, error.message);
    }
  }

  setupWatchers(rootDir);

  // Return cleanup function
  return () => {
    watchers.forEach(watcher => watcher.close());
    clearTimeout(debounceTimeout);
  };
}

module.exports = {
  findMarkdownFiles,
  findAllFiles,
  getDirectoryStats,
  searchInFiles,
  createBackup,
  cleanupBackups,
  watchFiles
};