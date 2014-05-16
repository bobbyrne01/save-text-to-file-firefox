window.addEventListener('click', function(event) {
	
	if (event.target.id.indexOf('pathToFileButton') == 0){
		
		SaveTextToFile_Panel.selectDir();
		
	}else if (event.target.id.indexOf('saveButton') == 0){
		
		SaveTextToFile_Panel.save();
		
	}else if (event.target.id.indexOf('cancelButton') == 0){
		
		SaveTextToFile_Panel.cancel();	
	}
	
	if (document.getElementById("saveMode").selectedIndex == 1){
		
		document.getElementById("timestamp").disabled = true;
	
	}else{
		
		document.getElementById("timestamp").disabled = false;
	}
	
}, false);




// functions available to Panel
var SaveTextToFile_Panel = {
		
		updateTimestampInFilename: function() {
			alert('c');
		},
		
		selectDir: function() {
			self.port.emit("selectDir", '');
		},
    
		save: function() {
			
			// send path to file and file name back to addon code
			var selectedPrefs = JSON.stringify({
				fileName: document.getElementById("fileName").value,
				pathToFile: document.getElementById("pathToFile").value,
				format: document.getElementById("format").value,
			    datestamp: document.getElementById("datestamp").checked,
			    timestamp: document.getElementById("timestamp").checked,
			    datestampInLine: document.getElementById("datestampInLine").checked,
			    timestampInLine: document.getElementById("timestampInLine").checked,
			    dateFormat: document.getElementById("dateFormat").value,
			    lineSeparator: document.getElementById("lineSeparator").checked,
			    currentURL: document.getElementById("currentURL").checked,
			    pagenameForFilename: document.getElementById("pagenameForFilename").checked,
			    saveMode: document.getElementById("saveMode").value,
			    confirmPanel: document.getElementById("confirmPanel").checked,
			    showWidget: document.getElementById("showWidget").checked,
			    showNotifications: document.getElementById("showNotifications").checked
		    });

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
	document.getElementById("format").value = parsedPrefs.format;
	document.getElementById("datestamp").checked = parsedPrefs.datestamp;
	document.getElementById("timestamp").checked = parsedPrefs.timestamp;
	document.getElementById("datestampInLine").checked = parsedPrefs.datestampInLine;
	document.getElementById("timestampInLine").checked = parsedPrefs.timestampInLine;
	document.getElementById("dateFormat").value = parsedPrefs.dateFormat;
	document.getElementById("lineSeparator").checked = parsedPrefs.lineSeparator;
	document.getElementById("currentURL").checked = parsedPrefs.currentURL;
	document.getElementById("pagenameForFilename").checked = parsedPrefs.pagenameForFilename;
	document.getElementById("saveMode").value = parsedPrefs.saveMode;
	document.getElementById("confirmPanel").checked = parsedPrefs.confirmPanel;
	document.getElementById("showWidget").checked = parsedPrefs.showWidget;	
	document.getElementById("showNotifications").checked = parsedPrefs.showNotifications;	
	
	if (parsedPrefs.saveMode == 1){
		
		document.getElementById("timestamp").disabled = true;
	
	}else{
		
		document.getElementById("timestamp").disabled = false;
	}
});