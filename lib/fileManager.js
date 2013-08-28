var chromeManager = require("./chromeManager"),
	preferenceManager = require("./preferenceManager"),
	systemManager = require("./systemManager");
 
exports.getPathToFile = function() {
	
	// check if preferred saved path exists
	var userPrefPathToFile = preferenceManager.loadPathToFileOption(),
		pathToFile;
	
	if (userPrefPathToFile === "") {

        // Save file in user's home directory (No preference specified)
        pathToFile = chromeManager.loadHomeDir().path;
        
    } else {

        pathToFile = userPrefPathToFile;
    }

    return pathToFile;
}

exports.createFileName = function() {
	
    var currentTime = new Date(),
    	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
    	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
    	fileName = preferenceManager.loadFileNameOption();

    // check whether file name should include date and/or time stamps
    if (preferenceManager.loadDatestampOption()) {fileName += "--" + date;}
    if (preferenceManager.loadTimestampOption()) {fileName += "--" + time;}

    return fileName + ".txt";
}

// @param string - Path to saved file
// @param string - Saved file name
// @param string - Text to be saved to file
exports.writeFileToOS = function(saveDirectory, fileName, selectedText) {
    
    var fileSeparator = "\\";
    
    if (systemManager.loadPlatform().indexOf("linu") != -1) {fileSeparator = "/";}
    
	chromeManager.writeFile(saveDirectory, fileSeparator, fileName, selectedText);
}