window.onload = drawSmileyFace;

function drawSmileyFace() {
	var canvas = document.getElementById("smiley");
	var context = canvas.getContext("2d");
	
	//face
	context.beginPath();
	context.arc(300, 300, 200, 0, 2 * Math.PI);
	context.fillStyle = "#ffffcc"; //hex and rgba color values must be in quotes for JS, else JS will look for a variable
	context.fill(); //fills the face circle with yellow
	context.stroke(); //draws just the border of the face circle in default black
	
	//right eye (stage right, not viewers right
	context.beginPath();
	context.arc(400, 250, 25, 0, 2 * Math.PI);
	context.stroke();
	
	//left eye
	context.beginPath();
	context.arc(200, 250, 25, 0, 2 * Math.PI);
	context.stroke();
	
	//mouth
	context.beginPath();
	context.arc(300, 350, 75, degreesToRadians(20), degreesToRadians(160)); //remember that the angle is measured from the X-axis
	context.stroke();
	
	//nose
	context.beginPath();
	context.moveTo(300, 300);
	context.lineTo(300, 350);
}
	context.stroke();

function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}
