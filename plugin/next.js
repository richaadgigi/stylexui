const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { run } = require('../../cli/xui-build');

let classMap = {};
let watching = false;

function loadClassMap() {
  const classMapPath = path.resolve('build/xui-classmap.json');
  if (fs.existsSync(classMapPath)) {
    try {
      const data = fs.readFileSync(classMapPath, 'utf-8');
      classMap = JSON.parse(data);
      console.log(`[stylexui] 🔁 Reloaded ${Object.keys(classMap).length} class mappings.`);
    } catch (err) {
      console.warn('[stylexui] ⚠️ Failed to parse classmap:', err);
    }
  }
}

function withStyleXUI(nextConfig = {}) {
  return {
    ...nextConfig,

    webpack(config, { dev, isServer }) {
      // Step 1: Run builder initially
      run(['src'], 'build/xui-utilities.css');
      loadClassMap();

      // Step 2: Inject generated CSS into client entry
      if (!isServer && config.entry) {
        const origEntry = config.entry;
        config.entry = async () => {
          const entries = await origEntry();
          if (entries['main.js'] && !entries['main.js'].includes('./build/xui-utilities.css')) {
            entries['main.js'].unshift('./build/xui-utilities.css');
          }
          return entries;
        };
      }

      // Step 3: Add loader to transform classnames
      config.module.rules.push({
        test: /\.(js|ts|jsx|tsx)$/,
        use: {
          loader: require.resolve('./stylexui-loader'),
          options: {
            classMap,
          },
        },
      });

      // Step 4: Watch file changes in dev
      if (dev && !watching) {
        const watcher = chokidar.watch('src/**/*.{js,ts,jsx,tsx}', {
          ignoreInitial: true,
        });

        watcher.on('change', (filePath) => {
          console.log(`[stylexui] 🔄 Change detected: ${filePath}`);
          run(['src'], 'build/xui-utilities.css');
          loadClassMap();
        });

        watching = true;
      }

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(config, { dev, isServer })
        : config;
    },
  };
}

module.exports = withStyleXUI;
