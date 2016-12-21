var Preference = require("./Preference"),
	Chrome = require("./Chrome"),
	Data = require("./Data"),
	Notification = require("./Notification"),
	panel,
	selectedText;

exports.init = function () {

	panel = require("sdk/panel").Panel({
		width: 490,
		height: 750,
		contentURL: Data.get("html/panel.html"),
		contentScriptFile: [Data.get("js/controller.js")],
		onShow: function () {
			getPreferences();
		},
		contextMenu: true
	});

	panel.port.on("selectDir", function () {
		Chrome.selectDir(selectedText);
		panel.show();
	});

	panel.port.on("save", function (selectedPrefs) {

		var parsedPrefs = JSON.parse(selectedPrefs);

		Preference.set('fileName', parsedPrefs.fileName);
		Preference.set('pathToFile', parsedPrefs.pathToFile);
		Preference.set('format', parseInt(parsedPrefs.format));
		Preference.set('datestamp', parsedPrefs.datestamp);
		Preference.set('timestamp', parsedPrefs.timestamp);
		Preference.set('datestampInLine', parsedPrefs.datestampInLine);
		Preference.set('timestampInLine', parsedPrefs.timestampInLine);
		Preference.set('dateFormat', parseInt(parsedPrefs.dateFormat));
		Preference.set('lineSeparator', parsedPrefs.lineSeparator);
		Preference.set('lineSeparatorText', parsedPrefs.lineSeparatorText);
		Preference.set('currentURL', parsedPrefs.currentURL);
		Preference.set('pagenameForFilename', parsedPrefs.pagenameForFilename);
		Preference.set('saveMode', parseInt(parsedPrefs.saveMode));
		Preference.set('confirmPanel', parsedPrefs.confirmPanel);
		Preference.set('html', parsedPrefs.html);
		Preference.set('showWidget', parsedPrefs.showWidget);
		Preference.set('showNotifications', parsedPrefs.showNotifications);
		Preference.set('preview', parsedPrefs.preview);

		selectedText = parsedPrefs.text;

		if (selectedText === "" || selectedText === null) {
			if (Preference.get('showNotifications')) {
				Notification.sendMsg("noTextSelected_id");
			}
			panel.hide();
		} else {
			Chrome.saveTo(selectedText);
			panel.hide();
		}

		selectedText = "";
	});

	panel.port.on("cancel", function () {

		if (Preference.get('showNotifications')) {
			Notification.sendMsg("saveCancel_id");
		}

		panel.hide();
		selectedText = "";
	});

	panel.port.on("prefUpdate", function (updatedPref) {
		Preference.set(JSON.parse(updatedPref).pref, JSON.parse(updatedPref).value);
	});

	panel.port.on("updateHotkey", function (value) {
		Preference.set('hotkey', value);
		panel.port.emit("hotkeyStatus", require("./Hotkey").reinit());
	});

	return panel;
};

exports.get = function () {
	return panel;
};

function getPreferences() {

	var prefs = JSON.stringify({
		fileName: Preference.get('fileName'),
		pathToFile: require("./File").getPathToFile(),
		format: Preference.get('format'),
		datestamp: Preference.get('datestamp'),
		timestamp: Preference.get('timestamp'),
		datestampInLine: Preference.get('datestampInLine'),
		timestampInLine: Preference.get('timestampInLine'),
		dateFormat: Preference.get('dateFormat'),
		lineSeparator: Preference.get('lineSeparator'),
		lineSeparatorText: Preference.get('lineSeparatorText'),
		currentURL: Preference.get('currentURL'),
		pagenameForFilename: Preference.get('pagenameForFilename'),
		saveMode: Preference.get('saveMode'),
		confirmPanel: Preference.get('confirmPanel'),
		html: Preference.get('html'),
		showWidget: Preference.get('showWidget'),
		showNotifications: Preference.get('showNotifications'),
		preview: Preference.get('preview'),
		hotkey: Preference.get('hotkey'),
		text: selectedText
	});

	panel.port.emit("prefs", prefs);
}

exports.show = function (selectedTextTemp) {

	selectedText = selectedTextTemp;
	panel.show();
};

exports.getPreferences = function () {
	return getPreferences();
};
