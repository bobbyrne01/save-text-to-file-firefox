require("./Hotkey").init();
var panel = require("./Panel").init();
require("./Widget").init(panel);
require("./ContextMenu").init();