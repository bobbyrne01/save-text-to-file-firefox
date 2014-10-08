var { Hotkey } = require("sdk/hotkeys"),
	Tab = require("./Tab");

exports.init = function() {
	
	Hotkey({
		combo: "shift-f1",
		onPress: function() {
			
			Tab.getSelectedTextHotkey();
		}
	});
};