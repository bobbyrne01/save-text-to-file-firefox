window.onload = function() {
	var preferencesTabs = new ddtabcontent('preferencesTabs');
	preferencesTabs.init();
	
	//var sections = document.getElementsByTagName('label');
	//var mySection = null;
	//for(var i = 0; i < sections.length; ++i) {
	  // console.log(sections[i].style.color);
	  // console.log(sections[i].style.background);
	//}
};


var text;

window.addEventListener('click', function(event) {
	
	if (event.target.id.indexOf('pathToFile') == 0){
		
		SaveTextToFile_Panel.selectDir();
		
	} else if (event.target.id.indexOf('saveButton') == 0){
		
		SaveTextToFile_Panel.save();
		
	}else if (event.target.id.indexOf('cancelButton') == 0){
		
		SaveTextToFile_Panel.cancel();
	}
	
	document.getElementById("timestamp").disabled = 
		(document.getElementById("saveMode").selectedIndex == 1 ? true : false);
	
	document.getElementById("previewArea").value = 
		(document.getElementById("html").checked ? JSON.parse(text).html : JSON.parse(text).plain);
	
	document.getElementById("previewArea").style.visibility = 
		(document.getElementById("preview").checked ? "visible" : "hidden");
	
}, false);


function updatePanelBackgroundColorPref(){
	
	document.body.style.background = document.getElementById("panelBackgroundColor").value;
	
	var updatedPref = JSON.stringify({
		pref: 'panelBackgroundColor',
	    value: document.getElementById("panelBackgroundColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateTextareaBackgroundColorPref(){
	
	var elements = document.getElementsByTagName('textarea');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.background = document.getElementById("textareaBackgroundColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'textareaBackgroundColor',
	    value: document.getElementById("textareaBackgroundColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateTextareaColorPref(){
	
	var elements = document.getElementsByTagName('textarea');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = document.getElementById("textareaColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'textareaColor',
	    value: document.getElementById("textareaColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateButtonBackgroundColorPref(){
	
	var elements = document.getElementsByTagName('button');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.background = document.getElementById("buttonBackgroundColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'buttonBackgroundColor',
	    value: document.getElementById("buttonBackgroundColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateButtonColorPref(){
	
	var elements = document.getElementsByTagName('button');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = document.getElementById("buttonColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'buttonColor',
	    value: document.getElementById("buttonColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateliBackgroundColorPref(){
	
	var elements = document.getElementsByTagName('a');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.background = document.getElementById("liBackgroundColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'liBackgroundColor',
	    value: document.getElementById("liBackgroundColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateliColorPref(){
	
	var elements = document.getElementsByTagName('a');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = document.getElementById("liColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'liColor',
	    value: document.getElementById("liColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateLabelColorPref(){
	
	var elements = document.getElementsByTagName('label');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = document.getElementById("labelColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'labelColor',
	    value: document.getElementById("labelColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}

function updateSelectColorPref(){
	
	var elements = document.getElementsByTagName('select');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = document.getElementById("selectColor").value;
	}
	
	var updatedPref = JSON.stringify({
		pref: 'selectColor',
	    value: document.getElementById("selectColor").value
    });

	self.port.emit("prefUpdate", updatedPref);
}




/* listeners for style changes */
var panelBackgroundColor = document.getElementById('panelBackgroundColor');
panelBackgroundColor.onchange = updatePanelBackgroundColorPref;
panelBackgroundColor.onkeyup = updatePanelBackgroundColorPref;
var textareaBackgroundColor = document.getElementById('textareaBackgroundColor');
textareaBackgroundColor.onchange = updateTextareaBackgroundColorPref;
textareaBackgroundColor.onkeyup = updateTextareaBackgroundColorPref;
var textareaColor = document.getElementById('textareaColor');
textareaColor.onchange = updateTextareaColorPref;
textareaColor.onkeyup = updateTextareaColorPref;
var labelColor = document.getElementById('labelColor');
labelColor.onchange = updateLabelColorPref;
labelColor.onkeyup = updateLabelColorPref;
var buttonBackgroundColor = document.getElementById('buttonBackgroundColor');
buttonBackgroundColor.onchange = updateButtonBackgroundColorPref;
buttonBackgroundColor.onkeyup = updateButtonBackgroundColorPref;
var buttonColor = document.getElementById('buttonColor');
buttonColor.onchange = updateButtonColorPref;
buttonColor.onkeyup = updateButtonColorPref;
var liBackgroundColor = document.getElementById('liBackgroundColor');
liBackgroundColor.onchange = updateliBackgroundColorPref;
liBackgroundColor.onkeyup = updateliBackgroundColorPref;
var liColor = document.getElementById('liColor');
liColor.onchange = updateliColorPref;
liColor.onkeyup = updateliColorPref;
var selectColor = document.getElementById('selectColor');
selectColor.onchange = updateSelectColorPref;
selectColor.onkeyup = updateSelectColorPref;







/* onload for panel */
function updatePanelBackgroundColor(color){
	
	document.body.style.background = color;
}

function updateTextareaBackgroundColor(color){
	
	var elements = document.getElementsByTagName('textarea');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.background = color;
	}
}

function updateTextareaColor(color){
	
	var elements = document.getElementsByTagName('textarea');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = color;
	}
}

function updateButtonBackgroundColor(color){
	
	var elements = document.getElementsByTagName('button');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.background = color;
	}
}

function updateButtonColor(color){
	
	var elements = document.getElementsByTagName('button');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = color;
	}
}

function updateliBackgroundColor(color){
	
	var elements = document.getElementsByTagName('a');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.background = color;
	}
}

function updateliColor(color){
	
	var elements = document.getElementsByTagName('a');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = color;
	}
}

function updateLabelColor(color){
	
	var elements = document.getElementsByTagName('label');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = color;
	}
}

function updateSelectColor(color){
	
	var elements = document.getElementsByTagName('select');
	for(var i = 0; i < elements.length; ++i) {
		elements[i].style.color = color;
	}
}




// functions available to Panel
var SaveTextToFile_Panel = {
		
		selectDir: function() {
			self.port.emit("selectDir", '');
		},
    
		save: function() {
			
			// send path to file and file name back to addon code
			var selectedPrefs = JSON.stringify({
				fileName: document.getElementById("fileName").value,
				pathToFile: document.getElementById("pathToFile").value,
				format: document.getElementById("format").value,
			    datestamp: document.getElementById("datestamp").checked,
			    timestamp: document.getElementById("timestamp").checked,
			    datestampInLine: document.getElementById("datestampInLine").checked,
			    timestampInLine: document.getElementById("timestampInLine").checked,
			    dateFormat: document.getElementById("dateFormat").value,
			    lineSeparator: document.getElementById("lineSeparator").checked,
			    currentURL: document.getElementById("currentURL").checked,
			    pagenameForFilename: document.getElementById("pagenameForFilename").checked,
			    saveMode: document.getElementById("saveMode").value,
			    confirmPanel: document.getElementById("confirmPanel").checked,
			    html: document.getElementById("html").checked,
			    showWidget: document.getElementById("showWidget").checked,
			    showNotifications: document.getElementById("showNotifications").checked,
			    preview: document.getElementById("preview").checked,
			    text: document.getElementById("previewArea").value
		    });

			self.port.emit("save", selectedPrefs);
		},
		
		cancel: function() {
			self.port.emit("cancel", '');
		}
};

// listen for preferences message from addon code and set values of Panel UI
self.port.on("prefs", function (prefs) {
	var parsedPrefs = JSON.parse(prefs);
	
	document.getElementById("fileName").value = parsedPrefs.fileName;
	document.getElementById("pathToFile").value = parsedPrefs.pathToFile;
	document.getElementById("format").value = parsedPrefs.format;
	document.getElementById("datestamp").checked = parsedPrefs.datestamp;
	document.getElementById("timestamp").checked = parsedPrefs.timestamp;
	document.getElementById("datestampInLine").checked = parsedPrefs.datestampInLine;
	document.getElementById("timestampInLine").checked = parsedPrefs.timestampInLine;
	document.getElementById("dateFormat").value = parsedPrefs.dateFormat;
	document.getElementById("lineSeparator").checked = parsedPrefs.lineSeparator;
	document.getElementById("currentURL").checked = parsedPrefs.currentURL;
	document.getElementById("pagenameForFilename").checked = parsedPrefs.pagenameForFilename;
	document.getElementById("saveMode").value = parsedPrefs.saveMode;
	document.getElementById("confirmPanel").checked = parsedPrefs.confirmPanel;
	document.getElementById("html").checked = parsedPrefs.html;
	document.getElementById("showWidget").checked = parsedPrefs.showWidget;	
	document.getElementById("showNotifications").checked = parsedPrefs.showNotifications;	
	document.getElementById("preview").checked = parsedPrefs.preview;
	text = parsedPrefs.text;
	
	document.getElementById("timestamp").disabled = 
		(parsedPrefs.saveMode == 1 ? true : false);
	
	document.getElementById("previewArea").value = 
		(parsedPrefs.html ? JSON.parse(text).html : JSON.parse(text).plain);
	
	document.getElementById("previewArea").style.visibility = 
		(document.getElementById("preview").checked ? "visible" : "hidden");
	
	updatePanelBackgroundColor(parsedPrefs.panelBackgroundColor);
	document.getElementById('panelBackgroundColor').value = parsedPrefs.panelBackgroundColor;
	updateTextareaBackgroundColor(parsedPrefs.textareaBackgroundColor);
	document.getElementById('textareaBackgroundColor').value = parsedPrefs.textareaBackgroundColor;
	updateTextareaColor(parsedPrefs.textareaColor);
	document.getElementById('textareaColor').value = parsedPrefs.textareaColor;
	updateButtonBackgroundColor(parsedPrefs.buttonBackgroundColor);
	document.getElementById('buttonBackgroundColor').value = parsedPrefs.buttonBackgroundColor;
	updateButtonColor(parsedPrefs.buttonColor);
	document.getElementById('buttonColor').value = parsedPrefs.buttonColor;
	updateliBackgroundColor(parsedPrefs.liBackgroundColor);
	document.getElementById('liBackgroundColor').value = parsedPrefs.liBackgroundColor;
	updateliColor(parsedPrefs.liColor);
	document.getElementById('liColor').value = parsedPrefs.liColor;
	updateLabelColor(parsedPrefs.labelColor);
	document.getElementById('labelColor').value = parsedPrefs.labelColor;
	updateSelectColor(parsedPrefs.selectColor);
	document.getElementById('selectColor').value = parsedPrefs.selectColor;
});

self.port.on("prefUpdate", function(value) {
	
	var parsedUpdatedPrefs = JSON.parse(value);
	document.body.style.background = value;
});