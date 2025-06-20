const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { run } = require('../cli/xui-build');

const srcDir = path.resolve('src');
const buildDir = path.resolve('build');
const stylesDir = path.resolve('src/stylexui'); // <-- inside src now
const cssFileName = 'dynamic.css';

let classMap = {};
let watching = false;

function loadClassMap() {
  const classMapPath = path.resolve(buildDir, 'xui-classmap.json');
  if (fs.existsSync(classMapPath)) {
    try {
      classMap = JSON.parse(fs.readFileSync(classMapPath, 'utf-8'));
      // console.log(`[stylexui] 🔁 Loaded ${Object.keys(classMap).length} class mappings.`);
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
    // console.log(`[stylexui] 📄 Copied CSS to src/styles folder: ${dest}`);
  } else {
    // console.warn(`[stylexui] ⚠️ CSS file not found to copy: ${src}`);
  }
}

function withStylexui(nextConfig = {}) {
  return {
    ...nextConfig,

    webpack(config, options) {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      if (options.dev && !watching) {
        watching = true;
        console.log('[stylexui] 👀 Watching for file changes...');
        chokidar.watch(`${srcDir}/**/*.{js,ts,jsx,tsx}`, { ignoreInitial: true })
          .on('change', (filePath) => {
            console.log(`[stylexui] 🔄 File changed: ${filePath}`);
            run([srcDir], path.resolve(buildDir, cssFileName));
            loadClassMap();
            copyCssToStyles();
          });

        console.log('[stylexui] 🏗️ Running initial build...');
        run([srcDir], path.resolve(buildDir, cssFileName));
        loadClassMap();
        copyCssToStyles();
      }

      config.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{ loader: path.resolve(__dirname, './stylexui-loader.js') }],
      });

      return config;
    },
  };
}

module.exports = withStylexui;
