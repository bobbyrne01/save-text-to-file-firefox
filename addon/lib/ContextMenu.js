var ContextMenu = require("sdk/context-menu"),
	Localisation = require("./Localisation"),
	File = require("./File"),
	Data = require("./Data"),
	Preference = require("./Preference");

exports.init = function () {

	ContextMenu.Item({

		label: Localisation.getString("saveTextToFile_id"),
		context: ContextMenu.SelectionContext(),
		contentScriptFile: [Data.get("js/ListenForContextClick.js"), Data.get("js/SendSelectedText.js")],
		onMessage: function (text) {

			File.saveTo(text);
		}
	});
};
