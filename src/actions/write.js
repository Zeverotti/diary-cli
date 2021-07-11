const texteditor = require('../texteditor.js');
const write = require('../write.js');

module.exports = async () => {
    const data = await texteditor();
    write(data);
}