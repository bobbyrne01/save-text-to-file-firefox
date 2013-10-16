var Chrome = require("./Chrome"),
	Preference = require("./Preference"),
	Data = require("./Data");
 
exports.getPathToFile = function() {
	
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

exports.createFileName = function() {
	
    var currentTime = new Date(),
    	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
    	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
    	fileName = Preference.get('fileName');

    // check whether file name should include date and/or time stamps
    if (Preference.get('datestamp')) {fileName += "--" + date;}
    if (Preference.get('timestamp')) {fileName += "--" + time;}

    return fileName + ".txt";
}

// @param string - Path to saved file
// @param string - Saved file name
// @param string - Text to be saved to file
exports.saveTo = function(saveDirectory, fileName, selectedText) {
	
	if (Preference.get('confirmDialog')){
		
		// show preferences confirmation
		var confirmDialog = require("sdk/panel").Panel({
			width: 300,
			height: 400,
			contentURL: Data.get("confirmDialog.html"),
		});

		confirmDialog.show();		
		confirmDialog.port.on("dialogClosed", function (text) {
			console.log(text);
			confirmDialog.hide();
		});
		
		confirmDialog.port.on("selectDir", function () {
			Chrome.selectDir();
		});
	}
    
	Chrome.saveTo(
			Chrome.createFileObject(saveDirectory, fileName), 
			selectedText);
}