var Panel = require("sdk/panel"),
	File = require("./File"),
	Preference = require("./Preference"),
	Chrome = require("./Chrome"),
	Data = require("./Data"),
	Notification = require("./Notification"),
	confirmation,
	selectedText;

exports.init = function() {
	
	confirmation = Panel.Panel({
		width: 450,
		height: 325,
		contentURL: Data.get("html/ConfirmPanel.html"),
	    contentScriptFile: [ Data.get("js/ConfirmPanel.js") ],
        onShow: function() { getPreferences(); }
	});
	
	
	confirmation.port.on("selectDir", function () {
		Chrome.selectDir();
		confirmation.show();
	});

	confirmation.port.on("save", function (selectedPrefs) {
		
		var parsedPerfs = JSON.parse(selectedPrefs);
		
		Chrome.saveTo(
				Chrome.createFileObject(parsedPerfs.pathToFile, parsedPerfs.fileName), 
				selectedText);
		confirmation.hide();
	});
	
	confirmation.port.on("cancel", function () {
		
		console.log('cancel in addon');
		
		Notification.sendMsg("saveCancel_id");
		confirmation.hide();
	});
}

function getPreferences() {
	
	var prefs = '{'
		+'"fileName":"' + File.createFileName() + '", '
	    +'"pathToFile":"' + File.getPathToFile() + '", '
	    +'"datestamp":"' + Preference.get('datestamp') + '", '
	    +'"timestamp":"' + Preference.get('timestamp') + '", '
	    +'"datestampInLine":"' + Preference.get('datestampInLine') + '", '
	    +'"timestampInLine":"' + Preference.get('timestampInLine') + '", '
	    +'"lineSeparator":"' + Preference.get('lineSeparator') + '", '
	    +'"currentURL":"' + Preference.get('currentURL') + '"'
	    +'}';
	
	confirmation.port.emit("prefs", prefs);
}

exports.show = function(selectedTextTemp) {
	
	selectedText = selectedTextTemp;
	confirmation.show();
}

exports.getPreferences = function() {
	return getPreferences();
}