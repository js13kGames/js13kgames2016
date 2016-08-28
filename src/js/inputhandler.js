(function handleKeys() {
	document.onkeydown = OnKeyDown;
	document.onkeyup = OnKeyUp;

	function OnKeyDown(e) {
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				GameEvents.emit("arrowKeyDown", e);
			break;
		}
	}
	function OnKeyUp(e) {
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				GameEvents.emit("arrowKeyUp", e);
			break;
		}
	}
})()
