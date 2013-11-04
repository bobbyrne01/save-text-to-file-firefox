self.on("click", function () {
	
	var text = window.getSelection().toString();
	self.postMessage(text);
});