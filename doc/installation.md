# Installation

The recommended setup is to install both the:

1. [Browser extension](https://addons.mozilla.org/firefox/addon/save-text-to-file), and
2. Host application.

Installing the browser extension alone can save text files to the `Downloads` folder.

While installing both the browser extension and host application, text files can be saved anywhere on the computer.

[![Video demo of installation](https://img.youtube.com/vi/o0kgMorHmdc/0.jpg)](https://www.youtube.com/watch?v=o0kgMorHmdc)


## Table of Contents

* [Prerequisites](#prerequisites)
* [Step 1 — Download the Host Application](#step-1--download-the-host-application)
* [Step 2 — Register the Host Application](#step-2--register-the-host-application)
  * [Windows](#windows)
  * [Mac](#mac)
  * [Linux](#linux)
* [Step 3 — Verify](#step-3--verify)


## Prerequisites

Ensure Python is installed and available on `PATH`.

* [Python](https://www.python.org/downloads/)

## Step 1 — Download the Host Application

Download this repository as a `.zip` file, from [here](https://github.com/bobbyrne01/save-text-to-file-firefox/archive/master.zip).

Extract and copy the `app/` directory to your computer:

| Platform | Required path |
|---|---|
| Windows | `C:\savetexttofile\` (hardcoded — must be this exact location) |
| Mac | Any path, e.g. `/Users/yourusername/savetexttofile/` |
| Linux | Any path, e.g. `/home/yourusername/savetexttofile/` |

Then rename the folder to `savetexttofile` at that location.

## Step 2 — Register the Host Application

Follow the platform-specific steps below.

### Windows

The Windows batch scripts hardcode `C:\savetexttofile\`, so the folder must be placed at exactly that path.

1. Navigate to `C:\savetexttofile\`
2. Right-click `install_host.bat`
3. Select **Run as administrator** and confirm any prompt.

The host application is now registered.


### Mac

1. Open `savetexttofile.json` and update the `path` value to point to your installation:
```
"path": "/path/to/savetexttofile.py"
```
→
```
"path": "/Users/yourusername/savetexttofile/savetexttofile.py"
```

2. Copy the manifest to the native messaging hosts directory:
```
cp savetexttofile.json ~/Library/Application\ Support/Mozilla/NativeMessagingHosts/savetexttofile.json
```

3. Make the Python script executable:
```
chmod +x /Users/yourusername/savetexttofile/savetexttofile.py
```

4. Restart Firefox.


### Linux

1. Open `savetexttofile.json` and update the `path` value to point to your installation:
```
"path": "/path/to/savetexttofile.py"
```
→
```
"path": "/home/yourusername/savetexttofile/savetexttofile.py"
```

2. Copy the manifest to the native messaging hosts directory (create it if needed):
```
mkdir -p ~/.mozilla/native-messaging-hosts
cp savetexttofile.json ~/.mozilla/native-messaging-hosts/savetexttofile.json
```

3. Make the Python script executable:
```
chmod +x /home/yourusername/savetexttofile/savetexttofile.py
```

4. Restart Firefox.


## Step 3 — Verify

1. Open the extension options page: Firefox menu → Add-ons and themes → Save Text to File → Preferences.
2. Click **Test application connection**.
3. The options page should show **Application found** and display the app version and path.

If the connection test fails, double-check that:
- The `path` in `savetexttofile.json` matches the actual location of `savetexttofile.py`.
- The manifest was copied to the correct directory for your platform.
- Python is on your `PATH` (`python --version` should work in a terminal).
