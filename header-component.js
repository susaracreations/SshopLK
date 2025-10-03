// Shared Header Component for S Shop LK
// This component provides consistent header functionality across all pages

class HeaderComponent {
    constructor() {
        this.headerHTML = `
            <header class="bg-slate-900 shadow-xl sticky top-0 z-50 border-b border-slate-700">
                <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                    <!-- Left side: Logo and Site Name -->
                    <a href="index.html" class="flex items-center space-x-2">
                        <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span class="text-2xl font-extrabold text-white">S Shop LK</span>
                    </a>

                    <!-- Right side: User actions -->
                    <div class="flex items-center space-x-4">
                        <!-- User Authentication Section -->
                        <div id="authSection" class="flex items-center space-x-3">
                            <!-- Guest User (Not Logged In) -->
                            <div id="guestUser" class="flex items-center space-x-2">
                                <a href="login.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Sign In
                                </a>
                                <a href="login.html" class="text-gray-300 hover:text-white transition-colors">
                                    Sign Up
                                </a>
                            </div>
                            
                            <!-- Logged In User -->
                            <div id="loggedInUser" class="flex items-center space-x-3 hidden">
                                <!-- User Avatar with Dropdown -->
                                <div class="relative group">
                                    <div id="userAvatar" class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg">
                                        <span id="avatarInitials">U</span>
                                    </div>
                                    <!-- Profile Dropdown -->
                                    <div class="absolute right-0 top-12 w-48 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                                        <div class="p-4 border-b border-slate-700">
                                            <div class="text-white font-semibold" id="dropdownUsername">User</div>
                                            <div class="text-gray-400 text-sm mt-1" id="dropdownEmail">user@example.com</div>
                                        </div>
                                        <div class="p-2">
                                            <a href="profile.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>My Profile</span>
                                            </a>
                                            <button onclick="headerComponent.signOut()" class="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
                                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Menu Icon -->
                        <div class="relative">
                            <button id="menuBtn" class="p-2 rounded-full hover:bg-slate-800 transition-colors duration-300 bg-slate-800/50 backdrop-blur-sm border border-slate-600">
                                <svg class="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            <!-- Mobile Menu Dropdown -->
                            <div id="mobileMenuDropdown" class="absolute right-0 top-12 w-72 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible transition-all duration-300 transform scale-95 z-50">
                                <div class="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-700 to-slate-800 rounded-t-xl">
                                    <h3 class="text-white font-bold text-lg">S Shop LK Menu</h3>
                                    <p class="text-gray-300 text-sm mt-1">Your Gaming & Digital Marketplace</p>
                                </div>
                                <div class="p-3 max-h-96 overflow-y-auto">
                                    <!-- Main Navigation -->
                                    <div class="mb-4">
                                        <h4 class="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-2 px-2">Main</h4>
                                        <a href="index.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Home</span>
                                                <p class="text-xs text-gray-400">Back to homepage</p>
                                            </div>
                                    </a>
                                        <a href="products.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">All Products</span>
                                                <p class="text-xs text-gray-400">Browse all items</p>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- Categories -->
                                    <div class="mb-4">
                                        <h4 class="text-purple-400 font-semibold text-sm uppercase tracking-wide mb-2 px-2">Categories</h4>
                                        <a href="category-games.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Games</span>
                                                <p class="text-xs text-gray-400">Gaming accounts & items</p>
                                            </div>
                                    </a>
                                        <a href="category-software-apps.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Software & Apps</span>
                                                <p class="text-xs text-gray-400">Licenses & tools</p>
                                            </div>
                                    </a>
                                        <a href="category-boosting-coaching.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v14H9z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Boosting & Coaching</span>
                                                <p class="text-xs text-gray-400">Improve your skills</p>
                                            </div>
                                        </a>
                                        <a href="category-gift-cards.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Gift Cards</span>
                                                <p class="text-xs text-gray-400">Digital gift cards</p>
                                            </div>
                                    </a>
                                    </div>

                                    <!-- Support & Info -->
                                    <div class="mb-4">
                                        <h4 class="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-2 px-2">Support & Info</h4>
                                        <a href="about-us.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">About Us</span>
                                                <p class="text-xs text-gray-400">Learn about S Shop LK</p>
                                            </div>
                                    </a>
                                        <a href="learn-more.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Learn More</span>
                                                <p class="text-xs text-gray-400">How to get started</p>
                                            </div>
                                        </a>
                                        <a href="help-center.html" class="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Help Center</span>
                                                <p class="text-xs text-gray-400">Get support & help</p>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- Quick Actions -->
                                    <div class="border-t border-slate-700 pt-3">
                                        <h4 class="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-2 px-2">Quick Actions</h4>
                                        <button onclick="accessChat()" class="w-full flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="font-medium">Chat with Admin</span>
                                                <p class="text-xs text-gray-400">Get instant support</p>
                                            </div>
                                        </button>
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
                        document.querySelector('header .text-2xl.font-extrabold.text-white').textContent = settings.siteName;
                    }
                });
            } else {
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    }

    // Mobile header scroll behavior
    setupMobileHeaderScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        const mobileBreakpoint = 768;
        
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            if (window.innerWidth <= mobileBreakpoint) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop <= 0) {
                    header.classList.remove('header-hidden');
                } else if (scrollTop < lastScrollTop) {
                    header.classList.remove('header-hidden');
                } else if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.classList.add('header-hidden');
                }
                
                lastScrollTop = scrollTop;
            } else {
                header.classList.remove('header-hidden');
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
            guestUser.classList.add('hidden');
            loggedInUser.classList.remove('hidden');
            
            // For Google users, use displayName if available
            if (user.displayName) {
                const displayName = user.displayName;
                const initials = this.getInitials(displayName);
                if (avatarInitials) avatarInitials.textContent = initials;
                if (dropdownUsername) dropdownUsername.textContent = displayName;
                if (dropdownEmail) dropdownEmail.textContent = user.email || 'user@example.com';

                // Set user as online
                if (window.FirebaseService) {
                    FirebaseService.setUserOnline(user.uid, displayName);
                }
            } else if (window.FirebaseService) {
                // For regular users, try to get username from Firestore
                FirebaseService.getUser(user.uid)
                    .then(userData => {
                        if (userData && userData.username) {
                            const username = userData.username;
                            const initials = this.getInitials(username);
                            if (avatarInitials) avatarInitials.textContent = initials;
                            if (dropdownUsername) dropdownUsername.textContent = username;
                            if (dropdownEmail) dropdownEmail.textContent = userData.email || user.email || 'user@example.com';

                            // Set user as online
                            if (window.FirebaseService) {
                                FirebaseService.setUserOnline(user.uid, username);
                            }
                        } else {
                            const email = user.email || 'User';
                            const initials = this.getInitials(email);
                            if (avatarInitials) avatarInitials.textContent = initials;
                            if (dropdownUsername) dropdownUsername.textContent = email;
                            if (dropdownEmail) dropdownEmail.textContent = email;

                            // Set user as online
                            if (window.FirebaseService) {
                                FirebaseService.setUserOnline(user.uid, email);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                        const email = user.email || 'User';
                        const initials = this.getInitials(email);
                        if (avatarInitials) avatarInitials.textContent = initials;
                        if (dropdownUsername) dropdownUsername.textContent = email;
                        if (dropdownEmail) dropdownEmail.textContent = email;
                    });
            } else {
                const email = user.email || 'User';
                const initials = this.getInitials(email);
                if (avatarInitials) avatarInitials.textContent = initials;
                if (dropdownUsername) dropdownUsername.textContent = email;
                if (dropdownEmail) dropdownEmail.textContent = email;
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

        if (menuBtn && mobileMenuDropdown) {
            // Toggle menu on click
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = !mobileMenuDropdown.classList.contains('opacity-0');
                
                if (isVisible) {
                    // Close menu
                    mobileMenuDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                } else {
                    // Open menu
                    mobileMenuDropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
                }
            });

            // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn?.contains(e.target) && !mobileMenuDropdown?.contains(e.target)) {
                mobileMenuDropdown?.classList.add('opacity-0', 'invisible', 'scale-95');
            }
        });

            // Close menu when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    mobileMenuDropdown?.classList.add('opacity-0', 'invisible', 'scale-95');
                }
            });

            // Close menu when clicking on menu items (for better mobile UX)
            const menuItems = mobileMenuDropdown.querySelectorAll('a, button');
            menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Small delay to allow the click to register before closing
                    setTimeout(() => {
                        mobileMenuDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                    }, 100);
                });
            });
        }
    }
}

// Create global instance
const headerComponent = new HeaderComponent();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    headerComponent.init();
}); 