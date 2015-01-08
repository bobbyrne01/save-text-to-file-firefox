var window = require("sdk/window/utils");

exports.get = function () {
	return window.getMostRecentBrowserWindow();
};
