// Configuration: Change these to update the website font
const FONT_URL = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
const FONT_FAMILY = "'Space Grotesk', sans-serif";

(function() {
    // Add Google Fonts Link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);

    // Add Style Tag for Body Font Family
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: ${FONT_FAMILY};
        }
    `;
    document.head.appendChild(style);
})();