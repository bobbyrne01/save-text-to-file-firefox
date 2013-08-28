var tabs = require('tabs');

exports.loadURL = function() {
	
    return tabs.activeTab.url;
}