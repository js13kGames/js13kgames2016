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
	var levelIndex = STARTING_LEVEL;
	var levelCollisionController = new LevelCollisionController();
	var levelContainer = new LevelContainerController();
	var player = new PlayerController();

	loadLevel(levelIndex);

	GameEvents.on("exitReached", function() {
		loadLevel(levelIndex = (levelIndex + 1) % LevelData.length);
	});

	GameEvents.on("playerDied", function() {
		loadLevel(levelIndex);
	});

	GameEvents.on("arrowKeyDown", function(e) {
		if (e.keyCode == 37 && !window.glitchMode) {
			window.glitchMode = true;
			GameEvents.emit("glitchModeChanged");
		} else if (e.keyCode == 39 && window.glitchMode) {
			window.glitchMode = false;
			GameEvents.emit("glitchModeChanged");
		}
	})

	function loadLevel(nextIndex) {
		window.glitchMode = false;
		levelContainer.destroyLevelData();
		levelCollisionController.destroyCollisionData();

		var nextLevel = LevelData[nextIndex];
		var maxDimension = getMaxDimension(nextLevel);

		window.gameScale = 12 / maxDimension;

		levelContainer.generateLevelData(nextLevel);
		levelCollisionController.generateCollisionsFromLevelData(nextLevel);
		GameEvents.emit("startLevel", levelContainer);
		
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
		for (var i = 0; i < DRAW_LAYERS.length; i++) {
			GameEvents.emit('draw', DRAW_LAYERS[i]);
		}
	}

	function getMaxDimension(level) {
		return Math.max(level.length, level[0].length);
	}
}
