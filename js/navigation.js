/* =========================================
   INFINITE CONFUSION
   Navigation Engine
========================================= */


const universe = document.getElementById("universe");


const positions = {

    home: {
        x: 0,
        y: 0
    },

    about: {
        x: 100,
        y: 0
    },

    services: {
        x: 0,
        y: -100
    },

    projects: {
        x: -100,
        y: 0
    },

    contact: {
        x: 0,
        y: 100
    }

};


let currentScreen = "home";


/* =========================================
   Navigation Map
========================================= */

const navigationMap = {

    home: {

        up: "contact",
        down: "services",
        left: "about",
        right: "projects"

    },

    about: {

        right: "home"

    },

    services: {

        up: "home"

    },

    projects: {

        left: "home"

    },

    contact: {

        down: "home"

    }

};


/* =========================================
   Update Direction Indicators
========================================= */

function updateNavigationIndicators() {

    const directions = [
        "up",
        "down",
        "left",
        "right"
    ];


    directions.forEach(direction => {

        const button =
            document.getElementById(`nav-${direction}`);


        if (!button) {
            return;
        }


        const destination =
            navigationMap[currentScreen]?.[direction];


        if (destination) {

            button.classList.add("available");

            button.setAttribute(
                "aria-disabled",
                "false"
            );

        }

        else {

            button.classList.remove("available");

            button.setAttribute(
                "aria-disabled",
                "true"
            );

        }

    });

}


/* =========================================
   Navigate
========================================= */

function navigate(screen) {

    if (!positions[screen]) {
        return;
    }


    const position = positions[screen];


    universe.style.transform =
        `translate(${position.x}vw, ${position.y}vh)`;


    currentScreen = screen;


    updateNavigationIndicators();

}


/* =========================================
   Directional Navigation
========================================= */

function navigateDirection(direction) {

    const destination =
        navigationMap[currentScreen]?.[direction];


    if (!destination) {

        return;

    }


    navigate(destination);

}


/* =========================================
   Keyboard Controls
========================================= */

document.addEventListener("keydown", (event) => {

    switch (event.key) {

        case "ArrowUp":
        case "w":
        case "W":

            navigateDirection("up");

            break;


        case "ArrowDown":
        case "s":
        case "S":

            navigateDirection("down");

            break;


        case "ArrowLeft":
        case "a":
        case "A":

            navigateDirection("left");

            break;


        case "ArrowRight":
        case "d":
        case "D":

            navigateDirection("right");

            break;


        case "Home":

            navigate("home");

            break;

    }

});


/* =========================================
   Button Controls
========================================= */

document
    .getElementById("nav-up")
    .addEventListener(
        "click",
        () => navigateDirection("up")
    );


document
    .getElementById("nav-down")
    .addEventListener(
        "click",
        () => navigateDirection("down")
    );


document
    .getElementById("nav-left")
    .addEventListener(
        "click",
        () => navigateDirection("left")
    );


document
    .getElementById("nav-right")
    .addEventListener(
        "click",
        () => navigateDirection("right")
    );


document
    .getElementById("nav-home")
    .addEventListener(
        "click",
        () => navigate("home")
    );


/* =========================================
   Initial State
========================================= */

updateNavigationIndicators();