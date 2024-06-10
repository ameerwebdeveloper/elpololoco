class Level {
    backgroundObjects;
    clouds;
    enemies;
    specialEnemies;
    lifeBar;
    coinBar;
    bottleBar;
    characters;
    collectableObjects;
    levelEndX = 719 * 3 + 80;

    /**
     * Constructs a new level with the given objects.
     * 
     * @param {Array} backgroundObjects - The background objects of the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} specialEnemies - The special enemies in the level.
     * @param {Array} lifeBar - The life bar in the level.
     * @param {Array} coinBar - The coin bar in the level.
     * @param {Array} bottleBar - The bottle bar in the level.
     * @param {Array} characters - The characters in the level.
     * @param {Array} collectableObjects - The collectable objects in the level.
     */
    constructor(backgroundObjects, clouds, enemies, specialEnemies, lifeBar, coinBar, bottleBar, characters, collectableObjects) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.specialEnemies = specialEnemies;
        this.lifeBar = lifeBar;
        this.coinBar = coinBar;
        this.bottleBar = bottleBar;
        this.characters = characters;
        this.collectableObjects = collectableObjects;
    }
}
