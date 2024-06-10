class MovableObject extends DrawableObject {
    dead = false;
    energy = 100;
    speed = 0.15;
    animationSpeed = 100;
    otherDirection = false;
    acceleration = 2.5;
    speedY = 0;
    lastHit = 0;
    objectInterval = [];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    constructor() {
        super();
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Applies gravity to the object, making it fall.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isInAir() || this.speedY > 0) {
                // Moves the object downwards
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 50);
    }

    /**
     * Checks if the object is in the air.
     * 
     * @returns {boolean} True if the object is in the air, otherwise false.
     */
    isInAir() {
        if (this instanceof ThrowableBottle) {
            return true;
        }
        return this.y < 180;
    }

    /**
     * Plays an animation by cycling through the given images.
     * 
     * @param {Array} images - The images to cycle through.
     * @param {number} animationSpeed - The speed of the animation.
     */
    playAnimation(images, animationSpeed) {
        this.setAnimationSpeed(animationSpeed);
        setStoppableInterval(() => {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, this.animationSpeed, this);
    }

    /**
     * Sets the animation speed if a value is provided.
     * 
     * @param {number} animationSpeed - The speed of the animation.
     */
    setAnimationSpeed(animationSpeed) {
        if (animationSpeed) {
            this.animationSpeed = animationSpeed;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Loops an index using the modulo operation.
     * 
     * @param {number} arrayLength - The length of the array to loop through.
     * @returns {number} The current index in the array.
     */
    loopWithModulo(arrayLength) {
        let i = this.increasingDigit % arrayLength;
        this.increasingDigit++;
        return i;
    }

    /**
     * Checks if the object is colliding with another object.
     * 
     * @param {Object} mo - The object to check collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        if (mo) {
            let rightLeft = this.x + this.width - this.offset.right > mo.x + mo.offset.left; // Collision in front
            let topBottom = this.y + this.height - this.offset.bottom > mo.y + mo.offset.top; // Collision bottom
            let leftRight = this.x + this.offset.left < mo.x + mo.width - mo.offset.right; // Collision behind
            let bottomTop = this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // Collision top
            return rightLeft && topBottom && leftRight && bottomTop;
        } else {
            return false;
        }
    }

    /**
     * Checks if the main character is killing a normal enemy.
     * 
     * @param {Object} mo - The enemy object to check.
     * @returns {boolean} True if the main character is killing the enemy, otherwise false.
     */
    killingNormalEnemy(mo) {
        let firstCondition = this.isColliding(mo);
        let secondCondition = this instanceof Character && this.isInAir();
        return firstCondition && secondCondition;
    }

    /**
     * Reduces the object's energy and sets the last hit time.
     */
    hit() {
        this.energy -= 2;
        this.resetEnergy();
        this.setLastHit();
    }

    /**
     * Resets the object's energy if it falls below zero.
     */
    resetEnergy() {
        if (this.energy < 0 || this.energy == 0) {
            this.dead=true;
            this.energy = 0;
        }
    }

    /**
     * Sets the last hit time if the object's energy is above zero.
     */
    setLastHit() {
        if (this.energy > 0) {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead.
     * 
     * @returns {boolean} True if the object's energy is zero, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object is hurt.
     * 
     * @returns {boolean} True if the object was hit recently, otherwise false.
     */
    isHurt() {
        let timePassed = this.getTimeNow() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Stops the object's animation.
     */
    stopObjectAnimation() {
        this.objectInterval.forEach((e) => {
            clearInterval(e);
        });
        this.objectInterval = [];
    }

    /**
     * Plays a sound if not muted.
     * 
     * @param {Audio} audio - The audio object to play.
     */
    playSound(audio) {
        if (!muted) {
            audio.play();
        }
    }

    /**
     * Pauses the given sound.
     * 
     * @param {Audio} audio - The audio object to pause.
     */
    pauseSound(audio) {
        audio.pause(audio);
    }

    /**
     * Plays a sound temporarily for a specified time.
     * 
     * @param {Audio} audio - The audio object to play.
     * @param {number} time - The duration to play the sound.
     */
    playSoundTemp(audio, time) {
        if (!muted) {
            audio.play();
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, time);
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

    /**
     * Gets the current time in milliseconds.
     * 
     * @returns {number} The current time in milliseconds.
     */
    getTimeNow() {
        return new Date().getTime();
    }
}
