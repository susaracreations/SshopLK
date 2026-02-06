class PlatformsAnimation {
    constructor() {
        this.containerId = 'platforms-animation-container';
        this.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.trackElement = null;
        
        // Animation State
        this.targetTranslate = 0;
        this.currentTranslate = 0;
        this.lerpFactor = 0.1; // Adjust for "weight" (lower = smoother/slower)
        this.isScrolling = false;
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.injectStyles();
            this.render(container);
            this.trackElement = container.querySelector('.pa-platform-track');
            
            // Start the smooth animation loop
            this.setupScrollListener();
            this.animate();
        }
    }

    injectStyles() {
        if (document.getElementById('platforms-ani-styles')) return;

        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;800;900&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        const style = document.createElement('style');
        style.id = 'platforms-ani-styles';
        style.textContent = `
            .pa-scroll-wrapper {
                width: 100%;
                overflow: hidden;
                position: relative;
                padding: 1rem 0;
                background-color: #0f172a; 
                font-family: 'Inter', sans-serif;
                user-select: none;
                pointer-events: none;
                -webkit-font-smoothing: antialiased;
                display: flex;
                align-items: center;
                mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }

            .pa-platform-track {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                gap: 4rem; /* Decreased gap from 8rem */
                align-items: center;
                width: max-content;
                will-change: transform;
                padding: 2rem 0;
                /* We remove CSS transitions to allow JS to handle smooth interpolation (LERP) */
                transition: none;
            }

            .pa-platform-item {
                display: flex;
                align-items: center;
                gap: 12px; /* Decreased internal item gap */
                opacity: 0.9;
                flex-shrink: 0;
                position: relative;
            }

            .pa-platform-logo {
                height: 28px;
                width: auto;
                object-fit: contain;
                display: block;
                filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
            }

            .pa-platform-text {
                color: #ffffff;
                font-weight: 800;
                font-size: 1rem;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                line-height: 1;
                display: inline-block;
                white-space: nowrap;
            }

            .pa-steam-text { font-weight: 500; letter-spacing: 0.2em; }
            .pa-epic-store-text { font-size: 1rem; transform: scaleY(1.05); font-weight: 900; }
            .pa-ea-text { color: #ff4747; font-size: 1.15rem; }
            .pa-xbox-text { color: #107c10; font-size: 1.1rem; }

            @media (max-width: 1024px) {
                .pa-platform-track { gap: 3rem; padding: 1.5rem 0; }
                .pa-platform-logo { height: 22px; }
                .pa-platform-text { font-size: 0.85rem; }
            }

            @media (max-width: 480px) {
                .pa-scroll-wrapper { padding: 0.5rem 0; }
                .pa-platform-track { gap: 2rem; padding: 1rem 0; }
                .pa-platform-logo { height: 16px; }
                .pa-platform-text { font-size: 0.75rem; letter-spacing: 0.08em; }
                .pa-platform-item { gap: 8px; }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const diff = st - this.lastScrollTop;
            
            // Interaction: Update target position based on scroll delta
            // Multiplier 0.8 controls the "speed" of horizontal travel per vertical scroll
            this.targetTranslate -= diff * 0.8;
            
            this.lastScrollTop = st <= 0 ? 0 : st;
        }, { passive: true });
    }

    animate() {
        // LERP: Linear Interpolation for smooth motion
        this.currentTranslate += (this.targetTranslate - this.currentTranslate) * this.lerpFactor;

        // Loop Logic
        // We calculate half width of the track (since it contains two identical sets)
        if (this.trackElement) {
            const halfWidth = this.trackElement.offsetWidth / 2;
            
            // If we move too far left, wrap to 0
            if (this.currentTranslate <= -halfWidth) {
                this.targetTranslate += halfWidth;
                this.currentTranslate += halfWidth;
            }
            // If we move too far right (upward scroll), wrap to -halfWidth
            else if (this.currentTranslate > 0) {
                this.targetTranslate -= halfWidth;
                this.currentTranslate -= halfWidth;
            }

            this.trackElement.style.transform = `translate3d(${this.currentTranslate}px, 0, 0)`;
        }

        requestAnimationFrame(() => this.animate());
    }

    render(container) {
        const brands = `
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/960px-Steam_icon_logo.svg.png?20220611141426" alt="Steam" class="pa-platform-logo">
                <span class="pa-platform-text pa-steam-text">STEAM<sup>®</sup></span>
            </div>
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg" alt="Epic Store" class="pa-platform-logo" style="filter: invert(1); height: 32px;">
                <span class="pa-epic-store-text pa-platform-text">STORE</span>
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
                <span class="pa-platform-text pa-battle-text">BATTLE<span style="color:#00aeff">.</span>NET</span>
            </div>
        `;

        container.innerHTML = `
            <div class="pa-scroll-wrapper">
                <div class="pa-platform-track">
                    ${brands}
                    ${brands}
                </div>
            </div>
        `;
    }
}

(function() {
    const start = () => {
        const platformsAnimation = new PlatformsAnimation();
        platformsAnimation.init();
    };
    
    if (document.readyState === 'complete') {
        start();
    } else {
        window.addEventListener('load', start);
    }
})();