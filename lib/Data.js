var data = require("sdk/self").data;

exports.get = function(content) {
	
	return data.url(content);
}