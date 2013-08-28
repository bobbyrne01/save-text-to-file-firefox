var {Cc,Ci,Cu,components} = require("chrome"),
	preferenceManager = require("./preferenceManager"),
	tabsManager = require("./tabsManager"),
	notificationsManager = require("./notificationsManager");

exports.loadHomeDir = function() {
	
	return Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("Home", Ci.nsIFile);
}

exports.createLocalFile = function(){
	
	return 
}

exports.writeFile = function(saveDirectory, fileSeparator, fileName, selectedText){
	
	Cu.import("resource://gre/modules/NetUtil.jsm");
    Cu.import("resource://gre/modules/FileUtils.jsm");
    
    var ostream,
    	string = '\n\n',
    	currentTime = new Date(),
    	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
    	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
    	file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile),
    	fullPathToFile = saveDirectory + fileSeparator + fileName;
	
	try{
		
        file.initWithPath(fullPathToFile);
    	if (file.exists() === false) {file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 420);}
        
        if (preferenceManager.loadSaveModeOption() == 0){
        	ostream = FileUtils.openSafeFileOutputStream(file, FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE);
        	
        }else{
        	ostream = FileUtils.openFileOutputStream(file, FileUtils.MODE_WRONLY | FileUtils.MODE_APPEND);
        }
        

        var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
        converter.charset = "UTF-8";
        
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
        	string += tabsManager.loadURL() + '\n\n';
        }
        
        
        var istream = converter.convertToInputStream(string + selectedText);

        // The last argument (the callback) is optional.
        NetUtil.asyncCopy(istream, ostream, function(status) {
        	
        	if (!components.isSuccessCode(status)) {
        		
        		notificationsManager.sendMsg("saveError_id", saveDirectory, fileName);
        		
        	}else{
        		
        		notificationsManager.sendMsg("saveComplete_id", saveDirectory, fileName);
        	}
        });
	} catch (e) {
        return false;
    }
}