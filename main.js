"use strict";

// Import parts of electron to use
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondWindow, thirdWindow;

// Keep a reference for dev mode
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

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    name: "control",
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  secondWindow = new BrowserWindow({
    name: "timer",
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  thirdWindow = new BrowserWindow({
    name: "barcode",
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.

  mainWindow.loadURL(
    isDev()
      ? `http://localhost:8080/control`
      : `file://${path.join(__dirname, "../build/index.html/control")}`
  );
  secondWindow.loadURL(
    isDev()
      ? `http://localhost:8080/timer`
      : `file://${path.join(__dirname, "../build/index.html/timer")}`
  );
  thirdWindow.loadURL(
    isDev()
      ? `http://localhost:8080/barcode`
      : `file://${path.join(__dirname, "../build/index.html/barcode")}`
  );

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (isDev()) {
      mainWindow.webContents.openDevTools();
    }
  });

  secondWindow.once("ready-to-show", () => {
    secondWindow.show();

    // Open the DevTools automatically if developing
    if (isDev()) {
      secondWindow.webContents.openDevTools();
    }
  });

  thirdWindow.once("ready-to-show", () => {
    thirdWindow.show();

    // Open the DevTools automatically if developing
    if (isDev()) {
      thirdWindow.webContents.openDevTools();
    }
  });
  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Emitted when the window is closed.
  secondWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    secondWindow = null;
  });

  // Emitted when the window is closed.
  thirdWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    thirdWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// get dev tools
app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
  if (secondWindow === null) {
    createWindow();
  }
  if (thirdWindow === null) {
    createWindow();
  }
});
