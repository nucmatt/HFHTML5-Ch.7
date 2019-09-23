window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
};

function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	
	//The getContext method has several drawing contexts. They are '2d', `webgl`, 'webgl2', and 'bitmaprenderer'.
	//only '2d' is within the scope of the HF HTML5 book.
	var context = canvas.getContext("2d");
	
	/*the values are in relation to the top left corner of the canvas box
	default color is black. The fillStyle property can be used to specify colors, gradients, etc.
	context.fillRect(10, 10, 100, 100);
	*/
	
	//calling fillBackgroundColor before drawing ensures that the canvas background is reset to the fill color after
	//each Preview button press. Otherwise the canvas would just continue to fill with squares!
	fillBackgroundColor(canvas, context);
	
	//this grabs the select menu for shapes, and since the selectObj gives the option tags as an array with the one selected
	//in the menu as the index value, access the index for its shape and set the shape variable to the value of the selected option
	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;
	
	if (shape == "squares") {
		for (var squares = 0; squares < 20; squares++) {
			drawSquare(canvas, context);
		}
	} else if (shape == "circles") {
		for (var circles = 0; circles < 20; circles++) {
			drawCircle(canvas, context);
		}
	}
	
	drawText(canvas, context);
	drawBird(canvas, context);
}

function drawSquare(canvas, context) {
	//largest square size
	var w = Math.floor(Math.random() * 40); 
	//randomizes the postion of each square
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	
	//fillStyle sets the color of the square(can be any color value type: rgba, hex, etc)
	context.fillStyle = "lightblue";
	//fillRect actually draws the rectangle once its variables have been set
	context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) { //circles require the Path methods to draw curves
	var r = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	
	//all 4 of these are needed to draw a path
	context.beginPath(); //tells browser to begin drawing the path
	context.arc(x, y, r, 0, 2 * Math.PI) //specifies the position, radius, and begin/ending angles for the path (in radians)
	context.fillStyle = "lightblue"; //color of the shape
	context.fill(); //tells the browser to draw the path and fill it
	//an alternative to the .fill() method is the .stroke(). The stroke method will draw the path without filling in a color for the empty space.
}


function drawText(canvas, context) {
	//set foreground color
	var selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var fgColor = selectObj[index].value;
	//left-aligned text
	context.fillStyle = fgColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	context.fillText("I saw this tweet", 20, 40);
	
	//add the tweet text
	selectObj = document.getElementById("tweets");
	index = selectObj.selectedIndex;
	var tweet = selectObj[index].value;
	
	context.font = "italic 1.2em serif";
	//using this code doesn't wrap the text of long tweets
	//context.fillText(tweet, 30, 100);
	
	//this doesn't work all that great, I wonder if some string methods and regex would be more effective
	if (tweet.length > 60) {
		var tweetLines = splitIntoLines(tweet);
		for (var i = 0; i < tweetLines.length; i++) {
			context.fillText(tweetLines[i], 30, 70+(i*25));
		}
	}
	else {
		context.fillText(tweet, 30, 100);
	}
	//right-aligned text
	context.font = "bold 1em sans-serif";
	context.textAlign = "right";
	context.fillText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}

//twitter bird
function drawBird(canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	//use an onload handler to ensure the image if fully loaded before it is drawn on to the canvas
	twitterBird.onload = function() {
		context.drawImage(twitterBird, 20, 120, 70, 70);
	};
}

function fillBackgroundColor(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj.options[index].value;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//this is the callback function specified in the HTML Twitter json script call
function updateTweets(tweets) {
	var tweetSelection = document.getElementById("tweets");
	
	for (var i = 0; i < tweets.length; i++) {
		tweet = tweets[i];
		var option = document.createElement("option");
		option.text = tweet.text;
		option.value = tweet.text.replace("\"", "'");
		tweetSelection.options.add(option);
	}
	
	tweetSelection.selectedIndex = 0;
}

function splitIntoLines(str) {
	var strs = new Array();
	var space = str.indexOf(' ', 60);
	strs[0] = str.substring(0, space);
	strs[1] = str.substring(space+1);
	if (strs[1].length > 60) {
		space = strs[1].indexOf(' ', 60);
		strs[2] = strs[1].substring(space+1);
		strs[1] = strs[1].substring(0, space);
	}
	return strs;
}