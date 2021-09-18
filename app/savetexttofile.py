#!/usr/bin/env python
#/*******************************************************************************
# * Licensed under the Apache License, Version 2.0 (the "License");
# * you may not use this file except in compliance with the License.
# * You may obtain a copy of the License at
# *
# * http://www.apache.org/licenses/LICENSE-2.0
# *
# * Unless required by applicable law or agreed to in writing, software
# * distributed under the License is distributed on an "AS IS" BASIS,
# * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# * See the License for the specific language governing permissions and
# * limitations under the License.
# *******************************************************************************/
import sys
import json
import struct
import os
import platform
from tkinter import *
from tkinter import ttk
from tkinter import filedialog

version = "0.3.0"


gui = Tk()
gui.geometry("600x100")
gui.title("Save Text to File")
latestPath = ''

# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

# User selection of directory
def getFolderPath():
    global latestPath
    folder_selected = filedialog.askdirectory()
    if folder_selected != '':
        folderPath.set(folder_selected)
        configuration['directory'] = folder_selected

        if folder_selected.endswith('/'):
            latestPath = folder_selected + configuration['filename']
        else:
            latestPath = folder_selected + os.sep + configuration['filename']

# Dialog canceled
def cancel():
    gui.destroy()
    result['status'] = 'Cancel'
    sendMessage(encodeMessage(json.dumps(result)))


try:
    # Python 3.x version
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.buffer.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.buffer.read(messageLength).decode('utf-8')
        return json.loads(message)

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()

    def save():
        global latestPath
        try:
            with open(latestPath, saveMode) as file:
                file.write('%s' % configuration['fileContent'])
                file.close()
                result['status'] = 'Success'
                sendMessage(encodeMessage(json.dumps(result)))
        except IOError as e:
            print('Could not open or write to file (%s).' % e)
            sendMessage(encodeMessage(json.dumps(result)))
        gui.destroy()

    # Wait for innput
    while True:

        configuration = getMessage()
        saveMode = ''
        result = {
            'status': 'Failure'
        }

        if configuration['action'] == 'TEST_CONNECTIVITY':
            result['status'] = 'Success'
            result['version'] = version
            scriptPath = os.path.dirname(os.path.abspath(__file__))
            result['scriptpath'] = scriptPath + os.sep
            sendMessage(encodeMessage(json.dumps(result)))
        else:
            if configuration['directory'].endswith('/'):
                latestPath = configuration['directory'] + configuration['filename']
            else:
                latestPath = configuration['directory'] + '/' + configuration['filename']

            if configuration['conflictAction'] == 'append':
                saveMode = 'a'
                configuration['fileContent'] = '\n\n' + configuration['fileContent']
            else:
                saveMode = 'w+'

            directorySelectionDialog = configuration['directorySelectionDialog']

            if directorySelectionDialog:

                folderPath = StringVar()
                folderPath.set(configuration['directory'])
                a = Label(gui, text="Path:")
                a.grid(row=0, column = 0)

                E = Entry(gui, textvariable = folderPath, width=40)
                E.grid(row=0, column=1)
                E.config(state='disabled')
                btnFind = ttk.Button(gui, text="Change Folder", command=getFolderPath)
                btnFind.grid(row=0, column=2)

                a = Label(gui, text="")
                a.grid(row=1, column = 0)

                btnSave = ttk.Button(gui, text="Save", command=save)
                btnSave.grid(row=2, column=0)

                btnCancel = ttk.Button(gui, text="Cancel", command=cancel)
                btnCancel.grid(row=2, column=1)

                gui.grid_columnconfigure(2, minsize=100)
                gui.grid_rowconfigure(4, minsize=100)

                gui.lift()
                gui.attributes('-topmost', True)
                gui.after_idle(gui.attributes, '-topmost', False)
                gui.mainloop()

            else:
                try:
                    with open(latestPath, saveMode) as file:
                        file.write('%s' % configuration['fileContent'])
                        file.close()
                        result['status'] = 'Success'
                        sendMessage(encodeMessage(json.dumps(result)))
                except IOError as e:
                    print('Could not open or write to file (%s).' % e)
                    sendMessage(encodeMessage(json.dumps(result)))


except AttributeError:
    # Python 2.x version (if sys.stdin.buffer is not defined)
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.read(messageLength)
        return json.loads(message)

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.write(encodedMessage['length'])
        sys.stdout.write(encodedMessage['content'])
        sys.stdout.flush()

    def save():
        global latestPath
        try:
            with open(latestPath, saveMode) as file:
                file.write('%s' % configuration['fileContent'])
                file.close()
                result['status'] = 'Success'
                sendMessage(encodeMessage(json.dumps(result)))
        except IOError as e:
            print('Could not open or write to file (%s).' % e)
            sendMessage(encodeMessage(json.dumps(result)))
        gui.destroy()

    while True:

        configuration = getMessage()
        saveMode = ''
        result = {
            'status': 'Failure',
            'pythonversion': platform.python_version()
        }

        if configuration['action'] == 'TEST_CONNECTIVITY':
            result['status'] = 'Success'
            result['version'] = version
            scriptPath = os.path.dirname(os.path.abspath(__file__))
            result['scriptpath'] = scriptPath + os.sep
            sendMessage(encodeMessage(json.dumps(result)))

        else:

            if configuration['directory'].endswith('/'):
                latestPath = configuration['directory'] + configuration['filename']
            else:
                latestPath = configuration['directory'] + '/' + configuration['filename']

            if configuration['conflictAction'] == 'append':
                saveMode = 'a'
                configuration['fileContent'] = '\n\n' + configuration['fileContent']
            else:
                saveMode = 'w+'

            directorySelectionDialog = configuration['directorySelectionDialog']

            if directorySelectionDialog:

                folderPath = StringVar()
                folderPath.set(configuration['directory'])
                a = Label(gui, text="Path:")
                a.grid(row=0, column = 0)

                E = Entry(gui, textvariable = folderPath, width=40)
                E.grid(row=0, column=1)
                E.config(state='disabled')
                btnFind = ttk.Button(gui, text="Change Folder", command=getFolderPath)
                btnFind.grid(row=0, column=2)

                a = Label(gui, text="")
                a.grid(row=1, column = 0)

                btnSave = ttk.Button(gui, text="Save", command=save)
                btnSave.grid(row=2, column=0)

                btnCancel = ttk.Button(gui, text="Cancel", command=cancel)
                btnCancel.grid(row=2, column=1)

                gui.grid_columnconfigure(2, minsize=100)
                gui.grid_rowconfigure(4, minsize=100)

                gui.lift()
                gui.attributes('-topmost', True)
                gui.after_idle(gui.attributes, '-topmost', False)
                gui.mainloop()
            else:
                try:
                    with open(latestPath, saveMode) as file:
                        file.write('%s' % configuration['fileContent'])
                        file.close()
                        result['status'] = 'Success'
                        sendMessage(encodeMessage(json.dumps(result)))
                except IOError as e:
                    print('Could not open or write to file (%s).' % e)
                    sendMessage(encodeMessage(json.dumps(result)))
