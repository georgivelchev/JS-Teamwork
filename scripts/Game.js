var game = new Game();

function init() {
    if (game.init()) {
        game.start();
    }
}

function Game() {
    this.init = function () {
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.shipContext = this.shipCanvas.getContext('2d');
            this.mainContext = this.mainCanvas.getContext('2d');

            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;

            Ship.prototype.context = this.shipContext;
            Ship.prototype.canvasWidth = this.shipCanvas.width;
            Ship.prototype.canvasHeight = this.shipCanvas.height;

            Bullet.prototype.context = this.mainContext;
            Bullet.prototype.canvasWidth = this.mainCanvas.width;
            Bullet.prototype.canvasHeight = this.mainCanvas.height;

            Enemy.prototype.context = this.mainContext;
            Enemy.prototype.canvasWidth = this.mainCanvas.width;
            Enemy.prototype.canvasHeight = this.mainCanvas.height;

            this.background = new Background();
            this.background.init(0, 0);

            this.ship = new Ship();
            this.shipStartX = this.shipCanvas.width / 2 - images.spaceship.width;
            this.shipStartY = this.shipCanvas.height / 4 * 3 + images.spaceship.height * 2;
            this.ship.init(this.shipStartX, this.shipStartY, images.spaceship.width, images.spaceship.height);
            this.enemyPool = new Pool(30);
            this.enemyPool.init('enemy');
            this.spawnWave();

            this.enemyBulletPool = new Pool(50);
            this.enemyBulletPool.init('enemyBullet');

            this.quadTree = new QuadTree({x: 0, y: 0, width: this.mainCanvas.width, height: this.mainCanvas.height});

            return true;
        }
        else {
            return false;
        }
    };

    this.spawnWave = function () {
        this.background.speed+=1;
        var height = images.enemy.height;
        var width = images.enemy.width;
        var x = 100;
        var y = -height;
        var spacer = y * 1.5;
        for (var i = 1; i <= 18; i++) {
            this.enemyPool.get(x, y, 2);
            x += width + 25;
            if (i % 6 == 0) {
                x = 100;
                y += spacer
            }
        }
    }

    this.playerScore = 0;

    this.start = function () {
        this.ship.draw();
        this.ship.alive = true;
        animate();
    };
    this.gameOver = function () {
        //this.backgroundAudio.pause();
        //this.gameOverAudio.currentTime = 0;
        //this.gameOverAudio.play();
        document.getElementById('game-over').style.display = "block";
    };
// Restart the game
    this.restart = function () {
        //this.gameOverAudio.pause();
        this.lives=3;
        this.ship.isColliding = false;
        document.getElementById('game-over').style.display = "none";
        this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
        this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
        this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        this.quadTree.clear();

        this.background.init(0, 0);
        this.ship.init(this.shipStartX, this.shipStartY,
            images.spaceship.width, images.spaceship.height);

        this.enemyPool.init("enemy");
        this.spawnWave();
        this.enemyBulletPool.init("enemyBullet");

        this.playerScore = 0;

        //this.backgroundAudio.currentTime = 0;
        //this.backgroundAudio.play();

        this.start();
    };
}

function animate() {
    document.getElementById('score').innerHTML = game.playerScore;
    game.quadTree.clear();
    game.quadTree.insert(game.ship);
    game.quadTree.insert(game.ship.bulletPool.getPool());
    game.quadTree.insert(game.enemyPool.getPool());
    game.quadTree.insert(game.enemyBulletPool.getPool());
    detectCollision();

    if (game.enemyPool.getPool().length === 0) {
        game.spawnWave();
    }

    if (game.ship.alive) {
        requestAnimFrame(animate);
        game.background.draw();
        game.ship.move();
        game.ship.bulletPool.animate();
        game.enemyPool.animate();
        game.enemyBulletPool.animate();
    }
}

