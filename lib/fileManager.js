var chromeManager = require("./chromeManager"),
	preferenceManager = require("./preferenceManager");
 
exports.getPathToFile = function() {
	
	// check if preferred saved path exists
	var userPrefPathToFile = preferenceManager.load('pathToFile'),
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
    	fileName = preferenceManager.load('fileName');

    // check whether file name should include date and/or time stamps
    if (preferenceManager.load('datestamp')) {fileName += "--" + date;}
    if (preferenceManager.load('timestamp')) {fileName += "--" + time;}

    return fileName + ".txt";
}

// @param string - Path to saved file
// @param string - Saved file name
// @param string - Text to be saved to file
exports.writeFileToOS = function(saveDirectory, fileName, selectedText) {
    
	chromeManager.writeFile(saveDirectory, fileName, selectedText);
}