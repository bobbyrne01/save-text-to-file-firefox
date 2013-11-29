var { Hotkey } = require("sdk/hotkeys"),
	File = require("./File"),
	Selection = require("./Selection");

exports.init = function() {
	
	Hotkey({
		combo: "shift-f1",
		onPress: function() {
			
			if(Selection.getText() === null){
			
				console.log('No text selected, notify user and cancel save');
			
			}else{
				File.saveTo(Selection.getText());
			}
		}
	});
}