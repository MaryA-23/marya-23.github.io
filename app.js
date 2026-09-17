// =========================================================
// THEME SELECTOR
// =========================================================

const themeButtons = document.querySelectorAll("[data-theme-option]");
const root = document.documentElement;

const allowedThemes = ["light", "dark", "colorful"];

function applyTheme(theme) {
  const selectedTheme = allowedThemes.includes(theme)
    ? theme
    : "light";

  root.setAttribute("data-theme", selectedTheme);

  localStorage.setItem(
    "portfolio-theme",
    selectedTheme
  );

  themeButtons.forEach((button) => {
    const isActive =
      button.dataset.themeOption === selectedTheme;

    button.classList.toggle("active", isActive);
    button.classList.toggle("theme-active", isActive);

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}

const savedTheme =
  localStorage.getItem("portfolio-theme") || "light";

applyTheme(savedTheme);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeOption);
  });
});


// =========================================================
// MOBILE NAVIGATION
// =========================================================

const menuButton =
  document.getElementById("menu-btn");

const mobileMenu =
  document.getElementById("mobile-menu");

const mobileLinks =
  document.querySelectorAll(".mobile-link");

function closeMobileMenu() {
  if (!menuButton || !mobileMenu) return;

  const menuIcon =
    menuButton.querySelector("i");

  mobileMenu.classList.add("hidden");

  if (menuIcon) {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open navigation"
  );
}

if (menuButton && mobileMenu) {
  const menuIcon =
    menuButton.querySelector("i");

  menuButton.addEventListener(
    "click",
    () => {
      mobileMenu.classList.toggle("hidden");

      const menuIsOpen =
        !mobileMenu.classList.contains("hidden");

      if (menuIcon) {
        menuIcon.classList.toggle(
          "fa-bars",
          !menuIsOpen
        );

        menuIcon.classList.toggle(
          "fa-times",
          menuIsOpen
        );
      }

      menuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        menuIsOpen
          ? "Close navigation"
          : "Open navigation"
      );
    }
  );

  mobileLinks.forEach((link) => {
    link.addEventListener(
      "click",
      closeMobileMenu
    );
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    }
  );
}


// =========================================================
// CURRENT YEAR
// =========================================================

const year =
  document.getElementById("year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}


// =========================================================
// NAVBAR SHADOW
// =========================================================

const navbar =
  document.getElementById("navbar");

function updateNavbar() {
  if (!navbar) return;

  navbar.classList.toggle(
    "shadow-sm",
    window.scrollY > 20
  );
}

window.addEventListener(
  "scroll",
  updateNavbar,
  { passive: true }
);

updateNavbar();


// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const navLinks =
  document.querySelectorAll(
    '.nav-link[href^="#"], .mobile-link[href^="#"]'
  );

const sectionIds = [
  ...new Set(
    [...navLinks]
      .map((link) =>
        link.getAttribute("href")
      )
      .filter(
        (href) =>
          href && href.length > 1
      )
  )
];

const sections = sectionIds
  .map((id) =>
    document.querySelector(id)
  )
  .filter(Boolean);

function setActiveNavigation(sectionId) {
  navLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") ===
      `#${sectionId}`;

    link.classList.toggle(
      "nav-active",
      isActive
    );

    if (isActive) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      link.removeAttribute(
        "aria-current"
      );
    }
  });
}

function updateActiveNavigation() {
  if (!sections.length) return;

  const marker =
    window.scrollY + 150;

  let currentSection =
    sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= marker) {
      currentSection = section;
    }
  });

  const nearBottom =
    window.innerHeight +
      window.scrollY >=
    document.documentElement.scrollHeight -
      80;

  if (nearBottom) {
    currentSection =
      sections[sections.length - 1];
  }

  setActiveNavigation(
    currentSection.id
  );
}

window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateActiveNavigation
);

updateActiveNavigation();


// =========================================================
// SMOOTH INTERNAL NAVIGATION
// =========================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetId
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        if (
          link.classList.contains(
            "mobile-link"
          )
        ) {
          closeMobileMenu();
        }
      }
    );
  });


// =========================================================
// SCROLL REVEAL ANIMATIONS
// =========================================================

const revealSelectors = [
  "#about > div > div",
  ".project-card",
  ".infra-item",
  ".skill-category",
  ".experience-card",
  ".achievement-card",
  ".education-card",
  "#contact form"
];

const revealElements =
  document.querySelectorAll(
    revealSelectors.join(", ")
  );

revealElements.forEach(
  (element, index) => {
    element.classList.add(
      "reveal-on-scroll"
    );

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(
        (index % 4) * 70,
        210
      )}ms`
    );
  }
);

if (
  "IntersectionObserver" in window
) {
  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (
            !entry.isIntersecting
          ) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );

  revealElements.forEach(
    (element) => {
      revealObserver.observe(
        element
      );
    }
  );
} else {
  revealElements.forEach(
    (element) => {
      element.classList.add(
        "is-visible"
      );
    }
  );
}


// =========================================================
// CONTACT FORM
// =========================================================

const contactForm =
  document.getElementById(
    "contact-form"
  );

const formMessage =
  document.getElementById(
    "form-message"
  );

const submitButton =
  document.getElementById(
    "submit-btn"
  );

if (contactForm) {
  contactForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const buttonText =
        submitButton
          ? submitButton.querySelector(
              "span"
            )
          : null;

      const buttonIcon =
        submitButton
          ? submitButton.querySelector(
              "i"
            )
          : null;

      if (formMessage) {
        formMessage.className =
          "mt-4 hidden rounded-xl px-4 py-3 text-sm";

        formMessage.textContent = "";
      }

      if (submitButton) {
        submitButton.disabled = true;
      }

      if (buttonText) {
        buttonText.textContent =
          "Sending...";
      }

      if (buttonIcon) {
        buttonIcon.className =
          "fas fa-spinner fa-spin";
      }

      try {
        const formData =
          new FormData(contactForm);

        const response =
          await fetch(
            contactForm.action,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept:
                  "application/json"
              }
            }
          );

        if (response.ok) {
          if (formMessage) {
            formMessage.textContent =
              "Thank you! Your message has been sent successfully.";

            formMessage.className =
              "mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300";
          }

          contactForm.reset();
        } else {
          let errorMessage =
            "Your message could not be sent. Please try again.";

          try {
            const data =
              await response.json();

            if (
              data.errors &&
              data.errors.length > 0
            ) {
              errorMessage =
                data.errors
                  .map(
                    (error) =>
                      error.message
                  )
                  .join(", ");
            }
          } catch (error) {
            // Keep default message.
          }

          if (formMessage) {
            formMessage.textContent =
              errorMessage;

            formMessage.className =
              "mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300";
          }
        }
      } catch (error) {
        console.error(
          "Contact form error:",
          error
        );

        if (formMessage) {
          formMessage.textContent =
            "Unable to send your message right now. Please contact me directly at ayivorm@gmail.com.";

          formMessage.className =
            "mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled =
            false;
        }

        if (buttonText) {
          buttonText.textContent =
            "Send Message";
        }

        if (buttonIcon) {
          buttonIcon.className =
            "fas fa-paper-plane";
        }
      }
    }
  );
}