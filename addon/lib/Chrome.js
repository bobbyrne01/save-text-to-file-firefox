var {
	Cc,
	Ci,
	Cu,
	components
} = require("chrome"),
	Preference = require("./Preference"),
	Tab = require("./Tab"),
	Notification = require("./Notification"),
	Localisation = require("./Localisation"),
	System = require("./System"),
	Utils = require("./Utils");
const {
	TextDecoder,
	TextEncoder,
	OS
} = Cu.import("resource://gre/modules/osfile.jsm", {});

exports.getHomeDir = function () {
	return Cc["@mozilla.org/file/directory_service;1"]
		.getService(Ci.nsIProperties).get("Home", Ci.nsIFile);
};

exports.selectDir = function (selectedText) {
	var nsIFilePicker = Ci.nsIFilePicker,
		fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);

	fp.init(require("./Window").get(),
		Localisation.getString("browse_title"),
		nsIFilePicker.modeGetFolder);

	var ret = fp.show();

	if (ret == nsIFilePicker.returnOK || ret == nsIFilePicker.returnReplace) {
		Preference.set("pathToFile", fp.file.path);
		require("./Panel").show(selectedText);
	}
};

function createFilePath(saveDirectory, fileName) {
	var currentDate = new Date(),
		dateString = Utils.createDateString(Preference.get('dateFormat'), currentDate),
		timeString = Utils.createTimeString(currentDate),
		filePath = '';

	// check whether file name should include date and/or time stamps
	if (Preference.get('datestamp')) {
		fileName += "--" + dateString;
	}
	if (Preference.get('saveMode') === 0) {
		if (Preference.get('timestamp')) {
			fileName += "--" + timeString;
		}
	}

	fileName = (Preference.get('format') === 0 ?
		Utils.sanitizeFilename(fileName) + ".txt" : Utils.sanitizeFilename(fileName) + ".csv");

	return OS.Path.join(saveDirectory, fileName);
}

exports.createFilePath = function (saveDirectory, fileName) {
	return createFilePath(saveDirectory, fileName);
};

exports.saveTo = function (selectedText) {
	var filePath = createFilePath(
			Preference.get('pathToFile'), (Preference.get('pagenameForFilename') ? Tab.getTitle() : Preference.get('fileName'))),
		string = '\n',
		currentDate = new Date(),
		dateString = Utils.createDateString(Preference.get('dateFormat'), currentDate),
		timeString = Utils.createTimeString(currentDate),
		separator = (Preference.get('format') === 0 ? "\n" : ",");

	// add user preferences to selected text
	if (Preference.get('lineSeparator'))
		string += Preference.get('lineSeparatorText') + separator;

	if (Preference.get('datestampInLine'))
		string += Localisation.getCustomString("datestamp_title") + ': ' + dateString + separator;

	if (Preference.get('timestampInLine'))
		string += Localisation.getCustomString("timestamp_title") + ': ' + timeString + separator;

	if (Preference.get('currentURL'))
		string += Tab.getURL() + separator + separator;

	var combinedString = string + selectedText;

	if (Preference.get('saveMode') === 0) {

		newFileWithText(combinedString, filePath);

	} else if (Preference.get('saveMode') === 1) {

		let promise = OS.File.read(filePath);
		promise = promise.then(function onSuccess(contents) {
				let text = new TextDecoder().decode(contents);
				combinedString = '\n\n' + combinedString;

				if (System.getPlatform().indexOf('win') >= 0) {
					combinedString = combinedString.replace(/[\n]/g, '\r\n');
				}

				combinedString = text + combinedString;

				let encodedArray = new TextEncoder().encode(combinedString);
				let promise = OS.File.writeAtomic(filePath, encodedArray);
				promise.then(
					function () {
						if (Preference.get('showNotifications')) {
							Notification.sendMsg("saveComplete_id", filePath);
						}
					},
					function (ex) {
						if (Preference.get('showNotifications')) {
							Notification.sendMsg("saveError_id", filePath);
						}
					}
				);
			},
			function onError(reason) { // if no existing file present to append to, create new file
				newFileWithText(combinedString, filePath);
			});

	} else {

		let promise = OS.File.read(filePath);
		promise = promise.then(function onSuccess(contents) {
				let text = new TextDecoder().decode(contents);
				combinedString = combinedString + '\n\n';

				if (System.getPlatform().indexOf('win') >= 0) {
					combinedString = combinedString.replace(/[\n]/g, '\r\n');
				}

				combinedString = combinedString + text;

				let encodedArray = new TextEncoder().encode(combinedString);
				let promise = OS.File.writeAtomic(filePath, encodedArray);
				promise.then(
					function () {
						if (Preference.get('showNotifications')) {
							Notification.sendMsg("saveComplete_id", filePath);
						}
					},
					function (ex) {
						if (Preference.get('showNotifications')) {
							Notification.sendMsg("saveError_id", filePath);
						}
					}
				);
			},
			function onError(reason) { // if no existing file present to append to, create new file				
				newFileWithText(combinedString, filePath);
			});
	}
};

function newFileWithText(combinedString, filePath) {

	if (System.getPlatform().indexOf('win') >= 0) {
		combinedString = combinedString.replace(/[\n]/g, '\r\n');
	}

	let encodedArray = new TextEncoder().encode(combinedString);
	let promise = OS.File.writeAtomic(filePath, encodedArray);
	promise.then(
		function () {
			if (Preference.get('showNotifications')) {
				Notification.sendMsg("saveComplete_id", filePath);
			}
		},
		function (ex) {
			if (Preference.get('showNotifications')) {
				Notification.sendMsg("saveError_id", filePath);
			}
		}
	);
}
