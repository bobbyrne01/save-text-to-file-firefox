var notifications = require("sdk/notifications"),
	localisationManager = require("./localisationManager");

exports.sendMsg = function(stringId, path) {
	
	notifications.notify({
		text: localisationManager.loadLocalizedString(stringId, path),
	});
}