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
        this.commit();
    }
    createEntry(text) {
        const time = new Date();
        return {   
            id: uuidv4(),
            date: `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`,
            text
        }
    }
    deleteEntry(entryId) {
        this.diary = this.diary.filter(e => e.id !== entryId);
        this.commit();
    }
    commit() {
        fs.writeFileSync(this.path, JSON.stringify({ version: process.env.npm_package_version, diary: this.diary }));
    }
}

module.exports = Storage;