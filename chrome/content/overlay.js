//	Author: Robert Byrne
//	Copyright 2012

var HighlightedTextToFile = {
    run: function() {
    
    	//declare local varibles/functions
    	function getSelText() {
	   		var focusedWindow = document.commandDispatcher.focusedWindow;
			var selText = focusedWindow.getSelection();

			return selText.toString();
		}
    
    	var FileManager = {
    		// @returns string - Path to saved file
			getPathToFile: function() {
			
				// check if a path to saved file has been set in user preferences
				var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
				var userPrefPathToFile = prefManager.getCharPref("extensions.highlightedtexttofile.pathToFile");
				if (userPrefPathToFile === ""){
				
					// Save file in user's home directory (No preference specified)
					var dirService = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties);   
					var homeDirFile = dirService.get("Home", Components.interfaces.nsIFile); // returns an nsIFile object
					var pathToFile = homeDirFile.path;
				}else{
				
					//Save file in user's prefered directory
					pathToFile = userPrefPathToFile;
				}
				
			   	return pathToFile;
			},
			
			// @returns string - Name of file which will store the highlighted text
			createFileName: function() {
				var currentTime = new Date();
				var date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear();
	
				// check whether file name should include timestamp
				var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
				var timestamp = prefManager.getBoolPref("extensions.highlightedtexttofile.timestamp");
				if (timestamp){
					date = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds() + "-" + date;
				}
	
				return prefManager.getCharPref("extensions.highlightedtexttofile.fileName") + "--" + date + ".txt";
			},
			
			// @param string - Path to saved file
			// @param string - Text to be saved to file
			// @return boolean - Whether file has been saved successfully or not
			writeFileToOS: function(homeDirectory, fileName, selectedText) {
		
				var fileSeparator ="/";
				if (navigator.appVersion.indexOf("Win")!=-1) fileSeparator = "\\"

				var fullPathToFile = homeDirectory + fileSeparator + fileName;
				var file = Components.classes["@mozilla.org/file/local;1"]
				.createInstance(Components.interfaces.nsILocalFile);
				
				// Check file is being stored with a valid directory and name
				try{
					file.initWithPath(fullPathToFile);
					if (file.exists() == false) {
						file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );
				  	}
				  	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
				  											.createInstance( Components.interfaces.nsIFileOutputStream );
		  			
		  			/* Open flags
					#define PR_RDONLY       0x01
					#define PR_WRONLY       0x02
					#define PR_RDWR         0x04
					#define PR_CREATE_FILE  0x08
					#define PR_APPEND       0x10
					#define PR_TRUNCATE     0x20
					#define PR_SYNC         0x40
					#define PR_EXCL         0x80
					*/
					/*
					** File modes ....
					**
					** CAVEAT: 'mode' is currently only applicable on UNIX platforms.
					** The 'mode' argument may be ignored by PR_Open on other platforms.
					**
					**   00400   Read by owner.
					**   00200   Write by owner.
					**   00100   Execute (search if a directory) by owner.
					**   00040   Read by group.
					**   00020   Write by group.
					**   00010   Execute by group.
					**   00004   Read by others.
					**   00002   Write by others
					**   00001   Execute by others.
					**
					*/
					outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
					var output = selectedText;
				    var result = outputStream.write(output, output.length);
					outputStream.close();
					
					return true;
				} catch (e){
					return false;
				}
			},
		};
		
		// @return string - Currently highlighted text in web browser
		function getSelText() {
	   		var focusedWindow = document.commandDispatcher.focusedWindow;
			var selText = focusedWindow.getSelection();

			return selText.toString();
		}
		
		// @param string - Notification for users' attention (status of file/text save)
		function informUser(msg, msgPriority) {  
			var nb = gBrowser.getNotificationBox();
			var box = nb.appendNotification(
				msg,
				null,
				null,
				msgPriority,
				null);
			setTimeout(function() { if (nb.getNotificationWithValue(box.value) instanceof XULElement){nb.removeNotification(box);} }, 10000);
		} 
	
	
		//main() like section
    	var homeDirectory = FileManager.getPathToFile();
		var fileName = FileManager.createFileName();
		var selectedText = getSelText();
		
		var nb = gBrowser.getNotificationBox();
   		if (FileManager.writeFileToOS(homeDirectory, fileName, selectedText)){
   			informUser("Text saved to \x22" + homeDirectory + "/" + fileName + "\x22", nb.PRIORITY_INFO_HIGH);
   		}else{
   			informUser(
   				"Could not save text to \x22" + homeDirectory + "/" + fileName + "\x22, Please check you have specified a valid save path which you have write access to in Highlighted Text To File's preferences",
   				nb.PRIORITY_WARNING_HIGH);
   		}
   	},
};
