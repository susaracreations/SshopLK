// Shared Header Component for S Shop LK
// This component provides consistent header functionality across all pages

class HeaderComponent {
    constructor() {
        this.headerHTML = `
            <header class="bg-slate-900 shadow-xl sticky top-0 z-50 border-b border-slate-700">
                <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                    <!-- Left side: Logo -->
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
                            <button id="menuBtn" class="p-2 rounded-full hover:bg-slate-800 transition-colors duration-300">
                                <svg class="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            <!-- Mobile Menu Dropdown -->
                            <div id="mobileMenuDropdown" class="absolute right-0 top-12 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible transition-all duration-300 transform scale-95">
                                <div class="p-4 border-b border-slate-700">
                                    <h3 class="text-white font-semibold">Quick Menu</h3>
                                </div>
                                <div class="p-2">
                                    <a href="index.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span>Home</span>
                                    </a>
                                    <a href="category-games.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Games</span>
                                    </a>
                                    <a href="category-software-apps.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                        <span>Software & Apps</span>
                                    </a>
                                    <a href="products.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <span>All Products</span>
                                    </a>
                                    <a href="about-us.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>About Us</span>
                                    </a>
                                    <a href="learn-more.html" class="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <span>Learn More</span>
                                    </a>
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
    }

    // Load header into the page
    loadHeader() {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = this.headerHTML;
        }
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
            
            if (window.FirebaseService) {
                FirebaseService.getUser(user.uid)
                    .then(userData => {
                        if (userData && userData.username) {
                            const username = userData.username;
                            const initials = this.getInitials(username);
                            if (avatarInitials) avatarInitials.textContent = initials;
                            if (dropdownUsername) dropdownUsername.textContent = username;
                            if (dropdownEmail) dropdownEmail.textContent = userData.email || user.email || 'user@example.com';
                        } else {
                            const email = user.email || 'User';
                            const initials = this.getInitials(email);
                            if (avatarInitials) avatarInitials.textContent = initials;
                            if (dropdownUsername) dropdownUsername.textContent = email;
                            if (dropdownEmail) dropdownEmail.textContent = email;
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
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenuDropdown.classList.toggle('opacity-0');
                mobileMenuDropdown.classList.toggle('invisible');
                mobileMenuDropdown.classList.toggle('scale-95');
            });
        }

        document.addEventListener('click', (e) => {
            if (!menuBtn?.contains(e.target) && !mobileMenuDropdown?.contains(e.target)) {
                mobileMenuDropdown?.classList.add('opacity-0', 'invisible', 'scale-95');
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