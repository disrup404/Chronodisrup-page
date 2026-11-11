CHRONODISRUP THEME UPDATE

1. Replace the old logo file:
   assets/images/chronodisrup-logo.png

   This is the correct silver CD mark with the blue slash from your supplied image.
   Make sure every page uses:
   assets/images/chronodisrup-logo.png

2. Add this inside the <head> of each HTML page, after the main stylesheet:
   <link rel="stylesheet" href="assets/css/theme-toggle.css">

3. Add this button inside the navigation on every page:
   <button class="theme-toggle" type="button" aria-label="Switch to dark theme"
           aria-pressed="false">
     <span class="theme-icon" aria-hidden="true">◐</span>
     <span class="theme-label">Dark mode</span>
   </button>

4. Add this before </body> on every page:
   <script src="assets/js/theme-toggle.js"></script>

The theme choice is saved in localStorage, so it remains selected when visitors move
between pages and when they return to the site.

The theme CSS covers the main page surfaces and text. Check any custom components
you add later to ensure they also use the shared CSS variables:
--paper, --ink, and --line.
