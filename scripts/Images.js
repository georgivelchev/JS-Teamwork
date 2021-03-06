var images = new function() {
    // Define images
    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();
    this.enemy = new Image();
    this.enemyBullet = new Image();
    this.live = new Image();

    // Ensure all images have loaded before starting the game
    var numImages = 6;
    var numLoaded = 0;
    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }
    this.background.onload = function() {
        imageLoaded();
    };
    this.spaceship.onload = function() {
        imageLoaded();
    };
    this.bullet.onload = function() {
        imageLoaded();
    };
    this.enemy.onload = function() {
        imageLoaded();
    };
    this.enemyBullet.onload = function() {
        imageLoaded();
    };

    this.live.onload = function() {
        imageLoaded();
    };

    // Set images src
    this.background.src = "images/background.png";
    this.spaceship.src = "images/ship1.png";
    this.bullet.src = "images/bullet_my.png";
    this.enemy.src = "images/enemy1.png";
    this.enemyBullet.src = "images/enemebullet.png";
    this.live.src = "images/live.png";
};

function Drawable() {
    this.init = function(x, y, width, height) {
        // Defualt variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.collidableWith = "";
    this.isColliding = false;
    this.type = "";

    // Define abstract function to be implemented in child objects
    this.draw = function() {
    };
    this.move = function() {
    };
}