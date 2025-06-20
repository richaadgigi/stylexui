const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { run } = require('../cli/xui-build');

const srcDir = path.resolve('src');
const buildDir = path.resolve('build');
const stylesDir = path.resolve('src/stylexui'); // same as Next.js
const cssFileName = 'dynamic.css';

let classMap = {};
let watching = false;

function loadClassMap() {
  const classMapPath = path.resolve(buildDir, 'xui-classmap.json');
  if (fs.existsSync(classMapPath)) {
    try {
      const json = fs.readFileSync(classMapPath, 'utf-8');
      classMap = JSON.parse(json);
      // console.log(`[stylexui] 🔁 Reloaded ${Object.keys(classMap).length} class mappings.`);
    } catch (e) {
      // console.warn('[stylexui] ⚠️ Failed to parse classmap:', e);
    }
  }
}

function copyCssToStyles() {
  const src = path.resolve(buildDir, cssFileName);
  const dest = path.resolve(stylesDir, cssFileName);

  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    // console.log(`[stylexui] 📄 Copied CSS to src/stylexui folder: ${dest}`);
  } else {
    // console.warn(`[stylexui] ⚠️ CSS file not found to copy: ${src}`);
  }
}

function writeAutoImportFile() {
  const autoImportFile = path.resolve(__dirname, '.stylexui-auto-import.js');
  const importPath = './' + path.relative(
    path.dirname(autoImportFile),
    path.resolve(stylesDir, cssFileName)
  ).replace(/\\/g, '/');

  const content = `import '${importPath}';\n`;
  fs.writeFileSync(autoImportFile, content);
  // console.log(`[stylexui] 📝 Wrote auto-import file: ${autoImportFile}`);
  return autoImportFile;
}

function stylexui() {
  let server;
  let autoImportFile;

  return {
    name: 'vite-plugin-stylexui',

    configResolved(config) {
      const isDev = config.command === 'serve';

      if (isDev && !watching) {
        watching = true;

        // console.log('[stylexui] 👀 Watching for changes...');
        const watcher = chokidar.watch(`${srcDir}/**/*.{js,ts,jsx,tsx,vue,svelte,html}`, {
          ignoreInitial: true,
        });

        watcher.on('change', (filePath) => {
          // console.log(`[stylexui] 🔄 File changed: ${filePath}`);
          run([srcDir], path.resolve(buildDir, cssFileName));
          loadClassMap();
          copyCssToStyles();
          autoImportFile = writeAutoImportFile();

          if (server) {
            const mod = server.moduleGraph.getModuleById(filePath);
            if (mod) {
              server.moduleGraph.invalidateModule(mod);
              // console.log(`[stylexui] ♻️ Invalidated module: ${filePath}`);
            }
          }
        });
      }
    },

    configureServer(viteServer) {
      server = viteServer;
    },

    buildStart() {
      // console.log('[stylexui] 🏗️ Initial build...');
      run([srcDir], path.resolve(buildDir, cssFileName));
      loadClassMap();
      copyCssToStyles();
      autoImportFile = writeAutoImportFile();
    },

    resolveId(id) {
      // Resolve the auto-import file so Vite can find it
      if (id === 'stylexui-auto-import') {
        return autoImportFile;
      }
      return null;
    },

    load(id) {
      if (id === autoImportFile) {
        return fs.readFileSync(autoImportFile, 'utf-8');
      }
      return null;
    },

    // Inject auto-import file into every JS/TS/etc module as a virtual import
    transform(code, id) {
      if (!/\.(js|ts|jsx|tsx|vue|svelte)$/.test(id)) return null;

      // Inject the auto-import at the top of the module
      if (autoImportFile) {
        // Avoid double injecting
        if (!code.includes('stylexui-auto-import')) {
          return {
            code: `import 'stylexui-auto-import';\n${code}`,
            map: null,
          };
        }
      }

      return null;
    },

    transformIndexHtml(html) {
      // no change here, CSS auto-import handled via JS import
      return html;
    },

    // Your class rename transform
    transform(code, id) {
      if (!/\.(js|ts|jsx|tsx|html|vue|svelte)$/.test(id)) return null;

      let transformed = code;
      let changed = false;

      for (const [original, sanitized] of Object.entries(classMap)) {
        if (transformed.includes(original)) {
          transformed = transformed.split(original).join(sanitized);
          changed = true;
        }
      }

      if (changed) {
        return {
          code: transformed,
          map: null,
        };
      }
      return null;
    },
  };
}

module.exports = stylexui;
