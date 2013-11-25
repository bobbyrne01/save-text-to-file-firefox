var Chrome = require("./Chrome"),
	Preference = require("./Preference"),
	Panel = require("./Panel");

function getPathToFile() {
	
	// check if preferred saved path exists
	var userPrefPathToFile = Preference.get('pathToFile'),
		pathToFile;
	
	if (userPrefPathToFile === "") {

        // Save file in user's home directory (No preference specified)
        pathToFile = Chrome.getHomeDir().path;
        
    } else {

        pathToFile = userPrefPathToFile;
    }

    return pathToFile;	
}
 
exports.getPathToFile = function() {
	
	return getPathToFile();
};

// @param string - Text to be saved to file
exports.saveTo = function(selectedText) {
	
	if (Preference.get('confirmPanel')){

		Panel.show(selectedText);
	
	}else{ // save text without showing confirmation Panel
		
		Chrome.saveTo(selectedText);
	}
};