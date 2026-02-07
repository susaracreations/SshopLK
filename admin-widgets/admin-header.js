/**
 * S Shop LK - Admin Header Component
 * Provides a consistent, professional header and navigation for the admin panel.
 */

class AdminHeader {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'admin-dashboard.html';
        this.config = {
            'admin-dashboard.html': { title: 'Dashboard', icon: 'dashboard' },
            'admin.html': { title: 'Products', icon: 'products' },
            'admin-chat.html': { title: 'Chat', icon: 'chat' },
            'admin-logs.html': { title: 'Logs', icon: 'logs' },
            'admin-settings.html': { title: 'Settings', icon: 'settings' }
        };
    }

    init() {
        // Wait for DOM if not ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    getIcon(name) {
        const icons = {
            dashboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />',
            products: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />',
            chat: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />',
            logs: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />',
            settings: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />'
        };
        return icons[name] || icons.dashboard;
    }

    render() {
        // Remove existing header/nav if present
        const oldHeader = document.querySelector('header');
        const oldNav = document.querySelector('nav');
        if (oldHeader) oldHeader.remove();
        if (oldNav) oldNav.remove();

        const currentConfig = this.config[this.currentPage] || { title: 'Admin Panel', icon: 'dashboard' };
        const username = sessionStorage.getItem('adminUsername') || 'Admin';

        const headerHTML = `
        <header class="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50 shadow-lg shadow-black/20">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo & Title -->
                    <div class="flex items-center gap-4">
                        <a href="admin-dashboard.html" class="flex items-center gap-3 group">
                            <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    ${this.getIcon(currentConfig.icon)}
                                </svg>
                            </div>
                            <div class="hidden md:block">
                                <h1 class="text-lg font-bold text-white leading-none tracking-tight">S Shop LK</h1>
                                <p class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Admin Panel</p>
                            </div>
                        </a>
                    </div>

                    <!-- Right Actions -->
                    <div class="flex items-center gap-4">
                        <div class="hidden md:flex flex-col items-end mr-2">
                            <span class="text-sm font-medium text-slate-200">Hi, <span class="text-blue-400">${username}</span></span>
                            <span id="admin-clock" class="text-[10px] text-slate-500 font-mono font-medium"></span>
                        </div>
                        
                        <div class="h-8 w-px bg-slate-800 hidden md:block"></div>

                        <a href="index.html" target="_blank" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all" title="View Store">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        
                        <button onclick="window.adminHeader.logout()" class="flex items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all border border-red-500/20 group">
                            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span class="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="flex space-x-1 overflow-x-auto no-scrollbar -mb-px pt-1">
                    ${this.renderNavLinks()}
                </div>
            </div>
        </header>
        `;

        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        this.startClock();
    }

    renderNavLinks() {
        return Object.entries(this.config).map(([file, data]) => {
            const isActive = this.currentPage === file;
            const activeClass = isActive 
                ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50';
            
            return `
                <a href="${file}" class="${activeClass} group inline-flex items-center py-3 px-4 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap rounded-t-lg">
                    <svg class="${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'} mr-2 h-4 w-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${this.getIcon(data.icon)}
                    </svg>
                    ${data.title}
                </a>
            `;
        }).join('');
    }

    startClock() {
        const update = () => {
            const el = document.getElementById('admin-clock');
            if (el) {
                const now = new Date();
                el.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' • ' + 
                               now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
        };
        update();
        setInterval(update, 1000);
    }

    async logout() {
        if (confirm('Are you sure you want to logout?')) {
            // Perform logging if Firebase service is available
            if (window.FirebaseService) {
                try {
                    await window.FirebaseService.logAdminAction('admin_logout', {
                        username: sessionStorage.getItem('adminUsername'),
                        sessionDuration: Date.now() - parseInt(sessionStorage.getItem('adminLoginTime') || Date.now())
                    });
                    await window.FirebaseService.setAdminOffline();
                } catch (e) {
                    console.error('Logout logging failed', e);
                }
            }

            sessionStorage.clear();
            window.location.href = 'admin-login.html';
        }
    }
}

// Initialize
window.adminHeader = new AdminHeader();
window.adminHeader.init();
