class NewArrivalsWidget {
    constructor() {
        this.containerId = 'new-arrivals-container';
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.renderStructure(container);
            this.loadProducts();
        }
    }

    renderStructure(container) {
        container.innerHTML = `
        <section id="featured-products-section">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 px-2">
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">New Arrivals</h2>
                    <p class="text-slate-400 text-sm mt-1">Fresh digital goods just for you</p>
                </div>
                <a href="products.html" class="inline-flex items-center justify-center bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-700 hover:bg-slate-700 w-full sm:w-auto">
                    View All
                </a>
            </div>
            
            <div id="featured-product-container" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <!-- Loading State (Static) -->
                <div class="col-span-full flex justify-center py-12">
                    <div class="text-slate-500 font-medium">Loading products...</div>
                </div>
            </div>
        </section>
        `;
    }

    loadProducts() {
        if (window.FirebaseService) {
            window.FirebaseService.getNewestProducts(6)
                .then(products => this.renderProducts(products))
                .catch(error => {
                    console.error("Error fetching new arrivals:", error);
                    this.loadFromLocalStorage();
                });
        } else {
            // Wait for Firebase or fallback
            setTimeout(() => {
                if (window.FirebaseService) {
                    this.loadProducts();
                } else {
                    this.loadFromLocalStorage();
                }
            }, 500);
        }
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('sShopProducts');
        if (stored) {
            const products = JSON.parse(stored);
            // Sort by createdAt desc
            const sorted = products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            this.renderProducts(sorted.slice(0, 6));
        } else {
            this.renderProducts([]);
        }
    }

    renderProducts(products) {
        const container = document.getElementById('featured-product-container');
        if (!container) return;
        
        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500">No new arrivals at the moment.</div>`;
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'group cursor-pointer';
            
            // Determine detail page based on product ID
            let detailPage = 'dynamic-product-detail.html?id=' + product.id;
            const isSoldOut = !product.availability || product.availability <= 0;

            // Helper to get category icon
            const getCategoryIcon = (c) => {
                const cat = (c || '').toLowerCase();
                if (cat.includes('game')) return '<svg class="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
                if (cat.includes('soft') || cat.includes('app')) return '<svg class="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>';
                if (cat.includes('gift')) return '<svg class="w-3 h-3 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>';
                if (cat.includes('boost')) return '<svg class="w-3 h-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>';
                return '<svg class="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>';
            };

            productCard.onclick = () => window.location.href = detailPage;

            productCard.innerHTML = `
                <div class="mb-4 overflow-hidden shadow-2xl relative bg-slate-800 border border-slate-700 rounded-xl aspect-[3/4]">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isSoldOut ? 'opacity-50 grayscale' : ''}">
                    
                    <!-- Category Tag with Icon -->
                    <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-xl z-10 flex items-center gap-1.5">
                        ${getCategoryIcon(product.category)}
                        ${product.category || 'Digital'}
                    </div>

                    ${isSoldOut ? `<div class="absolute inset-0 flex items-center justify-center"><span class="bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Sold Out</span></div>` : ''}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1 opacity-80">${product.deliveryMethod || 'Instant Delivery'}</p>
                <h4 class="text-[13px] font-bold text-slate-200 leading-snug group-hover:text-white transition-colors line-clamp-2 mb-2">${product.name}</h4>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-extrabold text-blue-400 tracking-tight">LKR ${product.price.toLocaleString()}</span>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NewArrivalsWidget().init();
});
