const texteditor = require('../texteditor.js');
const Storage = require('../Storage');
const storage = new Storage();

module.exports = async () => {
    const data = await texteditor();
    storage.addEntry(data);
}