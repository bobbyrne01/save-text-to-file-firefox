var widget = require("sdk/widget"),
	Localisation = require("./Localisation"),
	Data = require("./Data"),
	Tab = require("./Tab");

exports.init = function(panel) {
	
	var widgetObj = widget.Widget({
		id: "save-text-to-file-widget",
		label: Localisation.getString("saveTextToFile_id"),
		contentURL: Data.get("images/ico.png"),
		panel: panel,
		onClick: function() {
			
			Tab.getSelectedText();
		}
	});
};