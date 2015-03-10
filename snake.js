var newGame = true;

var snakeX, snakeY;
var snakeSize = 10;
var direction = -1;

var endGame = false;

var stepSize = 5;

var foodX, foodY;

var snakeSections = [];

var posX, posY;

function setup() {
	//setup the size of the board
	var height = 500;
	var width = 500;

	createCanvas(height, width);
	background(0);

	initializeGame();
}

function draw() {
  //here we keep updating the direction 
  if (endGame == false){
  		refreshPage();
  		dropFood();
  		
  		//do collision detection here
  		step();
  		ateFood();
	}
}

function ateFood(){
	//here we need to see if we collide with the food

	/*
	 * need a way to keep track of the snake, maybe a list of coordinates?
	 * everything will need incremented through the step function
	*/

	/* TO DO: when colliding with the food
	 * make the snake one piece longer, add to the end of the snake
	 * generate another piece of food	 
	*/

	if(collisionWithFood()){
		addOneSectionToSnake();
		foodX = formatSuitableNumber();
	 	foodY = formatSuitableNumber();
	}
	/* TO DO: check for collisions with yourself
	 * if you collide with yourself go to endGame(true)
	*/

}

function collisionWithFood(){
	//this is only for the first piece
	//and is based on the current direction
	var currDirection = snakeSections[0];
	var xDiff, yDiff;

	if (currDirection == 0 && deltaY() <= snakeSize){
		//left so the food needs to be <posX
		xDiff = posX - foodX;
		if (xDiff <= snakeSize && xDiff > 0){
			return true;	
		}		
	}
	else if (currDirection == 1 && deltaY() <= snakeSize){
		//right so the food needs to be >posX
		xDiff = foodX - posX;
		if (xDiff <= snakeSize && xDiff > 0){
			return true;	
		}
	}
	else if (currDirection == 2 && deltaX() <= snakeSize){
		//up so the food needs to be <posY
		yDiff = foodY - posY;
		if (yDiff <= snakeSize && yDiff > 0){
			return true;	
		}
	}
	else if (currDirection == 3 && deltaX() <= snakeSize){
		//down so the food needs to be >posY
		yDiff = posY - foodY;
		if (yDiff <= snakeSize && yDiff > 0){
			return true;	
		}
	}
	
	return false;
}

function deltaY(){
	//just so the number is always positive
	if (posY > foodY){
		return posY - foodY;
	}

	return foodY - posY;
}

function deltaX(){
	//just so the number is always positive
	if (posX > foodX){
		return posX - foodX;
	}

	return foodX - posX;
}

function addOneSectionToSnake(){
	//this will add the same direction to the end so theyre in the same direction
	snakeSections.push(snakeSections[snakeSections.length - 1]);	
}

function refreshPage(){
	background(0);
}

function dropFood(){
	//this will just be a random rectable in yellow
	//here we need to keep the same place until the snake eats the food	
	fill(255, 0, 0);
	rect(foodX, foodY, snakeSize, snakeSize);
}

function initializeGame(){
	//display the board once and wait for some keyboard input
	//snakeX = int(random(0, height-10));
	//snakeY = int(random(0, width-10));	
	
	snakeSections.push(0);

	snakeX = formatSuitableNumber();
	snakeY = formatSuitableNumber();

	posX = snakeX;
	posY = snakeY;

	print("snakeX: " + snakeX);
	print("snakeY: " + snakeY);

	//snakeSize = 10;
	background(0);

	fill(255, 255, 255);
	//rect(snakeSections[0].getX, snakeSections[0].getY, snakeSize, snakeSize);
	rect(snakeX, snakeY, snakeSize, snakeSize);

	direction = -1;

	foodX = formatSuitableNumber();
	foodY = formatSuitableNumber();
}

function snakePart(){
	snakeX = formatSuitableNumber();
	snakeY = formatSuitableNumber();
}

function keyPressed() {
	/*
	mappings are 
	left = 0
	right = 1
	up = 2
	down = 3
	*/

  if (keyCode === LEFT_ARROW) {
    direction = 0;
  } else if (keyCode === RIGHT_ARROW) {
    direction = 1;
  }
  else if (keyCode === UP_ARROW) {
    direction = 2;
  } else if (keyCode === DOWN_ARROW) {
    direction = 3;
  }
  return false; // prevent any default behavior
}

function stopGame(endGame){
	if (endGame == true){
		print("");
		print("You lost");
		print("SnakeX: " + snakeX);
		print("SnakeY: " + snakeY);
		print("Size: " + snakeSections.length);
		print("");
	}

	noLoop();
}

function step(){
	//new game loop
	updateArray();		

		if (snakeSections[0] == 0 && posX > 0){
		  	//move left, Xvar - stepSize
		  	posX -= stepSize;

		}
		else if (snakeSections[0] == 1 && posX < width-10){
		  	//move right, Xvar + stepSize
		  	posX += stepSize;
		}
		else if (snakeSections[0] == 2 && posY > 0){
		  	//move up, Yvar - stepSize
		  	posY -= stepSize;
		}
		else if (snakeSections[0] == 3 && posY < height-10){
		  	//move down, Yvar + stepSize
		  	posY += stepSize;
		}
		else{
		  	//pause the game since it's over, the snake would go outside of the boarders
		 	if (snakeSections[0] >= 0){
		  		endGame = true;
		  		stopGame(endGame);
		  		return;
			}	  	
		}

		fill(255, 255, 255);		
		
		rect(posX, posY, snakeSize, snakeSize);

		var currX = posX; 
		var currY = posY;

	if (snakeSections.length > 1){
		for (var x = 0; x < snakeSections.length; x++){
			//loop through the rest of the snake and print the correct layout
			if (snakeSections[x] == 0 && currX > 0){
			  	//move left, Xvar - stepSize
			  	currX += stepSize;

			}
			else if (snakeSections[x] == 1 && currX < width-10){
			  	//move right, Xvar + stepSize
			  	currX -= stepSize;
			}
			else if (snakeSections[x] == 2 && currY > 0){
			  	//move up, Yvar - stepSize
			  	currY += stepSize;
			}
			else if (snakeSections[x] == 3 && currY < height-10){
			  	//move down, Yvar + stepSize
			  	currY -= stepSize;
			}

			if (snakeSections.length == 10){
				var test = "";
			}
			fill(150, 150, 150);

		    rect(currX, currY, snakeSize, snakeSize);

		}
	}			
}

function updateArray(){
	//this should change the posX and posY
	if(snakeSections.length > 1){
		for(var x = snakeSections.length - 1; x > 0; x--){
			if (snakeSections.length > 15){
				var w = 0;
			}
				snakeSections[x] = snakeSections[x - 1]
		}	
	}
	snakeSections[0] = direction;
}

function formatSuitableNumber(){
	var number = int(random(0, width-10));

	if (number % 10 >= 5){
		number += 10 - number % 10;
	}
	else{
		number -= number % 10;
	}

	return number;
}