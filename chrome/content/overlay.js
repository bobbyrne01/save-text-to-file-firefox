// Copyright 2012-2013 Robert Byrne

var SaveTextToFile_Main = {
    run: function() {

        var FileManager = {
        		
            // @returns string - Path to saved file
            getPathToFile: function() {

                // check if a path to saved file has been set in preferences
                var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
                	userPrefPathToFile = prefManager.getComplexValue("extensions.savetexttofile.pathToFile", Components.interfaces.nsISupportsString).data,
                	pathToFile;

                if (userPrefPathToFile === "") {

                    // Save file in user's home directory (No preference specified)
                    var dirService = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties),
                    	homeDirFile = dirService.get("Home", Components.interfaces.nsIFile);
                    
                    pathToFile = homeDirFile.path;
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

                // check whether file name should include date and/or timestamp
                var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
                	datestamp = prefManager.getBoolPref("extensions.savetexttofile.datestamp"),
                	timestamp = prefManager.getBoolPref("extensions.savetexttofile.timestamp"),
                	fileName = prefManager.getComplexValue("extensions.savetexttofile.fileName", Components.interfaces.nsISupportsString).data;

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

                var fileSeparator = "/";
                if (navigator.appVersion.indexOf("Win") != -1) {fileSeparator = "\\";}

                var fullPathToFile = saveDirectory + fileSeparator + fileName,
                	file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

                var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
                	currentURL = prefManager.getBoolPref("extensions.savetexttofile.currentURL"),
                	datestampInLinePref = prefManager.getBoolPref("extensions.savetexttofile.datestampInLine"),
                	timestampInLinePref = prefManager.getBoolPref("extensions.savetexttofile.timestampInLine"),
                	currentTime = new Date(),
                	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
                	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds(),
                	stringsBundle = document.getElementById("savetexttofile-overlay-string-bundle"),
                	datestampInLineString = stringsBundle.getString('datestampInLine'),
                	timestampInLineString = stringsBundle.getString('timestampInLine');

                // Check file is being stored with a valid directory and name
                try {
                    file.initWithPath(fullPathToFile);
                    if (file.exists() === false) {file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);}

                    var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream),
                    	converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].createInstance(Components.interfaces.nsIConverterOutputStream);

                    if (saveMode == 1) {
                        outputStream.init(file, 0x02 | 0x08 | 0x20, 420, 0);
                    } else if (saveMode == 2) {
                        outputStream.init(file, 0x02 | 0x10, 420, 0);
                    }

                    converter.init(outputStream, "UTF-8", 0, 0);

                    if (lineSeparator) {
                        converter.writeString('\n --------------------------------------------------- \n');
                    } else {
                        converter.writeString('\n');
                    }

                    if (datestampInLinePref) {
                        converter.writeString(datestampInLineString + date + '\n');
                    } else {
                        converter.writeString('\n');
                    }

                    if (timestampInLinePref) {
                        converter.writeString(timestampInLineString + time + '\n');
                    } else {
                        converter.writeString('\n');
                    }

                    if (currentURL) {
                        converter.writeString(window.content.location.href + '\n');
                    } else {
                        converter.writeString('\n');
                    }

                    converter.writeString('\n' + selectedText);
                    converter.close();

                    return true;
                } catch (e) {
                    return false;
                }
            }
        };

        // @return bool - Whether to 'Save' or 'Cancel' preference updates
        function showPreferences() {
            var returnValue = {
                save: null
            };
            window.openDialog("chrome://savetexttofile/content/showPreferences.xul", "", "centerscreen,modal", returnValue);

            return returnValue.save;
        }

        // @return string - Currently highlighted text in web browser
        function getSelText() {
            var focusedWindow = document.commandDispatcher.focusedWindow;

            return focusedWindow.getSelection().toString();
        }

        // @param string - Notification for users' attention (status of file/text save)
        function informUser(msg, msgPriority) {
            var nb = gBrowser.getNotificationBox(),
            	box = nb.appendNotification(msg, null, null, msgPriority, null);

            // Check if notification exists after 10 seconds, if so, remove it
            setTimeout(function() {
                if (nb.getNotificationWithValue(box.value) instanceof XULElement) {
                    nb.removeNotification(box);
                }
            }, 10000);
        }


        var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
        	stringsBundle = document.getElementById("savetexttofile-overlay-string-bundle"),
        	cancelSave = stringsBundle.getString('cancelSave'),
        	datestampInLine = stringsBundle.getString('datestampInLine'),
        	timetampInLine = stringsBundle.getString('timestampInLine'),
        	nb = gBrowser.getNotificationBox(),
        	save = true,
        	showPref = prefManager.getBoolPref("extensions.savetexttofile.showPreferences");

        if (showPref) {save = showPreferences();}

        if (save) {
            var saveDirectory = FileManager.getPathToFile(),
            	fileName = FileManager.createFileName(),
            	selectedText = getSelText(),
            	saveComplete = stringsBundle.getFormattedString('saveComplete', [saveDirectory, fileName]),
            	saveError = stringsBundle.getFormattedString('saveError', [saveDirectory, fileName]),
            	lineSeparator = prefManager.getBoolPref("extensions.savetexttofile.lineSeparator"),
            	saveMode = prefManager.getIntPref("extensions.savetexttofile.saveMode");
            
            if (FileManager.writeFileToOS(saveDirectory, fileName, selectedText, saveMode, lineSeparator)) {
            	informUser(saveComplete, nb.PRIORITY_INFO_HIGH);
            }else{
            	informUser(saveError, nb.PRIORITY_WARNING_HIGH);
            }

        } else {
            informUser(cancelSave, nb.PRIORITY_INFO_HIGH);
        }
    },

    overlaySetup: function() {

        function addListenerOnContextClick() {
            var menu = document.getElementById("contentAreaContextMenu");
            menu.addEventListener("popupshowing", contextClicked, false);
        }

        function contextClicked() {
            var menuitem = document.getElementById("save-text-to-file-saveTextToFile");

            if (menuitem) {
            	menuitem.hidden = !(gContextMenu.isTextSelected || gContextMenu.onTextInput);
            }
        }
        
        window.addEventListener("load", addListenerOnContextClick, false);
    }
};
