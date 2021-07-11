const fs = require('fs');
const chalk = require('chalk');
const { singleColumnMenu: menu, entryItem } = require('../mainMenu');

module.exports = () => {
    function display() {
        fs.readFile(process.env.STORAGE_PATH+'/data.json', 'utf-8', (err, e) => {
            if(err)throw(err);
            const parsedData = JSON.parse(e);
            const entries = [];
            parsedData.diary.forEach((element, i) => {
                entries.push([`${chalk.green(element.date)} ${element.text.substring(0, 30)}...`, () => {
                    entryItem(element.id, () => {
                       display();
                    }, (id) => {
                        parsedData.diary = parsedData.diary.filter(e => e.id !== id);
                        fs.writeFile(process.env.STORAGE_PATH+'/data.json', JSON.stringify(parsedData), () => display());
                    })
                }]);
            });
    
            menu(entries);
        })
    }
    display();
}