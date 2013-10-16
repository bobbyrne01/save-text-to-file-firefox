var notification = require("sdk/notifications"),
	Localisation = require("./Localisation");

exports.sendMsg = function(stringId, path) {
	
	notification.notify({
		text: Localisation.getCustomString(stringId, path),
	});
}