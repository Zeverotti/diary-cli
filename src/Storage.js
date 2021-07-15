import fs from 'fs';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class Storage {
    constructor(){
        this.path = process.env.STORAGE_PATH+'/data.json';
        this.diary = [];
        this.reload();
    }
    reload() {
        this.diary = JSON.parse(fs.readFileSync(this.path).toString()).diary;
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
    editEntry(entryId, text) {
        const index = this.diary.findIndex(e => e.id === entryId);
        this.diary[index] = {
            ...this.diary[index],
            text
        }
        this.commit();
    }
    commit() {
        fs.writeFileSync(this.path, JSON.stringify({ version: process.env.npm_package_version, diary: this.diary }));
    }
}

export const StorageContext = React.createContext({});

const StorageProvider = (props) => {
    return (
        <StorageContext.Provider value={{ storage: new Storage() }}>
            {props.children}
        </StorageContext.Provider>
    )
}

export default StorageProvider;