// Author: Robert Byrne
// Copyright 2012

var SaveTextToFile_Options = {

  selectDir: function() {
  
    var stringsBundle = document.getElementById("savetexttofile-options-string-bundle");
    var directorySelectionString = stringsBundle.getString('directorySelectionString');
   
    const nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"]
                                .createInstance(Components.interfaces.nsIFilePicker);
    fp.init(window, directorySelectionString, nsIFilePicker.modeGetFolder);
    	
    var ret = fp.show();
    if (ret == nsIFilePicker.returnOK || ret == nsIFilePicker.returnReplace) {
      var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                           .getService(Components.interfaces.nsIPrefBranch);
    		
      var str = Components.classes["@mozilla.org/supports-string;1"]
                                   .createInstance(Components.interfaces.nsISupportsString);
      str.data = fp.file.path;
      prefManager.setComplexValue("extensions.savetexttofile.pathToFile", 
    	                           Components.interfaces.nsISupportsString, str);
    		
      document.getElementById('pathToFile').value = fp.file.path;
    }
  },
  
  setButtons: function() {
    var stringsBundle = document.getElementById("savetexttofile-options-string-bundle");
    var saveString = stringsBundle.getString('saveString');
    var cancelString = stringsBundle.getString('cancelString');
  
    var buttonAccept = document.documentElement.getButton('accept');
    buttonAccept.hidden = false;
    buttonAccept.disabled = false;
    buttonAccept.label = saveString;
      
    var buttonCancel = document.documentElement.getButton('cancel');
    buttonCancel.hidden = false;
    buttonCancel.disabled = false;
    buttonCancel.label = cancelString;
  },
   
  updatePreferences: function(update) {
   
    window.arguments[0].save = update;  
    return true;
  },
};
