class Coin extends CollectableObject {
    coinAudio = new Audio("./audio/coins.mp3");

    /**
     * Constructs a new coin object at the specified coordinates.
     * 
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImage("./img/8_coin/coinCropped.png");
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
    }

    /**
     * Plays the coin collection sound.
     */
    playCoinSound() {
        this.playSound(this.coinAudio);
    }
}
