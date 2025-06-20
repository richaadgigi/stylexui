const fs = require('fs');
const path = require('path');

let classMap = {};

// Load classMap fresh every time in dev, once in prod
function loadClassMap() {
  const classMapPath = path.resolve('build/xui-classmap.json');
  if (fs.existsSync(classMapPath)) {
    try {
      classMap = JSON.parse(fs.readFileSync(classMapPath, 'utf-8'));
    } catch (e) {
      // console.warn('[stylexui-loader] ⚠️ Failed to parse classmap:', e);
      classMap = {};
    }
  }
}

module.exports = function(source) {
  // In dev mode, reload classMap every time to get latest mapping
  if (this.mode === 'development') {
    loadClassMap();
  } else if (!Object.keys(classMap).length) {
    // In prod, load once
    loadClassMap();
  }

  let transformed = source;

  for (const [original, sanitized] of Object.entries(classMap)) {
    transformed = transformed.split(original).join(sanitized);
  }

  return transformed;
};
