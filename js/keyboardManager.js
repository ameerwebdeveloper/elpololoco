/**
 * Handles the keydown event to set the appropriate keyboard properties.
 * @param {KeyboardEvent} event - The keydown event.
 */
document.addEventListener("keydown", (event) => {
    let pressedKeyCode = event.keyCode; 

    
    if ([40, 38, 37, 39, 32, 68].includes(pressedKeyCode)) {
        event.preventDefault();
    }

    
    switch (pressedKeyCode) {
        case 40:
            keyboard.DOWN = true;
            break;
        case 38: 
            keyboard.UP = true;
            break;
        case 37: 
            keyboard.LEFT = true;
            break;
        case 39:
            keyboard.RIGHT = true;
            break;
        case 32: 
            keyboard.SPACE = true;
            break;
        case 68: 
            keyboard.D = true;
            break;
    }
});

/**
 * Handles the keyup event to reset the appropriate keyboard properties.
 * @param {KeyboardEvent} event - The keyup event.
 */
document.addEventListener("keyup", (event) => {
    let pressedKeyCode = event.keyCode; 

    
    if ([40, 38, 37, 39, 32, 68].includes(pressedKeyCode)) {
        event.preventDefault();
    }

    
    switch (pressedKeyCode) {
        case 40: 
            keyboard.DOWN = false;
            break;
        case 38: 
            keyboard.UP = false;
            break;
        case 37: 
            keyboard.LEFT = false;
            break;
        case 39: 
            keyboard.RIGHT = false;
            break;
        case 32: 
            keyboard.SPACE = false;
            break;
        case 68: 
            keyboard.D = false;
            break;
    }
});

// Touch controls

/**
 * Handles the touchstart event to set the LEFT keyboard property.
 * @param {TouchEvent} event - The touchstart event.
 */
document.getElementById("touchLeft").addEventListener('touchstart', event => {
    event.preventDefault();
    keyboard.LEFT = true;
});

/**
 * Handles the touchend event to reset the LEFT keyboard property.
 * @param {TouchEvent} event - The touchend event.
 */
document.getElementById("touchLeft").addEventListener('touchend', event => {
    event.preventDefault();
    keyboard.LEFT = false;
});

/**
 * Handles the touchstart event to set the RIGHT keyboard property.
 * @param {TouchEvent} event - The touchstart event.
 */
document.getElementById("touchRight").addEventListener('touchstart', event => {
    event.preventDefault();
    keyboard.RIGHT = true;
});

/**
 * Handles the touchend event to reset the RIGHT keyboard property.
 * @param {TouchEvent} event - The touchend event.
 */
document.getElementById("touchRight").addEventListener('touchend', event => {
    event.preventDefault();
    keyboard.RIGHT = false;
});

/**
 * Handles the touchstart event to set the SPACE keyboard property.
 * @param {TouchEvent} event - The touchstart event.
 */
document.getElementById("touchUp").addEventListener('touchstart', event => {
    event.preventDefault();
    keyboard.SPACE = true;
});

/**
 * Handles the touchend event to reset the SPACE keyboard property.
 * @param {TouchEvent} event - The touchend event.
 */
document.getElementById("touchUp").addEventListener('touchend', event => {
    event.preventDefault();
    keyboard.SPACE = false;
});

/**
 * Handles the touchstart event to set the D keyboard property.
 * @param {TouchEvent} event - The touchstart event.
 */
document.getElementById("touchThrow").addEventListener('touchstart', event => {
    event.preventDefault();
    keyboard.D = true;
});

/**
 * Handles the touchend event to reset the D keyboard property.
 * @param {TouchEvent} event - The touchend event.
 */
document.getElementById("touchThrow").addEventListener('touchend', event => {
    event.preventDefault();
    keyboard.D = false;
});
