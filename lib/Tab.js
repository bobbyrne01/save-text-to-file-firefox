var tab = require('sdk/tabs'),
	Data = require("./Data"),
	File = require("./File"),
	Notification = require("./Notification");

exports.getTitle = function() {
	
    return tab.activeTab.title;
};

exports.getURL = function() {
	
    return tab.activeTab.url;
};

exports.getSelectedText = function() {
	
	tab.activeTab.attach({
		contentScriptFile: [ Data.get("js/SendSelectedText.js"), Data.get("js/GetSelectedText.js") ],
	    onMessage: function(selectedText) {
	    	File.saveTo(selectedText);
	    }
	});
};

exports.getSelectedTextHotkey = function() {
	
	tab.activeTab.attach({
		contentScriptFile: [ Data.get("js/SendSelectedText.js"), Data.get("js/GetSelectedText.js") ],
	    onMessage: function(selectedText) {
	    	
	    	if(selectedText === "" || selectedText === null){

				Notification.sendMsg("noTextSelected_id");
			
			}else{
				File.saveTo(selectedText);
			}
	    }
	});
};