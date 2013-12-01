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
		width: 490,
		height: 400,
		contentURL: Data.get("html/ConfirmPanel.html"),
	    contentScriptFile: [ Data.get("js/ConfirmPanel.js") ],
        onShow: function() { getPreferences(); }
	});
	
	
	confirmation.port.on("selectDir", function () {
		Chrome.selectDir(selectedText);
		confirmation.show();
	});

	confirmation.port.on("save", function (selectedPrefs) {
		
		var parsedPerfs = JSON.parse(selectedPrefs);
		
		Preference.set('fileName', parsedPerfs.fileName);
		Preference.set('pathToFile', parsedPerfs.pathToFile);
		Preference.set('datestamp', parsedPerfs.datestamp === "true");
		Preference.set('timestamp', parsedPerfs.timestamp === "true");
		Preference.set('datestampInLine', parsedPerfs.datestampInLine === "true");
		Preference.set('timestampInLine', parsedPerfs.timestampInLine === "true");
		Preference.set('lineSeparator', parsedPerfs.lineSeparator === "true");
		Preference.set('currentURL', parsedPerfs.currentURL === "true");
		Preference.set('saveMode', parseInt(parsedPerfs.saveMode));
		Preference.set('confirmPanel', parsedPerfs.confirmPanel === "true");
		
		Chrome.saveTo(selectedText);
		confirmation.hide();
	});
	
	confirmation.port.on("cancel", function () {
		
		Notification.sendMsg("saveCancel_id");
		confirmation.hide();
	});
	
	return confirmation;
};

function getPreferences() {
	
	var prefs = '{'
		+'"fileName":"' + Preference.get('fileName') + '", '
	    +'"pathToFile":"' + File.getPathToFile().replace(/\\/g,"\\\\")  + '", '
	    +'"datestamp":' + Preference.get('datestamp') + ', '
	    +'"timestamp":' + Preference.get('timestamp') + ', '
	    +'"datestampInLine":' + Preference.get('datestampInLine') + ', '
	    +'"timestampInLine":' + Preference.get('timestampInLine') + ', '
	    +'"lineSeparator":' + Preference.get('lineSeparator') + ', '
	    +'"currentURL":' + Preference.get('currentURL') + ', '
	    +'"saveMode":' + Preference.get('saveMode') + ', '
	    +'"confirmPanel":' + Preference.get('confirmPanel') + ''
	    +'}';
	
	confirmation.port.emit("prefs", prefs);
}

exports.show = function(selectedTextTemp) {
	
	selectedText = selectedTextTemp;
	confirmation.show();
};

exports.getPreferences = function() {
	return getPreferences();
};