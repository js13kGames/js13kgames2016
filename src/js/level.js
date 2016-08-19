var colliderTypes = ["none", "spawnPoint", "exit", "floor", "antifloor", "blocker"];
function Level(data) {
	var size = 50;
	this.generate(data);
}

Level.prototype = {
	generate: function(data) {
		for (var r = 0; r < data.length; r++) {
			var row = data[r];
			for (var c = 0; c < row.length; c++) {
				var columnValue = row[c];

				if (columnValue == 0) continue;
				var width = canvas.width / row.length;
				var height = canvas.height / data.length;
				var x = width * c;
				var y = height * r;

				var collider = new LevelCollider(new Vector2(x, y), width, height, colliderTypes[columnValue]);
				
				if (columnValue == 1) {
					this.spawnPoint = collider;
				} else if (columnValue == 2) {
					this.exit = collider;
				}
			}
		}
	}
}