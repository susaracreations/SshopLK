class PlatformsAnimation {
    constructor() {
        this.containerId = 'platforms-animation-container';
        this.trackElement = null;
        
        // Physics & Animation State
        this.currentX = 0;
        this.baseSpeed = 0.6;       // Constant "butter" flow
        this.scrollVelocity = 0;    // Momentum from scrolling
        this.friction = 0.92;       // Smooth decay
        this.lastScrollTop = 0;
        this.isHovered = false;
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.injectStyles();
            this.render(container);
            this.trackElement = container.querySelector('.pa-platform-track');
            
            this.setupScrollListener();
            this.setupInteractions(container);
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
                padding: 2rem 0;
                margin-bottum: 2rem;
                /* Glass Effect */
                background: rgba(0, 16, 37, 0.45);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-top: 1px solid rgba(255, 255, 255, 0);
                border-bottom: 1px solid rgba(255, 255, 255, 0);
                font-family: 'Inter', sans-serif;
                user-select: none;
                /* Soft fade edges */
                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }

            .pa-platform-track {
                display: flex;
                gap: 5rem;
                width: max-content;
                will-change: transform;
                padding: 2rem 0;
            }

            .pa-platform-item {
                display: flex;
                align-items: center;
                gap: 14px;
                cursor: pointer;
                transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, filter 0.4s ease;
                /* Initial "resting" state */
                opacity: 0.5;
                filter: grayscale(100%);
            }

            /* Human-like interaction: Wakes up on hover */
            .pa-platform-item:hover {
                opacity: 1;
                filter: grayscale(0%);
                transform: translateY(-2px) scale(1.05);
            }

            .pa-platform-logo {
                height: 32px;
                width: auto;
                object-fit: contain;
                display: block;
                transition: all 0.4s ease;
            }

            .pa-platform-text {
                color: #e2e8f0; /* Soft white/gray */
                font-weight: 700;
                font-size: 1.1rem;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                white-space: nowrap;
            }

            /* Brand Specific Tweaks */
            .pa-steam-text { font-weight: 600; letter-spacing: 0.1em; }
            .pa-epic-store-text { font-weight: 800; font-style: italic; }
            .pa-ea-text { color: #ff4747; }
            .pa-xbox-text { color: #107c10; }
            .pa-battle-text span { color: #00aeff; }
            .pa-ps-text { color: #0070d1; }

            /* Dark Mode Support */
            @media (prefers-color-scheme: light) {
                .pa-platform-text { color: #334155; }
                .pa-platform-item { filter: grayscale(100%) brightness(0.8); }
                .pa-platform-item:hover { filter: grayscale(0%) brightness(1); }
            }

            @media (max-width: 1024px) {
                .pa-platform-track { gap: 3rem; }
                .pa-platform-logo { height: 24px; }
                .pa-platform-text { font-size: 0.9rem; }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollListener() {
        // Use a single listener for performance
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const delta = st - this.lastScrollTop;
            this.lastScrollTop = st <= 0 ? 0 : st;

            // Inject momentum based on scroll speed
            // We limit the max velocity to prevent visual glitching
            const velocity = delta * 0.5; 
            this.scrollVelocity += Math.max(Math.min(velocity, 50), -50);
        }, { passive: true });
    }

    setupInteractions(container) {
        container.addEventListener('mouseenter', () => this.isHovered = true);
        container.addEventListener('mouseleave', () => this.isHovered = false);
    }

    animate() {
        // 1. Determine Target Speed
        // Slow down when hovered for readability
        const currentBaseSpeed = this.isHovered ? 0.2 : this.baseSpeed;

        // 2. Apply Physics
        // Move left by default (subtracting from X)
        // scrollVelocity adds to this movement
        this.currentX -= (currentBaseSpeed + this.scrollVelocity);

        // Friction decays the scroll momentum
        this.scrollVelocity *= this.friction;

        // 3. Infinite Loop Logic
        if (this.trackElement) {
            // We have 4 sets of items. We reset when we've moved 1 set's worth.
            // Total width is roughly track.scrollWidth.
            // Reset condition: |currentX| >= totalWidth / 2 (assuming 2 halves logic for simplicity)
            
            const totalWidth = this.trackElement.scrollWidth;
            const halfWidth = totalWidth / 2;

            // Wrap around
            if (this.currentX <= -halfWidth) {
                this.currentX += halfWidth;
            } else if (this.currentX > 0) {
                this.currentX -= halfWidth;
            }

            this.trackElement.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
        }

        requestAnimationFrame(() => this.animate());
    }

    render(container) {
        const brands = `
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/960px-Steam_icon_logo.svg.png?20220611141426" alt="Steam" class="pa-platform-logo">
                <span class="pa-platform-text pa-steam-text">STEAM</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg" alt="Epic" class="pa-platform-logo" style="filter: invert(1);">
                <span class="pa-platform-text pa-epic-store-text">EPIC</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/ubisoft/white" alt="Ubisoft" class="pa-platform-logo">
                <span class="pa-platform-text">UBISOFT</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/ea/ff4747" alt="EA" class="pa-platform-logo">
                <span class="pa-platform-text pa-ea-text">EA Play</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/960px-Xbox_one_logo.svg.png" alt="Xbox" class="pa-platform-logo" style="filter: brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(1210%) hue-rotate(84deg) brightness(94%) contrast(92%);">
                <span class="pa-platform-text pa-xbox-text">XBOX</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/playstation/0070d1" alt="PlayStation" class="pa-platform-logo">
                <span class="pa-platform-text pa-ps-text">PLAYSTATION</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/battledotnet/00aeff" alt="Battle.net" class="pa-platform-logo">
                <span class="pa-platform-text pa-battle-text">BATTLE<span>.</span>NET</span>
            </div>
            <div class="pa-platform-item">
                <img src="https://cdn.simpleicons.org/riotgames/d32936" alt="Riot" class="pa-platform-logo">
                <span class="pa-platform-text">RIOT</span>
            </div>
        `;

        // Duplicate 4 times to ensure smooth infinite scroll on large screens
        container.innerHTML = `
            <div class="pa-scroll-wrapper">
                <div class="pa-platform-track">
                    ${brands}
                    ${brands}
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