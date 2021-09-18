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

const DEFAULT_FILE_NAME_PREFIX = 'save-text-to-file--';
const HOST_APPLICATION_NAME = 'savetexttofile';
const TEST_CONNECTIVITY_ACTION = 'TEST_CONNECTIVITY';
var conflictActionValue;

function saveOptions() {

  browser.storage.sync.set({
    fileNamePrefix: document.getElementById('fileNamePrefix').value,
    dateFormat: document.getElementById('dateFormat').value,
    fileNameComponentOrder: document.getElementById('fileNameComponentOrder').value,
    prefixPageTitleInFileName: document.getElementById('prefixPageTitleInFileName').checked,
    fileNameComponentSeparator: document.getElementById('fileNameComponentSeparator').value,
    fileType: document.getElementById('fileType').value,
    urlInFile: document.getElementById('urlInFile').checked,
    templateText: document.getElementById('templateText').value,
    positionOfTemplateText: document.getElementById('positionOfTemplateText').value,
    directory: document.getElementById('directory').value,
    directorySelectionDialog: document.getElementById('directorySelectionDialog').checked,
    notifications: document.getElementById('notifications').checked,
    conflictAction: document.getElementById('conflictAction').value
  }, function() {
    var status = document.getElementById('status');
    status.style.visibility = 'visible';
    setTimeout(function() {
      status.style.visibility = 'hidden';
    }, 5000);
  });

  conflictActionValue = document.getElementById('conflictAction').value;
}

function restoreOptions() {
  browser.storage.sync.get({
    fileNamePrefix: DEFAULT_FILE_NAME_PREFIX,
    dateFormat: 0,
    fileNameComponentOrder: 0,
    prefixPageTitleInFileName: false,
    fileNameComponentSeparator: '-',
    fileType: 0,
    urlInFile: false,
    templateText: '',
    positionOfTemplateText: 0,
    directory: '',
    directorySelectionDialog: false,
    notifications: true,
    conflictAction: 'uniquify'
  }, function(items) {
    document.getElementById('fileNamePrefix').value = items.fileNamePrefix;
    document.getElementById('dateFormat').value = items.dateFormat;
    document.getElementById('fileNameComponentOrder').value = items.fileNameComponentOrder;
    document.getElementById('prefixPageTitleInFileName').checked = items.prefixPageTitleInFileName;
    document.getElementById('fileNameComponentSeparator').value = items.fileNameComponentSeparator;
    document.getElementById('fileType').value = items.fileType;
    document.getElementById('urlInFile').checked = items.urlInFile;
    document.getElementById('templateText').value = items.templateText;
    document.getElementById('positionOfTemplateText').value = items.positionOfTemplateText;
    document.getElementById('directory').value = items.directory;
    document.getElementById('directorySelectionDialog').checked = items.directorySelectionDialog;
    document.getElementById('notifications').checked = items.notifications;

    var optionText = items.conflictAction;
    conflictActionValue = optionText;
    var dd = document.getElementById('conflictAction');
    for (var i = 0; i < dd.options.length; i++) {
        if (dd.options[i].value === optionText) {
            dd.selectedIndex = i;
            break;
        }
    }
  });
}

