window.addEventListener('click', function(event) {
	
	console.log('clicked');
	
	if (event.target.id.indexOf('pathToFileButton') == 0){
		console.log('selectDir');
		
		SaveTextToFile_Panel.selectDir();
		
	}else if (event.target.id.indexOf('saveButton') == 0){
		console.log('save');
		
		SaveTextToFile_Panel.save();
		
	}else if (event.target.id.indexOf('cancelButton') == 0){
		console.log('cancel');
		
		SaveTextToFile_Panel.cancel();
		
	}
}, false);


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
			console.log('cancel in contentscript call function');
			self.port.emit("cancel", '');
		}
};

// listen for preferences message from addon code and set values of Panel UI
self.port.on("prefs", function (prefs) {
	console.log("got prefs");
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