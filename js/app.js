/**
 * @description Enemy class to create enemy object
 */
class Enemy{
    constructor(x = 0,y = 0, speed = 500){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        //Position of enemy object on x axis
        this.x = x;
        //Position of enemy object on y axis
        this.y = y;
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        this.x >= 800 ? this.x = -50 : this.x += Math.round((Math.random() * this.speed)) * dt

        //check for player & enemy collision, if they collide reset the player to initial position
        if((this.x + 30 > player.x && this.x < player.x && this.y === player.y)){
            /**
             * @description Reduce life if player collides withe enemy,
             * and show game over modal if user loses all lives
             */
            if(player.lives >= 0){
                player.lives -= 1;
                $('.lives > img:last-child').remove();
                    if(player.lives === 0){
                        new otherModal('Game Over', 'No lives left, better luck next time!').init();
                        console.log('game over');
                }
            }
            console.log(player.lives + 'lives');
            //Reset the player to its initial position on collison
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
        this.avatar = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.lives = 3;
    }

    update(){
        this.onReachingRiverSide();
    }

    onReachingRiverSide(){
        const TOP_Y = -35;
        if(this.y === TOP_Y && (this.x >= 0 & this.x <= 700)){
            new otherModal('Won', 'You Won! Congratulations').init();
            console.log('reached river');
            this.reset();
            return true;
        }
    }

    imageUrl(url){
        this.avatar = url;
    }

    //Draw player on the screen
    render(){
        ctx.drawImage(Resources.get(this.avatar), this.x , this.y );
        // if(!(Modal.isOpen)){
        //     window.scrollTo(this.x, this.y);
        // }
    }

    /**
     * @description Handle player keypress
     * @param {string} key kepress value b/w top, dwon, right & left
     */
    handleInput(key){
        //Edge values for player movements for grid layout of 505 by 606
        const RIGHT_X = 700, LEFT_X = 0, TOP_Y = -35, DOWN_Y = 1135;
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
        this.y = 1045;
    }
}
class Modal{
    constructor(modalName){
        this.modalName = modalName;
        Modal.isOpen;
    }

    init(){
        //Add you own functionality here
    }

    create(){
        //Add you own functionality here
    }

    open(){
        $('#myModal').css('display', 'block');
        Modal.isOpen = true;
        console.log('onOpen');
    }

    close(){
        $('#myModal').css('display', 'none');
        Modal.isOpen = false;
        console.log('onClose');
        this.destroy();
    }

    destroy(){
        $("#myModal").remove();
        console.log('onDestroy');
    }

    closeModal(){
        $('.modal-close').click(() => {
            this.close();
            console.log('closeModal');
        })
    }

    resetLives(){
        let hearts;
        switch(player.lives){
            case 0: hearts =
            `<img class="heart" src="images/Heart.png" alt="Heart">
            <img class="heart" src="images/Heart.png" alt="Heart">
            <img class="heart" src="images/Heart.png" alt="Heart">`
                break;
            case 1: hearts =
            `<img class="heart" src="images/Heart.png" alt="Heart">
            <img class="heart" src="images/Heart.png" alt="Heart">`
                break;
            case 2: hearts =
            `<img class="heart" src="images/Heart.png" alt="Heart">`;
                break;
        }
        $('.lives').append( hearts );
        player.lives = 3;
    }

    startGameTimer(){
        console.log('start game timer');
        $('#timer').timer({
            countdown: true,
            duration: '30s',    	// This will start the countdown from 3 mins 40 seconds
            callback: function() {	// This will execute after the duration has elapsed
                new otherModal('Times up', 'Times Up, Try again!').init();
                console.log('Time up!');
            }
        });
    }

}
class otherModal extends Modal{
    constructor(modalName, title){
        super(modalName);
        this.title = title
    }

    init(){
        this.create();
        this.open();
        this.onClickSave();
        this.closeModal();
    }

    open(){
        super.open();
        $('.input-field').css('display', 'block');
    }

    create(){
        const layout =
        `<div id="myModal" class="modal-game">
          <!-- Modal content -->
          <div class="modal-content-game">
            <h4>Game Over</h4>
            <h5>${this.title}</h5>
            <h5>statistics</h5>
            <p>${player.lives >1 ? `lives left: ${player.lives}` : `life left: ${player.lives}`}</p>
            ${this.modalName === 'Won' ?
            `<div class="input-field">
                <input id="name" type="text" class="validate">
                <label for="name">Enter your name to save progress</label>
                <a class="save-progress waves-effect waves-light btn green">Save</a>
            </div>`
                :
            '<p> "Keep going, Tough situations build strong people in the end.”</p> '
            }
            <a class="modal-close waves-effect waves-light btn grey">Play Again</a>
          </div>
        </div>`

        $('#game-stats').after(layout);
        console.log('onCreate');
    }

