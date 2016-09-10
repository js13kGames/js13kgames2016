function LevelTileModel(position, width, height, type, index, startSize) {
	this.position = position;
	this.width = width;
	this.height = height;
	this.type = type;
	this.index = index;
	this.relativeSize = startSize;

	this.bounds = {
		top: this.position.y,
		right: this.position.x + this.width,
		bottom: this.position.y + this.height,
		left: this.position.x
	};
}
