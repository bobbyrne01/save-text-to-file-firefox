var preference = require("simple-prefs"),
	widget = require("Widget");

function onPrefChange(name) {
    
    if (preference.prefs[name]) {
		widget.remove();
	
	}else{
		widget.init();
	}
};

exports.registerListener = function(){
	preference.on("hideWidget", onPrefChange);
};

exports.get = function(name) {
	return preference.prefs[name];
};

exports.set = function(name, value){
	preference.prefs[name] = value;
};