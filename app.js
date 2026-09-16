// =========================================================
// MOBILE NAVIGATION
// =========================================================

const menuButton = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (menuButton && mobileMenu) {
  const menuIcon = menuButton.querySelector("i");

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    const menuIsOpen = !mobileMenu.classList.contains("hidden");

    if (menuIcon) {
      menuIcon.classList.toggle("fa-bars", !menuIsOpen);
      menuIcon.classList.toggle("fa-times", menuIsOpen);
    }

    menuButton.setAttribute("aria-expanded", String(menuIsOpen));

    menuButton.setAttribute(
      "aria-label",
      menuIsOpen ? "Close navigation" : "Open navigation"
    );
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");

      if (menuIcon) {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}


// =========================================================
// CURRENT YEAR
// =========================================================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// =========================================================
// NAVBAR SHADOW
// =========================================================

const navbar = document.getElementById("navbar");

function updateNavbar() {
  if (!navbar) return;

  if (window.scrollY > 20) {
    navbar.classList.add("shadow-sm");
  } else {
    navbar.classList.remove("shadow-sm");
  }
}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


// =========================================================
// CONTACT FORM
// =========================================================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get button content
    const buttonText = submitButton
      ? submitButton.querySelector("span")
      : null;

    const buttonIcon = submitButton
      ? submitButton.querySelector("i")
      : null;


    // -----------------------------------------------------
    // RESET MESSAGE
    // -----------------------------------------------------

    if (formMessage) {
      formMessage.className = "mt-4 hidden rounded-xl px-4 py-3 text-sm";
      formMessage.textContent = "";
    }


    // -----------------------------------------------------
    // LOADING STATE
    // -----------------------------------------------------

    if (submitButton) {
      submitButton.disabled = true;
    }

    if (buttonText) {
      buttonText.textContent = "Sending...";
    }

    if (buttonIcon) {
      buttonIcon.className = "fas fa-spinner fa-spin";
    }


    try {
      // ---------------------------------------------------
      // CREATE FORM DATA
      // ---------------------------------------------------

      const formData = new FormData(contactForm);


      // ---------------------------------------------------
      // SEND TO FORMSPREE
      // ---------------------------------------------------

      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });


      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      if (response.ok) {
        if (formMessage) {
          formMessage.textContent =
            "Thank you! Your message has been sent successfully.";

          formMessage.className =
            "mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300";
        }

        contactForm.reset();
      }


      // ---------------------------------------------------
      // FORMSPREE ERROR
      // ---------------------------------------------------

      else {
        let errorMessage =
          "Your message could not be sent. Please try again.";

        try {
          const data = await response.json();

          if (data.errors && data.errors.length > 0) {
            errorMessage = data.errors
              .map((error) => error.message)
              .join(", ");
          }
        } catch (error) {
          // Keep default error message
        }

        if (formMessage) {
          formMessage.textContent = errorMessage;

          formMessage.className =
            "mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300";
        }
      }
    }


    // -----------------------------------------------------
    // NETWORK ERROR
    // -----------------------------------------------------

    catch (error) {
      console.error("Contact form error:", error);

      if (formMessage) {
        formMessage.textContent =
          "Unable to send your message right now. Please contact me directly at ayivorm@gmail.com.";

        formMessage.className =
          "mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300";
      }
    }


    // -----------------------------------------------------
    // RESTORE BUTTON
    // -----------------------------------------------------

    finally {
      if (submitButton) {
        submitButton.disabled = false;
      }

      if (buttonText) {
        buttonText.textContent = "Send Message";
      }

      if (buttonIcon) {
        buttonIcon.className = "fas fa-paper-plane";
      }
    }
  });
}