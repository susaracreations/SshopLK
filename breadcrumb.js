/**
 * S Shop LK - Professional Breadcrumb System
 * Clean, Minimalist, & High-Performance
 * Version: 2.2.0
 */

class BreadcrumbComponent {
    constructor() {
        this.routes = {
            'index.html': 'Home',
            'products.html': 'Products',
            'categories.html': 'Categories',
            'login.html': 'Sign In',
            'register.html': 'Register',
            'profile.html': 'My Account',
            'cart.html': 'Cart',
            'checkout.html': 'Checkout',
            'about-us.html': 'About Us',
            'contact.html': 'Contact',
            'help-center.html': 'Support',
            'privacy-policy.html': 'Privacy',
            'terms-of-service.html': 'Terms',
            'category-games.html': 'Games',
            'category-software-apps.html': 'Software',
            'category-boosting-coaching.html': 'Boosting',
            'category-gift-cards.html': 'Gift Cards',
            'dynamic-product-detail.html': 'Product',
            'learn-more.html': 'Learn More'
        };
        this.product = null;
    }

    init() {
        this.injectStyles();
        const currentPage = this.getCurrentPage();
        
        // Don't show breadcrumbs on Home page for a cleaner "Hero" look
        if (currentPage === 'index.html' || currentPage === '') return;

        this.setupContainer();
        this.render(currentPage);
    }

    injectStyles() {
        const styleId = 'sshop-breadcrumb-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #breadcrumb-system-container {
                width: 100%;
                background: #ffffff;
                border-bottom: 1px solid rgba(0,0,0,0.06);
            }
            .bc-nav {
                display: flex;
                align-items: center;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
                padding: 12px 0;
            }
            .bc-nav::-webkit-scrollbar { display: none; }
            
            .bc-list {
                display: flex;
                align-items: center;
                list-style: none;
                margin: 0;
                padding: 0;
                font-family: 'Space Grotesk', sans-serif;
            }
            
            .bc-item {
                display: flex;
                align-items: center;
                font-size: 13px;
                color: #64748b;
                white-space: nowrap;
            }

            .bc-link {
                color: #64748b;
                text-decoration: none;
                transition: color 0.2s ease;
                font-weight: 500;
            }

            .bc-link:hover {
                color: #0f172a;
            }

            .bc-current {
                color: #0f172a;
                font-weight: 600;
            }

            .bc-separator {
                margin: 0 10px;
                color: #cbd5e1;
                flex-shrink: 0;
            }

            /* Responsive Text Helpers */
            .bc-text-full { display: inline; }
            .bc-text-mobile { display: none; }

            @media (max-width: 640px) {
                .bc-text-full { display: none; }
                .bc-text-mobile { display: inline; }
            }

            @media (prefers-color-scheme: dark) {
                #breadcrumb-system-container {
                    background: #0f172a;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .bc-link { color: #94a3b8; }
                .bc-link:hover { color: #f8fafc; }
                .bc-current { color: #f8fafc; }
                .bc-separator { color: #334155; }
            }
        `;
        document.head.appendChild(style);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        return (page === '' || page === '/') ? 'index.html' : page;
    }

    setupContainer() {
        let container = document.getElementById('breadcrumb-system-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'breadcrumb-system-container';
            const header = document.getElementById('header-container');
            if (header?.parentNode) {
                header.parentNode.insertBefore(container, header.nextSibling);
            } else {
                document.body.prepend(container);
            }
        }
    }

    getBreadcrumbs(currentPage) {
        const crumbs = [{ name: 'Home', url: 'index.html' }];

        if (currentPage === 'dynamic-product-detail.html') {
            if (this.product?.category) {
                const slug = `category-${this.product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}.html`;
                crumbs.push({ name: this.product.category, url: slug });
            }
            crumbs.push({ name: this.product?.name || 'Product', url: '#', current: true });
        } else {
            if (currentPage.startsWith('category-')) {
                crumbs.push({ name: 'Categories', url: 'categories.html' });
            }
            const name = this.routes[currentPage] || this.formatName(currentPage);
            crumbs.push({ name: name, url: currentPage, current: true });
        }
        return crumbs;
    }

    formatName(page) {
        return page.replace('.html', '').replace(/-/g, ' ')
            .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    // Helper to truncate text for mobile
    truncate(text) {
        if (text.length > 5) {
            return text.substring(0, 5) + '..';
        }
        return text;
    }

    updateForProduct(product) {
        this.product = product;
        if (this.getCurrentPage() === 'dynamic-product-detail.html') {
            this.render('dynamic-product-detail.html');
        }
    }

    render(currentPage) {
        const container = document.getElementById('breadcrumb-system-container');
        if (!container) return;

        const crumbs = this.getBreadcrumbs(currentPage);
        
        let html = `
            <div class="container mx-auto px-4">
                <nav class="bc-nav" aria-label="Breadcrumb">
                    <ol class="bc-list">
        `;

        crumbs.forEach((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            const mobileText = this.truncate(crumb.name);
            
            html += `<li class="bc-item">`;
            
            if (i > 0) {
                html += `
                    <span class="bc-separator">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>`;
            }

            const content = `
                <span class="bc-text-full">${crumb.name}</span>
                <span class="bc-text-mobile">${mobileText}</span>
            `;

            if (isLast) {
                html += `<span class="bc-current" aria-current="page">${content}</span>`;
            } else {
                html += `<a href="${crumb.url}" class="bc-link">${content}</a>`;
            }

            html += `</li>`;
        });

        html += `</ol></nav></div>`;
        container.innerHTML = html;
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.breadcrumbComponent = new BreadcrumbComponent();
    window.breadcrumbComponent.init();
});