// Import parts of electron to use
"use strict";
const electron = require("electron");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// const {
//   default: installExtension,
//   REACT_DEVELOPER_TOOLS,
// } = require("electron-devtools-installer");
const {
  HANDLE_PILL_LOGIC,
  HANDLE_TOGGLE_CLUE,
  PAUSE_TIMER,
  START_TIMER,
  RESTART_TIMER,
  TOKEN_STATE,
  PILL_ERROR,
  PILL_UI,
} = require("./helpers/ipcActions");
const isDev = require("./helpers/server");

// ! create windows
let controlWindow, timerWindow, barcodeWindow;
function createWindow() {
  let displays = electron.screen.getAllDisplays();
  controlWindow = new BrowserWindow({
    x: displays[0].bounds.x + 50,
    y: displays[0].bounds.y + 50,
    fullscreen: true,
    frame: false,
    name: "control",
    width: 1920,
    height: 1080,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  timerWindow = new BrowserWindow({
    x: displays[2].bounds.x + 50,
    y: displays[2].bounds.y + 50,
    fullscreen: true,
    frame: false,
    name: "timer",
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  barcodeWindow = new BrowserWindow({
    x: displays[1].bounds.x + 50,
    y: displays[1].bounds.y + 50,
    fullscreen: true,
    frame: false,
    name: "barcode",
    width: 1920,
    height: 1080,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  controlWindow.loadURL(
    isDev()
      ? `http://localhost:8080/control`
      : `file://${path.join(__dirname, "dist/index.html/control")}`
  );
  timerWindow.loadURL(
    isDev()
      ? `http://localhost:8080/timer`
      : `file://${path.join(__dirname, "dist/index.html/timer")}`
  );
  barcodeWindow.loadURL(
    isDev()
      ? `http://localhost:8080/barcode`
      : `file://${path.join(__dirname, "dist/index.html/barcode")}`
  );

  timerWindow.once("ready-to-show", () => {
    timerWindow.show();
    if (isDev()) {
      // timerWindow.webContents.openDevTools();
    }
    timerWindow.setTitle("Timer");
  });

  barcodeWindow.once("ready-to-show", () => {
    barcodeWindow.show();
    if (isDev()) {
      // barcodeWindow.webContents.openDevTools();
    }
    barcodeWindow.setTitle("Barcode");
  });

  controlWindow.once("ready-to-show", () => {
    controlWindow.show();
    if (isDev()) {
      // controlWindow.webContents.openDevTools();
    }
    controlWindow.setTitle("Control");
  });

  controlWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    controlWindow = null;
  });

  timerWindow.on("closed", function () {
    timerWindow = null;
  });

  // Emitted when the window is closed.
  barcodeWindow.on("closed", function () {
    barcodeWindow = null;
  });
}
// ! ipcMain events
ipcMain.on(
  HANDLE_PILL_LOGIC,
  (event, [subPillCounter, latestPillCompleted]) => {
    barcodeWindow.send(HANDLE_PILL_LOGIC, [
      subPillCounter,
      latestPillCompleted,
    ]);
  }
);

ipcMain.on(PILL_UI, (event, pillCompletedUi) => {
  barcodeWindow.send(PILL_UI, pillCompletedUi);
});

ipcMain.on(PILL_ERROR, (event, pillError) => {
  barcodeWindow.send(PILL_ERROR, pillError);
});

ipcMain.on(HANDLE_TOGGLE_CLUE, (event, [toggleClue, clueText]) => {
  timerWindow.webContents.send(HANDLE_TOGGLE_CLUE, [toggleClue, clueText]);
});

ipcMain.on(PAUSE_TIMER, (event, timerState) => {
  timerWindow.webContents.send(PAUSE_TIMER, timerState);
});

ipcMain.on(START_TIMER, (event, timerState) => {
  timerWindow.webContents.send(START_TIMER, timerState);
});

ipcMain.on(RESTART_TIMER, (event, timerState) => {
  timerWindow.webContents.send(RESTART_TIMER, timerState);
});

ipcMain.on(TOKEN_STATE, (event, [latestPillCompleted, pillState]) => {
  timerWindow.webContents.send(TOKEN_STATE, [latestPillCompleted, pillState]);
  barcodeWindow.webContents.send(TOKEN_STATE, [latestPillCompleted, pillState]);
});

// ! App lifecycle
// app.whenReady().then(() => {
//   isDev() ? installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log("An error occurred: ", err)) : null;
// });

app.removeAllListeners("ready");

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
