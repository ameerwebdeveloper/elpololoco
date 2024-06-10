class SmallChicken extends MovableObject {
    y = 365;
    height = 60;
    width = 50;
    deadAudio = new Audio("./audio/chick.wav");
    IMAGE_WALKING;
    IMAGE_DEAD;

    /**
     * Constructs a new small chicken.
     */
    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.requestImages();
        this.initiateObject();
    }

    /**
     * Requests the images for walking and dead states.
     */
    requestImages() {
        this.IMAGE_WALKING = smallChickenWalking;
        this.IMAGE_DEAD = smallChickenDead;
    }

    /**
     * Initializes the small chicken object.
     */
    initiateObject() {
        super.loadImages(this.IMAGE_WALKING);
        super.setImageOffsets(10, 10, 2, 2);
        this.setSmallChickenCoordinate();
        this.setSmallChickenSpeed();
        this.animate();
    }

    /**
     * Sets the initial coordinate of the small chicken.
     */
    setSmallChickenCoordinate() {
        this.x = smallChickenCoordinate + 400;
        smallChickenCoordinate += 400;
    }

    /**
     * Sets the speed of the small chicken.
     */
    setSmallChickenSpeed() {
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /**
     * Animates the small chicken by making it walk.
     */
    animate() {
        this.walking();
    }

    /**
     * Handles the walking animation and movement of the small chicken.
     */
    walking() {
        setStoppableInterval(() => {
            if (!this.dead) {
                super.moveLeft();
            } else {
                this.setThisSmallChickenDead();
            }
        }, 1000 / 60, this);
        super.playAnimation(this.IMAGE_WALKING);
    }

    /**
     * Sets the small chicken to its dead state.
     */
    setThisSmallChickenDead() {
        super.stopObjectAnimation();
        super.loadImage(this.IMAGE_DEAD);
        this.y += 30;
        super.playSound(this.deadAudio);
    }
}
