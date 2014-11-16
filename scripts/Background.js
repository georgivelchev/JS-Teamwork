function Background() {
    this.speed = 0; // Define speed of the background for panning

    // Implement abstract function
    this.draw = function() {
        // Pan background
        this.y += this.speed;
        this.context.drawImage(images.background, this.x, this.y);
        this.context.drawImage(images.background, this.x, this.y - this.canvasHeight);

        // If the image scrolled off the screen, reset
        if (this.y >= this.canvasHeight) {
            this.y = 0;
        }
    };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();