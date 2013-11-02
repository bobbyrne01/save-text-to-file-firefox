var Chrome = require("./Chrome"),
	Preference = require("./Preference"),
	Data = require("./Data");

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
		
		// show preferences confirmation
		var confirmPanel = require("sdk/panel").Panel({
			width: 450,
			height: 350,
			contentURL: Data.get("confirmPanel.html"),
		});

		confirmPanel.show();		
		confirmPanel.port.on("panelClosed", function (text) {
			console.log(text);
			confirmPanel.hide();
		});
		
		confirmPanel.port.on("selectDir", function () {
			Chrome.selectDir();
		});
		
		
		confirmPanel.port.on("getPreferences", function() {
			
			// TODO these values need to be sent back to confirmPanel.js
			// to populate confirmation panel 
			
			var prefs = '{'
				+'"fileName":"' + createFileName() + '", '
			    +'"pathToFile":' + getPathToFile() + ', '
			    +'"datestamp":' + Preference.get('datestamp') + ', '
			    +'"timestamp":' + Preference.get('timestamp') + ', '
			    +'"datestampInLine":' + Preference.get('datestampInLine') + ', '
			    +'"timestampInLine":' + Preference.get('timestampInLine') + ', '
			    +'"lineSeparator":' + Preference.get('lineSeparator') + ', '
			    +'"currentURL":' + Preference.get('currentURL') + ', '
			    +'}';
			console.log('JSON string of perfs:' + prefs);
		})
	}
    
	Chrome.saveTo(
			Chrome.createFileObject(saveDirectory, fileName), 
			selectedText);
}