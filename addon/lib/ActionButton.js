var actionButton;


exports.init = function () {

	actionButton = require("sdk/ui").ActionButton({
		id: "save-text-to-file-widget",
		label: require("./Localisation").getString("saveTextToFile_id"),
		icon: require("./Data").get("images/ico.png"),
		onClick: function (state) {
			require("./Tab").getSelectedText();
		}
	});
};

exports.remove = function () {
	actionButton.destroy();
};
