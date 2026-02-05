(function() {
    // 1. Inject Ultra Minimal Styles
    const style = document.createElement('style');
    style.textContent = `
        #loading-screen {
            position: fixed;
            inset: 0;
            z-index: 9999999;
            background: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.6s ease;
            pointer-events: all;
            user-select: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .brand-name {
            font-size: 0.9rem;
            font-weight: 400;
            letter-spacing: 0.5em;
            color: #ffffff;
            text-transform: uppercase;
            margin: 0;
            padding-left: 0.5em;
            animation: pulse-simple 2s ease-in-out infinite;
        }

        @keyframes pulse-simple {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }

        /* Exit State */
        .loading-complete {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        body.is-loading {
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Create the Screen
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `<h1 class="brand-name">S Shop LK</h1>`;

    // 3. Logic to inject and remove
    const startLoading = () => {
        if (!document.getElementById('loading-screen')) {
            document.body.classList.add('is-loading');
            document.body.prepend(loadingScreen);
        }
    };

    const stopLoading = () => {
        const screen = document.getElementById('loading-screen');
        if (screen) {
            // Short delay for a clean feel
            setTimeout(() => {
                screen.classList.add('loading-complete');
                document.body.classList.remove('is-loading');
                
                // Cleanup
                setTimeout(() => screen.remove(), 600);
            }, 800); 
        }
    };

    // Execution
    if (document.body) startLoading();
    else document.addEventListener('DOMContentLoaded', startLoading);

    if (document.readyState === 'complete') {
        stopLoading();
    } else {
        window.addEventListener('load', stopLoading);
    }
})();