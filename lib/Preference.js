var preference = require("sdk/simple-prefs"),
	widget = require("Widget");

function onPrefChange(name) {
    
    if (preference.prefs[name]) {
		widget.init();
	
	}else{
		widget.remove();
	}
};

exports.registerListener = function(){
	preference.on("showWidget", onPrefChange);
};

exports.get = function(name) {
	return preference.prefs[name];
};

exports.set = function(name, value){
	preference.prefs[name] = value;
};