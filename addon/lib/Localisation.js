var _ = require("sdk/l10n").get;

exports.getString = function (stringId) {

	return _(stringId);
};

exports.getCustomString = function (stringId, path) {

	return _(stringId, path);
};
