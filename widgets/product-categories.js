class ProductCategoriesWidget {
    constructor() {
        this.containerId = 'product-categories-container';
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.render(container);
        }
    }

    render(container) {
        container.innerHTML = `
        <section class="py-12 px-4 max-w-7xl mx-auto">
            <!-- Header Section Restored -->
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-sm">
                    Explore <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Categories</span>
                </h2>
                <p class="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Curated digital assets designed to elevate your gaming lifestyle.
                </p>
            </div>

            <!-- Simplified Minimalist Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <!-- Category Item: Games -->
                <a href="category-games.html" class="group flex items-center p-5 bg-slate-900/50 border border-slate-800 rounded-xl transition-all duration-200 hover:bg-slate-800/80 hover:border-blue-500/30">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-200">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Games</h3>
                        <p class="text-slate-500 text-xs">Accounts & Items</p>
                    </div>
                </a>

                <!-- Category Item: Software -->
                <a href="category-software-apps.html" class="group flex items-center p-5 bg-slate-900/50 border border-slate-800 rounded-xl transition-all duration-200 hover:bg-slate-800/80 hover:border-purple-500/30">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform duration-200">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Software</h3>
                        <p class="text-slate-500 text-xs">Tools & Licenses</p>
                    </div>
                </a>
                
                <!-- Category Item: Boosting -->
                <a href="category-boosting-coaching.html" class="group flex items-center p-5 bg-slate-900/50 border border-slate-800 rounded-xl transition-all duration-200 hover:bg-slate-800/80 hover:border-emerald-500/30">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-200">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Boosting</h3>
                        <p class="text-slate-500 text-xs">Rank Services</p>
                    </div>
                </a>

                <!-- Category Item: Gift Cards -->
                <a href="category-gift-cards.html" class="group flex items-center p-5 bg-slate-900/50 border border-slate-800 rounded-xl transition-all duration-200 hover:bg-slate-800/80 hover:border-pink-500/30">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform duration-200">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">Gift Cards</h3>
                        <p class="text-slate-500 text-xs">Vouchers & Codes</p>
                    </div>
                </a>
            </div>
        </section>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductCategoriesWidget().init();
});