class StatusBar extends DrawableObject {
    percentage;
    percentageModifier;
   
    /**
     * Constructs a new status bar.
     */
    constructor() {
        super();
    }

    /**
     * Changes the percentage of the status bar and updates the image accordingly.
     * 
     * @param {number} input - The new percentage value.
     */
    changePercentage(input) {
        this.percentage = input;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * 
     * @returns {number} The index of the image to be displayed.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
