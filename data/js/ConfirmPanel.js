window.onload = function(){
	document.getElementById('pathToFileButton').addEventListener("click", function() {SaveTextToFile_Panel.selectDir();});
	document.getElementById('saveButton').addEventListener("click", function() {SaveTextToFile_Panel.save();});
	document.getElementById('cancelButton').addEventListener("click", function() {SaveTextToFile_Panel.cancel();});
};

// functions available to Panel
var SaveTextToFile_Panel = {
		
		selectDir: function() {
			self.port.emit("selectDir", '');
		},
    
		save: function() {
			
			// send path to file and file name back to addon code
			var selectedPrefs = '{'
				+'"fileName":"' + document.getElementById("fileName").value + '", '
			    +'"pathToFile":"' + document.getElementById("pathToFile").value + '"'
			    +'}';

			self.port.emit("save", selectedPrefs);
		},
		
		cancel: function() {
			self.port.emit("cancel", '');
		}
};

// listen for preferences message from addon code and set values of Panel UI
self.port.on("prefs", function (prefs) {
	var parsedPrefs = JSON.parse(prefs);
	
	document.getElementById("fileName").value = parsedPrefs.fileName;
	document.getElementById("pathToFile").value = parsedPrefs.pathToFile;
	document.getElementById("datestamp").checked = parsedPrefs.datestamp;
	document.getElementById("timestamp").checked = parsedPrefs.timestamp;
	document.getElementById("datestampInLine").checked = parsedPrefs.datestampInLine;
	document.getElementById("timestampInLine").checked = parsedPrefs.timestampInLine;
	document.getElementById("lineSeparator").checked = parsedPrefs.lineSeparator;
	document.getElementById("currentURL").checked = parsedPrefs.currentURL;
	document.getElementById("saveMode").value = parsedPrefs.saveMode;
});