    closeModal(){
        $('.modal-close').click(() => {
            this.close();
            this.resetLives();
            $('#timer').timer('reset');
            console.log('closeModal');
        })
    }

    onClickSave(){
        $('.save-progress').click(function(){
            const name = $('#name').val();
            if(name != ''){
                const score = player.lives * 100;
                const person = {
                    name,
                    score
                }
                let progress = []
                progress = JSON.parse( localStorage.getItem( 'progress' ));
                progress.push(person)
                localStorage.setItem( 'progress', JSON.stringify(progress) );
                $('.input-field').css('display', 'none');
                console.log(JSON.parse( localStorage.getItem( 'progress' ) ));
            }else{
                M.toast({html: 'Please! Enter your name'});
            }
        })
    }
}

class starterModal extends Modal{
    constructor(modalName){
        super(modalName);
    }

    init(){
        this.create();
        //Initialize image picker plugin
        $('select').imagepicker();
        //Initialize game instructions guidance collapsible
        $('.collapsible').collapsible();
        this.selectAvatar();
        this.open();
        this.closeModal();
    }

    create(){
        const layout =
        `<div id="myModal" class="modal-game">
        
          <!-- Modal content -->
          <div class="modal-content-game">
            <h4>Welcome to Arcade Classic Game</h4>
            <h5>Select your avatar</h5>
            <select class="image-picker" >
                <option data-img-src="images/char-boy.png" value="1">Char Boy</option>
                <option data-img-src="images/char-horn-girl.png" value="2">Char Horn Girl</option>
                <option data-img-src="images/char-pink-girl.png" value="3">Char Pink Girl</option>
                <option data-img-src="images/char-princess-girl.png" value="4">Char Princess Girl</option>
            </select>

            <!-- Instructions on how to play the game -->
            <ul class="collapsible">
                <li>
                    <div class="collapsible-header">Instructions on how to play the game</div>
                    <div class="collapsible-body">
                        <span>
                        The game will be of 30 seconds and in that, you have to reach to the riverside to win the game
                        and you will have 3 lives and there will be few gems, on taking them successfully you will get
                        an extra life.
                        </span>
                    </div>
                </li>
            </ul>
            <a href="#" class="modal-close waves-effect waves-green btn-flat center">Start Game</a>
          </div>
        </div>`

        $('#game-stats').after(layout);
        console.log('onCreate');
    }

    selectAvatar(){
        //set avatar according to user choice
        $('select').on('change',function(){
            let val = $('select').val();
            //By default set char boy as avatar
            let imageUrl = 'images/char-boy.png'
                switch(parseInt(val)){
                    case 1: imageUrl = 'images/char-boy.png';
                        break;
                    case 2: imageUrl = 'images/char-horn-girl.png';
                        break;
                    case 3: imageUrl = 'images/char-pink-girl.png';
                        break;
                    case 4: imageUrl = 'images/char-princess-girl.png';
                        break;
                }
                console.log(imageUrl);
                player.imageUrl(imageUrl);
        });
    }

    closeModal(){
        $('.modal-close').click(() => {
            this.close();
            this.startGameTimer();
            this.resetLives();
            $('#timer').timer('reset');
            console.log('closeModal');
        })
    }
}

class ScoreBoard extends Modal {
    constructor(modalName){
        super(modalName);
    }

    init(){
        this.create();
        this.open();
        this.closeModal();
    }

    create(){
        const layout  =
        `<div id="myModal" class="modal-game">
          <!-- Modal content -->
          <div class="modal-content-game">
            <h4>Score Board</h4>
            <table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Score</th>
              </tr>
            </thead>

            <tbody>
                ${this.getData()}
            </tbody>
          </table>
            <a class="modal-close waves-effect waves-light btn grey">Close</a>
          </div>
        </div>`

        $('#game-stats').after(layout);
    }

    getData(){
        let arr = JSON.parse( localStorage.getItem( 'progress' ));
        const data = arr.map((item) => {
            return (
                `<tr>
                    <td>${item.name}</td>
                    <td>${item.score}</td>
                </tr>`
            )
        });
        return data;
    }
}

const player = new Player(200, 1045);
let enemies = [], enemyYPosition = 55;
/**
 * create enemies object with random speed
 */
for(let i = 0; i < 11; i++){
    const randomSpeed = Math.floor((Math.random() * 1000) + 450);
    enemies.push(new Enemy(-50, enemyYPosition, randomSpeed));
    enemyYPosition += 90;
    console.log(randomSpeed);
}
const allEnemies = [...enemies];

new starterModal('Start Game').init();

// Change Avatar on clicking the button
$('.change-avatar').click(function(){
    new starterModal('Change Avatar').init();
})

$('.scoreboard').click(function(){
    new ScoreBoard().init();
})
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
