var widget = require("sdk/widget"),
	Localisation = require("./Localisation"),
	Data = require("./Data");

exports.init = function(panel) {
	
	widget.Widget({
		id: "save-text-to-file-widget",
		label: Localisation.getString("saveTextToFile_id"),
		contentURL: Data.get("images/ico.png"),
		panel: panel
	});
};