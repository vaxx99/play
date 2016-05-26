var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();
//var mainWindow = null;
app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('proxy-server', 'localhost:3128');
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
app.on('window-all-closed', function() {
app.quit();
});
app.on('ready', function() {
mainWindow = new BrowserWindow({width: 240,
height: 30,
darkTheme: true,
transparent: true,
resizable: false,
frame: false,
'skip-taskbar': true,
x: 0,
y: 738});
mainWindow.setMenuBarVisibility(false);
mainWindow.setTitle("Play.Vaxx!");
mainWindow.setAlwaysOnTop(true);
mainWindow.loadUrl('file://'+__dirname+'/index.html');
// Emitted when the window is closed.
var ret = globalShortcut.register('ctrl+q', function() {
app.quit();
});
if (!ret) {
console.log('registration failed');
}
// Check whether a shortcut is registered.
console.log(globalShortcut.isRegistered('ctrl+q'));
});
app.on('will-quit', function() {
// Unregister a shortcut.
globalShortcut.unregister('ctrl+q');
// Unregister all shortcuts.
globalShortcut.unregisterAll();
mainWindow.on('closed', function() {
mainWindow = null;
app.quit();
});
});