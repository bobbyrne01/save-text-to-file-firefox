'use strict';

const prefs = require("simple-prefs");
const {Cc,Ci} = require("chrome");
var contextMenu = require("sdk/context-menu");


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

            }
        };

        // @return bool - Whether to 'Save' or 'Cancel' preference updates
        function showPreferences() {

        }

        // @param string - Notification for users' attention (status of file/text save)
        function informUser(msg, msgPriority) {

        }
        
        
        // execute commands
        console.log(selectedText);
        
        var saveDirectory = FileManager.getPathToFile();
        console.log(saveDirectory);
	    
        var fileName = FileManager.createFileName();
	    console.log(fileName);

	    
    	/*saveComplete = stringsBundle.getFormattedString('saveComplete', [saveDirectory, fileName]),
    	saveError = stringsBundle.getFormattedString('saveError', [saveDirectory, fileName]),*/
	    	
	    var lineSeparator = prefs.prefs['extensions.savetexttofile.lineSeparator'],
	    	saveMode = prefs.prefs['extensions.savetexttofile.saveMode'];
	    
	    if (FileManager.writeFileToOS(saveDirectory, fileName, selectedText, saveMode, lineSeparator)) {
	    	//informUser(saveComplete, nb.PRIORITY_INFO_HIGH);
	    }else{
	    	//informUser(saveError, nb.PRIORITY_WARNING_HIGH);
	    }
    },
};