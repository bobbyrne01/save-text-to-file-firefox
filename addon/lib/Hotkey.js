var {
	Hotkey
} = require("sdk/hotkeys"),
	Tab = require("./Tab"),
	Preference = require("./Preference"),
	hotkey;

exports.init = function () {

	hotkey = Hotkey({
		combo: Preference.get("hotkey"),
		onPress: function () {
			Tab.getSelectedTextHotkey();
		}
	});
};

exports.reinit = function () {

	var status = true;

	try {
		hotkey.destroy();
		hotkey = Hotkey({
			combo: Preference.get("hotkey"),
			onPress: function () {
				Tab.getSelectedTextHotkey();
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};
