var ui = require("sdk/ui"),
	Localisation = require("./Localisation"),
	Data = require("./Data"),
	Tab = require("./Tab"),
	actionButton;


exports.init = function () {

	actionButton = ui.ActionButton({
		id: "save-text-to-file-widget",
		label: Localisation.getString("saveTextToFile_id"),
		icon: Data.get("images/ico.png"),
		onClick: function (state) {

			Tab.getSelectedText();
		}
	});
};

exports.remove = function () {
	actionButton.destroy();
};
