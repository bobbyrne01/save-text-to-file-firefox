var contextMenu = require("sdk/context-menu");

var menuItem = contextMenu.Item({
	label: "Save Text to File",
	context: contextMenu.SelectionContext(),
	contentScript: 'self.on("click", function () {' +
       	'  var text = window.getSelection().toString();' +
       	'  self.postMessage(text);' +
       	'});',
    onMessage: function (selectionText) {
    
    	console.log(selectionText);
    	SaveTextToFile_Main.run();
    }
});

var SaveTextToFile_Main = {
    run: function() {

        var FileManager = {
        		
            // @returns string - Path to saved file
            getPathToFile: function() {

                // check if preferred saved path exists
            	//var name = "extensions.checkCompatibility.nightly";
            	//var nightlyCompatChk = require("sdk/preferences/service").get(name);
        
            },

            // @returns string - Name of file which will store the highlighted text
            createFileName: function() {
                var currentTime = new Date(),
                	date = currentTime.getDate() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getFullYear(),
                	time = currentTime.getHours() + "-" + currentTime.getMinutes() + "-" + currentTime.getSeconds();

                // check whether file name should include date and/or timestamp


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

        // @return string - Currently highlighted text in web browser
        function getSelText() {
            var focusedWindow = document.commandDispatcher.focusedWindow;

            return focusedWindow.getSelection().toString();
        }

        // @param string - Notification for users' attention (status of file/text save)
        function informUser(msg, msgPriority) {

        }
    },
};