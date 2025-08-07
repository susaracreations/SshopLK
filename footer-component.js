
// Shared Footer Component for S Shop LK
// This component provides consistent footer functionality across all pages

class FooterComponent {
    constructor() {
        this.footerHTML = `
            <footer class="bg-slate-900 text-gray-400 mt-auto py-8 border-t border-slate-700">
                <div class="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                    <!-- Left Side: Description and Links -->
                    <div class="text-center lg:text-left max-w-xl">
                        <p class="text-sm mb-4">
                            S Shop LK is a comprehensive online marketplace for everything gaming-related. We are dedicated to providing a safe and secure community for both buyers and sellers.
                        </p>
                        <div class="text-xs text-gray-500">
                            &copy; 2025 S Shop LK. All rights reserved. |
                            <a href="about-us.html" class="hover:text-white transition-colors duration-200">About Us</a> |
                            <a href="terms-of-service.html" class="hover:text-white transition-colors duration-200">Terms of Service</a> |
                            <a href="privacy-policy.html" class="hover:text-white transition-colors duration-200">Privacy Policy</a> |
                            <a href="help-center.html" class="hover:text-white transition-colors duration-200">Help Center</a>
                        </div>
                    </div>

                    <!-- Right Side: Social Media Icons -->
                    <div class="flex space-x-4">
                        <!-- WhatsApp Icon -->
                        <a href="https://wa.me/94767854069" class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-slate-900 transition-colors duration-300">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp Icon" class="h-6 w-6">
                        </a>
                        <!-- Discord Icon -->
                        <a href="https://discord.gg/YourInviteCode" class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-slate-900 transition-colors duration-300">
                            <img src="https://cdn-icons-png.flaticon.com/512/4945/4945973.png" alt="Discord Icon" class="h-6 w-6">
                        </a>
                    </div>
                </div>
            </footer>
        `;
    }

    // Initialize the footer component
    init() {
        this.loadFooter();
    }

    // Load footer into the page
    loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.footerHTML;
        }
    }
}

// Create global instance
const footerComponent = new FooterComponent();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    footerComponent.init();
}); 
