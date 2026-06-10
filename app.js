document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. ALL LUXURY INVENTORY PRODUCTS DATA
    // ==========================================================================
    const luxuryInventory = {
        women: [
            { id: 'w1', title: 'Silk Satin Evening Gown', price: 1250.00, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600', sizes: ['XS', 'S', 'M', 'L'] },
            { id: 'w2', title: 'Cashmere Double-Breasted Coat', price: 1850.00, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600', sizes: ['S', 'M', 'L', 'XL'] },
            { id: 'w3', title: 'Tailored Tuxedo Blazer', price: 950.00, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600', sizes: ['XS', 'S', 'M', 'L'] },
            { id: 'w4', title: 'Asymmetrical Pleated Skirt', price: 650.00, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600', sizes: ['S', 'M', 'L'] }
        ],
        men: [
            { id: 'm1', title: 'Slim-Fit Wool Velvet Tuxedo', price: 2100.00, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600', sizes: ['48R', '50R', '52R', '54R'] },
            { id: 'm2', title: 'Structured Camel Hair Topcoat', price: 1950.00, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600', sizes: ['46R', '48R', '50R', '52R'] },
            { id: 'm3', title: 'Handcrafted Calfskin Chelsea Boot', price: 850.00, image: 'https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=600', sizes: ['8', '9', '10', '11'] },
            { id: 'm4', title: 'Italian Silk Jacquard Shirt', price: 580.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600', sizes: ['S', 'M', 'L', 'XL'] }
        ]
    };

    // ==========================================================================
    // 2. DETECT CURRENT PAGE AND INJECT PRODUCTS
    // ==========================================================================
    const targetGrid = document.getElementById('collection-products-grid');
    if (targetGrid) {
        targetGrid.innerHTML = ''; // Wipe placeholder text cleanly
        
        // Infer page collection category type based on target attributes
        const requestedCategory = targetGrid.dataset.category; // 'women' or 'men'
        const productsToRender = luxuryInventory[requestedCategory];

        if (productsToRender) {
            productsToRender.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.dataset.id = product.id;

                let sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-options-wrapper">
                            <label>Select Size Layout:</label>
                            <select class="luxury-size-selector">
                                ${sizeOptions}
                            </select>
                        </div>
                        <button class="btn-add-cart">Add To Shopping Bag</button>
                    </div>
                `;
                targetGrid.appendChild(card);
            });
        }

        // Handle Add to Shopping Bag Action Clicks
        targetGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-cart')) {
                const card = e.target.closest('.product-card');
                const title = card.querySelector('.product-title').textContent;
                const size = card.querySelector('.luxury-size-selector').value;
                
                alert(`Added ${title} (Size ${size}) to your Shopping Bag.`);
                
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    cartCount.textContent = parseInt(cartCount.textContent || '0') + 1;
                }
            }
        });
    }

    // ==========================================================================
    // 3. GLOBAL INTERACTION LAYOUT HOOKS (CHAT, DRAWER, SEARCH)
    // ==========================================================================
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

    // Chat widget Visibility toggle actions
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.toggle('hidden'); });
        if (chatClose) { chatClose.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.add('hidden'); }); }
        chatWindow.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('click', () => chatWindow.classList.add('hidden'));
    }

    // Cart and Search View handlers
    if (cartTrigger && cartDrawer) cartTrigger.addEventListener('click', () => cartDrawer.classList.add('active'));
    if (cartCloseBtn && cartDrawer) cartCloseBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (searchTrigger && searchOverlay) searchTrigger.addEventListener('click', () => searchOverlay.classList.add('active'));
    if (searchCloseBtn && searchOverlay) searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));

    // ==========================================================================
    // 4. INTELLIGENT KEYWORD CONCIERGE CHAT ENGINE RESPONSE SCHEDULER
    // ==========================================================================
    function generateSmartBotReply(input) {
        const text = input.toLowerCase();
        
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return "Good day. Welcome back to Vogue Avenue. Are you exploring our women's evening collections or premium men's tailoring today?";
        }
        if (text.includes('size') || text.includes('fit') || text.includes('chart')) {
            return "Our items follow true Italian precision sizing rules. You can review exact measurements directly on our structured Size Chart link in the header menu or footer area.";
        }
        if (text.includes('women') || text.includes('dress') || text.includes('gown') || text.includes('coat')) {
            return "Our Women's Atelier focuses on ultimate refinement. The Silk Satin Evening Gown and Cashmere Double-Breasted Coat are currently among our highest-demanded collection masterworks.";
        }
        if (text.includes('men') || text.includes('suit') || text.includes('tuxedo') || text.includes('boot')) {
            return "The Men's Tailoring line highlights sharp, architectural structures. I highly recommend viewing our Slim-Fit Wool Velvet Tuxedo for any luxury gala arrangements.";
        }
        if (text.includes('shipping') || text.includes('delivery') || text.includes('order')) {
            return "Vogue Avenue provides secure, insured, worldwide priority transit handling on all couture requests. Delivery windows typically take 3-5 business days.";
        }
        if (text.includes('price') || text.includes('cost') || text.includes('expensive')) {
            return "As an elite luxury atelier, our prices reflect authentic premium fabrics, master heritage engineering methods, and entirely exclusive batch runs.";
        }
        
        // Sophisticated default message loop fallback breaker
        return "Thank you for sharing your fashion criteria. Your query has been logged by our VIP concierge team. Let me know if you would like me to unpack detail aspects of our collection materials.";
    }

    function handleUserMessage() {
        if (!chatInput || !chatMessages) return;
        
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // Render User Query
        const userMsg = document.createElement('div');
        userMsg.className = 'message outgoing';
        userMsg.textContent = messageText;
        chatMessages.appendChild(userMsg);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Process Intelligent Chat AI Simulation Reply
        setTimeout(() => {
            const conciergeReply = document.createElement('div');
            conciergeReply.className = 'message incoming';
            conciergeReply.textContent = generateSmartBotReply(messageText);
            chatMessages.appendChild(conciergeReply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    }

    if (chatSend) chatSend.addEventListener('click', handleUserMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
});
