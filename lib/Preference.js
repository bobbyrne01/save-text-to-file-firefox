var preference = require("simple-prefs");

exports.get = function(preferenceTemp) {
	
	return preference.prefs[preferenceTemp];
}