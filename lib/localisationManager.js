var _ = require("sdk/l10n").get;

exports.loadLocalizedString = function(stringId, saveDirectory, fileName) {
	
	return _(stringId, saveDirectory, fileName);
}