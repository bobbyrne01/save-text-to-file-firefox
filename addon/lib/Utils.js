exports.sanitizeFilename = function(filename) {
	return filename.replace(/[\/\\|":*?<>]/g,'_');
}


exports.createDateString = function(preferedFormat, currentDate) {
	
	var dateString;
	
	//create date string in format of user's preference
    if (preferedFormat == 0){
    	
    	dateString = 
    		(currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate() + "-" + 
    		((currentDate.getMonth() + 1) < 10 ? "0" : "") + (currentDate.getMonth() + 1) + "-" + 
    		currentDate.getFullYear();
    	
    }else if (preferedFormat == 1){
    	
    	dateString = 
    		((currentDate.getMonth() + 1) < 10 ? "0" : "") + (currentDate.getMonth() + 1) + "-" + 
    		(currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate() + "-" + 
    		currentDate.getFullYear();
    	
    }else if (preferedFormat == 2){
    	
    	dateString = 
    		currentDate.getFullYear() + "-" + 
    		((currentDate.getMonth() + 1) < 10 ? "0" : "") + (currentDate.getMonth() + 1) + "-" + 
    		(currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate();
    	
    }else if (preferedFormat == 3){
    	
    	dateString = 
    		currentDate.getFullYear() + "-" + 
    		(currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate() + "-" + 
    		((currentDate.getMonth() + 1) < 10 ? "0" : "") + (currentDate.getMonth() + 1);
    }
    
    return dateString;
}


exports.createTimeString = function(currentDate) {
	
	timeString = 
			((currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours()) + "-" +	
			((currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()) + "-" + 
			((currentDate.getSeconds() < 10 ? "0" : "") + currentDate.getSeconds());
	
	return timeString;
}