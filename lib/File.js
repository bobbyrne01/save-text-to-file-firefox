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
}

function createFileName() {
	
	var currentTime = new Date(),
	 	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
	 	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
	 	fileName = Preference.get('fileName');
	
	 // check whether file name should include date and/or time stamps
	 if (Preference.get('datestamp')) {fileName += "--" + date;}
	 if (Preference.get('timestamp')) {fileName += "--" + time;}
	
	 return fileName + ".txt";
}

exports.createFileName = function() {
	
	return createFileName();
}

// @param string - Path to saved file
// @param string - Saved file name
// @param string - Text to be saved to file
exports.saveTo = function(saveDirectory, fileName, selectedText) {
	
	if (Preference.get('confirmPanel')){

		Panel.show(selectedText);
	
	}else{ // save text without showing confirmation Panel
		Chrome.saveTo(
				Chrome.createFileObject(saveDirectory, fileName), 
				selectedText);
	}
}