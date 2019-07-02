
const {app, BrowserWindow,Menu} = require('electron')


process.env.NODE_ENV='production';


let mainWindow

function createWindow () {
  
  mainWindow = new BrowserWindow({
    width: 1620, 
    height: 920,
    minWidth: 800,
    minHeight: 635,
    autoHideMenuBar :true, 
    enableLargerThanScreen :true,
    webPreferences: {
       webSecurity: false 
    }
  })

  mainWindow.loadFile('index.html')


  mainWindow.on('closed', function () {

    mainWindow = null
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow()
  }
})


const mainMenuTemplate =  [
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      },
      {
        label: 'Reload',
        role: 'reload'
      },
      {
        label: 'Fullscreen',
        role: 'togglefullscreen'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+D',
        click(item, focusedWindow){
        focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];

