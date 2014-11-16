var images = new function () {

    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();
    this.enemyBullet = new Image();
    this.enemy = new Image();
    this.live = new Image();

    //Check if all images loaded
    var allImages = 6;
    var loadedImages = 0;

    function imageLoaded() {
        loadedImages++;
        if (loadedImages === allImages) {
            window.init();
        }
    }

    this.background.onload = function () {
        imageLoaded();
    }

    this.spaceship.onload = function () {
        imageLoaded();
    }

    this.bullet.onload = function () {
        imageLoaded();
    }

    this.enemyBullet.onload = function () {
        imageLoaded();
    }

    this.enemy.onload = function () {
        imageLoaded();
    }

    this.live.onload = function () {
        imageLoaded();
    }

    this.background.src = "images/background.png";
    this.spaceship.src = "images/ship.png";
    this.bullet.src = "images/bullet.png";
    this.enemyBullet.src = "images/bullet_enemy.png";
    this.enemy.src = "images/enemy.png";
    this.live.src = "images/live.png";
}

function Drawable() {
    this.init = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.collidableWith = '';
    this.isColliding = false;
    this.type='';

    this.draw = function () {

    };

    this.move = function () {

    };
    this.isCollidableWith = function(object) {
        return (this.collidableWith === object.type);
    }
}
