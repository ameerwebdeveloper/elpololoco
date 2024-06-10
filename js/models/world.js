class World {
    level = initLevelOne();
    objectInterval = [];
    mainCharacter = this.level.characters[0];
    NumberOfAvailableBoottle = 0;
    ctx;
    canvas;
    drawInterval;
    keyboard;
    cameraX = 0;
    canThrowMaximalBottle = true;
    treasure = {
        "coins": 0,
        "bottle": 0
    };
    throwableObjects = [];
    collectableObjects = this.level.collectableObjects;

    /**
     * Constructs a new world.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.setNumberOfAvailableBoottle()
        this.checkCollisions();
        this.renderLevelOne();
        this.worldIntervals();
    }

    /**
     * Renders the initial level.
     */
    renderLevelOne() {
        this.clearCanvas();
        this.setCamera();
        this.drawMovableObjects();
        this.drawThrowableObjects();
        this.drawCollectableObjects();
        this.setCameraBack();
        this.reDraw();
        this.drawStaticObjects();
      
    }

    /**
     * Draws all collectible objects.
     */
    drawCollectableObjects() {
        this.draw(this.collectableObjects);
    }

    /**
     * Draws all throwable objects.
     */
    drawThrowableObjects() {
        this.draw(this.throwableObjects);
    }

    /**
     * Draws all static objects (lifebar, bottelbar, coinbar).
     */
    drawStaticObjects() {
        this.draw(this.level.lifeBar);
        this.draw(this.level.bottleBar);
        this.draw(this.level.coinBar);
    }

    /**
     * Draws all movable objects (background, clouds, enemies, characters).
     */
    drawMovableObjects() {
        this.draw(this.level.backgroundObjects);
        this.draw(this.level.clouds);
        this.draw(this.level.enemies);
        this.draw(this.level.specialEnemies);
        this.draw(this.level.characters);
    }

    /**
     * Draws a set of objects on the canvas.
     * 
     * @param {Array} objects - The objects to draw.
     */
    draw(objects) {
        objects.forEach(object => {
            // this.drawFrame(object.x, object.y, object.width, object.height);
            this.flipImage(object);
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
            this.flipImageBack(object);
        });
    }

    /**
     * Sets up the world intervals to check for collisions and throwing requests.
     */
    worldIntervals() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkForThrowingRequest();
        }, 50, this);
    }

    /**
     * Checks if the main character can throw a bottle.
     */
    checkForThrowingRequest() {
        if (this.keyboard.D && this.treasure["bottle"] > 0) {
            if (this.canThrowMaximalBottle && !this.mainCharacter.dead && !this.mainCharacter.isHurt()) {
                this.throwBottle();
            }
        }
    }

    /**
     * Sets a timeout to allow throwing a maximum of one bottle.
     */
    setMaximalBottle() {
        this.canThrowMaximalBottle = false;
        setTimeout(() => {
            this.canThrowMaximalBottle = true;
        }, 500);
    }

    /**
     * Throws a bottle by the main character.
     */
    throwBottle() {
        
        this.treasure["bottle"] -= 1;
        let bottleY = this.mainCharacter.y + (this.mainCharacter.height / 2);
        let bottleX = this.mainCharacter.x;
        let bottleDirection = this.mainCharacter.otherDirection;
        let bottle = new ThrowableBottle(bottleX, bottleY, bottleDirection);
        this.throwableObjects.push(bottle);
        this.updateBottleBar();
        this.setMaximalBottle();
    }

    /**
     * Checks for various types of collisions.
     */
    checkCollisions() {
        this.detectKilling();
        this.detectEnemyCollision();
        this.detectEndbossCollision();
        this.detectCollectibleCollision();
    }

    /**
     * Detects collision between main character and enemies.
     */
    detectEnemyCollision() {
        let enemies = this.level.enemies;
        enemies.forEach((enemy) => {
            if (this.mainCharacter.isColliding(enemy) && !enemy.dead && !this.mainCharacter.dead) {
                this.mainCharacter.hit();
                this.updateCharacterLifebar();
            }
        });
    }

    /**
     * Detects collision between main character and endboss.
     */
    detectEndbossCollision() {
        let endBoss = this.level.specialEnemies[0];
        if (endBoss.isColliding(this.mainCharacter) && !endBoss.dead && !this.mainCharacter.dead) {
            this.mainCharacter.hit();
            this.updateCharacterLifebar();
        }
    }
     /**
     * Detects if the main character is killing an enemy.
     */
    detectKilling() {
        let enemies = this.level.enemies;
        let endBoss = this.level.specialEnemies[0];
        this.killChickenWithJump(enemies);
        this.killChickenWithBottle(enemies);
        this.detectEndbossKilling(endBoss);
    }

    /**
     * Kills chickens (normal enemies) by jumping on them.
     * @param {Array} enemies - The array of enemy objects.
     */
    killChickenWithJump(enemies){
        enemies.forEach((enemy) => {
            if (this.isKillingWithJump(enemy)) {
                enemy.dead = true;
                this.deleteObjectOnMap(this.level.enemies, enemy, 1000);
            }
        });
    }

    /**
     * Checks if the main character is killing an enemy by jumping on it.
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} - True if the main character kills the enemy by jumping on it, false otherwise.
     */
    isKillingWithJump(enemy){
        return this.mainCharacter.killingNormalEnemy(enemy) && !enemy.dead && !this.mainCharacter.isHurt();
    }

    /**
     * Kills chickens (normal enemies) by throwing bottles at them.
     * @param {Array} enemies - The array of enemy objects.
     */
    killChickenWithBottle(enemies){
        this.throwableObjects.forEach((bottle) => {
            enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.splashed) {
                    enemy.dead = true;
                    this.deleteObjectOnMap(this.level.enemies, enemy, 1000);
                    bottle.splash();
                    this.deleteObjectOnMap(this.throwableObjects, bottle, 180);
                }
            });
        });
    }

    /**
     * Detects if the main character is killing the endboss.
     * @param {Object} endBoss - The endboss object.
     */
    detectEndbossKilling(endBoss) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(endBoss) && !bottle.splashed) {
                endBoss.energy -= 20;
                bottle.splash();
                this.updateEndbossLifebar(endBoss);
                this.deleteObjectOnMap(this.throwableObjects, bottle, 180);
            }
        });
    }
        
    /**
     * Detects collision between main character and collectible objects.
     */
    detectCollectibleCollision() {
        this.collectableObjects.forEach((collectableObject) => {
            if (this.mainCharacter.isColliding(collectableObject)) {
                this.playCollectibleSound(collectableObject);
                this.addToMyTreasure(collectableObject);
                this.deleteObjectOnMap(this.collectableObjects, collectableObject);
            }
        });
    }

    /**
     * Plays the appropriate sound when a collectible is collected.
     * 
     * @param {Object} collectableObject - The collected object.
     */
    playCollectibleSound(collectableObject) {
        if (collectableObject instanceof Coin) {
            collectableObject.playCoinSound();
        }
        if (collectableObject instanceof Bottle) {
            collectableObject.playBottleSound();
        }
    }

    /**
     * Adds a collected object to the player's treasure.
     * 
     * @param {Object} collectableObject - The collected object.
     */
    addToMyTreasure(collectableObject) {
        if (collectableObject instanceof Coin) {
            this.treasure["coins"] += 20;
            this.updateCoinBar();
        }
        if (collectableObject instanceof Bottle) {
            this.treasure["bottle"] += 1;
            this.updateBottleBar();
        }
    }

    /**
     * Updates the coin bar based on the current coin count.
     */
    updateCoinBar() {
        this.level.coinBar[0].changePercentage(this.treasure["coins"]);
    }

    /**
     * Updates the bottle bar based on the current bottle count.
     */
    updateBottleBar() {
        this.level.bottleBar[0].setBottleBar(this.treasure["bottle"]);
    }

    /**
     * Updates the lifebar of the main character.
     */
    updateCharacterLifebar() {
        this.level.lifeBar[0].changePercentage(this.mainCharacter.energy);
    }

    /**
     * Updates the lifebar of the endboss.
     * 
     * @param {Object} endBoss - The endboss character.
     */
    updateEndbossLifebar(endBoss) {
        this.level.lifeBar[1].changePercentage(endBoss.energy);
    }

    /**
     * Draws a frame around an object.
     * 
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {number} width - The width of the object.
     * @param {number} height - The height of the object.
     */
    drawFrame(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '0';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
    }

    /**
     * Flips the image of an object horizontally.
     * 
     * @param {Object} object - The object to flip.
     */
    flipImage(object) {
        if (object.otherDirection && (object instanceof Character || object instanceof Endboss)) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
    }

    /**
     * Flips the image of an object back to its original orientation.
     * 
     * @param {Object} object - The object to flip back.
     */
    flipImageBack(object) {
        if (object.otherDirection && (object instanceof Character || object instanceof Endboss)) {
            this.ctx.restore();
            object.x = object.x * -1;
        }
    }

    /**
     * Schedule a redraw of the current object using `requestAnimationFrame()`.
     * This method is typically used to schedule a redraw of a canvas or other graphical element.
     */
    reDraw() {
        let self = this;
        this.drawInterval = requestAnimationFrame(function () {
            self.renderLevelOne();
        });
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Sets the camera position.
     */
    setCamera() {
        this.ctx.translate(this.cameraX, 0);
    }

    /**
     * Resets the camera position.
     */
    setCameraBack() {
        this.ctx.translate(-this.cameraX, 0);
    }

    /**
     * Sets the world properties for the main character and special enemies.
     */
    setWorld() {
        this.mainCharacter.world = this;
        this.level.specialEnemies[0].world = this;
        this.level.bottleBar[0].world = this;
    }

    /**
     * Deletes an object from a specified array after a delay.
     * 
     * @param {Array} objectArray - The array of objects.
     * @param {Object} objectToDelete - The object to delete.
     * @param {number} delay - The delay in milliseconds before deletion.
     */
    deleteObjectOnMap(objectArray, objectToDelete, delay) {
        setTimeout(() => {
            let i = objectArray.indexOf(objectToDelete);
            objectArray.splice(i, 1);
        }, delay);
    }

    /**
     * Clears all intervals for the world.
     */
    clearIntervals() {
        cancelAnimationFrame(this.drawInterval);
    }

    /**
     * Sets the number of available bottles by iterating through 
     * the collectableObjects array and counting instances of the Bottle class.
     */
    setNumberOfAvailableBoottle(){
        this.collectableObjects.forEach(Object => {
            if(Object instanceof Bottle ){
                this.NumberOfAvailableBoottle ++;
            }
        });
    }
}
