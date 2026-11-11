
(() => {
  const storageKey = "chronodisrup-theme";

  function applyTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark-theme", dark);

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme"
      );
      const label = button.querySelector(".theme-label");
      const icon = button.querySelector(".theme-icon");
      if (label) label.textContent = dark ? "Light mode" : "Dark mode";
      if (icon) icon.textContent = dark ? "☼" : "◐";
    });
  }

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem(storageKey) || "light";
  } catch (_) {}

  applyTheme(savedTheme);

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark-theme")
        ? "light"
        : "dark";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (_) {}
    });
  });
})();
