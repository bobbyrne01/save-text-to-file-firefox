// Author: Robert Byrne
// Copyright 2012

var HighlightedTextToFile_ShowPreferences = {

  updateSaveMode: function(mode) {
  
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                         .getService(Components.interfaces.nsIPrefBranch);
    prefManager.setIntPref("extensions.highlightedtexttofile.saveMode", mode);
  },
};
