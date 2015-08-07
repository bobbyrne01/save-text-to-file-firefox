var tab = require('sdk/tabs'),
	Data = require("./Data"),
	File = require("./File");

exports.getTitle = function () {

	return tab.activeTab.title;
};

exports.getURL = function () {

	return tab.activeTab.url;
};

exports.getSelectedText = function () {

	tab.activeTab.attach({
		contentScriptFile: [
			Data.get("js/SendSelectedText.js"),
			Data.get("js/GetSelectedText.js")
		],
		onMessage: function (selectedText) {
			File.saveTo(selectedText);
		}
	});
};

// on hotkey, attach scripts to tab and save selected text to file
exports.getSelectedTextHotkey = function () {

	tab.activeTab.attach({
		contentScriptFile: [
			Data.get("js/SendSelectedText.js"),
			Data.get("js/GetSelectedText.js")
		],
		onMessage: function (selectedText) {

			if (selectedText === "" || selectedText === null) {

				if (Preference.get('showNotifications')) {
					require("./Notification").sendMsg("noTextSelected_id");
				}

			} else {
				File.saveTo(selectedText);
			}
		}
	});
};
