class LifeBar extends StatusBar {
    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ];

    /**
     * Constructs a new life bar.
     */
    constructor() {
        super().loadImage("img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png");
        this.loadImages(this.IMAGES);
        this.percentage = 100;
        this.percentageModifier = -2;
        this.x = 30;
        this.y = 0;
        this.height = 60;
        this.width = 200;
    }
}
