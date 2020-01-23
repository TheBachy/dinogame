var horizon;
var obstacleSpeed;

var score;
var obstacles = [];

var dino;

function setup() {
	let cnv = createCanvas(1000, 300);
	cnv.position(innerWidth/4, innerHeight/3);
  

  textAlign(CENTER);

  horizon = height - 40;

	score = 0;
	obstacleSpeed = 6;

	var size = 20;
	dino = new TRex(size * 2, height - horizon, size);

  textSize(20);
}

function draw() {
  background(51);

	drawHUD();

	handleLevel(frameCount);

	dino.update(horizon);

  handleObstacles();
}

/* draws horizon & score*/
function drawHUD() {

  /* draw horizon */
  stroke(255);
	strokeWeight(2);
  line(0, horizon, width, horizon);

	/* draw score */

	noStroke();
	fill(255);
	text("Press spacebar or arrow up to jump \nScore: " + score, width / 2, 30);

	/* draw T-Rex */
	dino.draw();
}

/**
	*	updates, draws, and cleans out the obstacles
	*/
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();

		if (obstacles[i].hits(dino)) // if there's a collision
			endGame();

    if (!obstacles[i].onScreen) // if it's no longer showing
      obstacles.splice(i, 1); // delete from array
  }
}


/**
	* speeds game up, pushes new obstacles, & handles score
	*/
function handleLevel(n) {

  if (n % 30 === 0) { // every 0.5 seconds

    var n = noise(n);

    if (n > 0.5)
      newObstacle(n);

	  if (n % 120 === 0) // every 2 seconds
	    obstacleSpeed *= 4; // speed up
  }

	score++;
}

/* random obstacle*/
function newObstacle(n) {

	var col = color(random(255), random(255), random(255));
	var size = random(30) + 20;
  var obs = new Obstacle(width + size, size, horizon, col);

  obstacles.push(obs);
}

function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32) && dino.onGround) // jump if possible
		dino.jump();
}

function endGame() {

	noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Press f5 to restart", width / 2, height / 2 + 20);
}
