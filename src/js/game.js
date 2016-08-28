(function setupRequestAnimFrame() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
})();

window.NewGame = function() {
	var collisionHandler = new CollisionHandler();
	var levelIndex = 0;
	var levelDisplay = new LevelDisplay();
	var player = new PlayerController();

	nextLevel();

	GameEvents.on("exitReached", function() {
		levelDisplay.destroyLevel();
		nextLevel();
	})

	GameEvents.on("arrowKeyDown", function(e) {
		if (e.keyCode == 37) {
			window.glitchMode = true;
		} else if (e.keyCode == 39) {
			window.glitchMode = false;
		}
	})

	function nextLevel() {
		window.glitchMode = false;
		levelDisplay.generateLevel(LevelData[levelIndex]);
		levelIndex = (levelIndex + 1) % LevelData.length;
	}

	var previousFrameTime = new Date();
	window.requestAnimationFrame(update);
	function update(time) {
		GameEvents.emit('update', (new Date() - previousFrameTime) / 1000);
		previousFrameTime = new Date();
		draw();

		window.requestAnimationFrame(update);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = window.glitchMode ? "#f0f0f0" : "#111";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		GameEvents.emit('draw');
	}

}
