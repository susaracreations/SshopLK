// Configuration: Change this URL to update the favicon on all pages
const FAVICON_URL = "https://i.ibb.co/7JWLrP7v/sshoplk-favicon.webp";

(function() {
    // Select ALL favicon links (icon, shortcut icon, apple-touch-icon, etc.)
    const links = document.querySelectorAll("link[rel*='icon']");
    
    if (links.length > 0) {
        links.forEach(link => link.href = FAVICON_URL);
    } else {
        const link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = FAVICON_URL;
        document.head.appendChild(link);
    }
})();