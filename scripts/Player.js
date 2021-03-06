function Ship() {
    this.speed = 3;
    this.lives = 3;
    this.bulletPool = new Pool(30);
    var fireRate = 15;
    var counter = 0;
    this.collidableWith = "enemyBullet";
    this.type = "ship";

    this.init = function(x, y, width, height) {
        // Defualt variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.isColliding = false;
        this.bulletPool.init("bullet");
        document.getElementById('lives').src="images/lives_three.png";
    };

    this.draw = function() {
        this.context.drawImage(images.spaceship, this.x, this.y);
    };
    this.move = function() {
        counter++;
        // Determine if the action is move action
        if (KEY_STATUS.left || KEY_STATUS.right ||
            KEY_STATUS.down || KEY_STATUS.up) {
            // The ship moved, so erase it's current image so it can
            // be redrawn in it's new location
            this.context.clearRect(this.x, this.y, this.width, this.height);

            // Update x and y according to the direction to move and
            // redraw the ship.
            if (KEY_STATUS.left) {
                this.x -= this.speed;
                if (this.x <= 0) // Kep player within the screen
                    this.x = 0;
            } else if (KEY_STATUS.right) {
                this.x += this.speed;
                if (this.x >= this.canvasWidth - this.width)
                    this.x = this.canvasWidth - this.width;
            } else if (KEY_STATUS.up) {
                this.y -= this.speed;
                if (this.y <= this.canvasHeight/4*3)
                    this.y = this.canvasHeight/4*3;
            } else if (KEY_STATUS.down) {
                this.y += this.speed;
                if (this.y >= this.canvasHeight - this.height)
                    this.y = this.canvasHeight - this.height;
            }
        }

        // Redraw the ship
        if (!this.isColliding) {
            this.draw();
        }
        else {
            this.lives--;
            if (this.lives==2) {
                document.getElementById('lives').src="images/lives_two.png";
            } else if (this.lives==1) {
                document.getElementById('lives').src="images/live.png";
            }
            else {
                document.getElementById('lives').src="";
            }
            this.isColliding=false;
            if (this.lives<=0) {
                this.alive = false;
                game.gameOver();
            }
        }

        if (KEY_STATUS.space && counter >= fireRate && !this.isColliding) {
            this.fire();
            counter = 0;
        }
    };

    //Fires two bullets
    this.fire = function() {
        this.bulletPool.getTwo(this.x+3, this.y, 3,this.x+28, this.y, 3);
        game.laser.get();
    };
}
Ship.prototype = new Drawable();