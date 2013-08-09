'use strict';

const prefs = require("simple-prefs");
const {Cc,Ci,Cu,components} = require("chrome");
const system = require("sdk/system");
const contextMenu = require("sdk/context-menu");
const tabs = require('tabs');


var menuItem = contextMenu.Item({
	label: "Save Text to File",
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
            	var userPrefPathToFile = prefs.prefs['extensions.savetexttofile.pathToFile'],
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
                var datestamp = prefs.prefs['extensions.savetexttofile.datestamp'],
                	timestamp = prefs.prefs['extensions.savetexttofile.timestamp'],
                	fileName = prefs.prefs['extensions.savetexttofile.fileName'];
                
                console.log(datestamp);
                console.log(timestamp);
                

                if (datestamp) {fileName += "--" + date;}

                if (timestamp) {fileName += "--" + time;}

                return fileName + ".txt";
            },

            // @param string - Path to saved file
            // @param string - Saved file name
            // @param string - Text to be saved to file
            // @param string - Whether to create a new file or append data to existing file
            // @param string - Whether to save a line separator in the file before saving text
            // @return boolean - Whether file has been saved successfully or not
            writeFileToOS: function(saveDirectory, fileName, selectedText, saveMode, lineSeparator) {
            	
            	Cu.import("resource://gre/modules/NetUtil.jsm");
                Cu.import("resource://gre/modules/FileUtils.jsm");
            	
            	var fileSeparator = "/",
            		fullPathToFile = saveDirectory + fileSeparator + fileName,
            		fullPathToFile = saveDirectory + fileSeparator + fileName,
                	file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile),
                	currentURL = prefs.prefs['extensions.savetexttofile.currentURL'],
                	datestampInLinePref = prefs.prefs['extensions.savetexttofile.datestampInLine'],
                	timestampInLinePref = prefs.prefs['extensions.savetexttofile.timestampInLine'],
                	currentTime = new Date(),
                	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
                	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
                	success;
                	//stringsBundle = document.getElementById("savetexttofile-overlay-string-bundle"),
                	//datestampInLineString = stringsBundle.getString('datestampInLine'),
                	//timestampInLineString = stringsBundle.getString('timestampInLine');
                
                
            	if (system.platform.indexOf("Win") != -1) {fileSeparator = "\\";}
                
                file.initWithPath(fullPathToFile);

                // flags available
                // FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE;
                var ostream = FileUtils.openSafeFileOutputStream(file)

                var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
                                createInstance(Ci.nsIScriptableUnicodeConverter);
                converter.charset = "UTF-8";
                var istream = converter.convertToInputStream(selectedText);

                // The last argument (the callback) is optional.
                NetUtil.asyncCopy(istream, ostream, function(status) {
                	if (!components.isSuccessCode(status)) {
                		// error!
                		success = 1;
                	}else{
                		success = 0;
                	}

                	// Data has been written to the file.
                });
                
                return success;
            }
        };

        // @return bool - Whether to 'Save' or 'Cancel' preference updates
        function showPreferences() {

        }

        // @param string - Notification for users' attention (status of file/text save)
        function informUser(msg, msgPriority) {

        }
        
        
        // main section
        var saveDirectory = FileManager.getPathToFile(),
        	fileName = FileManager.createFileName(),
        	saveMode = prefs.prefs['extensions.savetexttofile.saveMode'],
        	lineSeparator = prefs.prefs['extensions.savetexttofile.lineSeparator'];
	    
	    console.log(selectedText);
	    console.log(saveDirectory);
	    console.log(fileName);

	    
    	/*saveComplete = stringsBundle.getFormattedString('saveComplete', [saveDirectory, fileName]),
    	saveError = stringsBundle.getFormattedString('saveError', [saveDirectory, fileName]),*/
	    	
	    
	    
	    if (FileManager.writeFileToOS(saveDirectory, fileName, selectedText, saveMode, lineSeparator) == 0) {
	    	//informUser(saveComplete, nb.PRIORITY_INFO_HIGH);
	    	console.log('Text saved to file');
	    }else{
	    	//informUser(saveError, nb.PRIORITY_WARNING_HIGH);
	    	console.log('Text failed writing to file');
	    }
    },
};