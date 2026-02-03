// Chat Widget Component for S Shop LK
(function() {
    // Function to initialize the widget
    function initWidget() {
        // Check if widget already exists to prevent duplicates
        if (document.getElementById('square-widget')) return;

        // Create styles
        const style = document.createElement('style');
        style.textContent = `
            #square-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;  /* Reduced from 65px */
                height: 50px; /* Reduced from 65px */
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
            }

            #square-widget img {
                width: 100%;
                height: 100%;
                border-radius: 12px; /* Adjusted radius for smaller size */
                object-fit: cover;
                box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                border: 1px solid rgba(0,0,0,0.05);
            }

            #square-widget:hover {
                transform: translateY(-3px);
                filter: brightness(1.1);
            }

            /* Ensure it doesn't look too tiny on mobile */
            @media (max-width: 480px) {
                #square-widget {
                    bottom: 15px;
                    right: 15px;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);

        // Create widget container
        const widget = document.createElement('div');
        widget.id = 'square-widget';
        
        // Create image
        const img = document.createElement('img');
        img.src = 'https://i.ibb.co/7JWLrP7v/sshoplk-favicon.webp';
        img.alt = 'Chat Widget';
        
        // Append image to widget
        widget.appendChild(img);
        
        // Add click event
        widget.addEventListener('click', function() {
            window.location.href = "https://frontend.web2chat.ai/?app_id=jk23SrqsJ";
        });

        // Add to body
        document.body.appendChild(widget);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();