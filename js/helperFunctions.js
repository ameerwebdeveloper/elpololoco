document.addEventListener("DOMContentLoaded", () => {
    checkOr();
    window.addEventListener("orientationchange", checkOr);
    window.addEventListener("resize", checkOr); // Fallback for devices that don't support orientationchange
});

/**
 * Checks the current orientation and shows or hides the appropriate elements.
 */
function checkOr() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        showRotateYourDeviceOverlay();
    } else {
        closeRotateYourDeviceOverlay();
    }
}

/**
 * Shows the overlay and slides container, hides the play again button.
 */
function showRotateYourDeviceOverlay() {
    let rotateDeviceOverlay = document.getElementById("rotateDeviceOverlay");
    let slidesContainer = document.getElementById("slidesContainer");
    let playAgainButton = document.getElementById("playAgainButton");
    showDiv(rotateDeviceOverlay);
    showDiv(slidesContainer);
    hideDiv(playAgainButton);
}

/**
 * Hides the overlay and slides container, shows the play again button.
 */
function closeRotateYourDeviceOverlay() {
    let rotateDeviceOverlay = document.getElementById("rotateDeviceOverlay");
    let slidesContainer = document.getElementById("slidesContainer");
    let playAgainButton = document.getElementById("playAgainButton");
    hideDiv(rotateDeviceOverlay);
    hideDiv(slidesContainer);
    showDiv(playAgainButton);
}

/**
 * Shows a specified div.
 * 
 * @param {HTMLElement} div - The div to show.
 */
function showDiv(div) {
    div.classList.remove('d-none');
}

/**
 * Hides a specified div.
 * 
 * @param {HTMLElement} div - The div to hide.
 */
function hideDiv(div) {
    div.classList.add('d-none');
}
