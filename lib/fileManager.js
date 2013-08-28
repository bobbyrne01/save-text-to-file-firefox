var {Cc,Ci,Cu,components} = require("chrome"),
	system = require("sdk/system"),
	tabs = require('tabs'),
	notifications = require("sdk/notifications"),
	preferenceManager = require("./preferenceManager"),
	_ = require("sdk/l10n").get;
 
exports.getPathToFile = function() {
	
	// check if preferred saved path exists
	var userPrefPathToFile = preferenceManager.loadPathToFileOption(),
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
    	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
    	fileName = preferenceManager.loadFileNameOption();

    // check whether file name should include date and/or time stamps
    if (preferenceManager.loadDatestampOption()) {fileName += "--" + date;}
    if (preferenceManager.loadTimestampOption()) {fileName += "--" + time;}

    return fileName + ".txt";
}

// @param string - Path to saved file
// @param string - Saved file name
// @param string - Text to be saved to file
exports.writeFileToOS = function(saveDirectory, fileName, selectedText) {
	
	Cu.import("resource://gre/modules/NetUtil.jsm");
    Cu.import("resource://gre/modules/FileUtils.jsm");
    
    var fileSeparator = "\\";
    
    if (system.platform.indexOf("linu") != -1) {fileSeparator = "/";}
	
	var fullPathToFile = saveDirectory + fileSeparator + fileName,
    	file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile),
    	currentURL = preferenceManager.loadCurrentURLOption(),
    	datestampInLinePref = preferenceManager.loadDatestampInLineOption(),
    	timestampInLinePref = preferenceManager.loadTimestampInLineOption(),
    	currentTime = new Date(),
    	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
    	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
    	ostream,
    	string = '';
    
	try{
		
        file.initWithPath(fullPathToFile);
    	if (file.exists() === false) {file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 420);}
        
        if (preferenceManager.loadSaveModeOption() == 0){
        	ostream = FileUtils.openSafeFileOutputStream(file, FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE);
        	
        }else{
        	ostream = FileUtils.openFileOutputStream(file, FileUtils.MODE_WRONLY | FileUtils.MODE_APPEND);
        }
        

        var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
                        createInstance(Ci.nsIScriptableUnicodeConverter);
        converter.charset = "UTF-8";
        
        string += '\n\n';
        
        if (preferenceManager.loadLineSeparatorOption()){
        	string += '----------------------------------------------------------------------\n\n';
        }
        
        if (preferenceManager.loadDatestampInLineOption()){
        	string += date + '\n\n';
        }
        
        if (preferenceManager.loadTimestampInLineOption()){
        	string += time + '\n\n';
        }
        
        if (preferenceManager.loadCurrentURLOption()){
        	string += tabs.activeTab.url + '\n\n';
        }
        
        
        var istream = converter.convertToInputStream(string + selectedText);

        // The last argument (the callback) is optional.
        NetUtil.asyncCopy(istream, ostream, function(status) {
        	
        	if (!components.isSuccessCode(status)) {
        		// error!
        		notifications.notify({
        			text: _("saveError_id", saveDirectory, fileName),
              	});
        	}else{
        		
        		notifications.notify({
        			text: _("saveComplete_id", saveDirectory, fileName),
              	});
        	}
        });
	} catch (e) {
        return false;
    }
}