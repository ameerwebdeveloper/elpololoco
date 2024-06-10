let click = new Audio('./audio/click.mp3');
let go = new Audio('./audio/go.wav');
let backgroundMusic = new Audio('./audio/backgroundMusic.wav');
let lost = new Audio('./audio/lost.mp3');
let won = new Audio('./audio/win.mp3');
let userInteracted = false;
let muted = false;
let isBackgroundMusicOn = true;

/**
 * Mutes or unmutes all sounds and changes the mute icon accordingly.
 */
function muteSounds() {
    if (!muted) {
        muted = true;
        changeMuteIcon(muted);
        pauseBackgroundMusic();
    } else {
        muted = false;
        changeMuteIcon(muted);
        playBackgroundMusic();
    }
}

/**
 * Changes the mute icon based on the muted state.
 * 
 * @param {boolean} muted - Indicates whether the sounds are muted.
 */
function changeMuteIcon(muted) {
    let muteIcon = document.getElementById("muteIcon");
    if (muted) {
        muteIcon.src = "./icons/mute1.svg";
    } else {
        muteIcon.src = "./icons/UnMute.svg";
    }
}

/**
 * Plays the click sound if not muted.
 */
function playClickSound() {
    if (!muted && userInteracted) {
        click.play();
    }
}

/**
 * Plays the go sound if not muted.
 */
function playGoInSound() {
    if (!muted) {
        go.play();
    }
}

/**
 * Toggles the background music on or off.
 */
function backgroundMusicModifier() {
    if (isBackgroundMusicOn) {
        pauseBackgroundMusic();
        isBackgroundMusicOn = false;
    } else {
        playBackgroundMusic();
        isBackgroundMusicOn = true;
    }
}

/**
 * Plays the background music if not muted.
 */
function playBackgroundMusic() {
    if (!muted) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.09;
        backgroundMusic.play();
        changeMusicIcon("on");
    }
}

/**
 * Pauses the background music and resets its playback position.
 */
function pauseBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    changeMusicIcon("off");
}

/**
 * Changes the background music icon based on the music state.
 * 
 * @param {string} input - The state of the music ("on" or "off").
 */
function changeMusicIcon(input) {
    let musicIcon = document.getElementById("backgroundMusicIcon");
    if (input == "off") {
        musicIcon.src = "./icons/music_off.svg";
    } else {
        musicIcon.src = "./icons/music_on.svg";
    }
}

/**
 * Plays the lost sound and pauses the background music.
 */
function playLostAudio() {
    pauseBackgroundMusic();
    lost.play();
}

/**
 * Stops the lost sound.
 */
function stopLostAudio() {
    lost.pause();
}

/**
 * Plays the won sound and pauses the background music.
 */
function playWonAudio() {
    pauseBackgroundMusic();
    won.play();
}

/**
 * Stops the won sound.
 */
function stopWonAudio() {
    won.pause();
}

/**
 *  Add event listeners to detect user interaction
 */
document.addEventListener('click', () => {
    userInteracted = true;
});
document.addEventListener('keydown', () => {
    userInteracted = true;
});
