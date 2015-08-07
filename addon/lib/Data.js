exports.get = function (content) {
	return require("sdk/self").data.url(content);
};
