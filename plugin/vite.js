const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { run } = require('../cli/xui-build');

let classMap = {};
let watching = false;

function loadClassMap() {
  const classMapPath = path.resolve('build/xui-classmap.json');
  if (fs.existsSync(classMapPath)) {
    try {
      const json = fs.readFileSync(classMapPath, 'utf-8');
      classMap = JSON.parse(json);
      console.log(`[stylexui] 🔁 Reloaded ${Object.keys(classMap).length} class mappings.`);
    } catch (e) {
      console.warn('[stylexui] ⚠️ Failed to parse classmap:', e);
    }
  }
}

function stylexui() {
  let server;

  return {
    name: 'vite-plugin-stylexui',

    configResolved(config) {
      const isDev = config.command === 'serve';

      if (isDev && !watching) {
        console.log('[stylexui] 👀 Watching for changes...');
        const watcher = chokidar.watch('src/**/*.{js,ts,jsx,tsx,vue,svelte,html}', {
          ignoreInitial: true
        });

        watcher.on('change', (filePath) => {
          console.log(`[stylexui] 🔄 Change detected: ${filePath}`);
          run(['src'], 'build/xui-utilities.css');
          loadClassMap();

          // Invalidate the module so Vite will re-transform it
          if (server) {
            const module = server.moduleGraph.getModuleById(filePath);
            if (module) {
              server.moduleGraph.invalidateModule(module);
              console.log(`[stylexui] ♻️ Invalidated module: ${filePath}`);
            }
          }
        });

        watching = true;
      }
    },

    configureServer(viteServer) {
      server = viteServer;
    },

    buildStart() {
      console.log('[stylexui] 🏗️ Initial build...');
      run(['src'], 'build/xui-utilities.css');
      loadClassMap();
    },

    transform(code, id) {
      if (!/\.(js|ts|jsx|tsx|html|svelte|vue)$/.test(id)) return;

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
          map: null
        };
      }

      return null;
    }
  };
}

module.exports = stylexui;
