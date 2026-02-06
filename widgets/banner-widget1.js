/**
 * Gaming & Software Banner Widget
 * Usage: 
 * 1. Place <div id="banner-widget1"></div> in your HTML.
 * 2. Add <script src="banner-widget1.js"></script>
 */

(function() {
    // CONFIGURATION: Add your image URL here
    const backgroundImageURL = "https://i.ibb.co/qYQD37Qt/63ddec68dd35.jpg"; 

    // 1. Create and Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        .game-banner-container {
            width: calc(100% - 20px);
            max-width: 1200px;
            margin: 15px auto;
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            background-color: #000b29;
            color: #ffffff;
            display: flex;
            align-items: center;
            min-height: 240px;
            box-shadow: 0 10px 30px rgba(0, 17, 43, 0.5);
            /* Animations removed */
            opacity: 1;
            transform: none;
            box-sizing: border-box;
        }

        /* The Custom Background Image Layer */
        .game-banner-image-bg {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-image: url('${backgroundImageURL}');
            background-size: cover;
            background-position: center right;
            opacity: 0.6;
        }

        /* Fading Overlay */
        .game-banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            background: linear-gradient(90deg, 
                rgb(0, 16, 41) 0%, 
                rgba(0, 19, 43, 0.9) 25%, 
                rgba(0, 16, 41, 0.4) 60%, 
                rgba(0, 14, 31, 0.1) 100%
            );
        }

        .game-banner-content {
            position: relative;
            z-index: 3;
            padding: 30px 5%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            box-sizing: border-box;
        }

        .game-banner-text {
            flex: 1;
        }

        .game-banner-title {
            font-size: clamp(24px, 4vw, 38px);
            font-weight: 800;
            line-height: 1.1;
            margin: 0 0 12px 0;
            letter-spacing: -1.2px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .game-banner-subtitle {
            font-size: clamp(14px, 1.5vw, 17px);
            color: #d0d0d0;
            margin: 0;
            font-weight: 400;
            max-width: 480px;
            text-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }

        .game-banner-cta {
            background-color: #ffd000;
            color: #000000;
            padding: clamp(10px, 1.5vw, 14px) clamp(20px, 2.5vw, 28px);
            border-radius: 50px;
            font-weight: 700;
            font-size: clamp(14px, 1.5vw, 17px);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(255, 238, 0, 0.1);
            transition: background-color 0.2s ease;
        }

        .game-banner-cta:hover {
            background-color: #ffb000;
        }

        .cart-icon {
            width: clamp(16px, 1.8vw, 20px);
            height: clamp(16px, 1.8vw, 20px);
        }

        /* Medium screens (Tablets) */
        @media (max-width: 900px) {
            .game-banner-container {
                min-height: 180px;
            }
            .game-banner-content {
                padding: 20px 30px;
            }
        }

        /* Mobile specific adjustments */
        @media (max-width: 600px) {
            .game-banner-container {
                min-height: 100px;
                border-radius: 16px;
                margin: 10px auto;
            }
            
            .game-banner-content {
                padding: 15px 20px;
                gap: 10px;
            }

            .game-banner-title {
                letter-spacing: -0.5px;
                margin-bottom: 0;
            }

            .game-banner-subtitle {
                display: none; /* Keep mobile clean */
            }

            .game-banner-cta {
                padding: 8px 14px;
                border-radius: 12px;
            }

            .game-banner-overlay {
                 background: linear-gradient(90deg, rgba(0, 11, 41, 0.9) 40%, rgba(0, 18, 58, 0.3) 100%);
            }
        }

        /* Very small screens */
        @media (max-width: 400px) {
            .game-banner-title {
                font-size: 16px;
            }
            .game-banner-cta {
                font-size: 12px;
                padding: 6px 10px;
            }
            .cart-icon {
                display: none; /* Hide icon on tiny screens to save space */
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Create Banner HTML Structure
    const banner = document.createElement('div');
    banner.className = 'game-banner-container';

    banner.innerHTML = `
        <div class="game-banner-image-bg"></div>
        <div class="game-banner-overlay"></div>
        <div class="game-banner-content">
            <div class="game-banner-text">
                <h1 class="game-banner-title">Games & Software</h1>
                <p class="game-banner-subtitle">Looking for the latest games and software? We've got you covered!</p>
            </div>
            <a href="products.html" class="game-banner-cta">
                <span>Buy Now</span>
                <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </a>
        </div>
    `;

    // 3. Targeting & Injection Logic
    const targetId = 'banner-widget1';
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.appendChild(banner);
    } else {
        const currentScript = document.currentScript;
        if (currentScript) {
            currentScript.parentNode.insertBefore(banner, currentScript);
        } else {
            document.body.appendChild(banner);
        }
    }
})();