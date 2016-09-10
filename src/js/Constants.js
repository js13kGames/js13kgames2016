var ACCELERATION = 7500;
var MAX_SPEED = 1000;
var FRICTION = 0.8;
var GRAVITY = 2500;
var JUMP_STRENGTH = 1000;
var MAX_JUMPS = 1;
var DRAW_DEBUG = false;

var PLAYER_SIZE = 30;
var TILE_SIZE = 70;

var STARTING_LEVEL = 0;

var TILE_TYPES = [
	{
		name: "none",
		value: 0,
		colour: null
	},
	{
		name: "spawnPoint",
		value: 1,
		colour: "rgb(155, 89, 182)"
	},
	{
		name: "exit",
		value: 2,
		colour: "rgb(44, 62, 80)"
	},
	{
		name: "floor",
		value: 3,
		colour: "rgb(122, 143, 164)"
	},
	{
		name: "antifloor",
		value: 4,
		colour: "rgb(22, 43, 54)"
	},
	{
		name: "blocker",
		value: 5,
		colour: "rgb(52, 73, 94)"
	}
];

var DRAW_LAYERS = [
	"background",
	"level",
	"player",
	"debug"
];
