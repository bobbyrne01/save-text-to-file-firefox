var Chrome = require("./Chrome"),
	Preference = require("./Preference"),
	Panel = require("./Panel"),
	Notification = require("./Notification");

function getPathToFile() {
	
	// check if preferred saved path exists
	var userPrefPathToFile = Preference.get('pathToFile');

    return (userPrefPathToFile === "" ? Chrome.getHomeDir().path : userPrefPathToFile);	
}
 
exports.getPathToFile = function() {
	
	return getPathToFile();
};

// @param string - Text to be saved to file
exports.saveTo = function(selectedText) {
	
	if (Preference.get('confirmPanel')){

		Panel.show(selectedText);
	
	}else{ // save text without showing confirmation Panel
		
		var text = (Preference.get('html') ? JSON.parse(selectedText).html : JSON.parse(selectedText).plain);
		
		if(text === "" || text === null){

			if (Preference.get('showNotifications')){
				
				Notification.sendMsg("noTextSelected_id");
			}
		
		}else{	
		
			Chrome.saveTo(text);
		}
	}
};