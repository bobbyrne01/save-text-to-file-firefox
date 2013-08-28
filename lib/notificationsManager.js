var notifications = require("sdk/notifications"),
	localisationManager = require("./localisationManager");

exports.sendMsg = function(stringId, saveDirectory, fileName) {
	
	notifications.notify({
		text: localisationManager.loadLocalizedString(stringId, saveDirectory, fileName),
	});
}