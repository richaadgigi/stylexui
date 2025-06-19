#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Match xui-[optional-breakpoint]-[key]-[value]
const CLASS_REGEX = /xui-(sm|md|lg|xl)?-?([a-z-]+)?-\[([^\]]+)\]/g;

// Maps short keys to full CSS properties
const propertyMap = {
  "bg": "background-color",
  "bg-img": "background-image",
  "text": "color",
  "img": "max-width",
  "column-count": "column-count",
  "column-count-gap": "column-gap",
  "m": "margin",
  "mt": "margin-top",
  "mr": "margin-right",
  "mb": "margin-bottom",
  "ml": "margin-left",
  "mx": ["margin-left", "margin-right"],
  "my": ["margin-top", "margin-bottom"],
  "p": "padding",
  "pt": "padding-top",
  "pr": "padding-right",
  "pb": "padding-bottom",
  "pl": "padding-left",
  "px": ["padding-left", "padding-right"],
  "py": ["padding-top", "padding-bottom"],
  "space": "letter-spacing",
  "bdr-rad": "border-radius",
  "bdr-w": "border-width",
  "bdr": "border-color",
  "z-index": "z-index",
  "min-w": "min-width",
  "min-h": "min-height",
  "max-w": "max-width",
  "max-h": "max-height",
  "font-w": "font-weight",
  "font-sz": "font-size",
  "opacity": "opacity",
  "w": "width",
  "h": "height",
  "line-height": "line-height",
  "letter-spacing": "letter-spacing",
  "grid-gap": "grid-gap",
  "flex-grow": "flex-grow",
  "flex-shrink": "flex-shrink"
};

// Breakpoint definitions
const responsiveMap = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

// Recursively collect classnames from files
function scanFilesRecursively(dir, extensions = ['.js', '.ts', '.jsx', '.tsx']) {
  const results = new Set();
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanFilesRecursively(fullPath, extensions).forEach(cls => results.add(cls));
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      let match;
      while ((match = CLASS_REGEX.exec(content)) !== null) {
        results.add(match[0]);
      }
    }
  }

  return results;
}

// Generate consistent class name from original
function getSanitizedClassName(rawKey, rawValue, important = false) {
  const base = `${rawKey}--${rawValue.replace(/[^a-zA-Z0-9]/g, '-')}`;
  return `xui-${base}${important ? '--important' : ''}`;
}

// Turn 1 class into CSS rule
function generateCSSRule(cls) {
  const match = cls.match(/xui-(sm|md|lg|xl)?-?([a-z-]+)?-\[([^\]]+)\]/);
  if (!match) return { rule: '', className: null };

  const [, bp, rawKey, rawValue] = match;

  const hasImportant = rawValue.trim().endsWith('!');
  const cleanValue = rawValue.trim().replace(/!$/, '');
  const className = getSanitizedClassName(rawKey, cleanValue, hasImportant);
  const props = propertyMap[rawKey];

  if (!props) return { rule: '', className: null };

  if (cleanValue.includes('${')) return { rule: '', className: null };

  const suffix = hasImportant ? ' !important' : '';
  const body = Array.isArray(props)
    ? props.map(p => `${p}: ${cleanValue}${suffix};`).join(' ')
    : `${props}: ${cleanValue}${suffix};`;

  const css = `.${className} { ${body} }`;

  const rule = bp && responsiveMap[bp]
    ? `@media (min-width: ${responsiveMap[bp]}) {\n  ${css}\n}`
    : css;

  return { rule, className, original: cls };
}

// Run once to generate CSS and class map
function run(inputDirs = ['src'], outputPath = 'build/xui-utilities.css') {
  const allClasses = new Set();
  const classMap = {};
  const cssRules = [];

  inputDirs.forEach(dir => {
    const classes = scanFilesRecursively(path.resolve(process.cwd(), dir));
    classes.forEach(cls => allClasses.add(cls));
  });

  for (const cls of allClasses) {
    const { rule, className, original } = generateCSSRule(cls);
    if (rule && className) {
      cssRules.push(rule);
      classMap[original] = className;
    }
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, cssRules.join('\n'), 'utf-8');
  fs.writeFileSync('build/xui-classmap.json', JSON.stringify(classMap, null, 2), 'utf-8');

  console.log(`[stylexui] ✅ Rebuilt ${outputPath} with ${cssRules.length} rules.`);
}

// Optional: Watch files for live rebuild
function watch(inputDirs = ['src'], outputPath = 'build/xui-utilities.css') {
  console.log('[stylexui] 👀 Watching for changes...');
  run(inputDirs, outputPath);

  inputDirs.forEach(dir => {
    fs.watch(
      dir,
      { recursive: true },
      () => {
        run(inputDirs, outputPath);
      }
    );
  });
}

module.exports = { run, watch };

// If run from CLI:
if (require.main === module) {
  const mode = process.argv.includes('--watch') ? 'watch' : 'run';
  const dirs = ['src'];
  const out = 'build/xui-utilities.css';

  if (mode === 'watch') watch(dirs, out);
  else run(dirs, out);
}
