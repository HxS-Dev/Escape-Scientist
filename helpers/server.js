const isDev = () => {
  let dev = false;
  if (
    process.defaultApp ||
    /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
    /[\\/]electron[\\/]/.test(process.execPath)
  ) {
    dev = true;
  }
  return dev;
};

module.exports = isDev;
