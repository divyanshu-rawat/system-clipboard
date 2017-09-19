

const electron = require("electron");

const path = require('path');

const {app,Tray,Menu} = electron;


app.on("ready", _=>{


	const tray = new Tray(path.join('src','tray.png'));

    const contextMenu = Menu.buildFromTemplate([

	    {
	    		label : 'wow',
	    		click : _ => console.log('wow clicked')
	    },
	    {
	    		label : 'awesome',
	    		click :  _ => console.log('awesome clicked !')
	    }

    ])
    	tray.setContextMenu(contextMenu);
})

