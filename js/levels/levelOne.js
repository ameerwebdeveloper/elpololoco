let levelOne;

/**
 * Initializes and returns the first level of the game.
 * 
 * @returns {Level} The initialized level.
 */
function initLevelOne() {
    return new Level(
        backgroundObjects = [
            new BackgroundObject("img/5_background/layers/air.png", -719),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

            new BackgroundObject("img/5_background/layers/air.png", 719),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

            new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),

            new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3)
        ],
        clouds = [
            new Cloud()
        ],
        enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],
        specialEnemies = [
            new Endboss()
        ],
        lifeBar = [new LifeBar(), new BigBossLifeBar()],
        coinBar = [new CoinBar()],
        bottleBar = [new BottleBar()],
        characters = [new Character()],
        collectableObjects = [
            new Bottle(200, 350, "r"),
            new Bottle(300, 350, "r"),
            new Bottle(400, 350, "r"),
            new Bottle(400, 350, "l"),
            new Bottle(1000, 350, "r"),
            new Bottle(2000, 350, "l"),
            new Bottle(2200, 350, "r"),
            new Bottle(2100, 350, "r"),
            new Coin(200, 100),
            new Coin(800, 100),
            new Coin(1000, 100),
            new Coin(1900, 100),
            new Coin(2000, 100)
        ]
    );
}
