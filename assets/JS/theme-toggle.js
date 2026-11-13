
(() => {
  const storageKey = "chronodisrup-theme";
  const root = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.classList.toggle("dark-theme", dark);
    if (document.body) document.body.classList.toggle("dark-theme", dark);

    document.querySelectorAll(".theme-toggle").forEach(button => {
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      const label = button.querySelector(".theme-label");
      const icon = button.querySelector(".theme-icon");
      if (label) label.textContent = dark ? "Light mode" : "Dark mode";
      if (icon) icon.textContent = dark ? "☼" : "◐";
    });

    if (metaThemeColor) metaThemeColor.setAttribute("content", dark ? "#080c13" : "#f5f5f2");
  }

  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem(storageKey) || "dark";
  } catch (_) {}

  applyTheme(savedTheme);

  document.querySelectorAll(".theme-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const nextTheme = root.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(nextTheme);
      try { localStorage.setItem(storageKey, nextTheme); } catch (_) {}
    });
  });
})();