function appConnectionTest() {
  var testConnectivityPayload = {
    action: TEST_CONNECTIVITY_ACTION
  };
  var sending = browser.runtime.sendNativeMessage(HOST_APPLICATION_NAME, testConnectivityPayload);
  sending.then(function(response) {
    var responseObject = JSON.parse(response);
    if (responseObject.status === 'Success') {
      while(document.getElementById('nativeAppMessage').firstChild) {
        document.getElementById('nativeAppMessage').removeChild(document.getElementById('nativeAppMessage').firstChild);
      }

      var para = document.createElement('p');
      para.appendChild(document.createTextNode('All features enabled! Application version: ' + responseObject.version));
      document.getElementById('nativeAppMessage').appendChild(para);

      if (responseObject.scriptpath) {
        para = document.createElement('p');
        para.appendChild(document.createTextNode('Script path: ' + responseObject.scriptpath + 'savetexttofile.py'));
        document.getElementById('nativeAppMessage').appendChild(para);
      }

      para = document.createElement('p');
      para.appendChild(document.createTextNode(''));
      while(document.getElementById('directoryMessage').firstChild) {
        document.getElementById('directoryMessage').removeChild(document.getElementById('directoryMessage').firstChild);
      }
      document.getElementById('directoryMessage').appendChild(para);
      document.getElementById('nativeAppInstalled').checked = true;

      document.getElementById('directory').disabled = false;
      if (document.getElementById('directory').value === '') {
        document.getElementById('directory').classList.add('invalid_field');
        document.getElementById('save').disabled = true;
      } else {
        document.getElementById('directory').classList.remove('invalid_field');
        document.getElementById('save').disabled = false;
      }

      var conflictAction = document.getElementById('conflictAction');
      var appendAlreadyAdded = false;
      for (var i = 0; i < conflictAction.length; i++) {
        if (conflictAction.options[i].value == 'uniquify') {
          conflictAction.remove(i);
        } else if (conflictAction.options[i].value == 'append') {
          appendAlreadyAdded = true;
        }
      }
      if (!appendAlreadyAdded) {
        conflictAction.options[conflictAction.options.length] = new Option('Append', 'append');
      }
      var optionText = conflictActionValue;
      var dd = document.getElementById('conflictAction');
      for (var i = 0; i < dd.options.length; i++) {
          if (dd.options[i].value === optionText) {
              dd.selectedIndex = i;
              break;
          }
      }
      console.log('SaveTextToFile: Successfully tested communication between native application and webextension.');
    }
  }, function(error) {
    document.getElementById('nativeAppMessage').innerHTML =
      '<p id="nativeAppNotInstalledMessage" class="hide">' +
        'The \'Save Text to File\' host application was not found on this device.<br/>' +
        'To enable all extension features, follow setup instructions outlined <a href="https://github.com/bobbyrne01/save-text-to-file-firefox/blob/master/doc/installation.md#installation">here</a>' +
      '</p>';
    document.getElementById('directoryMessage').innerHTML =
      '<div>' +
        'The ability to specify a save directory requires installation of the \'Save Text to File\' host application.<br/>' +
        'The extension can then communicate with the application to perform certain tasks.' +
      '</div>' +
      '<div>' +
        'Follow setup instructions outlined <a href="https://github.com/bobbyrne01/save-text-to-file-firefox/blob/master/doc/installation.md#installation">here</a>.' +
      '</div>';
    document.getElementById('nativeAppInstalled').checked = false;
    document.getElementById('directory').disabled = true;
    document.getElementById('directory').classList.remove('invalid_field');
    var conflictAction = document.getElementById('conflictAction');
    var uniquifyAlreadyAdded = false;
    for (var i = 0; i < conflictAction.length; i++) {
      if (conflictAction.options[i].value == 'append') {
        conflictAction.remove(i);
      } else if (conflictAction.options[i].value == 'uniquify') {
        uniquifyAlreadyAdded = true;
      }
    }
    if (!uniquifyAlreadyAdded) {
      conflictAction.options[conflictAction.options.length] = new Option('Uniquify', 'uniquify');
    }
    var optionText = conflictActionValue;
    var dd = document.getElementById('conflictAction');
    for (var i = 0; i < dd.options.length; i++) {
        if (dd.options[i].value === optionText) {
            dd.selectedIndex = i;
            break;
        }
    }
    console.log('SaveTextToFile: Error communicating between the native application and web extension.');
    console.log(error);
  });
}

function directoryChanged() {
  if (document.getElementById('directory').value === '') {
    document.getElementById('directory').classList.add('invalid_field');
    document.getElementById('save').disabled = true;
  } else {
    document.getElementById('directory').classList.remove('invalid_field');
    document.getElementById('save').disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('appTest').addEventListener('click', appConnectionTest);
document.getElementById('directory').addEventListener('input', directoryChanged);

appConnectionTest();
