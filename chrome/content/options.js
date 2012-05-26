// Author: Robert Byrne
// Copyright 2012

var HighlightedTextToFile = {
  selectDir: function() {
    
    const nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"]
                             .createInstance(Components.interfaces.nsIFilePicker);
    fp.init(window, "Select directory to store text files", nsIFilePicker.modeGetFolder);
    	
    var ret = fp.show();
    if (ret == nsIFilePicker.returnOK || ret == nsIFilePicker.returnReplace) {
      var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                        .getService(Components.interfaces.nsIPrefBranch);
    		
      var str = Components.classes["@mozilla.org/supports-string;1"]
                                .createInstance(Components.interfaces.nsISupportsString);
      str.data = fp.file.path;
      prefManager.setComplexValue("extensions.highlightedtexttofile.pathToFile", 
    	               Components.interfaces.nsISupportsString, str);
    		
      document.getElementById('pathToFile').value = fp.file.path;
    }
  },
};
