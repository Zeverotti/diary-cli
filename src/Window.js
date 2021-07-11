const term = require('terminal-kit').terminal;

term.on('key', (key) => { if(key==='CTRL_C') { term.clear(); term.processExit(0) } })

class Window {
    constructor() {
        this.term = term;
        this.term.on('resize', this.onResize.bind(this));
        this.bottomNavbarText = '';
    }
    renderMenu(items) {
        return new Promise(async (resolve, reject) => {
            const item = await term.singleColumnMenu(items, (error, response) => {
                if(error) {
                    reject();
                    return;
                }
                resolve(response.selectedText)
            })
            item.focus(true);
            this.update();
        })
    }
    renderBottomBar(message) {
        this.bottomNavbarText = message
        this.term.moveTo(0, this.term.height).styleReset.white.bold.eraseLine(' ' + this.bottomNavbarText);
    }
    onResize(_width, _height) {
		if (this.resizeTimer) {
			clearTimeout(this.resizeTimer);
		}
		this.resizeTimer = setTimeout(() => {
            this.renderBottomBar(this.bottomNavbarText);
		}, 150);
	}
    renderSimpleText(text) {
        term(text);
    }
    renderBottomSingleLineMenu(items) {
        return new Promise(async (resolve, reject) => {
            var options = {
                y: term.height ,
                style: term.white,
                selectedStyle: term.inverse
            };
            const item = await term.singleLineMenu(items, options, (error, response) => {
                if(error) {
                    reject();
                    return;
                }
                resolve(response.selectedText);
            });
            this.update();
        })
    }
    update() {
        this.renderBottomBar(this.bottomNavbarText);
    }
}

module.exports = Window;