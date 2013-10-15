var _ = require("sdk/l10n").get;

exports.loadString = function(stringId) {
	
	return _(stringId);
}

exports.loadCustomString = function(stringId, path) {
	
	return _(stringId, path);
}