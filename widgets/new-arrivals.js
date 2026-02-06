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
        <section id="featured-products-section" class="mb-16">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 px-2">
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">New Arrivals</h2>
                    <p class="text-slate-400 text-sm mt-1">Fresh digital goods just for you</p>
                </div>
                <a href="products.html" class="inline-flex items-center justify-center bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-700 hover:bg-slate-700 w-full sm:w-auto">
                    View All
                </a>
            </div>
            
            <div id="featured-product-container" class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
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
            window.FirebaseService.getNewestProducts(4)
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
            this.renderProducts(sorted.slice(0, 4));
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
            // Modern, flat design, no hover animations
            productCard.className = 'bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full';
            
            // Determine detail page based on product ID
            let detailPage = 'dynamic-product-detail.html?id=' + product.id;
            const isSoldOut = !product.availability || product.availability <= 0;

            productCard.innerHTML = `
                <a href="${detailPage}" class="block relative aspect-[4/3] bg-slate-800 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover ${isSoldOut ? 'opacity-50 grayscale' : ''}">
                    ${isSoldOut ? `<div class="absolute inset-0 flex items-center justify-center"><span class="bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Sold Out</span></div>` : ''}
                    <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700/50">
                        ${product.category || 'Digital'}
                    </div>
                </a>
                
                <div class="p-3 md:p-4 flex flex-col flex-grow">
                    <div class="mb-3">
                        <h3 class="text-sm md:text-base font-bold text-white leading-tight mb-1 line-clamp-1">
                            <a href="${detailPage}">${product.name}</a>
                        </h3>
                        <p class="text-xs text-slate-400 line-clamp-2 h-8 hidden md:block">${product.description}</p>
                    </div>
                    
                    <div class="mt-auto flex items-center justify-between pt-3 border-t border-slate-800">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Price</span>
                            <span class="text-sm md:text-lg font-bold text-blue-400">LKR ${product.price.toLocaleString()}</span>
                        </div>
                        <a href="${detailPage}" class="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-blue-700">
                            Buy Now
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NewArrivalsWidget().init();
});