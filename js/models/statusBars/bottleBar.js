class BottleBar extends StatusBar {
    world;
    IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
    ];

    /**
     * Constructs a new bottle bar.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 95;
        this.height = 60;
        this.width = 200;
    }

     /**
     * Sets the bottle bar image based on the number of bottles.
     * @param {number} numberOfBottles - The current number of bottles.
     */
    setBottleBar(numberOfBottles) {
        let index;
        if (numberOfBottles <= 0) {
            index = 0;
        } else if (numberOfBottles == this.world.NumberOfAvailableBoottle) {
            index = this.IMAGES.length - 1;
        } else {
            index = Math.ceil((numberOfBottles / this.world.NumberOfAvailableBoottle) * (this.IMAGES.length - 2));
        }
        this.changeImage(this.IMAGES[index]);
    }
    
    /**
     * Changes the current image to the given path.
     * @param {string} path - The path of the image to display.
     */
    changeImage(path) {
        this.img = this.imageCache[path];
    }

}
