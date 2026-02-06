(function() {
    function initWidget() {
        if (document.getElementById('sshop-widget')) return;

        const style = document.createElement('style');
        style.textContent = `
            #sshop-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 54px;
                height: 54px;
                cursor: pointer;
                z-index: 2147483647;
                transition: transform 0.2s ease, opacity 0.2s ease;
                -webkit-tap-highlight-color: transparent;
            }

            #sshop-widget:hover {
                transform: scale(1.08);
            }

            #sshop-widget:active {
                transform: scale(0.95);
            }

            #sshop-widget img {
                width: 100%;
                height: 100%;
                border-radius: 14px;
                object-fit: cover;
                display: block;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                border: 1px solid rgba(0,0,0,0.08);
            }

            @media (max-width: 480px) {
                #sshop-widget {
                    bottom: 15px;
                    right: 15px;
                    width: 48px;
                    height: 48px;
                }
            }
        `;
        document.head.appendChild(style);

        const widget = document.createElement('div');
        widget.id = 'sshop-widget';
        widget.setAttribute('role', 'button');
        widget.setAttribute('aria-label', 'Open Chat');
        
        const img = new Image();
        img.src = 'https://i.ibb.co/7JWLrP7v/sshoplk-favicon.webp';
        img.alt = '';
        
        widget.appendChild(img);
        widget.onclick = () => window.location.href = "https://frontend.web2chat.ai/?app_id=jk23SrqsJ";

        document.body.appendChild(widget);
    }

    if (document.readyState === 'complete') {
        initWidget();
    } else {
        window.addEventListener('load', initWidget);
    }
})();