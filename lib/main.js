'use strict';

var { Hotkey } = require("sdk/hotkeys"),
	selection = require("sdk/selection"),
	contextMenu = require("sdk/context-menu"),
	self = require("self"),
	fileManager = require("./fileManager"),
	localisationManager = require("./localisationManager");



var showHotKey = Hotkey({
	combo: "shift-f1",
	onPress: function() {
		fileManager.writeFileToOS(fileManager.getPathToFile(), fileManager.createFileName(), selection.text);
	}
});

var menuItem = contextMenu.Item({
	
	label: localisationManager.loadString("saveTextToFile_id"),
	context: contextMenu.SelectionContext(),
	contentScript: 'self.on("click", function () {' +
       	'  var text = window.getSelection().toString();' +
       	'  self.postMessage(text);' +
       	'});',
    onMessage: function (selectedText) {
    
    	fileManager.writeFileToOS(fileManager.getPathToFile(), fileManager.createFileName(), selectedText);
    }
});