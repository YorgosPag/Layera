const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const file of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory() && file.name !== 'node_modules' && file.name !== '.git') {
      walk(fullPath);
    } else if (file.name === 'package.json') {
      try {
        const pkg = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (typeof pkg.name !== 'string' || !pkg.name.trim()) {
          console.log('Bad name:', fullPath);
        } else {
          console.log('✓', pkg.name, '-', fullPath);
        }
      } catch (e) {
        console.log('Bad JSON:', fullPath);
      }
    }
  }
}

walk(process.cwd());