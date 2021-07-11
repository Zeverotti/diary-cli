const Termit = require("termit");
const fs = require('fs');

module.exports = () => {
	return new Promise((resolve, reject) => {
		let options = {
			disableOpen: true,
			disableSaveAs: true,
			title: 'new diary entry'
		}
		let term = new Termit(options);

		term.init();

		term.addPreSaveHook( (next) => {
			term.unload();
			resolve(term.getText());
		});	
	})
}
