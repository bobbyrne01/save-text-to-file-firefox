var prefs = require("simple-prefs"),
	{Cc,Ci,Cu,components} = require("chrome");
 
exports.getPathToFile = function() {
	
	// check if preferred saved path exists
	var userPrefPathToFile = prefs.prefs['pathToFile'],
		pathToFile;
	
	if (userPrefPathToFile === "") {

        // Save file in user's home directory (No preference specified)
		var home = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("Home", Ci.nsIFile);
        pathToFile = home.path;
        
    } else {

        pathToFile = userPrefPathToFile;
    }

    return pathToFile;
}