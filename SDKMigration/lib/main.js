'use strict';

var prefs = require("simple-prefs"),
	{Cc,Ci,Cu,components} = require("chrome"),
	system = require("sdk/system"),
	contextMenu = require("sdk/context-menu"),
	tabs = require('tabs'),
	notifications = require("sdk/notifications"),
	self = require("self"),
	_ = require("sdk/l10n").get;


var menuItem = contextMenu.Item({
	
	label: _("saveTextToFile_id"),
	context: contextMenu.SelectionContext(),
	contentScript: 'self.on("click", function () {' +
       	'  var text = window.getSelection().toString();' +
       	'  self.postMessage(text);' +
       	'});',
    onMessage: function (selectedText) {
    
    	SaveTextToFile_Main.run(selectedText);
    }
});

var SaveTextToFile_Main = {
	
    run: function(selectedText) {

        var FileManager = {
        		
            // @returns string - Path to saved file
            getPathToFile: function() {

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
            },

            // @returns string - Name of file which will store the highlighted text
            createFileName: function() {
                var currentTime = new Date(),
                	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
                	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds();

                // check whether file name should include date and/or time stamps
                var fileName = prefs.prefs['fileName'];

                if (prefs.prefs['datestamp']) {fileName += "--" + date;}
                if (prefs.prefs['timestamp']) {fileName += "--" + time;}

                return fileName + ".txt";
            },

            // @param string - Path to saved file
            // @param string - Saved file name
            // @param string - Text to be saved to file
            // @param string - Whether to create a new file or append data to existing file
            // @param string - Whether to save a line separator in the file before saving text
            // @return boolean - Whether file has been saved successfully or not
            writeFileToOS: function(saveDirectory, fileName, selectedText) {
            	
            	Cu.import("resource://gre/modules/NetUtil.jsm");
                Cu.import("resource://gre/modules/FileUtils.jsm");
            	
            	var fileSeparator = "/",
            		fullPathToFile = saveDirectory + fileSeparator + fileName,
            		fullPathToFile = saveDirectory + fileSeparator + fileName,
                	file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile),
                	currentURL = prefs.prefs['currentURL'],
                	datestampInLinePref = prefs.prefs['datestampInLine'],
                	timestampInLinePref = prefs.prefs['timestampInLine'],
                	currentTime = new Date(),
                	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
                	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
                	ostream,
                	string = '',
                	currentTime = new Date(),
                	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
                	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds();
                
                
            	if (system.platform.indexOf("Win") != -1) {fileSeparator = "\\";}
                
                file.initWithPath(fullPathToFile);
                
                if (prefs.prefs['saveMode'] == 0){
                	ostream = FileUtils.openSafeFileOutputStream(file, FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE);
                	
                }else{
                	ostream = FileUtils.openFileOutputStream()(file, FileUtils.MODE_WRONLY | FileUtils.MODE_APPEND);
                }
                

                var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
                                createInstance(Ci.nsIScriptableUnicodeConverter);
                converter.charset = "UTF-8";
                
                if (prefs.prefs['datestampInLine']){
                	string += date + '\n\n';
                }
                
                if (prefs.prefs['timestampInLine']){
                	string += time + '\n\n';
                }
                
                if (prefs.prefs['lineSeparator']){
                	string += '----------------------------------------------------------------------\n\n';
                }
                
                if (prefs.prefs['currentURL']){
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
            }
        };
        
        
        // main section
        var saveDirectory = FileManager.getPathToFile(),
        	fileName = FileManager.createFileName();
	    
	    FileManager.writeFileToOS(saveDirectory, fileName, selectedText);
    },
};