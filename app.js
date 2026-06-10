document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ALL LUXURY INVENTORY DATA
    // ==========================================
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

    // ==========================================
    // 2. DYNAMIC INVENTORY INJECTION ENGINE
    // ==========================================
    const targetGrid = document.getElementById('collection-products-grid');
    if (targetGrid) {
        targetGrid.innerHTML = ''; 
        const requestedCategory = targetGrid.dataset.category; 
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

        // Cart counter click actions
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

    // ==========================================
    // 3. GLOBAL NAVIGATION CONTROL ARCHITECTURE
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

    const productModal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Chat Toggle Actions
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.toggle('hidden'); });
        if (chatClose) { chatClose.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.add('hidden'); }); }
        chatWindow.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('click', () => chatWindow.classList.add('hidden'));
    }

    // Cart Drawer Toggle
    if (cartTrigger && cartDrawer) cartTrigger.addEventListener('click', () => cartDrawer.classList.add('active'));
    if (cartCloseBtn && cartDrawer) cartCloseBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));

    // Search Interface Toggle
    if (searchTrigger && searchOverlay) searchTrigger.addEventListener('click', () => searchOverlay.classList.add('active'));
    if (searchCloseBtn && searchOverlay) searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));

    // Quick-View Product Modal Close Trigger
    if (modalCloseBtn && productModal) {
        modalCloseBtn.addEventListener('click', () => productModal.classList.remove('active'));
    }

    // ==========================================
    // 4. INTELLIGENT KEYWORD CONCIERGE CHAT ENGINE
    // ==========================================
    function generateSmartBotReply(input) {
        const text = input.toLowerCase().trim();
        
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return "Good day and welcome to Vogue Avenue. Are you exploring our women's evening couture collections or premium men's tailoring lines today?";
        }
        if (text.includes('size') || text.includes('fit') || text.includes('chart') || text.includes('small') || text.includes('large')) {
            return "Our couture items follow precision Italian sizing configurations. You can review exact body measurements on our Size Chart page available in the main header navigation navigation links menu.";
        }
        if (text.includes('women') || text.includes('dress') || text.includes('gown') || text.includes('coat')) {
            return "Our Women's Atelier focuses on complete textile refinement. The Silk Satin Evening Gown ($1,250.00) and Cashmere Double-Breasted Coat ($1,850.00) are currently among our highlighted showcase items.";
        }
        if (text.includes('men') || text.includes('suit') || text.includes('tuxedo') || text.includes('boot')) {
            return "The Men's Tailoring line accentuates structured silhouettes. I highly recommend taking a look at our masterwork Slim-Fit Wool Velvet Tuxedo ($2,100.00) for upcoming formal luxury galas.";
        }
        if (text.includes('shipping') || text.includes('delivery') || text.includes('order') || text.includes('track')) {
            return "Vogue Avenue offers secure, premium insured, priority worldwide transit courier handling on all fashion requests. Delivery typically takes between 3 to 5 business days.";
        }
        if (text.includes('price') || text.includes('cost') || text.includes('expensive')) {
            return "As an elite luxury brand house, our price tiers reflect premium Italian fabrics, master heritage engineering methods, and entirely exclusive batch numbers.";
        }
        
        // Context fallback response
        return "Thank you for detailing your style preferences. Your query has been passed over to our VIP Personal Concierge Desk. Please let me know if you would like specifics regarding the textiles or sizes of our current collection lines.";
    }

    function handleUserMessage() {
        if (!chatInput || !chatMessages) return;
        
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // Render User Query Bubble
        const userMsg = document.createElement('div');
        userMsg.className = 'message outgoing';
        userMsg.textContent = messageText;
        chatMessages.appendChild(userMsg);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Process Intelligent Assistant Response
        setTimeout(() => {
            const conciergeReply = document.createElement('div');
            conciergeReply.className = 'message incoming';
            conciergeReply.textContent = generateSmartBotReply(messageText);
            chatMessages.appendChild(conciergeReply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    }

    if (chatSend) chatSend.addEventListener('click', handleUserMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
});
