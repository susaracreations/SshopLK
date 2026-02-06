/**
 * S Shop LK - Premium Testimonials Widget
 * Version: 2.2.0
 * * Features: 
 * - Human-Centric Organic Design
 * - Adaptive Device Logic
 * - Warm/Natural Color Palette
 * - Hand-drawn SVG Accents
 * - Fluid Micro-interactions
 */

(function() {
    function initTestimonials() {
        const container = document.getElementById('testimonials-widget-container');
        if (!container || container.dataset.loaded) return;
        container.dataset.loaded = "true";

        // Testimonial Data
        const testimonials = [
            {
                name: "Theekshana Malith",
                role: "Verified Buyer",
                avatar: "https://i.ibb.co/Z62XyrZq/286cc8c58093.jpg",
                text: "Excellent service and high-quality products. The delivery was faster than expected. Highly recommend S Shop LK!",
                rating: 5,
                date: "2 days ago"
            },
            {
                name: "Uwan Indumina",
                role: "S Shop LK Member",
                avatar: "https://i.ibb.co/z1gqLZp/cccc1dc3b6c4.jpg",
                text: "The best online shopping experience in Sri Lanka. Their customer support via chat is very helpful and responsive.",
                rating: 5,
                date: "1 week ago"
            },
            {
                name: "Tharaka Deshan",
                role: "Verified Buyer",
                avatar: "https://i.ibb.co/M52FQDKr/3759cc746020.png",
                text: "Great prices and genuine products. I've been shopping here for months and never had an issue.",
                rating: 4,
                date: "3 weeks ago"
            }
        ];

        const style = document.createElement('style');
        style.textContent = `
            :root {
                /* Warmer, more "human" color palette */
                --ts-primary: #2563eb;
                --ts-primary-rgb: 37, 99, 235;
                --ts-bg: #fdfcf9;
                --ts-card-bg: #ffffff;
                --ts-text: #334155;
                --ts-heading: #1e293b;
                --ts-border: #e2e8f0;
                --ts-accent: #f59e0b;
                --ts-subtext: #64748b;
                --ts-avatar-bg: #f8fafc;
                --ts-star: #fbbf24;
                --ts-transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            @media (prefers-color-scheme: dark) {
                :root {
                    --ts-bg: #0f172a;
                    --ts-card-bg: #1e293b;
                    --ts-text: #cbd5e1;
                    --ts-heading: #f8fafc;
                    --ts-border: #334155;
                    --ts-subtext: #94a3b8;
                }
            }

            #testimonials-widget-container {
                font-family: inherit;
                width: 100%;
                max-width: 1200px;
                margin: 60px auto;
                padding: 0 20px;
                box-sizing: border-box;
                position: relative;
            }

            /* Organic Header */
            .ss-header {
                text-align: left;
                margin-bottom: 50px;
                position: relative;
                padding-left: 20px;
                border-left: 4px solid var(--ts-primary);
            }

            .ss-header h2 {
                font-size: clamp(28px, 4vw, 42px);
                color: var(--ts-heading);
                margin: 0;
                font-weight: 800;
                letter-spacing: -1px;
                line-height: 1.2;
            }

            .ss-header p {
                color: var(--ts-subtext);
                margin-top: 10px;
                font-size: 18px;
            }

            /* Desktop Grid with Slight "Irregularity" */
            .ss-testimonial-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 30px;
            }

            /* Human-like Card - Irregular Border Radii */
            .ss-testimonial-card {
                background: var(--ts-card-bg);
                border: 2px solid var(--ts-border);
                /* Slightly irregular corners for a handcrafted feel */
                border-radius: 40px 15px 35px 20px;
                padding: 35px;
                transition: var(--ts-transition);
                display: flex;
                flex-direction: column;
                position: relative;
                box-shadow: 8px 8px 0px var(--ts-border);
            }

            .ss-testimonial-card:hover {
                transform: translate(-4px, -4px);
                box-shadow: 12px 12px 0px var(--ts-primary);
                border-color: var(--ts-primary);
            }

            .ss-quote-mark {
                position: absolute;
                top: -20px;
                left: 30px;
                background: var(--ts-primary);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-family: serif;
                box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
            }

            .ss-stars {
                display: flex;
                gap: 3px;
                margin-bottom: 20px;
            }

            .ss-star-svg {
                width: 18px;
                height: 18px;
                fill: var(--ts-star);
                /* Imperfect star path for human feel */
            }

            .ss-text {
                color: var(--ts-text);
                font-size: 17px;
                line-height: 1.6;
                margin-bottom: 30px;
                font-style: italic;
                flex-grow: 1;
            }

            /* Author Section - Tactile & Clean */
            .ss-author {
                display: flex;
                align-items: center;
                gap: 15px;
                padding-top: 20px;
                border-top: 1px dashed var(--ts-border);
            }

            .ss-avatar {
                width: 50px;
                height: 50px;
                border-radius: 14px;
                overflow: hidden;
                transform: rotate(-3deg);
                transition: transform 0.3s ease;
                border: 2px solid var(--ts-primary);
            }

            .ss-testimonial-card:hover .ss-avatar {
                transform: rotate(0deg) scale(1.1);
            }

            .ss-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .ss-info h4 {
                margin: 0;
                font-size: 17px;
                color: var(--ts-heading);
                font-weight: 700;
            }

            .ss-info p {
                margin: 0;
                font-size: 13px;
                color: var(--ts-subtext);
            }

            /* --- MOBILE ADAPTATION --- */
            @media (max-width: 991px) {
                .ss-scroll-wrapper {
                    overflow-x: auto;
                    scrollbar-width: none;
                    scroll-snap-type: x mandatory;
                    padding: 20px 0;
                    margin: 0 -10px;
                }
                .ss-scroll-wrapper::-webkit-scrollbar { display: none; }
                
                .ss-testimonial-grid {
                    display: flex;
                    width: max-content;
                    padding: 0 10px;
                    gap: 20px;
                }
                
                .ss-testimonial-card {
                    width: 280px;
                    padding: 25px;
                    scroll-snap-align: center;
                }
                
                .ss-header { padding-left: 15px; }
            }

            /* Smooth Controls */
            .ss-controls {
                display: none;
                justify-content: center;
                gap: 8px;
                margin-top: 30px;
            }

            @media (max-width: 991px) {
                .ss-controls { display: flex; }
            }

            .ss-dot {
                width: 12px;
                height: 6px;
                border-radius: 4px;
                background: var(--ts-border);
                transition: var(--ts-transition);
            }

            .ss-dot.active {
                width: 24px;
                background: var(--ts-primary);
            }
        `;
        document.head.appendChild(style);

        // Header
        const header = document.createElement('div');
        header.className = 'ss-header';
        header.innerHTML = `
            <h2>What people say.</h2>
            <p>Real stories from our community.</p>
        `;
        container.appendChild(header);

        // Wrapper
        const scrollWrapper = document.createElement('div');
        scrollWrapper.className = 'ss-scroll-wrapper';

        const grid = document.createElement('div');
        grid.className = 'ss-testimonial-grid';

        testimonials.forEach((t) => {
            let starsSvg = '';
            for(let i=0; i<5; i++) {
                const fill = i < t.rating ? 'var(--ts-star)' : '#cbd5e1';
                // Hand-drawn feel star path
                starsSvg += `<svg class="ss-star-svg" viewBox="0 0 24 24" style="fill: ${fill}">
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
                </svg>`;
            }

            const card = document.createElement('div');
            card.className = 'ss-testimonial-card';
            
            card.innerHTML = `
                <div class="ss-quote-mark">“</div>
                <div class="ss-stars">${starsSvg}</div>
                <div class="ss-text">${t.text}</div>
                <div class="ss-author">
                    <div class="ss-avatar">
                        <img src="${t.avatar}" alt="${t.name}">
                    </div>
                    <div class="ss-info">
                        <h4>${t.name}</h4>
                        <p>${t.role} • ${t.date}</p>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        scrollWrapper.appendChild(grid);
        container.appendChild(scrollWrapper);

        // Controls for Mobile
        const controls = document.createElement('div');
        controls.className = 'ss-controls';
        testimonials.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `ss-dot ${i === 0 ? 'active' : ''}`;
            controls.appendChild(dot);
        });
        container.appendChild(controls);

        // Scroll Sync
        scrollWrapper.addEventListener('scroll', () => {
            const index = Math.round(scrollWrapper.scrollLeft / 300);
            document.querySelectorAll('.ss-dot').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        });
    }

    if (document.readyState === 'complete') {
        initTestimonials();
    } else {
        window.addEventListener('load', initTestimonials);
    }
})();