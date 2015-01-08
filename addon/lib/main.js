require("./Preference").registerListener();
require("./Hotkey").init();
require("./Panel").init();

if (require("./Preference").get("showWidget")) {
	require("./ActionButton").init();
}

require("./ContextMenu").init();
