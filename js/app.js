/**
 * @description Enemy class to create enemy object
 */
class Enemy{
    constructor(x = 0,y = 0){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        //Position of enemy object on x axis
        this.x = x;
        //Position of enemy object on y axis
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        this.x >= 400 ? this.x = -50 : this.x += Math.round((Math.random() * 500)) * dt

        //check for player & enemy collision, if they collide reset the player to initial position
        if((this.x + 30 > player.x && this.x < player.x && this.y === player.y)){
            player.reset();
        }
    }

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @description Player class to create player object
 */
class Player{
    constructor(x = 0, y = 0){
        this.player = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(){

    }

    //Draw player on the screen
    render(){
        ctx.drawImage(Resources.get(this.player), this.x , this.y );
    }

    /**
     * @description Handle player keypress
     * @param {string} key kepress value b/w top, dwon, right & left
     */
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

    reset(){
        this.x = 200;
        this.y = 415;
    }
}

const player = new Player(200, 415);
const e1 = new Enemy(-50, 235);
const e2 = new Enemy(-50, 145);
const e3 = new Enemy(-50, 55);

const allEnemies = [e1, e2, e3];

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
