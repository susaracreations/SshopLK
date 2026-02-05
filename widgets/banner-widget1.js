/**
 * Gaming & Software Banner Widget
 * Usage: 
 * 1. Place <div id="banner-widget1"></div> in your HTML.
 * 2. Add <script src="banner-widget1.js"></script>
 */

(function() {
    // CONFIGURATION: Add your image URL here
    const backgroundImageURL = "https://i.ibb.co/Jw0rTf66/56ef3466fba6.png"; 

    // 1. Create and Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        .game-banner-container {
            width: 100%;
            max-width: 1200px;
            margin: 15px auto;
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            background-color: #0a0a0a;
            color: #ffffff;
            display: flex;
            align-items: center;
            min-height: 240px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .game-banner-container.visible {
            opacity: 1;
            transform: translateY(0);
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
            opacity: 0.6; /* Adjust this for general brightness of the image */
        }

        /* Fading Overlay: Makes the image fade into the black background on the left */
        .game-banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            background: linear-gradient(90deg, 
                rgba(10,10,10,1) 0%, 
                rgba(10,10,10,0.9) 25%, 
                rgba(10,10,10,0.4) 60%, 
                rgba(10,10,10,0.1) 100%
            );
        }

        .game-banner-content {
            position: relative;
            z-index: 3;
            padding: 30px 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .game-banner-text {
            flex: 1;
        }

        .game-banner-title {
            font-size: 38px;
            font-weight: 800;
            line-height: 1.1;
            margin: 0 0 12px 0;
            letter-spacing: -1.2px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .game-banner-subtitle {
            font-size: 17px;
            color: #d0d0d0;
            margin: 0;
            font-weight: 400;
            max-width: 480px;
            text-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }

        .game-banner-cta {
            background-color: #ffffff;
            color: #000000;
            padding: 14px 28px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 17px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(255,255,255,0.1);
        }

        .game-banner-cta:hover {
            transform: scale(1.05);
            background-color: #f8f8f8;
        }

        .cart-icon {
            width: 20px;
            height: 20px;
        }

        @media (max-width: 600px) {
            .game-banner-container {
                min-height: 100px;
                border-radius: 16px;
                margin: 10px;
                width: calc(100% - 20px);
            }
            
            .game-banner-content {
                padding: 15px 20px;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
            }

            .game-banner-title {
                font-size: 18px;
                margin: 0;
                letter-spacing: -0.5px;
            }

            .game-banner-subtitle {
                display: none;
            }

            .game-banner-cta {
                padding: 10px 16px;
                font-size: 13px;
                border-radius: 12px;
            }

            .cart-icon {
                width: 14px;
                height: 14px;
            }
            
            .game-banner-overlay {
                 background: linear-gradient(90deg, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.4) 100%);
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

    // Trigger appearance animation
    setTimeout(() => {
        banner.classList.add('visible');
    }, 100);
})();