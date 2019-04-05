'use strict';
/*******************************************************************************
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
const DDMMYYYY = '1';
const MMDDYYYY = '2';
const YYYYMMDD = '3';
const YYYYDDMM = '4';
const NONE = '5';
const DATE_CUSTOM_TITLE = '0';
const DATE_TITLE_CUSTOM = '1';
const CUSTOM_DATE_TITLE = '2';
const CUSTOM_TITLE_DATE = '3';
const TITLE_CUSTOM_DATE = '4';
const TITLE_DATE_CUSTOM = '5';
var fileNamePrefix;
var dateFormat;
var fileNameComponentOrder;
var prefixPageTitleInFileName;
var urlInFile;
var directorySelectionDialog;
var notifications;
var conflictAction;

function saveTextToFile(info) {
  chrome.tabs.executeScript({
    code: '(' + getSelectionText.toString() + ')()',
    allFrames: true,
    matchAboutBlank: true
  }, function (results) {
    if (results[0]) {
      createFileContents(results[0], function(fileContents) {
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
  });
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[\/\\|":*?<>]/g, '_');
}

function createFileContents(selectionText, callback) {
  if (urlInFile) {
    browser.tabs.query({
      active: true,
      lastFocusedWindow: true
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
  var pageTitle = '';
  var date = _getDate();
  var extension = _getExtension();
  var customText = fileNamePrefix;
  _getPageTitleToFileName(function() {
    if (fileNameComponentOrder === DATE_CUSTOM_TITLE) {
      fileName = date + (date === '' ? '' : '-') + customText + (pageTitle === '' ? '' : '-') + pageTitle;
    } else if (fileNameComponentOrder === DATE_TITLE_CUSTOM) {
      fileName = date + (date === '' ? '' : '-') + pageTitle + (pageTitle === '' ? '' : '-') + customText;
    } else if (fileNameComponentOrder === CUSTOM_DATE_TITLE) {
      fileName = customText + (date === '' ? '' : '-') + date + (pageTitle === '' ? '' : '-') + pageTitle;
    } else if (fileNameComponentOrder === CUSTOM_TITLE_DATE) {
      fileName = customText + (pageTitle === '' ? '' : '-') + pageTitle + (date === '' ? '' : '-') + date;
    } else if (fileNameComponentOrder === TITLE_CUSTOM_DATE) {
      fileName = pageTitle + (pageTitle === '' ? '' : '-') + customText + (date === '' ? '' : '-') + date;
    } else if (fileNameComponentOrder === TITLE_DATE_CUSTOM) {
      fileName = pageTitle + (pageTitle === '' ? '' : '-') + date + (date === '' ? '' : '-') + customText;
    }
    if (fileName === '') {
      notify('Error: Filename cannot be empty, please review preferences.');
    } else {
      fileName += extension;
      callback(fileName);
    }
  });

  function _getPageTitleToFileName(callback) {
    if (prefixPageTitleInFileName) {
      browser.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, function(tabs) {
        pageTitle = tabs[0].title;
        callback();
      });
    } else {
      callback();
    }
  }

  function _getDate() {
    var currentDate = new Date();
    var day = _determineDay();
    var month = _determineMonth();
    var year = currentDate.getFullYear();
    if (dateFormat === DDMMYYYY) {
      return day + '-' + month + '-' + year;
    } else if (dateFormat === MMDDYYYY) {
      return month + '-' + day + '-' + year;
    } else if (dateFormat === YYYYMMDD) {
      return year + '-' + month + '-' + day;
    } else if (dateFormat === YYYYDDMM) {
      return year + '-' + day + '-' + month;
    } else if (dateFormat === NONE) {
      return '';
    } else {
      return currentDate.getTime();
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

  function _getExtension() {
    return '.txt';
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
      if (notifications) {
        notify('Text saved.');
      }
    } else {
      var error = browser.runtime.lastError.toString();
      if (error.indexOf('Download canceled by the user') >= 0) {
        if (notifications) {
          notify('Save canceled.');
        }
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
  dateFormat: '0',
  fileNameComponentOrder: '0',
  prefixPageTitleInFileName: false,
  urlInFile: false,
  directorySelectionDialog: false,
  notifications: true,
  conflictAction: 'uniquify'
}, function(items) {
  fileNamePrefix = items.fileNamePrefix;
  dateFormat = items.dateFormat;
  fileNameComponentOrder = items.fileNameComponentOrder;
  prefixPageTitleInFileName = items.prefixPageTitleInFileName;
  urlInFile = items.urlInFile;
  directorySelectionDialog = items.directorySelectionDialog;
  notifications = items.notifications;
  conflictAction = items.conflictAction;
});

function getSelectionText() {
  var text = '';
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

browser.commands.onCommand.addListener(function(command) {
  if (command === 'save-text-to-file') {
    chrome.tabs.executeScript({
      code: '(' + getSelectionText.toString() + ')()',
      allFrames: true,
      matchAboutBlank: true
    }, function (results) {
      if (results[0]) {
          saveTextToFile({
            selectionText: results[0]
          });
      }
    });
  }
});

browser.storage.onChanged.addListener(function(changes) {
  _updatePrefixOnChange();
  _updateDateFormatOnChange();
  _updateFileNameComponentOrderOnChange();
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

  function _updateFileNameComponentOrderOnChange() {
    if (changes.fileNameComponentOrder) {
      if (changes.fileNameComponentOrder.newValue !== changes.fileNameComponentOrder.oldValue) {
        fileNameComponentOrder = changes.fileNameComponentOrder.newValue;
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
