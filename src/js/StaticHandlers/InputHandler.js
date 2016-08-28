var InputHandler = {
	init: function() {
		document.onkeydown = this.OnKeyDown;
		document.onkeyup = this.OnKeyUp;
	},
	OnKeyDown: function(e) {
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				GameEvents.emit("arrowKeyDown", e);
			break;
		}
	},
	OnKeyUp: function(e) {
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				GameEvents.emit("arrowKeyUp", e);
			break;
		}
	}
};
