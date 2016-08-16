(function() {
	document.onkeydown = OnKeyDown;
	document.onkeyup = OnKeyUp;

	function OnKeyDown(e) {
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				Events.emit("arrowKeyDown", e);
			break;
			case 13:
				Events.emit('startLevel');
			break;
		}
	}
	function OnKeyUp(e) {
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				Events.emit("arrowKeyUp", e);
			break;
		}
	}
})();