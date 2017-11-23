const electron = require('electron')

const {
	app,
	BrowserWindow,
	ipcMain
} = electron

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({width: 1600, height: 1200})

	mainWindow.loadURL(`file://${__dirname}/input.html`)
	// mainWindow.loadURL('https://github.com')

	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

ipcMain.on('Async-reverse-string', (event, arg) => {
	const reply = arg.split('').reverse().join('');
	console.log('Async. arg: ', arg, '. reply: ', reply)
	event.sender.send('Async-reverse-string', reply)
})

ipcMain.on('Sync-reverse-string', (event, arg) => {
	const reply = arg.split('').reverse().join('');
	console.log('Sync. arg: ', arg, '. reply: ', reply)
	event.returnValue = reply
})