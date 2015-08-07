function getPlatform() {
	return require("sdk/system").platform;
}

exports.getPlatform = function () {
	return getPlatform();
};
