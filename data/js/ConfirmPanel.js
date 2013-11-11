// Panel loaded
$(document).ready(function(){
	
	$( "#pathToFileButton" ).click(function() {
		SaveTextToFile_Panel.selectDir();
	});
	
	$( "#saveButton" ).click(function() {
		SaveTextToFile_Panel.save();
	});
	
	$( "#cancelButton" ).click(function() {
		SaveTextToFile_Panel.cancel();
	});
});

// functions available to Panel
var SaveTextToFile_Panel = {
		
		selectDir: function() {
			self.port.emit("selectDir", '');
		},
    
		save: function() {
			
			// send path to file and file name back to addon code
			var selectedPrefs = '{'
				+'"fileName":"' + $( "#fileName" ).val() + '", '
			    +'"pathToFile":"' + $( "#pathToFile" ).val() + '"'
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
	
	$( "#fileName" ).val(parsedPrefs.fileName);
	$( "#pathToFile" ).val(parsedPrefs.pathToFile);
	$( "#datestamp" ).prop('checked', parsedPrefs.datestamp);
	$( "#timestamp" ).prop('checked', parsedPrefs.timestamp);
	$( "#datestampInLine" ).prop('checked', parsedPrefs.datestampInLine);
	$( "#timestampInLine" ).prop('checked', parsedPrefs.timestampInLine);
	$( "#lineSeparator" ).prop('checked', parsedPrefs.lineSeparator);
	$( "#currentURL" ).prop('checked', parsedPrefs.currentURL);
	$( "#saveMode" ).val(parsedPrefs.saveMode);
});