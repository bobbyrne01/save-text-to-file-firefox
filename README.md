Save Text to File (Firefox)
==

Save Text to File saves snippets of text from a web page to a file on the local computer.

![](demo.gif)

# Installation

The recommended setup is to install both:
* Browser extension, and
* Host application.

## Step 1. Installing the Browser Extension

Download and install from [Mozilla](https://addons.mozilla.org/firefox/addon/save-text-to-file).

## Step 2. Install host application

**Note:** If installing the host application, ensure the latest version of [Python](https://www.python.org/downloads/) is installed beforehand.

Download the `app/` directory, from [Github](https://github.com/bobbyrne01/save-text-to-file-firefox/tree/master/app).

Save `app/` and its contents to a directory on your computer, example: `C:\savetexttofile\` or `/Users/Robert/savetexttofile/`.

Then follow the steps specific to your platform below ..


### Windows

Assuming you saved `app/` to `C:\savetexttofile\` on your computer.

* Navigate to `C:\savetexttofile\`
* Right click on `install_host.bat`
* Select `Run as administrator`, and confirm any prompt.

The host application should now be installed.


### Mac

Modify `savetexttofile.json`, changing the `path` value to the location used previously:
```
"path": "/path/to/savetexttofile.py"
```
->
```
"path": "/Users/Robert/savetexttofile/savetexttofile.py"
```
Then copy the manifest to this location under the user's home directory:
```
~/Library/Application Support/Mozilla/NativeMessagingHosts/savetexttofile.json
```


### Linux

Modify `savetexttofile.json`, changing the `path` value to the location used previously:
```
"path": "/path/to/savetexttofile.py"
```
->
```
"path": "/home/Robert/savetexttofile/savetexttofile.py"
```
Then copy the manifest to these locations under the user's home directory:
```
~/.mozilla/native-messaging-hosts/savetexttofile.json
~/.mozilla/managed-storage/savetexttofile.json
~/.mozilla/pkcs11-modules/savetexttofile.json
```
