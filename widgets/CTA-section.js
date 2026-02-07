class CTASection {
    constructor() {
        this.containerId = 'cta-section-container';
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.render(container);
        }
    }

    render(container) {
        // Replace this URL with your actual background image URL
        const bgImageUrl = 'https://i.ibb.co/23KmLjYB/ecd00540c08f.jpg';

        container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            
            #cta-section-container {
                
                width: 100vw;
                position: relative;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw;
            }

            .widget-cta-container {
                position: relative;
                background: #0b0f1a;
                overflow: hidden;
                width: 100%;
                min-height: auto;
            }

            .widget-bg-image {
                position: absolute;
                inset: 0;
                background-image: url('${bgImageUrl}');
                background-size: cover;
                background-position: center;
                opacity: 0.15;
                z-index: 0;
            }

            .widget-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(to bottom, rgba(11, 15, 26, 0.7), #0b0f1a);
                z-index: 1;
            }

            .widget-text-gradient {
                background: linear-gradient(to right, #60a5fa, #f472b6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .widget-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
            }
            
            .simple-wrapper {
                min-height: 250px; /* Reduced from 350px for a shorter banner */
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        </style>

        <section class="widget-cta-container w-full">
            <div class="widget-bg-image"></div>
            <div class="widget-overlay"></div>

            <div class="relative z-10 w-full simple-wrapper text-center gap-4 p-6 md:p-10 mx-auto">
                
                <div class="max-w-3xl space-y-3">
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        Start your <span class="widget-text-gradient">digital journey</span> today
                    </h2>
                    
                    <p class="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                        Fast and reliable delivery on all premium digital products with secure checkout.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center">
                        <a href="products.html" class="widget-btn w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-sm md:text-base shadow-lg shadow-blue-900/20 gap-2">
                            Start Shopping
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        </a>
                        <a href="learn-more.html" class="widget-btn w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl text-sm md:text-base">
                            How It Works
                        </a>
                    </div>
                </div>

            </div>
        </section>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ctaSection = new CTASection();
    ctaSection.init();
});