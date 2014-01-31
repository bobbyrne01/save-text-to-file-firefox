var notification = require("sdk/notifications"),
	Localisation = require("./Localisation"),
	Data = require("./Data");

exports.sendMsg = function(stringId) {
	
	notification.notify({
		text: Localisation.getCustomString(stringId),
		iconURL: Data.get("images/ico.png")
	});
}

exports.sendMsg = function(stringId, path) {
	
	notification.notify({
		text: Localisation.getCustomString(stringId, path),
		iconURL: Data.get("images/ico.png")
	});
}