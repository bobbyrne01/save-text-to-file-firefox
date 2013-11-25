var preference = require("simple-prefs");

exports.get = function(preferenceTemp) {
	return preference.prefs[preferenceTemp];
}

exports.set = function(preferenceTemp, value){
	preference.prefs[preferenceTemp] = value;
}