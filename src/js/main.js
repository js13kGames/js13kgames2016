var canvas = document.querySelector('#gameCanvas');
var ctx = canvas.getContext('2d');

var maxWidth = 800, maxHeight = 800;

function resize() {
	var desiredRatio = canvas.width / canvas.height;
	var windowRatio = window.innerWidth / window.innerHeight;
	var height, width;
	if (desiredRatio > windowRatio) { 
		width = window.innerWidth;
		height = width / desiredRatio;
	} else {
		height = window.innerHeight;
		width = height * desiredRatio;
	}
	
	canvas.style.width = Math.min(width, maxWidth) + 'px';
	canvas.style.height = Math.min(height, maxHeight) + 'px';
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);