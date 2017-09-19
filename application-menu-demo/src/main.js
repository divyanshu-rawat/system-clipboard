

const electron = require("electron");

const app = electron.app;

const Menu = electron.Menu;

const BrowserWindow = electron.BrowserWindow;

app.on("ready",_=>{

	new BrowserWindow();

	const name = electron.app.getName();

	const template = [{

		label: name,
		submenu:[{

			label: `About ${name}`,
			click: _=>{
				console.log('Clicked !');
			},
			role :'about'
		},{
				type: 'separator'
		},
		{
				label:"Quit",
				click:_=>{

					app.quit();
				},
				accelerator: 'Cmd + Q'
		}]
	}]

	// api for menu.
	const menu = Menu.buildFromTemplate(template);

	Menu.setApplicationMenu(menu);
})