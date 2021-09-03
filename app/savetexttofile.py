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

version = "0.2.0"

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

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()

    while True:
        configuration = getMessage()
        absoluteFilePath = ''
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
                absoluteFilePath = configuration['directory'] + configuration['filename']
            else:
                absoluteFilePath = configuration['directory'] + '/' + configuration['filename']

            if configuration['conflictAction'] == 'append':
                saveMode = 'a'
                configuration['fileContent'] = '\n\n' + configuration['fileContent']
            else:
                saveMode = 'w+'

            try:
                with open(absoluteFilePath, saveMode) as file:
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

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent)
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.write(encodedMessage['length'])
        sys.stdout.write(encodedMessage['content'])
        sys.stdout.flush()

    while True:
        configuration = getMessage()
        absoluteFilePath = ''
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
                absoluteFilePath = configuration['directory'] + configuration['filename']
            else:
                absoluteFilePath = configuration['directory'] + '/' + configuration['filename']

            if configuration['conflictAction'] == 'append':
                saveMode = 'a'
                configuration['fileContent'] = '\n\n' + configuration['fileContent']
            else:
                saveMode = 'w+'

            try:
                with open(absoluteFilePath, saveMode) as file:
                    file.write('%s' % configuration['fileContent'])
                    file.close()
                    result['status'] = 'Success'
                    sendMessage(encodeMessage(json.dumps(result)))
            except IOError as e:
                print('Could not open or write to file (%s).' % e)
                sendMessage(encodeMessage(json.dumps(result)))
