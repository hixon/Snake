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
  		ateFood();

  		step();
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

	//foodX = int(random(0, width-10));
	//foodY = int(random(0, height-10));

	foodX = formatSuitableNumber();
	foodY = formatSuitableNumber();


}

function snakePart(){
	snakeX = formatSuitableNumber();
	snakeY = formatSuitableNumber();

	//this.getX = function(){
	//	snakeX = formatSuitableNumber();
	//}

	//this.getY = function(){
	//	snakeY = formatSuitableNumber();
	//}
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
		print("");
	}

	noLoop();
	//initializeGame();
}

function step(){
	//here we might have to loop through an array and reprint everything with updated coordinates


	//here we'll have to go through the array of snakeParts	
	//on each index we need to add another rectangle 
	for (var x = 0; x < snakeSections.length; x++){		
		//if (x == 0){
			//posX = snakeX;
			//posY = snakeY;
		//}
		//else{

			/*
			if (direction == 0 && posX > 0){
			  	//move left, Xvar - stepSize
			  	posX -= stepSize;

			}
			else if (direction == 1 && posX < width-10){
			  	//move right, Xvar + stepSize
			  	posX += stepSize;
			}
			else if (direction == 2 && posY > 0){
			  	//move up, Yvar - stepSize
			  	posY -= stepSize;
			}
			else if (direction == 3 && posY < height-10){
			  	//move down, Yvar + stepSize
			  	posY += stepSize;
			}
			else{
			  	//pause the game since it's over, the snake would go outside of the boarders
			 	if (direction >= 0){
			  		endGame = true;
			  		stopGame(endGame);
			  		return;
				}	  	
			}
			*/

			//new test
			if (snakeSections[x] == 0 && posX > 0){
			  	//move left, Xvar - stepSize
			  	posX -= stepSize;

			}
			else if (snakeSections[x] == 1 && posX < width-10){
			  	//move right, Xvar + stepSize
			  	posX += stepSize;
			}
			else if (snakeSections[x] == 2 && posY > 0){
			  	//move up, Yvar - stepSize
			  	posY -= stepSize;
			}
			else if (snakeSections[x] == 3 && posY < height-10){
			  	//move down, Yvar + stepSize
			  	posY += stepSize;
			}
			else{
			  	//pause the game since it's over, the snake would go outside of the boarders
			 	if (snakeSections[x] >= 0){
			  		endGame = true;
			  		stopGame(endGame);
			  		return;
				}	  	
			}
		//}
		fill(255, 255, 255);
		var currX, currY;

	    rect(posX, posY, snakeSize, snakeSize);
	}	  

	updateArray();
}

function updateArray(){
	if(snakeSections.length > 1){
		for(var x = snakeSections.length; x > 0; x--){
			if (x == snakeSections.length){
				snakeSections.pop();	
			}
			else{
				snakeSections[x] = snakeSections[x - 1]
			}

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