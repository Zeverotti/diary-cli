const chalk = require('chalk');
const fs = require('fs');
const Window = require('./Window');
const window = new Window();
const Storage = require('./Storage');
const storage = new Storage();

async function entryItem(itemId) {
    window.term.clear();
    const item = storage.diary.find(e => e.id === itemId);
    window.renderSimpleText(`\n\n${chalk.green(item.date)}\n\n${item.text}\n\n`);
    const response = await window.renderBottomSingleLineMenu(['Back', 'Delete']);
    storage.reload();
    switch(response) {
        case 'Back':
            break;
        case 'Delete':
            storage.deleteEntry(item.id);
            storage.reload();
            break;
    }
    const entries = [];
    storage.diary.forEach((element, i) => {
        entries.push([`${chalk.green(element.date)} ${element.text.substring(0, 30)}...`, () => {
            entryItem(element.id, () => {
                display();
            }, (id) => {
                parsedData.diary = parsedData.diary.filter(e => e.id !== id);
                fs.writeFile(process.env.STORAGE_PATH+'/data.json', JSON.stringify(parsedData), () => display());
            })
        }]);
    });
    singleColumnMenu(entries);
}

async function singleColumnMenu(items) {
    window.term.clear();
    if(items === undefined) {
        const entries = [];
        storage.diary.forEach((element, i) => {
            entries.push([`${chalk.green(element.date)} ${element.text.substring(0, 30)}...`]);
        });
        items = entries;
    }
    const input = await window.renderMenu(items.map(e => e[0]));
    const index = items.findIndex(e => e[0] === input);
    items[index][1]();
}

module.exports = {
    singleColumnMenu: async (items) => { singleColumnMenu(items) },
    entryItem: async (itemId, onBack, onDelete, onEdit) => { entryItem(itemId) }
}