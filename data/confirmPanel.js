var SaveTextToFile_Panel = {
		
		getPreferences: function() {
			addon.port.emit("getPreferences", '');
		},
		
		selectDir: function() {
			addon.port.emit("selectDir", '');
		},
    
		save: function() {
			addon.port.emit("panelClosed", 'save');
		},
		
		cancel: function() {
			addon.port.emit("panelClosed", 'cancel');
		}
};