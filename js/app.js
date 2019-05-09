// I need create Enemies and Player and show them
// TODO: add 4th row and adjust grid
var allEnemies = [];
let playCount = '0';

// I need an Enemy{} class
class Enemy {
  constructor(x, y, speed){
// randomize x, y and speed of enemy
    this.x = Math.random() * -500;
    this.y = y;
    this.speed = Math.random() * (500 - 100) + 100;
    this.sprite = 'images/enemy-bug.png';
  };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
//
  if (this.x > 510) {
      this.x = Math.random() * -500;
      this.speed = Math.random() * (500 - 100) + 100;
  };

  // Checks for collisions between the player and the enemies
  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
      player.x = 202;
      player.y = 405;
  };
};

// I need a Player{} class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y){
    this.x = 202;
    this.y = 405;
    this.alive = true;
    this.playCount = 4;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
  };
};

// Update player's position
Player.prototype.update = function(dt) {
    // set bounds so that player doesn't go over edges

    //document.getElementById('total').innerHTML = this.total;

    // keeps player from falling off of bottom canvas
    if (this.y > 500) {
        this.y = 500;
    }
    // keep player from falling off of width
    if (this.x < 10) {
        this.x = 10;
    } else if (this.x > 595) {
        this.x = 595;
    }
};

Player.prototype.update = function() {
    // Checks to see if player goes into water and gains a point
    if(this.y <= 0 ) {
        this.x = 202;
        this.y = 405;
        this.score = this.score + 1;
    }

    // Checks to see if player died and reset position
    if(this.alive === false) {
        this.x = 202;
        this.y = 405;
        this.alive = true;
        if(this.playCount === 0){
            this.score = 0;
            this.playCount = 4;
        } else {
            this.playCount = this.playCount - 1;
            playCount = this.playCount;
        }
    }
};
document.getElementById('playCount').innerHTML = playCount;
// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    //if (this.y < 0) {
    //    setTimeout(() => {
    //        this.x = 202;
    //        this.y = 405;
    //    }, 400);
    //};
};
var player = new Player(202, 405);

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkCollisions = function(allEnemies, gem) {
    let self = this;
    allEnemies.forEach(function(enemy) {
        if(intersect(enemy, self)){
           self.alive = false;
        }
    });

    if(intersect(gem, this)) {
        gem.taken = true;
        this.score = this.score + gem.value;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
document.getElementById('playCount').innerHTML = player.playCount;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemyLocation = [63, 147, 230];
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
