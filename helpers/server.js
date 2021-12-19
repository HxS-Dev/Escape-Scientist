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

// ! unnecessary app lifecycle
// app.on("activate", () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
//   if (secondWindow === null) {
//     createWindow();
//   }
//   if (thirdWindow === null) {
//     createWindow();
//   }
// });
