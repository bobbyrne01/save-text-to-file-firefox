var prefs = require("simple-prefs");


exports.loadPathToFileOption = function() {
	
    return prefs.prefs['pathToFile'];
}

exports.loadFileNameOption = function() {

    return prefs.prefs['fileName'];
}

exports.loadDatestampOption = function() {

    return prefs.prefs['datestamp'];
}

exports.loadTimestampOption = function() {

    return prefs.prefs['timestamp'];
}

exports.loadCurrentURLOption = function() {

    return prefs.prefs['currentURL'];
}

exports.loadDatestampInLineOption = function() {

    return prefs.prefs['datestampInLine'];
}

exports.loadTimestampInLineOption = function() {

    return prefs.prefs['timestampInLine'];
}

exports.loadSaveModeOption = function() {

    return prefs.prefs['saveMode'];
}

exports.loadLineSeparatorOption = function() {

    return prefs.prefs['lineSeparator'];
}