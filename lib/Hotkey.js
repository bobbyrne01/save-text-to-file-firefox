var { Hotkey } = require("sdk/hotkeys"),
	Selection = require("./Selection"),
	Notification = require("./Notification"),
	File = require("./File");

exports.init = function() {
	
	Hotkey({
		combo: "shift-f1",
		onPress: function() {
			
			if(Selection.getText() === null){

				Notification.sendMsg("noTextSelected_id");
			
			}else{
				File.saveTo(Selection.getText());
			}
		}
	});
}