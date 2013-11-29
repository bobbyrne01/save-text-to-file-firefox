var { Hotkey } = require("sdk/hotkeys"),
	File = require("./File"),
	Selection = require("./Selection");

exports.init = function() {
	
	Hotkey({
		combo: "shift-f1",
		onPress: function() {
			File.saveTo(Selection.getText());
		}
	});
}