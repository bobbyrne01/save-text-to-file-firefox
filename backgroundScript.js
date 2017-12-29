'use strict';
/*******************************************************************************
 * Copyright IBM Corp. 2017

 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/

const MENU_ITEM_ID = 'save-text-to-file-menu-item';
const NOTIFICATION_ID = 'save-text-to-file-notification';
const EXTENSION_TITLE = 'Save text to file';
const DEFAULT_FILE_NAME_PREFIX = 'save-text-to-file--';
const EPOCH = '0';
const DDMMYYYY = '1';
const MMDDYYYY = '2';
const YYYYMMDD = '3';
const YYYYDDMM = '4';
var fileNamePrefix;
var dateFormat;
var urlInFile;
var directorySelectionDialog;
var notifications;
var conflictAction;

function saveTextToFile(info) {
  createFileContents(info.selectionText, function(fileContents) {
    var blob = new Blob([fileContents], {
      type: 'text/plain'
    });
    var url = URL.createObjectURL(blob);
    var fileName = createFileName();
    startDownloadOfTextToFile(url, fileName);
  });
}

function createFileContents(selectionText, callback) {
  if (urlInFile) {
    browser.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, function(tabs) {
      var url = tabs[0].url;
      var text = url + '\n\n' + selectionText;
      callback(text);
    });
  } else {
    callback(selectionText);
  }
}

function createFileName() {
  var fileName = '';
  _addPrefix();
  _addDate();
  _addExtension();
  return fileName;

  function _addPrefix() {
    if (fileNamePrefix !== '') {
      fileName += fileNamePrefix;
    } else {
      fileName += DEFAULT_FILE_NAME_PREFIX;
    }
  }

  function _addDate() {
    var currentDate = new Date();
    var day = _determineDay();
    var month = _determineMonth();
    var year = currentDate.getFullYear();
    if (dateFormat === DDMMYYYY) {
      fileName += day + '-' + month + '-' + year;
    } else if (dateFormat === MMDDYYYY) {
      fileName += month + '-' + day + '-' + year;
    } else if (dateFormat === YYYYMMDD) {
      fileName += year + '-' + month + '-' + day;
    } else if (dateFormat === YYYYDDMM) {
      fileName += year + '-' + day + '-' + month;
    } else if (dateFormat === EPOCH) {
      fileName += currentDate.getTime();
    }

    function _determineDay() {
      var dayPrefix = currentDate.getDate() < 10 ? '0' : '';
      return dayPrefix + currentDate.getDate();
    }

    function _determineMonth() {
      var monthPrefix = (currentDate.getMonth() + 1) < 10 ? '0' : '';
      return monthPrefix + (currentDate.getMonth() + 1);
    }
  }

  function _addExtension() {
    fileName += '.txt';
  }
}

function startDownloadOfTextToFile(url, fileName) {
  var options = {
    filename: fileName,
    url: url,
    conflictAction: conflictAction
  };
  if (!directorySelectionDialog) {
    options.saveAs = false;
  } else {
    options.saveAs = true;
  }
  browser.downloads.download(options, function() {
    notify('Text saved.');
  });
}

browser.contextMenus.create({
  id: MENU_ITEM_ID,
  title: EXTENSION_TITLE,
  contexts: ['selection']
});

browser.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId === MENU_ITEM_ID) {
    saveTextToFile(info);
  }
});

function notify(message) {
  browser.notifications.clear(NOTIFICATION_ID, function() {
    browser.notifications.create(NOTIFICATION_ID, {
      title: EXTENSION_TITLE,
      type: 'basic',
      message: message,
      iconUrl: browser.runtime.getURL('images/ico.png')
    });
  });
}

browser.storage.sync.get({
  fileNamePrefix: DEFAULT_FILE_NAME_PREFIX,
  dateFormat: 0,
  urlInFile: false,
  showDirSelectionDialog: false,
  notifications: true,
  conflictAction: 'uniquify'
}, function(items) {
  fileNamePrefix = items.fileNamePrefix;
  dateFormat = items.dateFormat;
  urlInFile = items.urlInFile;
  directorySelectionDialog = items.directorySelectionDialog;
  notifications = items.notifications;
  conflictAction = items.conflictAction;
});

browser.storage.onChanged.addListener(function(changes) {
  _updatePrefixOnChange();
  _updateDateFormatOnChange();
  _updateUrlInFileOnChange();
  _updateDirectorySelectionOnChange();
  _updateNotificationsOnChange();
  _updateConflictActionOnChange();

  function _updatePrefixOnChange() {
    if (changes.fileNamePrefix) {
      if (changes.fileNamePrefix.newValue !== changes.fileNamePrefix.oldValue) {
        fileNamePrefix = changes.fileNamePrefix.newValue;
      }
    }
  }

  function _updateDateFormatOnChange() {
    if (changes.dateFormat) {
      if (changes.dateFormat.newValue !== changes.dateFormat.oldValue) {
        dateFormat = changes.dateFormat.newValue;
      }
    }
  }

  function _updateUrlInFileOnChange() {
    if (changes.urlInFile) {
      if (changes.urlInFile.newValue !== changes.urlInFile.oldValue) {
        urlInFile = changes.urlInFile.newValue;
      }
    }
  }

  function _updateDirectorySelectionOnChange() {
    if (changes.directorySelectionDialog) {
      if (changes.directorySelectionDialog.newValue !== changes.directorySelectionDialog.oldValue) {
        directorySelectionDialog = changes.directorySelectionDialog.newValue;
      }
    }
  }

  function _updateNotificationsOnChange() {
    if (changes.notifications) {
      if (changes.notifications.newValue !== changes.notifications.oldValue) {
        notifications = changes.notifications.newValue;
      }
    }
  }

  function _updateConflictActionOnChange() {
    if (changes.conflictAction) {
      if (changes.conflictAction.newValue !== changes.conflictAction.oldValue) {
        conflictAction = changes.conflictAction.newValue;
      }
    }
  }
});
