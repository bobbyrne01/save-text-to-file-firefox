var system = require("sdk/system");

function getPlatform() {

	return system.platform;
}

exports.getPlatform = function () {

	return getPlatform();
};
