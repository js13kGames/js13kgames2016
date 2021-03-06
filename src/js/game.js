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
		if (levelContainer.model.activeCheckpoint) {
			player.onDeath();
		} else {
			loadLevel(levelIndex);
		}
	});

	GameEvents.on("glitchModeChanged", function(glitchMode) {
		window.glitchMode = glitchMode;
		levelCollisionController.generateCollisionsFromLevelData(LevelData[levelIndex].level);
	});

	function loadLevel(nextIndex) {
		window.glitchMode = "antifloor";
		levelContainer.destroyLevelData();

		var nextLevel = LevelData[nextIndex].level;
		var maxDimension = getMaxDimension(nextLevel);

		window.gameScale = 12 / maxDimension;

		levelContainer.generateLevelData(nextLevel);
		levelCollisionController.generateCollisionsFromLevelData(nextLevel);
		GameEvents.emit("startLevel", levelContainer);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
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
		for (var i = 0; i < DRAW_LAYERS.length; i++) {
			GameEvents.emit('draw', DRAW_LAYERS[i]);
		}

		if (levelIndex < LevelData.length) {
			var titleText = LevelData[levelIndex].title || "";
			ctx.font = (32 * window.gameScale) + "px monospace";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.globalAlpha = 1;
			ctx.fillText(titleText, canvas.width / 2, 60 * window.gameScale);
		}

		if (LevelData[levelIndex].showGameTitle) {
			ctx.globalAlpha = 1;
			ctx.fillStyle = "white";
			ctx.font = (64 * window.gameScale) + "px monospace";
			ctx.textAlign = "center";
			ctx.fillText(GameTitle, canvas.width/2, canvas.height/2 - (TILE_SIZE / 4));
		}

	}

	function getMaxDimension(level) {
		return Math.max(level.length, level[0].length);
	}
}
