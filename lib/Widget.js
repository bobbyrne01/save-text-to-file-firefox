var widget = require("sdk/widget"),
	Localisation = require("./Localisation"),
	Data = require("./Data"),
	Tab = require("./Tab"),
	Panel = require("./Panel"),
	widgetObj;

exports.init = function() {
	
	widgetObj = widget.Widget({
		id: "save-text-to-file-widget",
		label: Localisation.getString("saveTextToFile_id"),
		contentURL: Data.get("images/ico.png"),
		panel: Panel.init(),
		onClick: function() {
			
			Tab.getSelectedText();
		}
	});
};

exports.remove = function(){
	widgetObj.destroy();
};