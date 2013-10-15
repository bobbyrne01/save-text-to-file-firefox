var SaveTextToFile_Panel = {
		
		selectDir: function() {
			addon.port.emit("selectDir", '');
		},
    
		save: function() {
			addon.port.emit("dialogClosed", 'save');
		},
		
		cancel: function() {
			addon.port.emit("dialogClosed", 'cancel');
		}
};