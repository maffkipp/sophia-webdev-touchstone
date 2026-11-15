const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";

const themeSwitch = document.getElementById("theme-switcher");
const htmlElement = document.documentElement;

// The switch label should always read the opposite of the current theme.
const switchLabelMap = {
    dark: "Light Mode",
    light: "Dark Mode",
};

// Check for previously selected theme value on page load
loadSavedTheme();

// Set up event listener for toggle switch
themeSwitch.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute(THEME_ATTR);
    const newTheme = computeNextTheme(currentTheme);
    saveSelectedTheme(newTheme);
});

// Looks for a saved theme and applies it to the provided root element
function loadSavedTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
        htmlElement.setAttribute(THEME_ATTR, savedTheme);
        updateSwitchTextContent(savedTheme);
    }
}

// Computes the next theme based on the current theme
function computeNextTheme(theme) {
    return theme === "dark" ? "light" : "dark";
}

// Adds the selected theme to the provided root element and saves it in local storage
function saveSelectedTheme(theme) {
    htmlElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateSwitchTextContent(theme);
}

// Updates switch text based on the passed in active theme
function updateSwitchTextContent(theme) {
    console.log(theme);
    themeSwitch.textContent = switchLabelMap[theme];
}
