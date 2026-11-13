
// Chronodisrup shared navigation and page behaviour.
(() => {
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav");
    const header = document.querySelector(".header");
  
    const closeMenu = () => {
      if (!menuButton || !nav) return;
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      document.body.classList.remove("menu-open");
    };
  
    // Mobile navigation: the menu overlays the page instead of shifting content.
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const open = !nav.classList.contains("open");
        nav.classList.toggle("open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        document.body.classList.toggle("menu-open", open);
      });
  
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
      });
  
      document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
      });
  
      document.addEventListener("pointerdown", event => {
        if (nav.classList.contains("open") && header && !header.contains(event.target)) {
          closeMenu();
        }
      });
  
      window.addEventListener("resize", () => {
        if (window.innerWidth > 760) closeMenu();
      });
    }
  
    // Automatic copyright year.
    document.querySelectorAll("[data-year]").forEach(element => {
      element.textContent = new Date().getFullYear();
    });
  
    // Page-load transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("page-enter-ready");
        window.setTimeout(() => document.body.classList.remove("page-enter"), 1500);
      });
    });
  
    // Scroll reveals with staggered animation.
    const revealItems = [...document.querySelectorAll(".reveal")];
    revealItems.forEach(element => {
      const parent = element.parentElement;
      const groupIndex = parent ? [...parent.children].indexOf(element) : 0;
      element.style.setProperty("--reveal-delay", `${Math.min(groupIndex * 85, 340)}ms`);
    });
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
      revealItems.forEach(element => observer.observe(element));
    } else {
      revealItems.forEach(element => element.classList.add("visible"));
    }
  
    // Contact form: keep the existing mailto workflow, but do not pretend it sent.
    const form = document.querySelector("#contact-form");
    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        const data = new FormData(form);
        const subject = encodeURIComponent(`Chronodisrup enquiry: ${data.get("interest")}`);
        const body = encodeURIComponent(
          `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n` +
          `Interest: ${data.get("interest")}\n\n${data.get("message")}`
        );
        window.location.href =
          `mailto:REPLACE-WITH-COMPANY-EMAIL?subject=${subject}&body=${body}`;
        const note = document.querySelector("#form-note");
        if (note) note.textContent =
          "Your email application should open with the enquiry prepared. Configure the company email in site.js before launch.";
      });
    }
  })();
  