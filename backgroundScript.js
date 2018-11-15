'use strict';
/*******************************************************************************
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
var prefixPageTitleInFileName;
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
    createFileName(function(fileName) {
      var sanitizedFileName = sanitizeFileName(fileName);
      startDownloadOfTextToFile(url, sanitizedFileName);
    });
  });
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[\/\\|":*?<>]/g, '_');
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

function createFileName(callback) {
  var fileName = '';
  _addPageTitleToFileName(function(pageTitle) {
    fileName += pageTitle;
    _addPrefix();
    _addDate();
    _addExtension();
    callback(fileName);
  });

  function _addPrefix() {
    if (fileNamePrefix !== '') {
      fileName += fileNamePrefix;
    } else {
      fileName += DEFAULT_FILE_NAME_PREFIX;
    }
  }

  function _addPageTitleToFileName(callback) {
    if (prefixPageTitleInFileName) {
      browser.tabs.query({
        'active': true,
        'lastFocusedWindow': true
      }, function(tabs) {
        callback(tabs[0].title + '-');
      });
    } else {
      callback('');
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
  browser.downloads.download(options, function(downloadId) {
    if (downloadId) {
      notify('Text saved.');
    } else {
      var error = browser.runtime.lastError.toString();
      if (error.indexOf('Download canceled by the user') >= 0) {
        notify('Save canceled.');
      } else {
        notify('Error occured.');
      }
    }
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
  prefixPageTitleInFileName: false,
  urlInFile: false,
  directorySelectionDialog: false,
  notifications: true,
  conflictAction: 'uniquify'
}, function(items) {
  fileNamePrefix = items.fileNamePrefix;
  dateFormat = items.dateFormat;
  prefixPageTitleInFileName = items.prefixPageTitleInFileName;
  urlInFile = items.urlInFile;
  directorySelectionDialog = items.directorySelectionDialog;
  notifications = items.notifications;
  conflictAction = items.conflictAction;
});

browser.storage.onChanged.addListener(function(changes) {
  _updatePrefixOnChange();
  _updateDateFormatOnChange();
  _updatePageTitleInFileNameOnChange();
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

  function _updatePageTitleInFileNameOnChange() {
    if (changes.prefixPageTitleInFileName) {
      if (changes.prefixPageTitleInFileName.newValue !== changes.prefixPageTitleInFileName.oldValue) {
        prefixPageTitleInFileName = changes.prefixPageTitleInFileName.newValue;
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
