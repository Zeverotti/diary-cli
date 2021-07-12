const Termit = require("termit");

module.exports = (text = '') => {
	return new Promise((resolve, reject) => {
		let options = {
			disableOpen: true,
			disableSaveAs: true,
			title: 'New diary entry'
		}
		let term = new Termit(options);

		term.textBuffer.setText(text);

		term.init();

		term.addPreSaveHook( (next) => {
			term.unload();
			resolve(term.getText());
		});	
	})
}
