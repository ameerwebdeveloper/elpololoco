class Chicken extends MovableObject {
    y = 330;
    height = 100;
    width = 80;
    deadAudio = new Audio("./audio/chicken.wav");
    IMAGE_WALKING;
    IMAGE_DEAD;
    objectID;

    /**
     * Constructs a new chicken object.
     */
    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.objectID = nextId;
        generateUniqueId();
        this.objectInterval = [];

        this.IMAGE_WALKING = chickenWalking;
        this.IMAGE_DEAD = chickenDead;
        this.initiateObject();
    }

    /**
     * Initializes the chicken object by loading images, setting offsets, coordinates, speed, and starting the animation.
     */
    initiateObject() {
        this.loadImages(this.IMAGE_WALKING);
        this.setImageOffsets(2, 30, 20, 20);
        this.setChickenCoordinate();
        this.setChickenSpeed();
        this.animate();
    }

    /**
     * Starts the walking animation for the chicken.
     */
    animate() {
        this.walking();
    }

    /**
     * Handles the walking animation and movement of the chicken.
     */
    walking() {
        setStoppableInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            } else {
                this.setChickenDead();
            }
        }, 1000 / 60, this);
        this.playAnimation(this.IMAGE_WALKING);
    }

    /**
     * Sets the chicken to its dead state.
     */
    setChickenDead() {
        this.stopObjectAnimation();
        this.loadImage(this.IMAGE_DEAD);
        this.y += 40;
        this.playSound(this.deadAudio);
    }

    /**
     * Sets the initial coordinate of the chicken.
     */
    setChickenCoordinate() {
        this.x = chickenCoordinate + 400;
        chickenCoordinate += 400;
    }

    /**
     * Sets the speed of the chicken.
     */
    setChickenSpeed() {
        this.speed = 0.15 + Math.random() * 0.25;
    }
}
