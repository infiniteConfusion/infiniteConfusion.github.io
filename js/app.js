/* =========================================
   INFINITE CONFUSION
   Application
========================================= */


document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Infinite Confusion initialized."
    );


    const contactForm =
        document.getElementById("contact-form");

    const contactStatus =
        document.getElementById("contact-status");

    const contactSubmit =
        document.getElementById("contact-submit");


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            contactSubmit.disabled = true;

            contactSubmit.textContent =
                "SENDING...";


            contactStatus.textContent =
                "";


            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        "https://formspree.io/f/mqpzyavv",
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    contactForm.reset();


                    contactStatus.textContent =
                        "MESSAGE RECEIVED.";


                    contactSubmit.textContent =
                        "SENT";


                } else {

                    throw new Error(
                        "Form submission failed."
                    );

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                contactStatus.textContent =
                    "Something went wrong. Please try again.";


                contactSubmit.textContent =
                    "SEND";


            } finally {

                contactSubmit.disabled = false;

            }

        }
    );

});