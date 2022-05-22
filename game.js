//Grabs canvas constraints from html file and defines context.
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

//Constant and variable definitions defined and to be used in 
//the following code.
const playerHeight = 50;
const maxPlayerY = canvas.height - playerHeight;

var score1 = 0;
var score2 = 0;
var playerSpeed = 5;

//Values for both players and the bullets. They define player size, where they are drawn on the canvas,
//and movement values
const player1 = {
    x: 0,
    y: 190,
    width: 15,
    height: playerHeight,
    pause: 0,
    velocity: 0
};

const player2 = {
    x: 839,
    y: 190,
    width: 15,
    height: playerHeight,
    pause: 0,
    velocity: 0
};

const bullets = {
    speed: 5,
    array: []
}

// Function for colliding objects. This will be used to determine if a player got hit.
// AABB Method obtained from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection.
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// Loop function that runs the game.
function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);

    // The pause value from both players is used to space each bullet in a neat manner.

    if (player1.pause > 0) {
    player1.pause--;
    }
  
    if (player2.pause > 0) {
    player2.pause--;
    }
  
    // The velocity value from both players is used for both players velocity.
    player1.y += player1.velocity;
    
    player2.y += player2.velocity;

    // If statements that keeps each player in the canvas. First if statement defines the top
    // "border" and the second if statement defines the bottom one.
    if (player1.y < 0) {
    player1.y = 0;
    }
    
    else if (player1.y > maxPlayerY) {
    player1.y = maxPlayerY;
    }
  
    if (player2.y < 0) {
    player2.y = 0;
    }
    
    else if (player2.y > maxPlayerY) {
    player2.y = maxPlayerY;
    }
	
    // Draws bullets that each player fires.
    context.fillStyle = 'grey';
    bullets.array.forEach(function(bullet, index) {
    context.fillRect(bullet.x, bullet.y, 10, 5);

    // If statements that track collision of a bullet with the players. When a player is hit
    // this will reset the players as well as give the player that hit them with a point. The
    // if statement within it will also keep track of the points. If a player scores 5 points,
    // they receive a message that they won and will reload the game upon acknowledgement.
    
    // If Player 2 hits Player 1
    if (collides(bullet, player1)) {
	    
        bullets.array.splice(index, 1);
	    player1.y = canvas.height / 2 - playerHeight / 2;
	    player2.y = canvas.height / 2 - playerHeight / 2;
	    bullets.array.length = 0;
        score2++;
        
        if (score2==5) {
        alert("Player 2 wins!");
        document.location.reload();
        clearInterval(interval);
      
        }
	}
	
    // If Player 1 hits Player 2
    else if (collides(bullet, player2)) {
	    
        bullets.array.splice(index, 1);
	    player1.y = canvas.height / 2 - playerHeight / 2;
	    player2.y = canvas.height / 2 - playerHeight / 2;
	    bullets.array.length = 0;
        score1++;
        
        if (score1==5) {
        alert("Player 1 wins!");
        document.location.reload();
        clearInterval(interval);
      
        }
	}
    
    // Bullet movement.
    bullet.x += bullet.dx;

});

// Draws the scores for each player.
context.font = '30px Times New Roman';
context.fillText(score1, 200, 40);
context.fillText(score2, 654, 40);

// Draws rectangles that simulate each player. I plan on converting them to the 8 bit cowboys 
// seen in the images folder.
context.fillStyle = 'brown';
context.fillRect(player1.x, player1.y, player1.width, player1.height);
context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

// Event listeners for player controls.
document.addEventListener('keydown', function(e) {
    
    //Player 2 movement
    // Up arrow = Up
    if (e.which === 38) {
        player2.velocity = -playerSpeed;
    }
    // Down arrow = Down
    else if (e.which === 40) {
        player2.velocity = playerSpeed;
    }

    //Player 1 movement
    // W key = Up
    if (e.which === 87) {
        player1.velocity = -playerSpeed;
    }
    // S key = Down
    else if (e.which === 83) {
        player1.velocity = playerSpeed;
    }

    // Player 2 fire
    // Left arrow key = Fire
    if (e.which === 37 && player2.pause === 0) {
        bullets.array.push({
	        x: player2.x - 10, 
	        y: player2.y + 20, 
	        width: 10,
	        height: 5,
	        dx: -bullets.speed
	});
	player2.pause = 25;
    }

    // Player 1 fire
    // D key = Fire
    if (e.which === 68 && player1.pause === 0) {
        bullets.array.push({
	        x: player1.x + 15, 
	        y: player1.y + 20, 
	        width: 10,
	        height: 5,
	        dx: bullets.speed
	});
	player1.pause = 25;
    }

});

// Event listeners to stop movement.
document.addEventListener('keyup', function(e) {
    
    //If Up arrow / Down arrow are released, player 2's velocity is 0 and stops moving.
    if (e.which === 38 || e.which === 40) {
        player2.velocity = 0;
    }

    //If W key / S key are released, player 1's velocity is 0 and stops moving.
    if (e.which === 83 || e.which === 87) {
        player1.velocity = 0;
    }

});

requestAnimationFrame(loop);