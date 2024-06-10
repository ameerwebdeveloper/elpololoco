class CoinBar extends StatusBar {
    IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
    ];

    /**
     * Constructs a new coin bar.
     */
    constructor() {
        super().loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png");
        this.loadImages(this.IMAGES);
        this.percentage = 0;
        this.percentageModifier = 20;
        this.x = 30;
        this.y = 45;
        this.height = 60;
        this.width = 200;
    }
}
