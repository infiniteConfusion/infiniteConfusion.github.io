/* =========================================
   INFINITE CONFUSION
   Touch Navigation
========================================= */


let touchStartX = 0;
let touchStartY = 0;


document.addEventListener("touchstart", (event) => {

    const touch = event.changedTouches[0];

    touchStartX = touch.screenX;
    touchStartY = touch.screenY;

}, { passive: true });


document.addEventListener("touchend", (event) => {

    const touch = event.changedTouches[0];

    const touchEndX = touch.screenX;
    const touchEndY = touch.screenY;


    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;


    const minimumSwipe = 50;


    if (
        Math.abs(deltaX) < minimumSwipe &&
        Math.abs(deltaY) < minimumSwipe
    ) {
        return;
    }


    /*
        Determine whether the gesture
        was primarily horizontal or vertical.
    */

    if (Math.abs(deltaX) > Math.abs(deltaY)) {

        if (deltaX > 0) {

            navigateDirection("left");

        } else {

            navigateDirection("right");

        }

    }

    else {

        if (deltaY > 0) {

            navigateDirection("up");

        } else {

            navigateDirection("down");

        }

    }

});