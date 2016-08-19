(function() {
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
}());

(function Game() {
	window.glitchMode = false;
	var collisionHandler = new CollisionHandler();
	var level = new Level(LevelData["1"]);
	var player = new Player();

	var previousFrameTime = new Date();

	window.requestAnimationFrame(update);

	Events.on("startLevel", function() {
		Events.emit("levelStarted", level);
	});

	Events.on("exitReached", function() {
		Events.emit("levelStarted", level);
	})

	Events.on("arrowKeyDown", function(e) {
		if (e.keyCode == 37) {
			window.glitchMode = true;
		} else if (e.keyCode == 39) {
			window.glitchMode = false;
		}
	})

	function update(time) {
		Events.emit('update', (new Date() - previousFrameTime) / 1000);
		previousFrameTime = new Date();
		draw();

		window.requestAnimationFrame(update);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = window.glitchMode ? "#f0f0f0" : "#111";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		Events.emit('draw');
	}

}());