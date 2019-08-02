const electron = require("electron");
const path = require("path");
const {
  app,
  Tray,
  Menu,
  clipboard,
  globalShortcut
} = electron;

const STACK_SIZE = 5;
const MAX_LENGTH = 20;

function addToStack(item, stack) {
  return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack)

}

function formatItem(item) {
  return item.length > MAX_LENGTH ? item.substr(0, MAX_LENGTH) + '...' : item;
}

function registerShortcuts(globalShortcut, clipboard, stack) { }

function templateForStack(clipboard, stack) {
  return stack.map((item, i) => {
    return {
      label: `copy : ${formatItem(item)}`,
      click: _ => clipboard.writeText(item)
    }
  })

}

function checkClipboardForChange(clipboard, onChange) {
  let cached = clipboard.readText();
  let latest;
  setInterval(_ => {
    latest = clipboard.readText();
    if (latest != cached) {
      cached = latest;
      onChange(cached);
    }
  }, 1000)

}

app.on("ready", _ => {
  const iconPath = path.join(__dirname, 'Asset/marker.png');
  const tray = new Tray(iconPath);
  let stack = [];
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: '<Empty>',
      enabled: false
    }
  ]));

  checkClipboardForChange(clipboard, text => {
    stack = addToStack(text, stack);
    tray.setContextMenu(Menu.buildFromTemplate(templateForStack(clipboard, stack)));
    console.log(templateForStack(clipboard, stack));
    registerShortcuts(globalShortcut, clipboard, stack);

  });

})