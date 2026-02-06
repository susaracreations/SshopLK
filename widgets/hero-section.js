class HeroSection {
    constructor() {
        this.containerId = 'hero-section-container';
        this.heroImages = [];
        this.currentImageIndex = 0;
        this.carouselInterval = null;
        this.isAutoPlaying = true;
        this.lastFirebaseCall = 0;
        this.MIN_CALL_INTERVAL = 2000;
        this.isInitializing = false;
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.injectStyles();
            this.render(container);
            this.loadHeroImages();
        }
    }

    injectStyles() {
        if (document.getElementById('hero-section-styles')) return;
        const style = document.createElement('style');
        style.id = 'hero-section-styles';
        style.textContent = `
            /* Animated background for hero section */
            @keyframes move-bg {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animated-hero-bg {
                background: linear-gradient(-45deg, #1e3a8a, #3b0764, #0f172a, #4c1d95);
                background-size: 400% 400%;
                animation: move-bg 20s ease infinite;
            }
            /* Accessibility: Reduce motion for users who prefer it */
            @media (prefers-reduced-motion: reduce) {
                .animated-hero-bg {
                    animation: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    render(container) {
        container.innerHTML = `
        <section id="heroSection" aria-labelledby="hero-heading" class="animated-hero-bg text-white py-16 md:py-28 relative overflow-hidden">
            <!-- Background Image Overlay -->
            <div id="heroBackgroundImage" class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 hidden"></div>
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
            
            <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10 relative z-10">
                <!-- Left side: Text and Search -->
                <div class="flex-1 text-center lg:text-left">
                    <h1 id="hero-heading" class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300" style="text-shadow: 0 0 20px rgba(196, 181, 253, 0.3);">
                        Your Digital Marketplace<br>Starts Here.
                    </h1>
                    <p class="text-lg md:text-xl text-gray-200 mb-8">
                        Your one-stop shop for the best digital products and gaming services in Sri Lanka.
                    </p>
                    <form role="search" onsubmit="handleSearch(); return false;" class="max-w-xl mx-auto lg:mx-0 relative">
                        <div class="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/20 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                            <input type="text" id="searchInput" placeholder="Search for products..." aria-label="Search for products" class="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none placeholder-gray-300" autocomplete="off">
                            <button type="submit" aria-label="Submit search" class="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-400">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <!-- Autocomplete suggestions container -->
                        <div id="autocomplete-suggestions" role="listbox" class="absolute mt-2 w-full bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-700 z-50 hidden max-h-72 overflow-y-auto">
                            <!-- Suggestions will be injected here -->
                        </div>
                    </form>
                    <!-- Trust Badges -->
                    <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 mt-8 text-sm text-gray-300">
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Secure Shopping</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Trusted by Shoppers</span>
                        </div>
                    </div>
                </div>

                <!-- Right side: Mascot Image (Optional) -->
                <div id="heroImageContainer" class="flex-1 flex justify-center lg:justify-end group" role="region" aria-label="Featured Content Carousel">
                    <!-- Hero image carousel with auto-fading -->
                    <div id="heroCarousel" class="relative w-full max-w-xs sm:max-w-sm md:max-w-lg h-48 sm:h-64 md:h-80 rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20">
                        <div id="heroImageInnerContainer" class="w-full h-full relative">
                            <!-- Images will be loaded dynamically -->
                        </div>
                        <!-- Carousel indicators -->
                        <div id="carouselIndicators" role="tablist" aria-label="Carousel Slides" class="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            <!-- Indicators will be added dynamically -->
                        </div>
                        <!-- Navigation arrows -->
                        <button id="prevButton" aria-label="Previous slide" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button id="nextButton" aria-label="Next slide" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    loadHeroImages() {
        if (this.isInitializing) return;
        this.isInitializing = true;
        
        const now = Date.now();
        if (now - this.lastFirebaseCall < this.MIN_CALL_INTERVAL) {
            this.loadDefaults();
            this.isInitializing = false;
            return;
        }
        
        const fetchSettings = () => {
            this.lastFirebaseCall = Date.now();
            window.FirebaseService.getWebsiteSettings().then(settings => {
                if (settings && settings.heroImages && settings.heroImages.length > 0) {
                    this.heroImages = settings.heroImages;
                } else {
                    this.loadHeroImagesFromLocalStorage();
                }
                
                if (settings && settings.heroBackgroundImage) {
                    this.loadHeroBackgroundImage(settings.heroBackgroundImage);
                } else {
                    this.loadHeroBackgroundImageFromLocalStorage();
                }
                
                if (settings && settings.showHeroImages !== undefined) {
                    this.toggleHeroImageVisibility(settings.showHeroImages);
                } else {
                    this.toggleHeroImageVisibilityFromLocalStorage();
                }
                
                this.initializeCarousel();
                this.isInitializing = false;
            }).catch(error => {
                console.error('Error loading hero images:', error);
                this.loadDefaults();
                this.isInitializing = false;
            });
        };

        if (window.FirebaseService) {
            fetchSettings();
        } else {
            // Wait for FirebaseService to be ready
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds timeout
            const interval = setInterval(() => {
                attempts++;
                if (window.FirebaseService) {
                    clearInterval(interval);
                    fetchSettings();
                } else if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    console.warn('FirebaseService not available for Hero Section, loading defaults.');
                    this.loadDefaults();
                    this.isInitializing = false;
                }
            }, 100);
        }
    }

    loadDefaults() {
        this.loadHeroImagesFromLocalStorage();
        this.loadHeroBackgroundImageFromLocalStorage();
        this.toggleHeroImageVisibilityFromLocalStorage();
        this.initializeCarousel();
    }

    loadHeroBackgroundImage(backgroundImageUrl) {
        const backgroundElement = document.getElementById('heroBackgroundImage');
        if (!backgroundElement) return;
        
        if (backgroundImageUrl) {
            if (typeof backgroundImageUrl === 'string') {
                backgroundElement.style.backgroundImage = `url('${backgroundImageUrl}')`;
                backgroundElement.style.opacity = '0.2';
                backgroundElement.classList.remove('hidden');
            } else {
                backgroundElement.style.backgroundImage = `url('${backgroundImageUrl.url}')`;
                backgroundElement.style.opacity = (backgroundImageUrl.opacity / 100).toString();
                backgroundElement.classList.remove('hidden');
            }
        } else {
            backgroundElement.classList.add('hidden');
        }
    }

    loadHeroBackgroundImageFromLocalStorage() {
        const backgroundImageData = localStorage.getItem('sShopHeroBackgroundImage');
        if (backgroundImageData) {
            try {
                const settings = JSON.parse(backgroundImageData);
                this.loadHeroBackgroundImage(settings);
            } catch (error) {
                this.loadHeroBackgroundImage(backgroundImageData);
            }
        }
    }

    toggleHeroImageVisibility(show) {
        const heroImageContainer = document.getElementById('heroImageContainer');
        if (!heroImageContainer) return;

        if (show && this.heroImages.length > 0) {
            heroImageContainer.className = 'flex-1 flex justify-center lg:justify-end';
            setTimeout(() => this.initializeCarousel(), 100);
        } else {
            heroImageContainer.className = 'flex-1 flex justify-center lg:justify-end hidden';
            if (this.carouselInterval) clearInterval(this.carouselInterval);
        }
    }

    toggleHeroImageVisibilityFromLocalStorage() {
        const showHeroImages = localStorage.getItem('sShopShowHeroImages');
        if (showHeroImages !== null) {
            this.toggleHeroImageVisibility(showHeroImages === 'true');
        } else {
            this.toggleHeroImageVisibility(this.heroImages.length > 0);
        }
    }

    loadHeroImagesFromLocalStorage() {
        const storedImages = localStorage.getItem('sShopHeroImages');
        if (storedImages) {
            this.heroImages = JSON.parse(storedImages);
        } else {
            this.heroImages = [
                { url: 'https://placehold.co/600x400/805ad5/ffffff?text=S+Shop+LK', alt: 'S Shop LK Hero 1' },
                { url: 'https://placehold.co/600x400/667eea/ffffff?text=Gaming+Products', alt: 'S Shop LK Hero 2' },
                { url: 'https://placehold.co/600x400/764ba2/ffffff?text=Best+Deals', alt: 'S Shop LK Hero 3' }
            ];
        }
    }

    initializeCarousel() {
        if (this.heroImages.length === 0) return;
        const container = document.getElementById('heroImageInnerContainer');
        const indicators = document.getElementById('carouselIndicators');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const heroContainer = document.getElementById('heroImageContainer');

        if (!container || !indicators || !prevButton || !nextButton) return;
        if (heroContainer.classList.contains('hidden')) return;

        container.innerHTML = '';
        indicators.innerHTML = '';

        this.heroImages.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.alt || `Slide ${index + 1}`;
            imgElement.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
            container.appendChild(imgElement);

            const indicator = document.createElement('button');
            indicator.className = `w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white' : 'bg-white bg-opacity-50'}`;
            indicator.onclick = () => this.showImage(index);
            indicators.appendChild(indicator);
        });

        prevButton.onclick = () => this.previousImage();
        nextButton.onclick = () => this.nextImage();
        
        // Hover effects
        const carousel = document.getElementById('heroCarousel');
        if (carousel && window.matchMedia('(min-width: 768px)').matches) {
            carousel.addEventListener('mouseenter', () => {
                prevButton.classList.remove('opacity-0');
                nextButton.classList.remove('opacity-0');
                this.isAutoPlaying = false;
            });
            carousel.addEventListener('mouseleave', () => {
                prevButton.classList.add('opacity-0');
                nextButton.classList.add('opacity-0');
                this.isAutoPlaying = true;
            });
        }

        this.startAutoPlay();
    }

    showImage(index) {
        const images = document.querySelectorAll('#heroImageInnerContainer img');
        const indicators = document.querySelectorAll('#carouselIndicators button');
        
        images.forEach(img => img.classList.add('opacity-0'));
        indicators.forEach(ind => {
            ind.classList.remove('bg-white');
            ind.classList.add('bg-white', 'bg-opacity-50');
        });

        if (images[index]) {
            images[index].classList.remove('opacity-0');
            indicators[index].classList.remove('bg-opacity-50');
            indicators[index].classList.add('bg-white');
        }
        this.currentImageIndex = index;
    }

    nextImage() {
        this.showImage((this.currentImageIndex + 1) % this.heroImages.length);
    }

    previousImage() {
        this.showImage((this.currentImageIndex - 1 + this.heroImages.length) % this.heroImages.length);
    }

    startAutoPlay() {
        if (this.carouselInterval) clearInterval(this.carouselInterval);
        this.carouselInterval = setInterval(() => {
            if (this.isAutoPlaying) this.nextImage();
        }, 4000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = new HeroSection();
    heroSection.init();
});