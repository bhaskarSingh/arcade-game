// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(x, y){
        this.player = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(){

    }

    render(){
        ctx.drawImage(Resources.get(this.player), this.x , this.y );
    }

    handleInput(key){
        //Edge values for player movements for grid layout of 505 by 606
        const RIGHT_X = 400, LEFT_X = 0, TOP_Y = -35, DOWN_Y = 415;
        /**
         * Move the player respective of keypresses if it isn't going
         * out of the game (i.e canvas layout)
         */
        switch(key){
            case 'up':  this.y !== TOP_Y ?  this.y -= 90: this.y;
                break;
            case 'down': this.y !== DOWN_Y ?  this.y += 90: this.y;
                break;
            case 'right': this.x !== RIGHT_X ?  this.x += 100: this.x;
                break;
            case 'left': this.x !== LEFT_X ?  this.x -= 100: this.x;
        }
        console.log(this.x, this.y);
    }
}

const player = new Player(200, 415);
const e1 = new Enemy();
const allEnemies = [e1];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});
