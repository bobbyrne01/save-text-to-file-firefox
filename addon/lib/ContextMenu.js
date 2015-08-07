var ContextMenu = require("sdk/context-menu"),
	File = require("./File"),
	Data = require("./Data");

exports.init = function () {

	ContextMenu.Item({

		label: require("./Localisation").getString("saveTextToFile_id"),
		context: ContextMenu.SelectionContext(),
		contentScriptFile: [
			Data.get("js/ListenForContextClick.js"),
			Data.get("js/SendSelectedText.js")
		],
		onMessage: function (text) {
			File.saveTo(text);
		}
	});
};
