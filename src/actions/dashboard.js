const mainMenu = require('../mainMenu.js');
const write = require('./write');
const read = require('./read');

module.exports = () => {
    mainMenu([
        ['➕ New diary entry', write],
        ['📕 Read entries', read]
    ])
}