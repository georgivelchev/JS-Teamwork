function Ship() {
    var lives = 3;
    this.speed = 3;
    this.bulletPool = new Pool(30);
    this.bulletPool.init('bullet');
    var fireRate = 15;
    var counter = 0;
    this.collidableWith='enemyBullet';
    this.type='ship';
    this.draw = function () {
        this.context.drawImage(images.spaceship, this.x, this.y);
    };

    this.move = function () {
        counter++;

        if (KEY_STATUS.left || KEY_STATUS.right ||
            KEY_STATUS.down || KEY_STATUS.up) {
            this.context.clearRect(this.x, this.y, this.width, this.height);

            if (KEY_STATUS.left) {
                this.x -= this.speed;
                if (this.x <= 0) {
                    this.x = 0;
                }

            } else if (KEY_STATUS.right) {
                this.x += this.speed;
                if (this.x >= this.canvasWidth - this.width) {
                    this.x = this.canvasWidth - this.width;
                }

            } else if (KEY_STATUS.up) {
                this.y -= this.speed;
                if (this.y <= this.canvasHeight / 4 * 3) {
                    this.y = this.canvasHeight / 4 * 3;
                }

            } else if (KEY_STATUS.down) {
                this.y += this.speed;
                if (this.y >= this.canvasHeight - this.height) {
                    this.y = this.canvasHeight - this.height;
                }

            }
            if (!this.isColliding) {
                this.draw();
            }
            else {
                lives--;
                this.isColliding=false;
                if (lives<=0) {
                    this.alive = false;
                    game.gameOver();
                    lives=3;
                }
            }

        }
        if (KEY_STATUS.space && counter >= fireRate) {
            this.fire();
            counter = 0;
        }

    };



    this.fire = function () {
        this.bulletPool.getTwo(this.x + 6, this.y, 3, this.x + 33, this.y, 3)
    };
}
Ship.prototype = new Drawable();


