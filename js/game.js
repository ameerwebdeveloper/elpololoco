let world;
let canvas;
let paused = false;
let chickenCoordinate = 400;
let smallChickenCoordinate = 250;
let allIntervals = [];
let keyboard = new Keyboard();
let nextId = 0; 

/**
 * Generates a unique ID.
 * 
 * @returns {number} The next unique ID.
 */
function generateUniqueId() {
    return nextId++; // Increment and return the next ID
}

const jsConfetti = new JSConfetti();

/**
 * Starts the game by showing the canvas, initializing the world, and displaying controls.
 */
function startMyGame() {  
    showCanvas();
    world = new World(canvas, keyboard);
    hideStartBackground();
    hideSlideScreen();
    showGamingController();
    showMobileController();
    playMusicModifier();
}

/**
 * Plays the game music after a delay.
 */
function playMusicModifier() {
    playGoInSound();
    setTimeout(() => {
        playBackgroundMusic();
    }, 900);
}

/**
 * Restarts the game by showing a loading screen, resetting coordinates, and starting the game.
 */
function restartGame() {
    showLoadingScreen(2000);
    setTimeout(() => {
        pauseGame();
        hideWinScreen();
        hideGameOverScreen();
        hideSlideScreen();
        showGamingContainer();
        resetCoordinates();
        startMyGame();
    }, 2000);
}

/**
 * Shows a loading screen for a specified time.
 * 
 * @param {number} time - The duration to show the loading screen.
 */
function showLoadingScreen(time) {
    let loadingOverlay = document.getElementById("loadingOverlay");
    console.log("Showing", loadingOverlay);
    showDiv(loadingOverlay);
    setTimeout(() => {
        hideDiv(loadingOverlay);
    }, time);
}

/**
 * Resets the coordinates of the chickens.
 */
function resetCoordinates() {
    chickenCoordinate = 400;
    smallChickenCoordinate = 250;
}

/**
 * Hides the start controllers.
 */
function hideStartController() {
    let controllers = document.getElementById("controllers");
    controllers.classList.add("d-none");
}

/**
 * Shows the gaming controllers and hides the start controllers.
 */
function showGamingController() {
    hideStartController();
    let gamingControllers = document.getElementById("gamingControllers");
    gamingControllers.classList.remove("d-none");
}

/**
 * Shows the canvas.
 */
function showCanvas() {
    canvas = document.getElementById("canvas");
    canvas.style.display = "block";
}

/**
 * Hides the canvas.
 */
function hideCanvas() {
    canvas = document.getElementById("canvas");
    canvas.style.display = "none";
}

/**
 * Hides the start background.
 */
function hideStartBackground() {
    let startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";
}

/**
 * Shows the mobile controllers.
 */
function showMobileController() {
    let mobileController = document.getElementById("mobileController");
    showDiv(mobileController);
}

/**
 * Pauses or resumes the game and changes the pause icon accordingly.
 */
function pauseAndPlayModifier() {
    if (!paused) {
        pauseGame();
        paused = true;
        changePauseIcon();
        muteSounds();
    } else {
        resumeGame();
        paused = false;
        changePauseIcon();
        muteSounds();
    }
}

/**
 * Pauses the game by clearing all intervals.
 */
function pauseGame() {
    allIntervals.forEach((e) => {
        clearInterval(e);
    });
    allIntervals = [];
    if (world) {
        world.clearIntervals();
    }
}

/**
 * Changes the pause icon based on the paused state.
 */
function changePauseIcon() {
    let pauseIcon = document.getElementById("pauseIcon");
    if (paused) {
        pauseIcon.src = "icons/play.svg";
    } else {
        pauseIcon.src = "icons/pause.svg";
    }
}

/**
 * Displays the game over screen after a delay and plays the lost audio.
 */
function gameOver() {
    setTimeout(() => {
        pauseGame();
        hideGamingContainer();
        showGameOverScreen();
    }, 1500);
    playLostAudio();
}

/**
 * Hides the gaming container.
 */
function hideGamingContainer() {
    let gameContainer = document.getElementById("gameContainer");
    hideDiv(gameContainer);
}

/**
 * Shows the gaming container.
 */
function showGamingContainer() {
    let gameContainer = document.getElementById("gameContainer");
    showDiv(gameContainer);
}

/**
 * Shows the game over screen and slides.
 */
function showGameOverScreen() {
    let gameOverScreen = document.getElementById("gameOverContainer");
    showDiv(gameOverScreen);
    showSlideScreen();
}

/**
 * Hides the game over screen.
 */
function hideGameOverScreen() {
    let gameOverScreen = document.getElementById("gameOverContainer");
    hideDiv(gameOverScreen);
}

/**
 * Shows the win screen and confetti animation.
 */
function showWinScreen() {
    let gameWinScreen = document.getElementById("gameWinContainer");
    showDiv(gameWinScreen);
    showSlideScreen();
    recursionFunction(() => jsConfetti.addConfetti(), 1);
}

/**
 * Hides the win screen.
 */
function hideWinScreen() {
    let gameWinScreen = document.getElementById("gameWinContainer");
    hideDiv(gameWinScreen);
}

/**
 * Shows the game tutorial screen.
 */
function showGameTutorial() {
    let tutorialPanel = document.getElementById("gameTutorialContainer");
    showDiv(tutorialPanel);
}

/**
 * Closes the game tutorial panel.
 */
function closeTutorialPanel() {
    let tutorialPanel = document.getElementById("gameTutorialContainer");
    hideDiv(tutorialPanel);
}

/**
 * Handles the game won scenario by pausing the game and showing the win screen.
 */
function gameWon() {
    playWonAudio();
    setTimeout(() => {
        pauseGame();
        hideGamingContainer();
        showWinScreen();
    }, 1000);
}

/**
 * Saves an interval ID to the list of all intervals.
 * 
 * @param {number} id - The interval ID to save.
 */
function saveIntervalId(id) {
    allIntervals.push(id);
}

/**
 * Sets a stoppable interval and saves its ID.
 * 
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The interval time in milliseconds.
 * @param {Object} objectContext - The context object that holds the interval IDs.
 */
function setStoppableInterval(fn, time, objectContext) {
    let intervalId = setInterval(fn, time);
    objectContext.objectInterval.push(intervalId);
    saveIntervalId(intervalId);
}

/**
 * Resumes the game by re-animating characters and enemies and redrawing the world.
 */
function resumeGame() {
    world.level.characters.forEach(character => { character.animate(); });
    world.level.enemies.forEach(enemy => { enemy.animate(); });
    world.level.specialEnemies.forEach(specialEnemy => { specialEnemy.animationModifier(); });
    world.reDraw();
    world.worldIntervals();
}

/**
 * Helper function for recursive actions.
 * 
 * @param {Function} action - The action to perform recursively.
 * @param {number} condition - The condition to check for recursion.
 */
function recursionFunction(action, condition) {
    if (condition > 0) {
        action().then(() => {
            recursionFunction(action, condition - 1);
        });
    }
}


/**
 * Hides the slide screen.
 */
function hideSlideScreen() {
    let slidesContainer = document.getElementById("slidesContainer");
    hideDiv(slidesContainer);
}

/**
 * Shows the slide screen.
 */
function showSlideScreen() {
    let slidesContainer = document.getElementById("slidesContainer");
    showDiv(slidesContainer);
}



/**
 * close the Tutorial overlay
 */
var gameTutorialContainer = document.getElementById('gameTutorialContainer');
  gameTutorialContainer.addEventListener('click', function(event) {
    if (event.target === gameTutorialContainer) {
      closeTutorialPanel()
    }
  });
