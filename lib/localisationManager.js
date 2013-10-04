var _ = require("sdk/l10n").get;

exports.loadLocalizedString = function(stringId, path) {
	
	return _(stringId, path);
}