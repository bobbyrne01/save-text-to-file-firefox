exports.sanitizeFilename = function(filename) {
	return filename.replace(/[\/\\|":*?<>]/g,'_');
}