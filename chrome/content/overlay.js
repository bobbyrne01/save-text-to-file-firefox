// Author: Robert Byrne
// Copyright 2012

var HighlightedTextToFile = {
  run: function() {
    
    //declare local variables/functions
    var FileManager = {
      // @returns string - Path to saved file
	  getPathToFile: function() {
			
		// check if a path to saved file has been set in user preferences
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
		                                     .getService(Components.interfaces.nsIPrefBranch);
		var userPrefPathToFile = prefManager.getComplexValue("extensions.highlightedtexttofile.pathToFile",
						                                      Components.interfaces.nsISupportsString).data;

		if (userPrefPathToFile === ""){
				
		  // Save file in user's home directory (No preference specified)
		  var dirService = Components.classes["@mozilla.org/file/directory_service;1"]
		                                      .getService(Components.interfaces.nsIProperties);   
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
		var time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds();
	
		// check whether file name should include date and/or timestamp
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
		                                     .getService(Components.interfaces.nsIPrefBranch);
		var datestamp = prefManager.getBoolPref("extensions.highlightedtexttofile.datestamp");
		var timestamp = prefManager.getBoolPref("extensions.highlightedtexttofile.timestamp");
		var fileName = prefManager.getComplexValue("extensions.highlightedtexttofile.fileName",
		 			                                Components.interfaces.nsISupportsString).data;
		
		if (datestamp)
		  fileName += "--" + date;
			
		if (timestamp)
		  fileName += "--" + time;
	
		return fileName + ".txt";
	  },
			
      // @param string - Path to saved file
	  // @param string - Text to be saved to file
	  // @return boolean - Whether file has been saved successfully or not
	  writeFileToOS: function(saveDirectory, fileName, selectedText) {
		
	    var fileSeparator ="/";
		if (navigator.appVersion.indexOf("Win")!=-1) fileSeparator = "\\"

		var fullPathToFile = saveDirectory + fileSeparator + fileName;
		var file = Components.classes["@mozilla.org/file/local;1"]
				                      .createInstance(Components.interfaces.nsILocalFile);
				
		// Check file is being stored with a valid directory and name
		try{
		  file.initWithPath(fullPathToFile);
		  if (file.exists() == false)
		    file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);

		  var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
				  							    .createInstance(Components.interfaces.nsIFileOutputStream);
		  var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
                                             .createInstance(Components.interfaces.nsIConverterOutputStream);
	      outputStream.init(file, 0x04 | 0x08 | 0x20, 420, 0);
	 
          converter.init(outputStream, "UTF-8", 0, 0);
          converter.writeString(selectedText);
          converter.close();
					
		  return true;
		} catch (e){
		  return false;
		}
	  },
    };
    
    // @return bool - Whether to 'Save' or 'Cancel' preference updates
    function showPreferences() {
      var returnValue = { save: null };
      window.openDialog("chrome://highlightedtexttofile/content/showPreferences.xul", "", "centerscreen,modal", returnValue);
      
      return returnValue.save;
    }
		
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
      
      // Check if notification exists after 10 seconds, if so, remove it
	  setTimeout(function() { if (nb.getNotificationWithValue(box.value) instanceof XULElement){nb.removeNotification(box);} }, 10000);
	} 
	
	
	
	//main() like section
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
		                                 .getService(Components.interfaces.nsIPrefBranch);
    var stringsBundle = document.getElementById("highlightedtexttofile-overlay-string-bundle");
    var cancelSave = stringsBundle.getString('cancelSave');
    var nb = gBrowser.getNotificationBox();
    var save = true;
		                             
	var showPref = prefManager.getBoolPref("extensions.highlightedtexttofile.showPreferences");
	if (showPref)
	  var save = showPreferences();
	
	if (save){
      var saveDirectory = FileManager.getPathToFile();
	  var fileName = FileManager.createFileName();
	  var selectedText = getSelText();
	  
	  var saveComplete = stringsBundle.getFormattedString('saveComplete', 
                                                         [saveDirectory, fileName]);
      var saveError = stringsBundle.getFormattedString('saveError', 
                                                       [saveDirectory, fileName]);
	
   	  if (FileManager.writeFileToOS(saveDirectory, fileName, selectedText))
   	    informUser(saveComplete, nb.PRIORITY_INFO_HIGH);
   	  else
   	    informUser(saveError, nb.PRIORITY_WARNING_HIGH);
      
    }else{
      informUser(cancelSave, nb.PRIORITY_INFO_HIGH);
    }
  },
};
