class Character extends MovableObject {
    x = 10;
    y = 190;
    height = 250;
    width = this.height - 100;
    speed = 8;
    world;
    lastChange;
    playingDeadAnimation = false;
    walkingAudio = new Audio("./audio/walking-short.mp3");
    jumpingAudio = new Audio("./audio/jump.mp3");
    deadAudio = new Audio("./audio/dead.mp3");
    hurtAudio = new Audio("./audio/hurt.mp3");

    /**
     * Constructs a new character object.
     */
    constructor() {
        super().loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
        this.initiateObject();
    }

    /**
     * Initializes the character object by loading images, setting offsets, applying gravity, and starting animations.
     */
    initiateObject() {
        this.loadObjectImages();
        this.animate();
        this.setLastChange();
        this.applyGravity();
        this.setImageOffsets(120, 30, 40, 40);
    }

    /**
     * Loads all necessary images for the character.
     */
    loadObjectImages() {
        this.loadImages(characterIdle);
        this.loadImages(imageWalkingCharacter);
        this.loadImages(characterJumping);
        this.loadImages(characterDead);
        this.loadImages(characterHurt);
        this.loadImages(characterIdleShort);
    }

    /**
     * Starts all animations for the character.
     */
    animate() {
        this.walking();
        this.jumpAnimation();
        this.deadAnimation();
        this.hurtAnimation();
        this.checkIdle();
    }

    /**
     * Handles the walking animation and movement of the character.
     */
    walking() {
        this.movingCharacter();
        this.walkingAnimation();
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    movingCharacter() {
        setStoppableInterval(() => {
            if (this.canMoveRight()) {
                this.moveCharacterRight();
            }
            if (this.canMoveLeft()) {
                this.moveCharacterLeft();
            }
            this.playWalkingSound();
            this.moveCamera();
        }, 1000 / 60, this);
    }

    /**
     * Checks if the character can move to the right.
     * 
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
    }

    /**
     * Checks if the character can move to the left.
     * 
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }

    /**
     * Moves the character to the right.
     */
    moveCharacterRight() {
        super.moveRight();
        this.otherDirection = false;
        this.setLastChange();
    }

    /**
     * Moves the character to the left.
     */
    moveCharacterLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.setLastChange();
    }

    /**
     * Moves the camera based on the character's position.
     */
    moveCamera() {
        this.world.cameraX = -this.x + 100;
    }

    /**
     * Plays the walking sound if the character is moving.
     */
    playWalkingSound() {
        if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
            this.playSound(this.walkingAudio);
        } else {
            this.pauseSound(this.walkingAudio);
        }
    }

    /**
     * Handles the walking animation of the character.
     */
    walkingAnimation() {
        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.changeImages(imageWalkingCharacter);
            }
        }, 100, this);
    }

    /**
     * Handles the jump animation of the character.
     */
    jumpAnimation() {
        setStoppableInterval(() => {
            if (super.isInAir()) {
                this.changeImages(characterJumping);
            }
            if (this.canJump()) {
                super.jump();
                super.playSound(this.jumpingAudio);
                this.setLastChange();
            }
        }, 200, this);
    }

    /**
     * Checks if the character can jump.
     * 
     * @returns {boolean} True if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !super.isInAir();
    }

    /**
     * Handles the dead animation of the character.
     */
    deadAnimation() {
        setStoppableInterval(() => {
            if (this.isDead() && this.playingDeadAnimation == false) {
                this.dead = true;
                this.playingDeadAnimation = true;
                this.changeImages(characterDead);
                gameOver();
            }
        }, 200, this);
    }

    /**
     * Handles the hurt animation of the character.
     */
    hurtAnimation() {
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.changeImages(characterHurt);
                this.playSound(this.hurtAudio);
                this.setLastChange();
            }
        }, 200, this);
    }

    /**
     * Sets the last change time to the current time.
     */
    setLastChange() {
        this.lastChange = new Date().getTime();
    }

    /**
     * Checks if the character is idle and changes the animation accordingly.
     */
    checkIdle() {
        setStoppableInterval(() => {
            let difference = super.getTimeNow() - this.lastChange;
            if (difference < 8000) {
                this.changeImages(characterIdleShort);
            }
            if (difference >= 8000) {
                this.changeImages(characterIdle);
            }
        }, 500, this);
    }

    /**
     * Changes the character's images for the current animation.
     * 
     * @param {Array} images - The images to cycle through for the animation.
     */
    changeImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    /**
     * Checks if the object is above the  ground.
     * 
     * @returns {boolean} True if the object is above the  ground, otherwise false.
     */
    isAboveGround(ground) {
        return this.y < ground;
    }
}
