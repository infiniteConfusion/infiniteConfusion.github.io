/* =========================================
   INFINITE CONFUSION
   Services
========================================= */


const serviceData = {

    computers: {

        number: "01",

        title: "COMPUTER & IT",

        content: `
            <p>
                Computers are supposed to make life easier.
                When they don't, things get infinitely confusing.
            </p>

            <h3>REPAIRS</h3>

            <p>
                Hardware and software troubleshooting,
                component replacement, diagnostics and
                general computer repair.
            </p>

            <h3>UPGRADES</h3>

            <p>
                RAM, storage, graphics cards, cooling,
                power supplies and other hardware upgrades.
            </p>

            <h3>CUSTOM BUILDS</h3>

            <p>
                From budget systems to purpose-built machines,
                we can help select the hardware and put
                everything together.
            </p>

            <h3>TROUBLESHOOTING</h3>

            <p>
                Freezing, crashes, boot problems, driver issues,
                operating system problems and those mysterious
                things that make computers angry.
            </p>
        `

    },


    consoles: {

        number: "02",

        title: "GAME CONSOLES",

        content: `
            <p>
                Game consoles aren't disposable appliances.
                Sometimes they just need somebody willing to
                figure out what's wrong with them.
            </p>

            <h3>REPAIRS</h3>

            <p>
                Hardware diagnostics and component-level repairs
                for modern and retro gaming systems.
            </p>

            <h3>HDMI & PORT REPAIR</h3>

            <p>
                Damaged HDMI ports, USB ports and other
                connectors can often be repaired rather than
                replacing the entire system.
            </p>

            <h3>MODIFICATION</h3>

            <p>
                Custom modifications, upgrades and hardware
                projects for compatible systems.
            </p>

            <h3>RESTORATION</h3>

            <p>
                Bringing older hardware back to life and
                preserving the systems people grew up with.
            </p>
        `

    },


    web: {

        number: "03",

        title: "WEB DEVELOPMENT",

        content: `
            <p>
                Websites shouldn't all look like they came from
                the same template.
            </p>

            <h3>WEBSITES</h3>

            <p>
                Custom websites designed around the person,
                business or project behind them.
            </p>

            <h3>WEB APPLICATIONS</h3>

            <p>
                Interactive applications built with modern
                JavaScript and backend technologies.
            </p>

            <h3>DATABASE SYSTEMS</h3>

            <p>
                Data-driven applications, inventory systems,
                management tools and custom solutions.
            </p>
        `

    },


    electronics: {

        number: "04",

        title: "ELECTRONICS",

        content: `
            <p>
                This is where things get interesting.
            </p>

            <p>
                Custom electronics projects, embedded systems,
                audio, lighting and hardware integrations.
            </p>

            <h3>MICROCONTROLLERS</h3>

            <p>
                ESP32 and other microcontroller-based projects.
            </p>

            <h3>AUDIO</h3>

            <p>
                Custom audio projects, speakers, amplifiers
                and sound-triggered electronics.
            </p>

            <h3>LIGHTING</h3>

            <p>
                LED systems, effects and custom lighting
                installations.
            </p>

            <h3>CUSTOM PROJECTS</h3>

            <p>
                If you have an idea that doesn't fit neatly
                into a category, that's probably where we
                should start.
            </p>
        `

    }

};


/* =========================================
   Elements
========================================= */

const serviceOverlay =
    document.getElementById("service-overlay");

const serviceClose =
    document.getElementById("service-close");

const serviceModalNumber =
    document.getElementById("service-modal-number");

const serviceModalTitle =
    document.getElementById("service-modal-title");

const serviceModalBody =
    document.getElementById("service-modal-body");


/* =========================================
   Open Service
========================================= */

function openService(service) {

    const data = serviceData[service];

    if (!data) {
        return;
    }


    serviceModalNumber.textContent =
        data.number;

    serviceModalTitle.textContent =
        data.title;

    serviceModalBody.innerHTML =
        data.content;


    serviceOverlay.classList.add("active");

    serviceOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        Prevent the main page from scrolling
        while the service information is open.
    */

    document.body.classList.add(
        "service-open"
    );


    serviceClose.focus();

}


/* =========================================
   Close Service
========================================= */

function closeService() {

    serviceOverlay.classList.remove(
        "active"
    );

    serviceOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "service-open"
    );

}


/* =========================================
   Service Buttons
========================================= */

document
    .querySelectorAll(".service")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service;

                openService(service);

            }
        );

    });


/* =========================================
   Close Button
========================================= */

serviceClose.addEventListener(
    "click",
    closeService
);


/* =========================================
   Click Outside Modal
========================================= */

serviceOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target === serviceOverlay
        ) {

            closeService();

        }

    }
);


/* =========================================
   Escape Key
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            serviceOverlay.classList.contains("active")
        ) {

            closeService();

        }

    }
);