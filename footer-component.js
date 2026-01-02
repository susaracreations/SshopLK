
// Shared Footer Component for S Shop LK
// This component provides consistent footer functionality across all pages

class FooterComponent {
    constructor() {
        this.footerHTML = `
            <footer class="relative bg-slate-900 pt-12 pb-8 border-t border-white/5 overflow-hidden mt-auto">
                <!-- Background Glow -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

                <div class="container mx-auto px-4 relative z-10">
                    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                        <!-- Brand & Description -->
                        <div class="max-w-lg text-center lg:text-left mx-auto lg:mx-0">
                            <div class="flex items-center justify-center lg:justify-start gap-3 mb-4">
                                <div class="relative">
                                    <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                                    <div class="relative bg-slate-900 rounded-lg p-1.5 border border-white/10">
                                        <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <span class="text-xl font-bold text-white tracking-tight">S Shop LK</span>
                            </div>
                            <p class="text-gray-400 text-sm leading-relaxed">
                                S Shop LK is your premier destination for digital products and gaming services in Sri Lanka. We are dedicated to providing a safe, secure, and exceptional shopping experience.
                            </p>
                        </div>

                        <!-- Social Actions -->
                        <div class="flex gap-4 mx-auto lg:mx-0">
                            <a id="footer-whatsapp-link" href="https://wa.me/94767854069" class="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp" class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                                <span class="text-sm font-medium text-gray-400 group-hover:text-green-400 transition-colors">WhatsApp</span>
                            </a>
                            <a id="footer-discord-link" href="https://discord.gg/nsz5SFhXMh" class="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
                                <img src="https://cdn-icons-png.flaticon.com/512/4945/4945973.png" alt="Discord" class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                                <span class="text-sm font-medium text-gray-400 group-hover:text-indigo-400 transition-colors">Discord</span>
                            </a>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

                    <!-- Bottom Bar -->
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <p>&copy; 2025 S Shop LK. All rights reserved.</p>
                        <div class="flex flex-wrap justify-center gap-6">
                            <a href="about-us.html" class="hover:text-blue-400 transition-colors">About Us</a>
                            <a href="terms-of-service.html" class="hover:text-blue-400 transition-colors">Terms of Service</a>
                            <a href="privacy-policy.html" class="hover:text-blue-400 transition-colors">Privacy Policy</a>
                            <a href="help-center.html" class="hover:text-blue-400 transition-colors">Help Center</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    // Initialize the footer component
    init() {
        this.loadFooter();
        this.loadSocialLinks();
    }

    // Load footer into the page
    loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.footerHTML;
        }
    }

    // Load social links from Firebase settings
    loadSocialLinks() {
        const checkFirebase = () => {
            if (window.FirebaseService) {
                window.FirebaseService.getWebsiteSettings().then(settings => {
                    if (settings) {
                        const whatsappLink = document.getElementById('footer-whatsapp-link');
                        const discordLink = document.getElementById('footer-discord-link');
                        if (whatsappLink && settings.phoneNumber) {
                            whatsappLink.href = `https://wa.me/${settings.phoneNumber.replace(/\s/g, '')}`;
                        }
                        if (discordLink && settings.discordLink) {
                            discordLink.href = settings.discordLink;
                        }
                    }
                });
            } else {
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    }
}

// Create global instance
const footerComponent = new FooterComponent();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    footerComponent.init();
}); 
