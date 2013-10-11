function save(){
	addon.port.emit("dialogClosed", 'save');
}

function cancel(){
	addon.port.emit("dialogClosed", 'cancel');
}