var ContextMenu = require("sdk/context-menu"),
	Localisation = require("./Localisation"),
	File = require("./File"),
	Data = require("./Data");

exports.init = function() {
	
	ContextMenu.Item({
		
		label: Localisation.getString("saveTextToFile_id"),
		context: ContextMenu.SelectionContext(),
		contentScriptFile: [ Data.get("js/ListenForContextClick.js"), Data.get("js/SendSelectedText.js") ],
	    onMessage: function (selectedText) {
	    	
	    	File.saveTo(selectedText);
	    }
	});
};