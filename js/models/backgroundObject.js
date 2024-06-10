class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720;

    /**
     * Constructs a new background object with the specified image path and x-coordinate.
     * 
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        if (x) {
            this.x = x;
        }
    }
}
