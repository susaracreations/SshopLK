(function() {
    /**
     * S Shop LK - Premium Loading Engine
     * An advanced, highly creative loading sequence with 
     * particle physics, SVG path animation, and multi-stage transitions.
     */

    // 1. Inject Comprehensive Visual System
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --brand-primary: #ffffff;
            --brand-bg: #0f172a;
            --accent-glow: rgba(255, 255, 255, 0.15);
            --transition-main: cubic-bezier(0.65, 0, 0.35, 1);
        }

        #loading-screen {
            position: fixed;
            inset: 0;
            z-index: 9999999;
            background: var(--brand-bg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: transform 1.2s var(--transition-main), opacity 0.8s ease;
            pointer-events: all;
            user-select: none;
            overflow: hidden;
            perspective: 1000px;
        }

        /* Canvas Particle Background */
        #loader-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.4;
            pointer-events: none;
        }

        .loader-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 10;
            width: 100%;
            max-width: 400px;
            padding: 40px;
            text-align: center;
        }

        /* Sophisticated Logo System */
        .logo-box {
            position: relative;
            width: 120px;
            height: 120px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 6s ease-in-out infinite;
        }

        .logo-svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 0 20px var(--accent-glow));
        }

        .path-s {
            fill: none;
            stroke: var(--brand-primary);
            stroke-width: 2;
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: draw-path 3s forwards ease-in-out infinite alternate;
        }

        .logo-circle {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 50%;
        }

        .logo-circle-inner {
            position: absolute;
            width: 80%;
            height: 80%;
            border: 2px solid transparent;
            border-top-color: var(--brand-primary);
            border-radius: 50%;
            animation: spin 2s linear infinite;
        }

        /* Typography & Branding */
        .text-reveal-mask {
            overflow: hidden;
            margin-bottom: 10px;
        }

        .brand-name {
            font-size: 1.2rem;
            font-weight: 900;
            letter-spacing: 0.8em;
            color: var(--brand-primary);
            text-transform: uppercase;
            margin: 0;
            padding-left: 0.8em;
            transform: translateY(100%);
            animation: slide-up 0.8s forwards 0.5s var(--transition-main);
        }

        .status-text {
            font-size: 0.7rem;
            font-weight: 400;
            letter-spacing: 0.3em;
            color: rgba(255, 255, 255, 0.4);
            text-transform: uppercase;
            height: 20px;
            transition: opacity 0.3s ease;
        }

        /* Advanced Progress Bar */
        .progress-wrapper {
            width: 100%;
            max-width: 200px;
            height: 2px;
            background: rgba(255, 255, 255, 0.05);
            margin-top: 30px;
            position: relative;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background: var(--brand-primary);
            box-shadow: 0 0 10px var(--brand-primary);
            transition: width 0.4s ease;
        }

        /* Keyframes */
        @keyframes draw-path {
            0% { stroke-dashoffset: 400; opacity: 0.2; }
            50% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: -400; opacity: 0.2; }
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes slide-up {
            to { transform: translateY(0); }
        }

        /* Interaction & Responsive */
        .loading-complete {
            opacity: 0 !important;
            transform: scale(1.05) translateY(-20px) !important;
            pointer-events: none !important;
        }

        body.is-loading {
            overflow: hidden !important;
            touch-action: none;
        }

        /* Stage transitions */
        .stage-fade { opacity: 0; transform: translateY(5px); }

        @media (max-width: 768px) {
            .brand-name { font-size: 1rem; letter-spacing: 0.5em; }
            .logo-box { width: 90px; height: 90px; }
            .loader-container { padding: 20px; }
        }
    `;
    document.head.appendChild(style);

    // 2. Build the Document Structure
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    
    loadingScreen.innerHTML = `
        <canvas id="loader-canvas"></canvas>
        <div class="loader-container">
            <div class="logo-box">
                <div class="logo-circle"></div>
                <div class="logo-circle-inner"></div>
                <svg class="logo-svg" viewBox="0 0 100 100">
                    <path class="path-s" d="M30,35 C30,20 70,20 70,35 C70,50 30,50 30,65 C30,80 70,80 70,65" />
                </svg>
            </div>
            <div class="text-reveal-mask">
                <h1 class="brand-name">S Shop LK</h1>
            </div>
            <div id="loader-status" class="status-text">Initializing Systems</div>
            <div class="progress-wrapper">
                <div id="loader-progress" class="progress-fill"></div>
            </div>
        </div>
    `;

    // 3. Advanced Background Particle Engine
    let canvas, ctx, particles = [];
    const particleCount = 60;

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.alpha = Math.random() * 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        canvas = document.getElementById('loader-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!document.getElementById('loading-screen')) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();
    };

    // 4. Progress Logic & Scripted Sequences
    const statusMessages = [
        "Synchronizing Assets",
        "Optimizing UX",
        "Loading Premium Collections",
        "Finalizing Interface",
        "Welcome to S Shop"
    ];

    let currentProgress = 0;
    let messageIndex = 0;

    const updateSequence = () => {
        const progressEl = document.getElementById('loader-progress');
        const statusEl = document.getElementById('loader-status');
        
        if (!progressEl || !statusEl) return;

        // Artificial slow-fast-slow progress curve
        const step = () => {
            if (currentProgress < 100) {
                const increment = Math.random() * (currentProgress > 80 ? 0.5 : 2);
                currentProgress = Math.min(currentProgress + increment, 99);
                progressEl.style.width = `${currentProgress}%`;

                // Rotate messages
                if (currentProgress > (messageIndex + 1) * 20) {
                    messageIndex++;
                    if (statusMessages[messageIndex]) {
                        statusEl.style.opacity = '0';
                        setTimeout(() => {
                            statusEl.textContent = statusMessages[messageIndex];
                            statusEl.style.opacity = '1';
                        }, 300);
                    }
                }
                setTimeout(step, 50 + Math.random() * 100);
            }
        };
        step();
    };

    // 5. Execution & Lifecycle Management
    const startLoading = () => {
        if (!document.getElementById('loading-screen')) {
            document.body.classList.add('is-loading');
            document.body.prepend(loadingScreen);
            initParticles();
            updateSequence();
        }
    };

    const stopLoading = () => {
        const screen = document.getElementById('loading-screen');
        const progressEl = document.getElementById('loader-progress');
        const statusEl = document.getElementById('loader-status');

        if (screen) {
            // Force completion
            currentProgress = 100;
            if (progressEl) progressEl.style.width = '100%';
            if (statusEl) statusEl.textContent = "Ready";

            setTimeout(() => {
                screen.classList.add('loading-complete');
                document.body.classList.remove('is-loading');
                
                // Cleanup after transition
                setTimeout(() => {
                    screen.remove();
                    // Optional: remove style tag if needed
                }, 1200);
            }, 800); 
        }
    };

    // Entry Points
    if (document.body) startLoading();
    else document.addEventListener('DOMContentLoaded', startLoading);

    // Wait for full window load
    if (document.readyState === 'complete') {
        stopLoading();
    } else {
        window.addEventListener('load', stopLoading);
    }

    // Protection against infinite loading (Safety Timeout)
    setTimeout(stopLoading, 8000);

})();