var prefs = require("simple-prefs");

exports.load = function(preference) {
	
	return prefs.prefs[preference];
}