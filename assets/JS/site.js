
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

// Mobile navigation
if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

// Automatic copyright year
document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
});

// Page-load morph transition
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.body.classList.add("page-enter-ready");

        window.setTimeout(() => {
            document.body.classList.remove("page-enter");
        }, 1500);
    });
});

// Scroll reveals with staggered animation
const revealItems = [...document.querySelectorAll(".reveal")];

revealItems.forEach(element => {
    const groupIndex = [...element.parentElement.children].indexOf(element);

    element.style.setProperty(
        "--reveal-delay",
        `${Math.min(groupIndex * 85, 340)}ms`
    );
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: "0px 0px -5% 0px"
});

revealItems.forEach(element => {
    observer.observe(element);
});

// Contact form
const form = document.querySelector("#contact-form");

if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const data = new FormData(form);

        const subject = encodeURIComponent(
            `Chronodisrup enquiry: ${data.get("interest")}`
        );

        const body = encodeURIComponent(
            `Name: ${data.get("name")}\n` +
            `Email: ${data.get("email")}\n` +
            `Interest: ${data.get("interest")}\n\n` +
            `${data.get("message")}`
        );

        window.location.href =
            `mailto:REPLACE-WITH-COMPANY-EMAIL?subject=${subject}&body=${body}`;

        document.querySelector("#form-note").textContent =
            "Your email application should open with the enquiry prepared. Configure the company email in site.js before launch.";
    });
}
