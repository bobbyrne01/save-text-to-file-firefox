var tab = require('tabs');

exports.getTitle = function() {
	
    return tab.activeTab.title;
}

exports.getURL = function() {
	
    return tab.activeTab.url;
}