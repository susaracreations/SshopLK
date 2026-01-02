// Shared Header Component for S Shop LK
// This component provides consistent header functionality across all pages

class HeaderComponent {
    constructor() {
        this.headerHTML = `
            <header class="sticky top-0 z-50 w-full transition-all duration-300 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-slate-900/60">
                <!-- Announcement Bar -->
                <div id="announcementBar" class="hidden relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md transition-opacity duration-300"></div>
                    <div class="relative container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium text-white">
                        <span class="drop-shadow-sm tracking-wide">✨ 20% OFF SITE-WIDE!</span>
                        <a href="products.html" class="px-3 py-0.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-xs font-bold transition-all hover:scale-105 shadow-sm">SHOP NOW</a>
                        <button id="closeAnnouncementBar" aria-label="Dismiss announcement" class="absolute right-4 p-1 rounded-full hover:bg-white/10 transition-colors">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="container mx-auto px-4 py-3 lg:py-4">
                    <div class="flex justify-between items-center">
                        <!-- Left side: Logo -->
                        <a href="index.html" class="group relative flex items-center gap-3">
                            <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 group-hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                                <div class="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <svg class="h-6 w-6 text-blue-400 relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span id="headerSiteName" class="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">S Shop LK</span>
                        </a>

                        <!-- Right side: Actions -->
                        <div class="flex items-center gap-3 sm:gap-4">
                            <!-- Auth Section -->
                            <div id="authSection" class="flex items-center gap-3">
                                <!-- Guest -->
                                <div id="guestUser" class="flex items-center gap-3">
                                    <a href="login.html" class="hidden sm:flex px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-colors hover:bg-white/5">
                                        Sign In
                                    </a>
                                    <a href="login.html" class="relative group px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-0.5">
                                        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span class="relative z-10 flex items-center gap-2">
                                            Get Started
                                            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                
                                <!-- Logged In -->
                                <div id="loggedInUser" class="hidden flex items-center gap-4">
                                    <div class="relative group">
                                        <button id="userAvatar" class="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-blue-500/50 transition-all duration-300 shadow-lg">
                                            <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                                                <span id="avatarInitials">U</span>
                                            </div>
                                        </button>
                                        
                                        <!-- Profile Dropdown -->
                                        <div class="absolute right-0 top-full mt-4 w-64 p-2 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                                            <div class="p-3 mb-2 rounded-xl bg-white/5 border border-white/5">
                                                <div class="text-sm font-bold text-white truncate" id="dropdownUsername">User</div>
                                                <div class="text-xs text-gray-400 truncate" id="dropdownEmail">user@example.com</div>
                                            </div>
                                            <div class="space-y-1">
                                                <a href="profile.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                                    <svg class="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    Profile
                                                </a>
                                                <button onclick="headerComponent.signOut()" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Menu Button -->
                            <div class="relative">
                                <button id="menuBtn" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobileMenuDropdown" aria-label="Open menu" class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-gray-300 hover:text-white transition-all duration-300 group backdrop-blur-sm">
                                    <svg class="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                
                                <!-- Mobile Menu Dropdown -->
                                <div id="mobileMenuDropdown" role="dialog" aria-modal="true" aria-labelledby="mobileMenuHeading" class="absolute right-0 top-full mt-4 w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl transform opacity-0 invisible transition-all duration-300 translate-y-2 z-50 origin-top-right">
                                    <div class="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                        <div>
                                            <h3 id="mobileMenuHeading" class="text-white font-bold text-lg">Menu</h3>
                                            <p class="text-xs text-gray-400">Explore S Shop LK</p>
                                        </div>
                                        <button id="closeMenuBtn" aria-label="Close menu" class="p-2 rounded-full hover:bg-white/10 transition-colors -mr-2">
                                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    
                                    <div class="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                                        <!-- Main -->
                                        <div>
                                            <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Navigation</h4>
                                            <div class="space-y-1">
                                                <a href="index.html" class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
                                                    <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                    </div>
                                                    <span class="font-medium text-sm">Home</span>
                                                </a>
                                                <a href="products.html" class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
                                                    <div class="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                    </div>
                                                    <span class="font-medium text-sm">All Products</span>
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Categories -->
                                        <div>
                                            <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Categories</h4>
                                            <div class="grid grid-cols-2 gap-2">
                                                <a href="category-games.html" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group">
                                                    <svg class="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span class="text-xs font-medium text-gray-300 group-hover:text-white">Games</span>
                                                </a>
                                                <a href="category-software-apps.html" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group">
                                                    <svg class="w-6 h-6 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                                    <span class="text-xs font-medium text-gray-300 group-hover:text-white">Software</span>
                                                </a>
                                                <a href="category-boosting-coaching.html" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group">
                                                    <svg class="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                    <span class="text-xs font-medium text-gray-300 group-hover:text-white">Boosting</span>
                                                </a>
                                                <a href="category-gift-cards.html" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group">
                                                    <svg class="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span class="text-xs font-medium text-gray-300 group-hover:text-white">Gift Cards</span>
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Support -->
                                        <div>
                                            <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Support</h4>
                                            <div class="space-y-1">
                                                <a href="help-center.html" class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group">
                                                    <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all">
                                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <span class="font-medium text-sm">Help Center</span>
                                                </a>
                                                <button onclick="accessChat()" class="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group text-left">
                                                    <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                                    </div>
                                                    <span class="font-medium text-sm">Chat Support</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    // Initialize the header component
    init() {
        this.loadHeader();
        this.setupAuthState();
        this.setupMobileHeaderScroll();
        this.setupDropdowns();
        this.loadSiteSettings();
        this.loadAnnouncementBarSettings();
        this.setupAnnouncementBarCloseButton();

        // Set user offline on page close
        window.addEventListener('beforeunload', () => {
            if (window.AuthService && AuthService.getCurrentUser()) {
                FirebaseService.setUserOffline(AuthService.getCurrentUser().uid);
            }
        });
    }

    // Load header into the page
    loadHeader() {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = this.headerHTML;
        }
    }

    // Load site settings from Firebase
    loadSiteSettings() {
        // Wait for Firebase to be ready
        const checkFirebase = () => {
            if (window.FirebaseService) {
                window.FirebaseService.getWebsiteSettings().then(settings => {
                    if (settings && settings.siteName) {
                        const siteNameEl = document.getElementById('headerSiteName');
                        if (siteNameEl) {
                            siteNameEl.textContent = settings.siteName;
                        }
                    }
                    if (settings && settings.announcementId) {
                        localStorage.setItem('sShopAnnouncementId', settings.announcementId);
                    }
                    if (settings) {
                        // Also update localStorage for consistency
                        localStorage.setItem('sShopAnnouncementText', settings.announcementText || '20% OFF SITE-WIDE!');
                        localStorage.setItem('sShopAnnouncementButtonText', settings.announcementButtonText || 'SHOP NOW');
                        localStorage.setItem('sShopAnnouncementLink', settings.announcementLink || 'products.html');
                        localStorage.setItem('sShopAnnouncementGradientStart', settings.announcementGradientStart || '#3b82f6');
                        localStorage.setItem('sShopAnnouncementGradientEnd', settings.announcementGradientEnd || '#8b5cf6');
                        localStorage.setItem('sShopAnnouncementTextColor', settings.announcementTextColor || '#ffffff');
                        if (settings.showAnnouncementBar !== undefined) {
                            localStorage.setItem('sShopShowAnnouncementBar', settings.showAnnouncementBar);
                        }
                        if (settings.siteName) {
                            localStorage.setItem('sShopSiteName', settings.siteName);
                        }
                        this.loadAnnouncementBarSettings(); // Re-apply settings
                    }
                });
            } else {
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    }

    // Load and apply announcement bar settings
    loadAnnouncementBarSettings() {
        const announcementBar = document.getElementById('announcementBar');
        if (!announcementBar) return;

        // Check if this specific announcement has been dismissed
        const announcementId = localStorage.getItem('sShopAnnouncementId');
        const dismissedId = localStorage.getItem('sShopDismissedAnnouncementId');
        if (announcementId && announcementId === dismissedId) {
            announcementBar.style.display = 'none';
            return;
        }

        // Handle visibility first
        const showBar = localStorage.getItem('sShopShowAnnouncementBar');
        if (showBar === 'false') {
            announcementBar.style.display = 'none';
            return; // Don't apply other settings if it's hidden
        }
        announcementBar.style.display = 'block';

        // Get settings from localStorage (which should be synced by loadSiteSettings or admin panel)
        const text = localStorage.getItem('sShopAnnouncementText') || '20% OFF SITE-WIDE!';
        const link = localStorage.getItem('sShopAnnouncementLink') || 'products.html';
        const buttonText = localStorage.getItem('sShopAnnouncementButtonText') || 'SHOP NOW';
        const gradientStart = localStorage.getItem('sShopAnnouncementGradientStart') || '#3b82f6';
        const gradientEnd = localStorage.getItem('sShopAnnouncementGradientEnd') || '#8b5cf6';
        const textColor = localStorage.getItem('sShopAnnouncementTextColor') || '#ffffff';

        // Apply the settings
        announcementBar.querySelector('span').textContent = text;
        announcementBar.querySelector('a').textContent = buttonText;
        announcementBar.querySelector('a').href = link;

        // --- Safely update classes ---
        // Apply gradient to the background div if it exists
        const bgDiv = announcementBar.querySelector('.absolute.inset-0');
        if (bgDiv) {
            bgDiv.style.background = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
        } else {
            announcementBar.style.background = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
        }
        
        // Apply text color to the content container
        const contentDiv = announcementBar.querySelector('.relative.container');
        if (contentDiv) {
            contentDiv.style.color = textColor;
        } else {
            announcementBar.style.color = textColor;
        }
    }

    // Setup close button for the announcement bar
    setupAnnouncementBarCloseButton() {
        const closeButton = document.getElementById('closeAnnouncementBar');
        const announcementBar = document.getElementById('announcementBar');

        if (closeButton && announcementBar) {
            closeButton.addEventListener('click', () => {
                announcementBar.style.display = 'none';
                // Store the ID of the dismissed announcement
                const announcementId = localStorage.getItem('sShopAnnouncementId');
                if (announcementId) {
                    localStorage.setItem('sShopDismissedAnnouncementId', announcementId);
                }
            });
        }
    }

    // Mobile header scroll behavior
    setupMobileHeaderScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        const mobileBreakpoint = 768;
        
        if (!header) return;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (window.innerWidth <= mobileBreakpoint) {
                if (scrollTop > 50) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            } else {
                // On desktop, remove the class if the window is resized
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Authentication State Management
    setupAuthState() {
        if (window.AuthService) {
            AuthService.onAuthStateChanged((user) => {
                this.updateAuthUI(user);
            });
        }
    }

    updateAuthUI(user) {
        const guestUser = document.getElementById('guestUser');
        const loggedInUser = document.getElementById('loggedInUser');
        const avatarInitials = document.getElementById('avatarInitials');
        const dropdownUsername = document.getElementById('dropdownUsername');
        const dropdownEmail = document.getElementById('dropdownEmail');
        
        if (!guestUser || !loggedInUser) return;
        
        if (user) {
            // User is signed in
            if (window.FirebaseService) {
                FirebaseService.getUser(user.uid).then(userData => {
                    const displayName = user.displayName || (userData && userData.displayName) || (userData && userData.username) || user.email.split('@')[0];
                    const photoURL = user.photoURL || (userData && userData.photoURL);
                    const email = user.email || (userData && userData.email) || 'No email';
                    const initials = this.getInitials(displayName);

                    guestUser.classList.add('hidden');
                    loggedInUser.classList.remove('hidden');

                    if (dropdownUsername) dropdownUsername.textContent = displayName;
                    if (dropdownEmail) dropdownEmail.textContent = email;

                    const userAvatarContainer = document.getElementById('userAvatar');
                    if (photoURL) {
                        userAvatarContainer.innerHTML = `<img src="${photoURL}" alt="Profile Picture" class="w-full h-full object-cover rounded-full">`;
                    } else {
                        userAvatarContainer.innerHTML = `<span id="avatarInitials">${initials}</span>`;
                    }

                    FirebaseService.setUserOnline(user.uid, displayName);
                }).catch(error => {
                    console.error("Error fetching user data for header:", error);
                    // Fallback to basic user info
                    const displayName = user.displayName || user.email.split('@')[0];
                    const photoURL = user.photoURL;
                    const email = user.email || 'No email';
                    const initials = this.getInitials(displayName);

                    guestUser.classList.add('hidden');
                    loggedInUser.classList.remove('hidden');

                    if (dropdownUsername) dropdownUsername.textContent = displayName;
                    if (dropdownEmail) dropdownEmail.textContent = email;

                    const userAvatarContainer = document.getElementById('userAvatar');
                    if (photoURL) {
                        userAvatarContainer.innerHTML = `<img src="${photoURL}" alt="Profile Picture" class="w-full h-full object-cover rounded-full">`;
                    } else {
                        userAvatarContainer.innerHTML = `<span id="avatarInitials">${initials}</span>`;
                    }
                });
            } else {
                // Fallback if FirebaseService is not ready
                const displayName = user.displayName || user.email.split('@')[0];
                const photoURL = user.photoURL;
                const email = user.email || 'No email';
                const initials = this.getInitials(displayName);

                guestUser.classList.add('hidden');
                loggedInUser.classList.remove('hidden');

                if (dropdownUsername) dropdownUsername.textContent = displayName;
                if (dropdownEmail) dropdownEmail.textContent = email;

                const userAvatarContainer = document.getElementById('userAvatar');
                if (photoURL) {
                    userAvatarContainer.innerHTML = `<img src="${photoURL}" alt="Profile Picture" class="w-full h-full object-cover rounded-full">`;
                } else {
                    userAvatarContainer.innerHTML = `<span id="avatarInitials">${initials}</span>`;
                }
            }
        } else {
            // User is signed out
            guestUser.classList.remove('hidden');
            loggedInUser.classList.add('hidden');
        }
    }

    getInitials(name) {
        if (!name) return 'U';
        return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
    }

    async signOut() {
        try {
            if (window.AuthService) {
                const user = AuthService.getCurrentUser();
                if (user && window.FirebaseService) {
                    await FirebaseService.setUserOffline(user.uid);
                }
                await AuthService.signOut();
            }
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
        }
    }

    // Menu Dropdown Functionality
    setupDropdowns() {
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenuDropdown = document.getElementById('mobileMenuDropdown');
        const closeMenuBtn = document.getElementById('closeMenuBtn');

        if (!menuBtn || !mobileMenuDropdown || !closeMenuBtn) return;

        let focusableElements = [];
        let firstFocusableElement;
        let lastFocusableElement;
        let menuKeyDownHandler;

        const openMenu = () => {
            menuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuDropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            
            focusableElements = Array.from(mobileMenuDropdown.querySelectorAll(
                'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ));
            firstFocusableElement = focusableElements[0];
            lastFocusableElement = focusableElements[focusableElements.length - 1];

            // Add a small delay for the transition to complete before focusing
            setTimeout(() => {
                firstFocusableElement.focus();
            }, 100);

            // Add keydown listener for focus trapping
            menuKeyDownHandler = (e) => handleMenuKeyDown(e);
            mobileMenuDropdown.addEventListener('keydown', menuKeyDownHandler);
        };

        const closeMenu = () => {
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuDropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
            
            if (menuKeyDownHandler) {
                mobileMenuDropdown.removeEventListener('keydown', menuKeyDownHandler);
            }
            
            menuBtn.focus();
        };

        const handleMenuKeyDown = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        };

        // Global keydown for Escape
        document.addEventListener('keydown', (e) => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded && e.key === 'Escape') {
                closeMenu();
            }
        });

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            isExpanded ? closeMenu() : openMenu();
        });

        closeMenuBtn.addEventListener('click', closeMenu);

        document.addEventListener('click', (e) => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded && !menuBtn.contains(e.target) && !mobileMenuDropdown.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu when clicking on menu items
        const menuItems = mobileMenuDropdown.querySelectorAll('a, button');
        menuItems.forEach(item => {
            if (item.id !== 'closeMenuBtn') {
                item.addEventListener('click', () => {
                    setTimeout(closeMenu, 150); // Allow navigation to start
                });
            }
        });
    }
}

// Create global instance
const headerComponent = new HeaderComponent();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    headerComponent.init();
}); 