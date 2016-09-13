var GameTitle = "GLITCH SWITCHER";

var LevelData = [
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,4,4,4,4,4,4,4,4,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,2,5],
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.1 Arrow keys move",
		showGameTitle: true,
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,2,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.2 Up arrow jumps"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,2,5],
			[5,3,3,3,3,3,3,3,3,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,5]
		],
		title: "1.3 Don't turn back"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,0,0,0,0,0,0,5],
			[5,5,5,5,5,5,5,5,3,3,3,5],
			[5,2,0,0,0,0,0,0,0,0,0,5],
			[5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.4 Or do...",
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,4,4,0,0,0,0,5],
			[5,0,0,0,0,4,4,0,0,0,0,5],
			[5,5,5,5,5,3,3,5,5,5,3,5],
			[5,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,2,5],
			[5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.5 Don't turn around inside a block"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,0,0,0,0,0,0,5],
			[5,5,5,5,5,5,5,5,3,3,3,5],
			[5,0,0,0,0,0,0,0,0,0,0,5],
			[5,4,4,4,5,5,5,5,5,5,5,5],
			[5,0,0,0,0,0,0,0,0,0,2,5],
			[5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.6 Down we go",
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,1,0,0,0,0,0,0,0,0,0,0,2,5],
			[5,3,3,4,4,4,4,4,4,4,4,3,3,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5]
		],
		title: "1.7 Big gap"
	},
	{
		level: [
			[5,5,5],
			[5,2,5],
			[5,0,5],
			[5,4,5],
			[5,0,5],
			[5,3,5],
			[5,0,5],
			[5,4,5],
			[5,0,5],
			[5,3,5],
			[5,0,5],
			[5,4,5],
			[5,1,5],
			[5,5,5]
		],
		title: "1.8 Up the ladder"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,5,0,0,0,5],
			[5,0,0,5,5,5,5,0,5,2,0,0,5],
			[5,3,0,5,5,5,5,3,5,5,5,5,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,4,4,4,0,0,0,0,0,0,0,0,5],
			[5,0,0,4,4,0,0,0,0,0,0,0,5],
			[5,0,0,0,4,4,0,0,0,0,0,0,5],
			[5,0,0,0,0,4,4,0,0,0,0,0,5],
			[5,0,0,0,0,0,4,4,0,0,0,0,5],
			[5,0,5,5,5,5,0,4,4,0,0,0,5],
			[5,3,5,0,0,5,0,0,4,4,0,0,5],
			[5,1,0,0,0,5,0,0,0,4,4,0,5],
			[5,5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.9 Step up"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5],
			[5,0,0,1,5,2,0,0,5],
			[5,4,5,5,5,0,0,0,5],
			[5,0,0,0,5,5,5,3,5],
			[5,0,0,0,5,0,0,0,5],
			[5,3,5,5,5,4,5,5,5],
			[5,0,0,0,5,0,0,0,5],
			[5,0,0,0,5,5,5,3,5],
			[5,4,5,5,5,0,0,0,5],
			[5,0,0,0,5,4,5,5,5],
			[5,0,0,0,5,0,0,0,5],
			[5,3,5,5,5,5,5,3,5],
			[5,0,0,0,5,0,0,0,5],
			[5,0,0,0,5,4,5,5,5],
			[5,4,5,5,5,0,0,0,5],
			[5,0,0,0,5,5,5,3,5],
			[5,0,0,0,5,0,0,0,5],
			[5,3,5,5,5,4,5,5,5],
			[5,0,0,0,5,0,0,0,5],
			[5,0,0,0,5,3,0,0,5],
			[5,0,0,0,5,4,0,0,5],
			[5,0,0,0,0,0,0,0,5],
			[5,5,5,5,5,0,0,5,5]
		],
		title: "1.10 Mind the gap"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
			[5,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,2,5],
			[5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,0,5],
			[5,4,0,0,5,0,5,3,0,0,5,0,5,0,0,3,5,0,5,4,3,4,3,5],
			[5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,0,5],
			[5,0,0,3,5,0,5,0,0,4,5,0,5,0,0,3,5,0,5,3,4,3,4,5],
			[5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,0,5],
			[5,4,0,0,5,0,5,3,0,0,5,0,5,4,0,0,5,0,5,4,3,4,3,5],
			[5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,0,5],
			[5,0,0,3,5,0,5,0,0,4,5,0,5,4,0,0,5,0,5,3,4,3,4,5],
			[5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,0,5],
			[5,4,0,0,5,0,5,3,0,0,5,0,5,0,0,3,5,0,5,4,3,4,3,5],
			[5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,5,0,5,0,0,0,0,5],
			[5,0,0,3,5,0,5,0,0,4,5,0,5,0,0,3,5,0,5,4,3,4,3,5],
			[5,1,0,0,5,6,0,0,0,0,5,6,0,0,0,0,5,6,0,0,0,0,0,5],
			[5,5,5,5,5,5,5,5,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "1.11 Checkpoint!"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,2,5],
			[5,0,0,0,0,0,0,0,0,5],
			[5,0,0,7,7,7,0,0,0,5],
			[5,5,5,5,5,5,5,5,5,5]
		],
		title: "2.1 Red is bad"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5],
			[5,1,0,0,0,7,7,0,0,7,7,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,2,5],
			[5,3,3,0,0,3,3,0,0,3,3,0,0,5]
		],
		title: "2.2 Mind your head"
	},
	{
		level: [
			[7,7,7,7,7,7,7,7,7,7,7,7,7,7],
			[7,1,0,0,0,0,0,0,0,0,0,0,0,7],
			[7,0,0,0,0,0,0,0,0,0,0,0,0,7],
			[7,0,0,0,0,0,0,0,0,0,0,0,0,7],
			[7,0,0,0,0,0,0,0,0,0,0,0,0,7],
			[7,0,0,0,0,0,0,0,0,0,0,0,0,7],
			[7,5,5,5,5,5,5,0,5,5,5,5,5,7],
			[7,5,5,5,5,5,7,0,7,5,5,5,5,7],
			[7,5,5,5,5,5,7,0,7,5,5,5,5,7],
			[7,5,5,5,5,5,7,0,7,5,5,5,5,7],
			[7,5,5,5,5,5,7,0,7,5,5,5,5,7],
			[7,5,5,5,5,5,7,0,7,5,5,5,5,7],
			[7,5,5,5,5,5,7,0,7,5,5,5,5,7],
			[7,5,5,5,5,5,7,2,7,5,5,5,5,7],
			[7,7,7,7,7,7,7,7,7,7,7,7,7,7]
		],
		title: "2.3 Don't touch the walls!"
	},
	{
		level: [
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
			[5,1,0,7,0,7,0,7,0,7,0,7,7,0,7,7,0,0,0,5],
			[5,0,0,7,0,7,0,7,0,7,0,7,7,0,7,7,0,0,0,5],
			[5,0,0,7,0,7,0,7,0,7,0,7,7,0,7,7,0,0,0,5],
			[5,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,7,0,7,0,7,0,7,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,7,0,7,0,7,0,0,0,7,7,0,7,7,0,0,2,5],
			[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
		],
		title: "2.4 Pillars of doom"
	}
];
