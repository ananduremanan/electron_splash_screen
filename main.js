const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;
let splash;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 2000); // Adjust the timeout as needed
  });
}

function createSplashScreen() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadFile("splash.html");
}

app.whenReady().then(() => {
  createSplashScreen();
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});