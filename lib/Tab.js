var tab = require('tabs');

exports.getURL = function() {
	
    return tab.activeTab.url;
}