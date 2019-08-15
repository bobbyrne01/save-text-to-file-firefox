save-text-to-file-firefox
==

1. Highlight text on a page
2. Right click
3. Select `Save text to file`
4. Text is saved to a `.txt` file in `~/Downloads/`

## Additional features

1. Keyboard shortcut - `Shift+Ctrl+Y` or `Shift+Cmd+Y` (Mac)

## Options

Extensions -> Save text to file -> Options

1. Filename prefix

        `custom-prefix--`.txt

2. Add date or epoch to filename

Output using each of the different options:

    custom-prefix--`1514072979`.txt
    custom-prefix--`20012017`.txt
    custom-prefix--`01202017`.txt
    custom-prefix--`20170120`.txt
    custom-prefix--`20172001`.txt
    custom-prefix--.txt

3. Save current URL in file

Whether to include the current URL at the top of the saved file.

4. Show directory selection dialog

Whether user can select an alternative directory and/or filename before text is saved.

5. Show notifications

Whether notifications are displayed every-time text is saved.

6. If file exists

    Uniquify

        To avoid duplication, the filename is changed
        to include a counter before the filename extension.

    Overwrite

        The existing file will be overwritten with the new file.

    Prompt

        The user will be prompted with a file chooser dialog.
