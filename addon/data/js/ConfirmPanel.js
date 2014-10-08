var text;

window.addEventListener('click', function(event) {
	
	if (event.target.id.indexOf('pathToFile') == 0){
		
		SaveTextToFile_Panel.selectDir();
		
	} else if (event.target.id.indexOf('saveButton') == 0){
		
		SaveTextToFile_Panel.save();
		
	}else if (event.target.id.indexOf('cancelButton') == 0){
		
		SaveTextToFile_Panel.cancel();	
	}
	
	if (document.getElementById("saveMode").selectedIndex == 1){
		
		document.getElementById("timestamp").disabled = true;
	
	}else{
		
		document.getElementById("timestamp").disabled = false;
	}
	
	if (document.getElementById("html").checked){
		document.getElementById("previewArea").value = JSON.parse(text).html;
	}else{
		document.getElementById("previewArea").value = JSON.parse(text).plain
	}
	
	if (document.getElementById("preview").checked){
		document.getElementById("previewArea").style.visibility = "visible";
	}else{
		document.getElementById("previewArea").style.visibility = "hidden";
	}
	
}, false);


// functions available to Panel
var SaveTextToFile_Panel = {
		
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
			    html: document.getElementById("html").checked,
			    showWidget: document.getElementById("showWidget").checked,
			    showNotifications: document.getElementById("showNotifications").checked,
			    preview: document.getElementById("preview").checked,
			    text: document.getElementById("previewArea").value
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
	document.getElementById("html").checked = parsedPrefs.html;
	document.getElementById("showWidget").checked = parsedPrefs.showWidget;	
	document.getElementById("showNotifications").checked = parsedPrefs.showNotifications;	
	document.getElementById("preview").checked = parsedPrefs.preview;
	text = parsedPrefs.text;
	
	if (parsedPrefs.saveMode == 1){
		
		document.getElementById("timestamp").disabled = true;
	
	}else{
		
		document.getElementById("timestamp").disabled = false;
	}
	
	if (parsedPrefs.html){
		document.getElementById("previewArea").value = JSON.parse(text).html;
	}else{
		document.getElementById("previewArea").value = JSON.parse(text).plain;
	}
	
	if (document.getElementById("preview").checked){
		document.getElementById("previewArea").style.visibility = "visible" ;
	}else{
		document.getElementById("previewArea").style.visibility = "hidden";
	}
});