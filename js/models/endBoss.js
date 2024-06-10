class Endboss extends MovableObject {
    y = -35;
    x = 3.5 * 719;
    height = 500;
    width = 300;
    counter = 0;
    isAwake = false;
    world;
    IMAGE_ALERT;
    IMAGE_DEAD;
    IMAGE_WALKING;
    IMAGE_ATTACK;
    IMAGE_HURT;
    HURT_AUDIO = new Audio("./audio/endBossHurting.wav");

    /**
     * Constructs a new endboss.
     */
    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.initialObject();
    }

    /**
     * Initializes the endboss object by setting its properties and starting the animation modifier.
     */
    initialObject() {
        this.speed = 20;
        this.setImageOffsets(50, 0, 10, 10);
        this.requestImagesPath();
        this.loadAllImages();
        this.animationModifier();
    }

    /**
     * Requests the paths for the endboss images.
     */
    requestImagesPath() {
        this.IMAGE_ALERT = bigBossAlert;
        this.IMAGE_ATTACK = bigBossAttack;
        this.IMAGE_DEAD = bigBossDead;
        this.IMAGE_HURT = bigBossHurt;
        this.IMAGE_WALKING = bigBossWalking;
    }

    /**
     * Loads all images for the endboss.
     */
    loadAllImages() {
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_ALERT);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
    }

    /**
     * Modifies the animation of the endboss based on its state.
     */
    animationModifier() {
        setStoppableInterval(() => {
            if (this.isGameStarted()) {
                if (this.counter <= 15) {
                    this.awakeEndboss();
                } else if (this.counter > 15) {
                    this.animate();
                }
            }
        }, 120, this);
    }

    /**
     * Awakens the endboss if the character is around or the endboss is already awakened.
     */
    awakeEndboss() {
        if (this.isCharacterAround() || this.isEndbossAwakened()) {
            this.playAnimation(this.IMAGE_ALERT);
            this.counter++;
        }
    }

    /**
     * Animates the endboss based on its state.
     */
    animate() {
     
        if (this.isDead()) 
        {
            this.setBigbossAsDead();
        } else if (!this.isDead()) {
            if (this.isEndbossAttacked()) {
                this.playAnimation(this.IMAGE_HURT);
                this.playSoundTemp(this.HURT_AUDIO, 500);
            } else {
                this.walkingAnimation();
            }
        }
    }

    /**
     * Handles the walking animation of the endboss.
     */
    walkingAnimation() {
       
            this.playAnimation(this.IMAGE_WALKING);
            this.moveLeft();
       
            if (this.x < 100) {
                gameOver();
            }
    }

    /**
     * Sets the endboss as dead and triggers the game won state.
     */
    setBigbossAsDead() {
        this.playAnimation(this.IMAGE_DEAD);
        gameWon();
    }

    /**
     * Checks if the endboss is awakened.
     * 
     * @returns {boolean} True if the endboss is awakened, otherwise false.
     */
    isEndbossAwakened() {
        return this.counter > 0;
    }

    /**
     * Checks if the endboss is attacked by checking collision with throwable objects.
     * 
     * @returns {boolean} True if the endboss is attacked, otherwise false.
     */
    isEndbossAttacked() {
        return this.isColliding(this.world.throwableObjects[0]);
    }

    /**
     * Checks if the game has started.
     * 
     * @returns {boolean} True if the game has started, otherwise false.
     */
    isGameStarted() {
        return this.world;
    }

    /**
     * Checks if the character is around the endboss.
     * 
     * @returns {boolean} True if the character is around, otherwise false.
     */
    isCharacterAround() {
        return Math.abs(this.world.mainCharacter.x - this.x) < 500;
    }

    /**
     * Simulates the drowning of the endboss's dead body.
     */
    drowningDeadBody() {
        let id = setInterval(() => {
            this.y += 0.5;
        }, 1);
    }

    /**
     * Plays the specified animation.
     * 
     * @param {Array} images - The images to cycle through for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
