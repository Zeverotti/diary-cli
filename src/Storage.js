const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Storage {
    constructor(){
        this.path = process.env.STORAGE_PATH+'/data.json';
        this.reload();
    }
    reload() {
        this.diary = JSON.parse(fs.readFileSync(this.path)).diary;
    }
    addEntry(text) {
        this.reload();
        this.diary.push(this.createEntry(text));
        fs.writeFileSync(this.path, JSON.stringify({ version: process.env.npm_package_version, diary: this.diary }));
    }
    createEntry(text) {
        const time = new Date();
        return {   
            id: uuidv4(),
            date: `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`,
            text
        }
    }
}

module.exports = Storage;