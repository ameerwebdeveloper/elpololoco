class Bottle extends CollectableObject {
    height = 80;
    width = 100;
    splashed = false;
    IMAGE_ROTATION;
    IMAGE_SPLASH;
    collectBottleAudio = new Audio("./audio/bottle.mp3");

    /**
     * Constructs a new bottle object at the specified coordinates.
     * 
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     * @param {string} degree - The degree (or direction) of the bottle.
     */
    constructor(x, y, degree) {
        super();
        super.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
        this.initiateObject(x, y, degree);
    }

    /**
     * Initializes the bottle object by loading images, setting offsets, and coordinates.
     * 
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     * @param {string} degree - The degree (or direction) of the bottle.
     */
    initiateObject(x, y, degree) {
        this.requestImages();
        this.loadImages(bottleRotation);
        this.loadImages(bottleSplash);
        this.setImageOffsets(0, 0, 20, 20);
        this.setBottleDegree(degree);
        this.x = x;
        this.y = y;
    }

    /**
     * Requests the image paths for the bottle's rotation and splash animations.
     */
    requestImages() {
        this.IMAGE_ROTATION = bottleRotation;
        this.IMAGE_SPLASH = bottleSplash;
    }

    /**
     * Plays the bottle collection sound.
     */
    playBottleSound() {
        this.playSound(this.collectBottleAudio);
    }

    /**
     * Sets the degree (or direction) of the bottle.
     * 
     * @param {string} degree - The degree (or direction) of the bottle.
     */
    setBottleDegree(degree) {
        if (degree == "l") {
            this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        }
    }

    /**
     * Sets the image offsets for collision detection.
     * 
     * @param {number} top - The top offset.
     * @param {number} bottom - The bottom offset.
     * @param {number} left - The left offset.
     * @param {number} right - The right offset.
     */
    setImageOffsets(top, bottom, left, right) {
        this.offset.top = top;
        this.offset.bottom = bottom;
        this.offset.left = left;
        this.offset.right = right;
    }
}
