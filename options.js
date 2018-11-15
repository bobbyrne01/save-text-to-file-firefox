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

const DEFAULT_FILE_NAME_PREFIX = 'save-text-to-file--';

function saveOptions() {
  browser.storage.sync.set({
    fileNamePrefix: document.getElementById('fileNamePrefix').value,
    dateFormat: document.getElementById('dateFormat').value,
    prefixPageTitleInFileName: document.getElementById('prefixPageTitleInFileName').checked,
    urlInFile: document.getElementById('urlInFile').checked,
    directorySelectionDialog: document.getElementById('directorySelectionDialog').checked,
    notifications: document.getElementById('notifications').checked,
    conflictAction: document.getElementById('conflictAction').value
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 5000);
  });
}

// Restores state using the preferences stored in chrome.storage.
function restoreOptions() {
  // default values
  browser.storage.sync.get({
    fileNamePrefix: DEFAULT_FILE_NAME_PREFIX,
    dateFormat: 0,
    prefixPageTitleInFileName: false,
    urlInFile: false,
    directorySelectionDialog: false,
    notifications: true,
    conflictAction: 'uniquify'
  }, function(items) {
    document.getElementById('fileNamePrefix').value = items.fileNamePrefix;
    document.getElementById('dateFormat').value = items.dateFormat;
    document.getElementById('prefixPageTitleInFileName').checked = items.prefixPageTitleInFileName;
    document.getElementById('urlInFile').checked = items.urlInFile;
    document.getElementById('directorySelectionDialog').checked = items.directorySelectionDialog;
    document.getElementById('notifications').checked = items.notifications;
    document.getElementById('conflictAction').value = items.conflictAction;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
