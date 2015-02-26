#Save Text to File

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bobbyrne01/save-text-to-file-firefox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/bobbyrne01/save-text-to-file-firefox.svg?branch=master)](https://travis-ci.org/bobbyrne01/save-text-to-file-firefox)
[![devDependency Status](https://david-dm.org/bobbyrne01/save-text-to-file-firefox/dev-status.svg)](https://david-dm.org/bobbyrne01/save-text-to-file-firefox#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/bobbyrne01/save-text-to-file-firefox/badge.svg)](https://coveralls.io/r/bobbyrne01/save-text-to-file-firefox)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Usage

Firefox addon which saves selected text to a file in a directory (defaulting to the user's home directory).<br/>
Goal is to simplify note taking on web pages so users can refer to data at a later stage offline, without the need to remember URL's etc.<br/>
After highlighting some text, right-click and select `Save Text to File`<br/>
File names can have the following pre-defined formats:
- `userPreference.txt`
- `userPreference--<todaysdate>.txt`
- `userPreference--<timestamp>.txt`
- `userPreference--<todaysdate>-<timestamp>.txt`

## Features

- Add date to saved file name
- Add time to saved file name (disabled if 'saveMode' is 'Append')
- Add date to the beginning of saved text
- Add time to the beginning of saved text
- Various date formats to choose from (.txt, .csv)
- Add a line separator to the file before saved text
- Save current URL in file
- Text encoded using UTF-8 (Unicode) so all international characters can be stored correctly
- Ability to either append text to existing file or create a new file
- Set filename same as pagename
- Show/hide widget icon
- Optional preference confirmation panel triggered when `Save Text to File` is clicked
- Option to save selected html text
- Can edit text before saving
- User can style preferences panel using a color-picker

## Localization

- Czech (cs-CZ)
- German (de-DE)
- Chinese (zh-CN)
- English (en-US) (en-GB)
- Spanish (es-ES)
- French (fr-FR)
- Italian (it-IT)
- Japanese (ja-JP)
- Korean (ko-KR)
- Polish (pl-PL)
- Russian (ru-RU)
- Ukrainian (uk-UA)

## Demo

http://www.youtube.com/watch?v=w4zQGVLfm7o
