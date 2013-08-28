'use strict';

var contextMenu = require("sdk/context-menu"),
	self = require("self"),
	fileManager = require("./fileManager"),
	_ = require("sdk/l10n").get;

var menuItem = contextMenu.Item({
	
	label: _("saveTextToFile_id"),
	context: contextMenu.SelectionContext(),
	contentScript: 'self.on("click", function () {' +
       	'  var text = window.getSelection().toString();' +
       	'  self.postMessage(text);' +
       	'});',
    onMessage: function (selectedText) {
    
    	fileManager.writeFileToOS(fileManager.getPathToFile(), fileManager.createFileName(), selectedText);
    }
});