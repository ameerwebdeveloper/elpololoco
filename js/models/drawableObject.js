class DrawableObject {
    x;
    y;
    height;
    width;
    img = new Image();
    imageCache = [];
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths.
     * Saves each image as an Image object in the imageCache.
     * 
     * @param {Array} arr - The array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
