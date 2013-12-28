var Panel = require("sdk/panel"),
	Preference = require("./Preference"),
	Chrome = require("./Chrome"),
	Data = require("./Data"),
	Notification = require("./Notification"),
	File = require("./File"),
	panel,
	selectedText;

exports.init = function() {
	
	panel = Panel.Panel({
		width: 490,
		height: 475,
		contentURL: Data.get("html/ConfirmPanel.html"),
	    contentScriptFile: Data.get("js/ConfirmPanel.js"),
        onShow: function() { 
        	getPreferences();
        }
	});
	
	panel.port.on("selectDir", function () {
		Chrome.selectDir(selectedText);
		panel.show();
	});

	panel.port.on("save", function (selectedPrefs) {
		
		var parsedPerfs = JSON.parse(selectedPrefs);
		
		Preference.set('fileName', parsedPerfs.fileName);
		Preference.set('pathToFile', parsedPerfs.pathToFile);
		Preference.set('datestamp', parsedPerfs.datestamp);
		Preference.set('timestamp', parsedPerfs.timestamp);
		Preference.set('datestampInLine', parsedPerfs.datestampInLine);
		Preference.set('timestampInLine', parsedPerfs.timestampInLine);
		Preference.set('dateFormat', parseInt(parsedPerfs.dateFormat));
		Preference.set('lineSeparator', parsedPerfs.lineSeparator);
		Preference.set('currentURL', parsedPerfs.currentURL);
		Preference.set('pagenameForFilename', parsedPerfs.pagenameForFilename);
		Preference.set('saveMode', parseInt(parsedPerfs.saveMode));
		Preference.set('confirmPanel', parsedPerfs.confirmPanel);
		Preference.set('showWidget', parsedPerfs.showWidget);
		Preference.set('showNotifications', parsedPerfs.showNotifications);
		
		
		
		if(selectedText === "" || selectedText === null){

			if (Preference.get('showNotifications')){
				
				Notification.sendMsg("noTextSelected_id");
			}
			
			panel.hide();
		
		}else{			
			
			Chrome.saveTo(selectedText);
			panel.hide();
		}
		
		selectedText = "";
	});
	
	panel.port.on("cancel", function () {
		
		if (Preference.get('showNotifications')){
		
			Notification.sendMsg("saveCancel_id");
		}
		
		panel.hide();
		selectedText = "";
	});
	
	return panel;
};

exports.get = function(){
	return panel;
};

function getPreferences() {
	
	var prefs = JSON.stringify({
			fileName: Preference.get('fileName'),
			pathToFile: File.getPathToFile(),
		    datestamp: Preference.get('datestamp'),
		    timestamp: Preference.get('timestamp'),
		    datestampInLine: Preference.get('datestampInLine'),
		    timestampInLine: Preference.get('timestampInLine'),
		    dateFormat: Preference.get('dateFormat'),
		    lineSeparator: Preference.get('lineSeparator'),
		    currentURL: Preference.get('currentURL'),
		    pagenameForFilename: Preference.get('pagenameForFilename'),
		    saveMode: Preference.get('saveMode'),
		    confirmPanel: Preference.get('confirmPanel'),
		    showWidget: Preference.get('showWidget'),
		    showNotifications: Preference.get('showNotifications')
	    });
	
	panel.port.emit("prefs", prefs);
}

exports.show = function(selectedTextTemp) {
	
	selectedText = selectedTextTemp;
	panel.show();
};

exports.getPreferences = function() {
	return getPreferences();
};