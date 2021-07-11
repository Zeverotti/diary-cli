const term = require('terminal-kit').terminal;

module.exports = (items) => {   
    term.fullscreen(true); 
    term.singleColumnMenu(items.map(e => e[0]), (_error, response) => {
        term.grabInput(false);
        term.fullscreen(false);
        items[response.selectedIndex][1]();
    });
}