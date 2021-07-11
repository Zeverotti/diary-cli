const fs = require('fs');
const chalk = require('chalk');
const menu = require('../mainMenu');

module.exports = () => {
    fs.readFile(process.env.STORAGE_PATH+'/data.json', 'utf-8', (err, e) => {
        if(err)throw(err);
        const parsedData = JSON.parse(e);
        const entries = [];
        parsedData.diary.forEach((element, i) => {
            entries.push([`${chalk.green(element.date)} ${element.text.substring(0, 30)}...`, () => {
                console.log(chalk.green(element.date));
                console.log(`${element.text}\n\n`);
            }]);
        });

        menu(entries);
    })
}