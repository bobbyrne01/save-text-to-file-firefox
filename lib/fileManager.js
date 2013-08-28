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

exports.createFileName = function() {
	
    var currentTime = new Date(),
    	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
    	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds();

    // check whether file name should include date and/or time stamps
    var fileName = prefs.prefs['fileName'];

    if (prefs.prefs['datestamp']) {fileName += "--" + date;}
    if (prefs.prefs['timestamp']) {fileName += "--" + time;}

    return fileName + ".txt";
}