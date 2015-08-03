var preference = require("sdk/simple-prefs"),
	actionButton = require("./ActionButton");

function onPrefChange(name) {

	if (preference.prefs[name]) {
		actionButton.init();

	} else {
		actionButton.remove();
	}
}

exports.registerListener = function () {
	preference.on("showWidget", onPrefChange);
};

exports.get = function (name) {
	return preference.prefs[name];
};

exports.set = function (name, value) {
	preference.prefs[name] = value;
};
