/* Apply the saved colour preference before the stylesheet paints. */
(function () {
  "use strict";
  try {
    const settings = JSON.parse(localStorage.getItem("fc-v3-settings") || "{}");
    const saved = settings.theme || localStorage.getItem("fc-theme");
    const preferred = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", saved === "dark" || saved === "light" ? saved : preferred);
  } catch (_error) {
    // A disabled or unavailable storage API should not prevent the app from loading.
  }
})();
