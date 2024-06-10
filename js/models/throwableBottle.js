class ThrowableBottle extends Bottle {
    height = 100;
    width = 120;
    incrementAmount = 12;
    splashed = false;
    throwAudio = new Audio("audio/throw.mp3");

    /**
     * Constructs a new throwable bottle.
     * 
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     * @param {boolean} characterDirection - The direction the character is facing.
     */
    constructor(x, y, characterDirection) {
        super();
        this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.otherDirection = characterDirection;
        this.throw();
    }

    /**
     * Throws the bottle by applying gravity, changing the x-coordinate, and rotating.
     */
    throw() {
        this.applyGravity();
        this.changeX();
        this.rotate();
        this.playThrowingAudio();
    }

    /**
     * Changes the x-coordinate of the bottle based on its direction.
     */
    changeX() {
        if (this.otherDirection) {
            this.incrementAmount *= -1;
        }
        setInterval(() => {
            this.x += this.incrementAmount;
        }, 25);
    }

    /**
     * Rotates the bottle.
     */
    rotate() {
        this.playAnimation(this.IMAGE_ROTATION, 40);
    }

    /**
     * Plays the splash animation and sets the splashed flag to true.
     */
    splash() {
        this.playAnimation(this.IMAGE_SPLASH, 30);
        this.splashed = true;
    }

    /**
     * Plays the throwing audio if not muted.
     */
    playThrowingAudio() {
        if (!muted) {
            this.throwAudio.play();
        }
    }
}
