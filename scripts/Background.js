function Background() {
    this.speed = 0;

    this.draw = function () {
        this.y += this.speed;
        this.context.drawImage(images.background, this.x, this.y);
        this.context.drawImage(images.background, this.x, this.y - this.canvasHeight);

        if (this.y >= this.canvasHeight) {
            this.y = 0;
        }
    };
}

Background.prototype = new Drawable();
