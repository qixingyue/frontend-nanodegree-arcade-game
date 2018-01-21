var Player = function(options){
    options = options || {};
    this.sprite = 'images/char-cat-girl.png';
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.speed = options.speed || 10;
    this.step = 10;
}

Player.prototype = {
    handleInput:function(k){
        switch(k){
            case 'left':
                this.x -= this.step;
                break;
            case 'right':
                this.x += this.step;
                break;
            case 'up':
                this.y -= this.step;
                break;
            case 'down':
                this.y += this.step;
                break;
        }
    },
    render:function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    update:function(){
    
    } 
};

// Enemies our player must avoid
var Enemy = function(options) {
    this.sprite = 'images/enemy-bug.png';
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.speed = options.speed || 10;
    this.bug_width = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x += this.speed;
   if(this.x >= ctx.canvas.width - this.bug_width) {
        this.speed = - this.speed;
   }
   if(this.x <= 0) {
        this.speed = - this.speed;
   }
   if(this.speed > 0 ) {
    this.sprite = 'images/enemy-bug.png';
   } else {
    this.sprite = 'images/enemy-bug-back.png';
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //var step = 180;
    //ctx.rotate(Math.PI / 180 * step);
    ctx.drawImage(Resources.get(this.sprite,this.speed), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player({
    x:440,
    y:83 * 6,
});
var allEnemies = [];

var bugCout = 4;
for(var bugIndex = 0 ; bugIndex < bugCout ; bugIndex++){
    allEnemies.push(new Enemy({
        x:0,
        y:83 * ( bugIndex + 1 ) - 20,
        speed:(Math.random() * 3) + 1
    }));
}




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
