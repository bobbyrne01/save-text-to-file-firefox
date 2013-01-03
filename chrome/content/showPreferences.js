// Author: Robert Byrne
// Copyright 2012

var SaveTextToFile_ShowPreferences = {

    updateSaveMode: function(mode) {

        var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        prefManager.setIntPref("extensions.savetexttofile.saveMode", mode);
    }
};