class CTASection {
    constructor() {
        this.containerId = 'cta-section-container';
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.render(container);
        }
    }

    render(container) {
        container.innerHTML = `
        <section class="relative py-8 md:py-12 lg:py-20 overflow-hidden" aria-labelledby="cta-heading">
            <!-- Background Elements -->
            <div class="absolute inset-0 bg-slate-900">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
                </div>
            </div>

            <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Desktop/Tablet View -->
                <div class="hidden md:block relative overflow-hidden rounded-[2.5rem] bg-slate-800/30 border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <!-- Decorative Grid -->
                    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

                    <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 p-8 md:p-16 items-center">
                        <!-- Content -->
                        <div class="text-center lg:text-left space-y-8">
                            <div class="space-y-4">
                                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                                    <span class="relative flex h-2 w-2">
                                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                      <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Level Up Your Experience
                                </div>
                                <h2 id="cta-heading" class="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                    Ready to start your <br>
                                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">digital journey?</span>
                                </h2>
                                <p class="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    Join thousands of gamers and creators who trust S Shop LK for their digital needs. Instant delivery, secure payments, and 24/7 support.
                                </p>
                            </div>
                            
                            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a href="products.html" class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900">
                                    <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                                    <span class="relative flex items-center gap-2">
                                        Browse Catalog
                                        <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </a>
                                <a href="learn-more.html" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 focus:ring-offset-slate-900 backdrop-blur-sm">
                                    How It Works
                                </a>
                            </div>
                            
                            <!-- Social Proof -->
                            <div class="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-white/5">
                                <div class="flex -space-x-2">
                                    <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://i.pravatar.cc/100?img=1" alt=""/>
                                    <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://i.pravatar.cc/100?img=2" alt=""/>
                                    <img class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://i.pravatar.cc/100?img=3" alt=""/>
                                    <div class="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-slate-800 bg-slate-700 text-xs font-medium text-white">+2k</div>
                                </div>
                                <div class="text-sm text-slate-400">
                                    <span class="text-white font-semibold">4.9/5</span> rating from our community
                                </div>
                            </div>
                        </div>
                        
                        <!-- Visual -->
                        <div class="relative lg:h-full flex items-center justify-center">
                            <!-- Abstract Composition -->
                            <div class="relative w-full max-w-md aspect-square">
                                <!-- Glowing Orb -->
                                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
                                
                                <!-- Main Card -->
                                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-slate-800/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md transform -rotate-6 transition-transform duration-500 hover:rotate-0 z-20 flex flex-col overflow-hidden group">
                                    <div class="h-32 bg-gradient-to-br from-blue-600 to-purple-600 p-4 flex items-center justify-center">
                                        <svg class="w-16 h-16 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div class="p-6 flex-1 flex flex-col">
                                        <div class="w-16 h-2 bg-slate-700 rounded-full mb-3"></div>
                                        <div class="w-24 h-2 bg-slate-700 rounded-full mb-6"></div>
                                        <div class="mt-auto flex justify-between items-center">
                                            <div class="w-8 h-8 rounded-full bg-slate-700"></div>
                                            <div class="w-16 h-6 rounded-full bg-blue-500/20"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Floating Elements -->
                                <div class="absolute top-10 right-10 w-20 h-20 bg-slate-800/90 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md z-30 flex items-center justify-center animate-[bounce_3s_infinite]">
                                    <svg class="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>

                                <div class="absolute bottom-20 left-0 w-48 h-16 bg-slate-800/90 border border-white/10 rounded-xl shadow-xl backdrop-blur-md z-30 flex items-center gap-3 px-4 animate-[pulse_4s_infinite]">
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="text-xs font-medium text-slate-300">New Arrival Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile View -->
                <div class="md:hidden relative overflow-hidden rounded-3xl bg-slate-800/30 border border-white/10 backdrop-blur-xl shadow-xl p-6">
                    <div class="text-center space-y-6">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                            <span class="relative flex h-1.5 w-1.5">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                            </span>
                            Level Up Now
                        </div>
                        
                        <h2 class="text-3xl font-bold text-white leading-tight">
                            Start your <br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">digital journey</span>
                        </h2>
                        
                        <p class="text-sm text-slate-400 leading-relaxed">
                            Instant delivery & secure payments. Join thousands of happy gamers today.
                        </p>

                        <!-- Simplified Visual for Mobile -->
                        <div class="relative h-40 w-full flex items-center justify-center my-4">
                             <div class="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                             <div class="relative w-28 h-36 bg-slate-800/90 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm flex flex-col overflow-hidden transform rotate-3">
                                <div class="h-14 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                    <svg class="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div class="p-3 flex-1 flex flex-col gap-2">
                                    <div class="w-10 h-1.5 bg-slate-700 rounded-full"></div>
                                    <div class="w-16 h-1.5 bg-slate-700 rounded-full"></div>
                                </div>
                             </div>
                        </div>

                        <div class="flex flex-col gap-3">
                            <a href="products.html" class="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-900/20">
                                Browse Catalog
                            </a>
                            <a href="learn-more.html" class="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
                                How It Works
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const ctaSection = new CTASection();
    ctaSection.init();
});
