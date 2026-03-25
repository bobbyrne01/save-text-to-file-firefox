# Save Text to File

> Save snippets of text from a web page to a file anywhere on the computer.

![Demo of extension](demo.gif)

## Installation

Instructions and video of installation are available [here](doc/installation.md).

The extension works in two modes:

- **Browser-only mode** — No extra software needed. Text is saved via the Firefox download API. Limited to overwrite or uniquify conflict actions; no custom save directory.
- **Native app mode** — Requires the Python host app to be installed ([instructions](doc/installation.md)). Unlocks append mode, custom save directory, and directory selection dialog.

---

## Options

Open the options page via the Firefox Extensions menu → Save Text to File → Preferences.

### Is host application installed?

- **Application found** — Read-only checkbox indicating whether the native host app is detected.
- **Test application connection** — Click to probe the native app. If found, unlocks append mode, directory settings, and shows the app version and path.

### File name

| Option | Description |
|---|---|
| **Filename component order** | Order of the three filename parts: date, custom text, and page title. |
| **Filename custom text** | Static text included in every filename (default: `save-text-to-file--`). |
| **Add date or epoch to filename** | Date format to include: Epoch (Unix timestamp), DD-MM-YYYY, MM-DD-YYYY, YYYY-MM-DD, YYYY-DD-MM, or None. |
| **Prefix filename with page title** | When checked, the current page's title is included in the filename. |
| **Filename component separator** | Character(s) placed between filename parts (default: `-`). |
| **File type** | Extension for the saved file: `.txt`, `.csv`, `.md`, or `.data`. |

### File contents

| Option | Description |
|---|---|
| **Include URL in file** | When checked, the URL of the current tab is prepended to the saved text. |
| **Template text** | Static text added to every save alongside the selected text. |
| **Position of template text** | Whether the template appears before or after the selected text. |

### Directory

| Option | Description |
|---|---|
| **Default directory** | Absolute path where files are saved (requires native app). Example: `/home/user/notes` or `C:\Users\User\notes`. |

### Save behaviour

| Option | Description |
|---|---|
| **Show directory selection dialog** | When checked, a folder picker dialog appears before each save (requires native app). |
| **Show notifications** | When checked, a desktop notification is shown after each save. |
| **If file exists** | What to do when the target filename already exists: **Overwrite** (replace), **Uniquify** (add a unique suffix — browser-only mode), or **Append** (add to the end of the file — requires native app). |
| **No blank lines between appended entries** | When checked and **If file exists** is set to **Append**, each entry is separated by a single newline with surrounding whitespace stripped. When unchecked, two newlines are added between entries. |

---

## How to use

### Right-click menu

Select text on any web page, right-click, and choose **Save Text to File**.

### Keyboard shortcut

A keyboard shortcut can be configured in Firefox under **Manage Extension Shortcuts** (about:addons → gear icon). The default command is `save-text-to-file`.

---

## Saving a word list to a single file

To build up a list of words or phrases in one persistent file with no blank lines between entries:

1. Open the extension options page.
2. Click **Test application connection** — the native app must be installed and detected.
3. Set **Add date or epoch to filename** to **None**.
4. Uncheck **Prefix filename with page title**.
5. Set **Filename custom text** to your desired filename, e.g. `words-to-learn`.
6. Set **If file exists** to **Append**.
7. Check **No blank lines between appended entries**.
8. Set **Default directory** to the folder where you want the file saved.
9. Click **Save**.

Every selection will now be appended to `words-to-learn.txt`, one entry per line.

---

## License

[Apache License 2.0](COPYING)
