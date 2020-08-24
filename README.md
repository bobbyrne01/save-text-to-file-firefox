# Save Text to File :memo:

> Save snippets of text from a web page to a file anywhere on the computer.

![Video demo of extension](demo.gif)


## Installation

The recommended setup is to install both:
1. [Browser extension](https://addons.mozilla.org/firefox/addon/save-text-to-file), and
2. Host application

2a. If installing the host application, ensure the latest version of [Python](https://www.python.org/downloads/) is installed beforehand.

2b. Download this repo as a `.zip` file, from [here](https://github.com/bobbyrne01/save-text-to-file-firefox/archive/master.zip).

2c. Copy `app/` directory, paste to your computer and rename it to `savetexttofile`, example: `C:\savetexttofile\` or `/Users/Robert/savetexttofile/`.

2d. Follow platform specific steps below.


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
