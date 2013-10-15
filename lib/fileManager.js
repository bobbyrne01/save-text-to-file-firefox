var chromeManager = require("./chromeManager"),
	preferenceManager = require("./preferenceManager"),
	data = require("sdk/self").data;
 
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
	
	if (preferenceManager.load('confirmDialog')){
		
		// show preferences confirmation
		var confirmDialog = require("sdk/panel").Panel({
			width: 300,
			height: 400,
			contentURL: data.url("confirmDialog.html"),
		});

		confirmDialog.show();		
		confirmDialog.port.on("dialogClosed", function (text) {
			console.log(text);
			confirmDialog.hide();
		});
		
		confirmDialog.port.on("selectDir", function () {
			chromeManager.selectDir();
		});
	}
    
	chromeManager.writeFile(
			chromeManager.createFileObject(saveDirectory, fileName), 
			selectedText);
}