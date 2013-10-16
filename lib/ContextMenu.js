var ContextMenu = require("sdk/context-menu"),
	Localisation = require("./Localisation"),
	File = require("./File");

exports.setupMenuItem = function() {
	
	ContextMenu.Item({
		
		label: Localisation.getString("saveTextToFile_id"),
		context: ContextMenu.SelectionContext(),
		contentScript: 'self.on("click", function () {' +
	       	'  var text = window.getSelection().toString();' +
	       	'  self.postMessage(text);' +
	       	'});',
	    onMessage: function (selectedText) {
	    
	    	File.saveTo(File.getPathToFile(), File.createFileName(), selectedText);
	    }
	});
}