
const languageToggle = document.getElementById("language-toggle");
const enLabel = document.getElementById("en-label");
const frLabel = document.getElementById("fr-label");

const translatedElements = document.querySelectorAll(
    "[data-en][data-fr]"
);

function setLanguage(language) {
    // Translate all bilingual elements
    translatedElements.forEach(element => {
        element.textContent = element.dataset[language];
    });

    // Update toggle
    languageToggle.checked = language === "fr";

    // Highlight active language
    enLabel.classList.toggle("active", language === "en");
    frLabel.classList.toggle("active", language === "fr");

    // Update HTML language
    document.documentElement.lang = language;

    // Update page title
    document.title = language === "fr"
        ? "Florence Chouinard | Programmeuse jouabilité"
        : "Florence Chouinard | Gameplay Programmer";

    // Update accessibility label
    languageToggle.setAttribute(
        "aria-label",
        language === "fr"
            ? "Passer en anglais"
            : "Switch to French"
    );

    // Update CV link based on language
    const cvLink = document.getElementById("cv-link");

    if (cvLink) {
        cvLink.href = language === "fr"
            ? "assets/CV_Florence_Chouinard_FR.pdf"
            : "assets/CV_Florence_Chouinard_EN.pdf";
    }

    // Save preference
    try {
        localStorage.setItem("portfolio-language", language);
    } catch (error) {
        // Continue without saving if storage is unavailable
    }
}

// Listen for toggle changes
languageToggle.addEventListener("change", () => {
    setLanguage(languageToggle.checked ? "fr" : "en");
});

// Restore saved language
let savedLanguage = "en";

try {
    savedLanguage = localStorage.getItem("portfolio-language");
} catch (error) {
    // Use English by default
}

setLanguage(savedLanguage === "fr" ? "fr" : "en");
