const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    backgroundColor: '#373848',
    icon: path.join(__dirname, 'logo [128].ico'),
    resizable: true,
    fullscreen: false,
    simpleFullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'renderer.js'),
    },
    trafficLightPosition: { x: 20, y: 32 },
    titleBarOverlay: {
        color: '#373848',
        symbolColor: '#ffffff',
        height: 45
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});