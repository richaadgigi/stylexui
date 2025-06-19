module.exports = function stylexuiLoader(source, map) {
  const callback = this.async();
  const options = this.getOptions() || {};
  const classMap = options.classMap || {};

  let transformed = source;
  let changed = false;

  for (const [original, sanitized] of Object.entries(classMap)) {
    if (transformed.includes(original)) {
      transformed = transformed.split(original).join(sanitized);
      changed = true;
    }
  }

  callback(null, changed ? transformed : source, map);
};
