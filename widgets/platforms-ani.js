class PlatformsAnimation {
    constructor() {
        this.containerId = 'platforms-animation-container';
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.injectStyles();
            this.render(container);
        }
    }

    injectStyles() {
        if (document.getElementById('platforms-ani-styles')) return;

        // Inject Font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        const style = document.createElement('style');
        style.id = 'platforms-ani-styles';
        style.textContent = `
            .pa-scroll-wrapper {
                width: 100%;
                overflow: hidden;
                position: relative;
                padding: 0;
                background-color: #0f172a; 
                font-family: 'Inter', sans-serif;
                user-select: none;
                pointer-events: none;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                /* Creative Masking */
                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }

            .pa-platform-track {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                gap: 6rem;
                align-items: center;
                width: max-content;
                animation: pa-scroll 45s linear infinite;
                will-change: transform;
                padding: 1.5rem 0;
            }

            @keyframes pa-scroll {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
            }

            /* Creative Floating Effect */
            @keyframes pa-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
            }

            .pa-platform-item {
                display: flex;
                align-items: center;
                gap: 16px;
                opacity: 0.9;
                flex-shrink: 0;
                filter: saturate(0.9);
                animation: pa-float 4s ease-in-out infinite;
            }

            /* Staggering the float animation for creativity */
            .pa-platform-item:nth-child(even) {
                animation-delay: -2s;
            }

            .pa-platform-logo {
                height: 28px;
                width: auto;
                object-fit: contain;
                display: block;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            }

            .pa-platform-text {
                color: #ffffff;
                font-weight: 800;
                font-size: 1rem;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                line-height: 1;
                display: inline-block;
                white-space: nowrap;
            }

            .pa-steam-text { font-weight: 600; letter-spacing: 0.15em; }
            .pa-epic-store-text { font-size: 1rem; font-weight: 900; transform: scaleY(1.1); }
            .pa-ea-text { color: #ff4747; font-weight: 900; font-size: 1.15rem; }
            .pa-xbox-text { color: #107c10; font-weight: 800; font-size: 1.1rem; }
            .pa-battle-text { font-weight: 600; font-size: 1rem; }
            .pa-battle-accent { color: #00aeff; font-weight: 900; }

            /* Professional Edge Fades with a hint of blur */
            .pa-scroll-wrapper::before,
            .pa-scroll-wrapper::after {
                content: "";
                position: absolute;
                top: 0;
                width: 12%;
                height: 100%;
                z-index: 2;
                pointer-events: none;
                backdrop-filter: blur(1px); /* Creative touch: slight edge blur */
            }
            .pa-scroll-wrapper::before {
                left: 0;
                background: linear-gradient(to right, #0f172a, transparent);
            }
            .pa-scroll-wrapper::after {
                right: 0;
                background: linear-gradient(to left, #0f172a, transparent);
            }

            /* Optimized & Smaller Mobile Transitions */
            @media (max-width: 768px) {
                .pa-platform-track { 
                    gap: 3.5rem; 
                    animation-duration: 30s;
                    padding: 1rem 0;
                }
                .pa-platform-logo { height: 20px; }
                .pa-platform-text { font-size: 0.85rem; }
                .pa-platform-item { gap: 10px; }
                .pa-ea-text { font-size: 1rem; }
                .pa-xbox-text { font-size: 0.95rem; }
                .pa-epic-store-text { font-size: 0.85rem; }
            }

            @media (max-width: 480px) {
                .pa-platform-track { gap: 2.5rem; animation-duration: 22s; }
                .pa-platform-logo { height: 18px; }
                .pa-platform-text { font-size: 0.75rem; letter-spacing: 0.05em; }
                .pa-scroll-wrapper::before, .pa-scroll-wrapper::after { width: 8%; }
            }
        `;
        document.head.appendChild(style);
    }

    render(container) {
        const itemsHTML = `
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/960px-Steam_icon_logo.svg.png?20220611141426" alt="Steam" class="pa-platform-logo">
                <span class="pa-platform-text pa-steam-text">STEAM<sup>®</sup></span>
            </div>
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg" alt="Epic Store" class="pa-platform-logo" style="filter: invert(1); height: 32px;">
                <span class="pa-epic-store-text">STORE</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/ubisoft/white" alt="Ubisoft" class="pa-platform-logo">
                <span class="pa-platform-text">UBISOFT</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/ea/ff4747" alt="EA Play" class="pa-platform-logo">
                <span class="pa-platform-text pa-ea-text">Play</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/960px-Xbox_one_logo.svg.png" alt="Xbox" class="pa-platform-logo" style="filter: brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(1210%) hue-rotate(84deg) brightness(94%) contrast(92%);">
                <span class="pa-platform-text pa-xbox-text">XBOX</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/battledotnet/00aeff" alt="Battle.net" class="pa-platform-logo">
                <span class="pa-platform-text pa-battle-text">BATTLE<span class="pa-battle-accent">.</span>NET</span>
            </div>
        `;

        container.innerHTML = `
            <div class="pa-scroll-wrapper">
                <div class="pa-platform-track">
                    ${itemsHTML}
                    ${itemsHTML}
                    ${itemsHTML}
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const platformsAnimation = new PlatformsAnimation();
    platformsAnimation.init();
});