var Panel = require("sdk/panel"),
	Preference = require("./Preference"),
	Chrome = require("./Chrome"),
	Data = require("./Data"),
	Notification = require("./Notification"),
	File = require("./File"),
	confirmation,
	selectedText;

exports.init = function() {
	
	confirmation = Panel.Panel({
		width: 490,
		height: 400,
		contentURL: Data.get("html/ConfirmPanel.html"),
	    contentScriptFile: Data.get("js/ConfirmPanel.js"),
        onShow: function() { 
        	
        	getPreferences();
        }
	});
	
	confirmation.port.on("selectDir", function () {
		Chrome.selectDir(selectedText);
		confirmation.show();
	});

	confirmation.port.on("save", function (selectedPrefs) {
		
		if(selectedText === "" || selectedText === null){

			Notification.sendMsg("noTextSelected_id");
			confirmation.hide();
		
		}else{
			
			var parsedPerfs = JSON.parse(selectedPrefs);
			
			Preference.set('fileName', parsedPerfs.fileName);
			Preference.set('pathToFile', parsedPerfs.pathToFile);
			Preference.set('datestamp', parsedPerfs.datestamp);
			Preference.set('timestamp', parsedPerfs.timestamp);
			Preference.set('datestampInLine', parsedPerfs.datestampInLine);
			Preference.set('timestampInLine', parsedPerfs.timestampInLine);
			Preference.set('lineSeparator', parsedPerfs.lineSeparator);
			Preference.set('currentURL', parsedPerfs.currentURL);
			Preference.set('pagenameForFilename', parsedPerfs.pagenameForFilename);
			Preference.set('saveMode', parseInt(parsedPerfs.saveMode));
			Preference.set('confirmPanel', parsedPerfs.confirmPanel);
			
			Chrome.saveTo(selectedText);
			confirmation.hide();
		}
		
		selectedText = "";
	});
	
	confirmation.port.on("cancel", function () {
		
		Notification.sendMsg("saveCancel_id");
		confirmation.hide();
		selectedText = "";
	});
	
	return confirmation;
};

function getPreferences() {
	
	var prefs = JSON.stringify({
			fileName: Preference.get('fileName'),
			pathToFile: File.getPathToFile(),
		    datestamp: Preference.get('datestamp'),
		    timestamp: Preference.get('timestamp'),
		    datestampInLine: Preference.get('datestampInLine'),
		    timestampInLine: Preference.get('timestampInLine'),
		    lineSeparator: Preference.get('lineSeparator'),
		    currentURL: Preference.get('currentURL'),
		    pagenameForFilename: Preference.get('pagenameForFilename'),
		    saveMode: Preference.get('saveMode'),
		    confirmPanel: Preference.get('confirmPanel')
	    });
	
	confirmation.port.emit("prefs", prefs);
}

exports.show = function(selectedTextTemp) {
	
	selectedText = selectedTextTemp;
	confirmation.show();
};

exports.getPreferences = function() {
	return getPreferences();
};