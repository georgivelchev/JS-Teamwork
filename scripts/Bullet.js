function Pool(maxSize) {
    var size = maxSize;
    var pool = [];

    this.getPool = function() {
        var obj = [];
        for (var i = 0; i < size; i++) {
            if (pool[i].alive) {
                obj.push(pool[i]);
            }
        }
        return obj;
    }

    this.init = function (object) {
        if (object == 'bullet') {
            for (var i = 0; i < size; i++) {
                var bullet = new Bullet('bullet');
                bullet.init(0, 0, images.bullet.width, images.bullet.height);
                bullet.collidableWith='enemy';
                bullet.type='bullet';
                pool[i] = bullet;
            }
        }

        if (object == 'enemy') {
            for (var i = 0; i < size; i++) {
                var enemy = new Enemy();
                enemy.init(0, 0, images.enemy.width, images.enemy.height);
                pool[i] = enemy;
            }
        }

        if (object == 'enemyBullet') {
            for (var i = 0; i < size; i++) {
                var bullet = new Bullet('enemyBullet');
                bullet.init(0, 0, images.enemyBullet.width, images.enemyBullet.height);
                bullet.collidableWith = 'ship';
                bullet.type='enemyBullet';
                pool[i] = bullet;
            }
        }
    };

    this.get = function (x, y, speed) {
        if (!pool[size - 1].alive) {
            pool[size - 1].spawn(x, y, speed);
            pool.unshift(pool.pop());
        }
    };

    this.getTwo = function (x1, y1, speed1, x2, y2, speed2) {
        if (!pool[size - 1].alive && !pool[size - 2].alive) {
            this.get(x1, y1, speed1);
            this.get(x2, y2, speed2);
        }
    };

    this.animate = function () {
        for (var i = 0; i < size; i++) {
            if (pool[i].alive) {
                if (pool[i].draw()) {
                    pool[i].clear();
                    pool.push((pool.splice(i, 1))[0]);
                }
            }
            else {
                break;
            }
        }
    };

}

function Bullet(object) {
    this.alive = false;
    var self = object;

    this.spawn = function (x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.alive = true;
    };

    this.draw = function () {
        this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
        this.y -= this.speed;
        if (this.isColliding) {
            return true;
        }
        if (self === 'bullet' && this.y <= 0 - this.height) {
            return true;
        } else if (self === 'enemyBullet' && this.y >= this.canvasHeight) {
            return true;
        }
        else {
            if (self === 'bullet') {
                this.context.drawImage(images.bullet, this.x, this.y);
            }
            else {
                this.context.drawImage(images.enemyBullet, this.x, this.y);
            }
            return false;
        }
    };

    this.clear = function () {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
        this.isColliding=false;
    };
}

Bullet.prototype = new Drawable();
