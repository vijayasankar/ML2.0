const electron = require('electron')
const config = require('./config')
// const path = require('path')
// const url = require('url')

const app = electron.app // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

// Report crashes to our server - requires a company name?
// electron.crashReporter.start()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd   Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Create the browser window and disable integration with node
  mainWindow = new BrowserWindow({
    show: config.showBrowser,
    alwaysOnTop: true,
    typeInterval: 10,
    width: 1280,
    height: 768,
    nodeIntegration: false,
    webPreferences: {
      webSecurity: false
    }
  })

  // Open the DevTools?
  if (config.devTools) {
    mainWindow.webContents.openDevTools({
      detach: true
    })
  }

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  mainWindow.loadURL(config.domTestRootUrl)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})
