document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. SELECTORS & DOM HOOK SECURITY
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    const cartTrigger = document.getElementById('cart-trigger');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');

    const searchTrigger = document.getElementById('search-trigger-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.getElementById('search-close-btn');

    // ==========================================
    // 2. CONCIERGE CHAT INTERACTIVE ENGINE
    // ==========================================
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWindow.classList.toggle('hidden');
        });

        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.stopPropagation();
                chatWindow.classList.add('hidden');
            });
        }

        chatWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        document.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    function handleUserMessage() {
        if (!chatInput || !chatMessages) return;
        
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // User message bubble creation
        const userMsg = document.createElement('div');
        userMsg.className = 'message outgoing';
        userMsg.textContent = messageText;
        chatMessages.appendChild(userMsg);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Auto automated luxury advisor reply block
        setTimeout(() => {
            const conciergeReply = document.createElement('div');
            conciergeReply.className = 'message incoming';
            conciergeReply.textContent = "Thank you for contacting our luxury boutique services. A digital style assistant is reviewing your line choices now.";
            chatMessages.appendChild(conciergeReply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    if (chatSend) {
        chatSend.addEventListener('click', handleUserMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
    }

    // ==========================================
    // 3. CART SYSTEM OVERLAYS
    // ==========================================
    if (cartTrigger && cartDrawer) {
        cartTrigger.addEventListener('click', () => cartDrawer.classList.add('active'));
    }
    if (cartCloseBtn && cartDrawer) {
        cartCloseBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    }

    // ==========================================
    // 4. SEARCH INTERFACE NAVIGATION 
    // ==========================================
    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener('click', () => searchOverlay.classList.add('active'));
    }
    if (searchCloseBtn && searchOverlay) {
        searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));
    }

    // ==========================================
    // 5. BOUTIQUE QUICK PRODUCT CONTROLLER SANITY CHECK
    // ==========================================
    // Safe check protects landing splash panels from modal runtime execution errors
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const productModal = document.getElementById('product-modal');

    if (modalCloseBtn && productModal) {
        modalCloseBtn.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    }
});
