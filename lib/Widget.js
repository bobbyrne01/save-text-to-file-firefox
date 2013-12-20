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
		//panel: Panel.get(), #44 Text not saved if panel attached to widget, and widgetObj.destroy() is called
		onClick: function() {
			
			Tab.getSelectedText();
		}
	});
};

exports.remove = function(){
	widgetObj.destroy();
};