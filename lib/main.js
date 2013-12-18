require("./Preference").registerListener();
require("./Hotkey").init();
require("./Panel").init();

if (!require("./Preference").get("hideWidget")){
	require("./Widget").init();
}

require("./ContextMenu").init();