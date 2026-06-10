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

    // Global Shopping Bag State Array
    let shoppingBag = [];

    // ==========================================
    // 2. DYNAMIC INVENTORY & CARD GENERATION
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
                    <div class="product-image-wrapper" style="position: relative; overflow: hidden;">
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                        <button class="btn-quick-view" data-id="${product.id}" style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: #fff; border: 1px solid var(--gold-primary); padding: 8px 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; opacity: 0; transition: opacity 0.3s ease;">Quick View</button>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-options-wrapper">
                            <label>Select Size Layout:</label>
                            <select class="luxury-size-selector">
                                ${sizeOptions}
                            </select>
                        </div>
                        <button class="btn-add-cart" data-id="${product.id}">Add To Shopping Bag</button>
                    </div>
                `;
                targetGrid.appendChild(card);
            });
        }

        // Add hover triggers for Quick View buttons safely via CSS mapping rules
        targetGrid.querySelectorAll('.product-card').forEach(card => {
            const qvBtn = card.querySelector('.btn-quick-view');
            card.addEventListener('mouseenter', () => { if(qvBtn) qvBtn.style.opacity = '1'; });
            card.addEventListener('mouseleave', () => { if(qvBtn) qvBtn.style.opacity = '0'; });
        });
    }

    // ==========================================
    // 3. CORE GLOBAL CART LOGIC ENGINE
    // ==========================================
    function updateCartUI() {
        const cartCountBadge = document.getElementById('cart-count');
        const cartContainer = document.getElementById('cart-items-container');
        const cartSubtotal = document.getElementById('cart-subtotal');

        // Update Header Icon Count Badge
        if (cartCountBadge) {
            cartCountBadge.textContent = shoppingBag.reduce((sum, item) => sum + item.quantity, 0);
        }

        // Populate Drawer Panel Items Layout
        if (cartContainer) {
            if (shoppingBag.length === 0) {
                cartContainer.innerHTML = '<p class="empty-message">Your cart is currently empty.</p>';
            } else {
                cartContainer.innerHTML = shoppingBag.map((item, index) => `
                    <div class="cart-item" style="display: flex; gap: 15px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #222;">
                        <img src="${item.image}" style="width: 70px; height: 90px; object-fit: cover;">
                        <div style="flex-grow: 1;">
                            <h4 style="font-family: var(--font-luxury); font-size: 14px; margin-bottom: 4px;">${item.title}</h4>
                            <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">Size: ${item.size}</p>
                            <p style="color: var(--gold-primary); font-size: 13px;">${item.quantity} x $${item.price.toFixed(2)}</p>
                        </div>
                        <button class="btn-remove-item" data-index="${index}" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:16px;">&times;</button>
                    </div>
                `).join('');

                // Hook item removal listeners smoothly
                cartContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(e.target.dataset.index);
                        shoppingBag.splice(idx, 1);
                        updateCartUI();
                    });
                });
            }
        }

        // Compute Subtotal pricing figures
        if (cartSubtotal) {
            const total = shoppingBag.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartSubtotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    function addItemToBag(id, title, price, image, size) {
        const existingItem = shoppingBag.find(item => item.id === id && item.size === size);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            shoppingBag.push({ id, title, price, image, size, quantity: 1 });
        }
        updateCartUI();
        
        // Auto pull-open the side drawer so the user sees the addition instantly
        const drawer = document.getElementById('cart-drawer');
        if (drawer) drawer.classList.add('active');
    }

    // Click Captures for Add to Bag Actions across grids
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const card = e.target.closest('.product-card') || document.querySelector('.modal-content');
            const id = e.target.dataset.id;
            
            let title, price, image, size;
            
            if (e.target.closest('.modal-content')) {
                title = document.getElementById('modal-product-title').textContent;
                price = parseFloat(document.getElementById('modal-product-price').textContent.replace('$', ''));
                image = document.getElementById('modal-product-img-container').querySelector('img').src;
                size = document.getElementById('modal-modal-size-selector').value;
                
                // Hide modal when item is successfully captured
                const modal = document.getElementById('product-modal');
                if (modal) modal.classList.remove('active');
            } else {
                title = card.querySelector('.product-title').textContent;
                price = parseFloat(card.querySelector('.product-price').textContent.replace('$', ''));
                image = card.querySelector('.product-image').src;
                size = card.querySelector('.luxury-size-selector').value;
            }

            addItemToBag(id, title, price, image, size);
        }
    });

    // ==========================================
    // 4. QUICK VIEW MODAL OPERATIONS ENGINE
    // ==========================================
    const productModal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-quick-view')) {
            const prodId = e.target.dataset.id;
            
            // Find target item records across either segment matrix arrays
            let matchedProduct = luxuryInventory.women.find(p => p.id === prodId) || 
                                 luxuryInventory.men.find(p => p.id === prodId);
            
            if (matchedProduct && productModal) {
                document.getElementById('modal-product-title').textContent = matchedProduct.title;
                document.getElementById('modal-product-price').textContent = `$${matchedProduct.price.toFixed(2)}`;
                
                const imgWrap = document.getElementById('modal-product-img-container');
                if (imgWrap) imgWrap.innerHTML = `<img src="${matchedProduct.image}" style="width:100%; height:100%; object-fit:cover;">`;
                
                const sizeWrap = document.getElementById('modal-size-dropdown-wrapper');
                if (sizeWrap) {
                    let options = matchedProduct.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
                    sizeWrap.innerHTML = `
                        <label style="font-size:10px; text-transform:uppercase; color:var(--text-muted);">Select Size:</label>
                        <select id="modal-modal-size-selector" class="luxury-size-selector" style="margin-top:5px;">${options}</select>
                    `;
                }

                const addBtn = document.getElementById('modal-add-to-bag-btn');
                if (addBtn) addBtn.dataset.id = matchedProduct.id;

                productModal.classList.add('active');
            }
        }
    });

    if (modalCloseBtn && productModal) {
        modalCloseBtn.addEventListener('click', () => productModal.classList.remove('active'));
    }

    // ==========================================
    // 5. GLOBAL SLIDE LAYOUT UI TOGGLES
    // ==========================================
    const cartTrigger = document.getElementById('cart-trigger');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');

    const searchTrigger = document.getElementById('search-trigger-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.getElementById('search-close-btn');

    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');

    if (cartTrigger && cartDrawer) cartTrigger.addEventListener('click', () => cartDrawer.classList.add('active'));
    if (cartCloseBtn && cartDrawer) cartCloseBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));

    if (searchTrigger && searchOverlay) searchTrigger.addEventListener('click', () => searchOverlay.classList.add('active'));
    if (searchCloseBtn && searchOverlay) searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.toggle('hidden'); });
        if (chatClose) chatClose.addEventListener('click', (e) => { e.stopPropagation(); chatWindow.classList.add('hidden'); });
        chatWindow.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('click', () => chatWindow.classList.add('hidden'));
    }

    // ==========================================
    // 6. LIVE CHAT CONCIERGE ENGINE
    // ==========================================
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    function generateSmartBotReply(input) {
        const text = input.toLowerCase().trim();
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return "Good day and welcome to Vogue Avenue. Are you exploring our women's evening couture collections or premium men's tailoring lines today?";
        }
        if (text.includes('size') || text.includes('fit') || text.includes('chart')) {
            return "Our items follow precision Italian sizing configurations. You can review exact body measurements on our Size Chart page available in the navigation header link menu.";
        }
        if (text.includes('women') || text.includes('dress') || text.includes('gown')) {
            return "Our Women's Atelier highlights absolute textile refinement. The Silk Satin Evening Gown and Cashmere Double-Breasted Coat are currently among our highest-demanded collection pieces.";
        }
        if (text.includes('men') || text.includes('suit') || text.includes('tuxedo')) {
            return "The Men's Tailoring line highlights sharp, architectural structures. I highly recommend viewing our Slim-Fit Wool Velvet Tuxedo for any upcoming luxury arrangements.";
        }
        return "Thank you for sharing your fashion criteria. Your query has been logged by our VIP concierge team. Let me know if you would like me to unpack detail aspects of our collection materials.";
    }

    function handleUserMessage() {
        if (!chatInput || !chatMessages) return;
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        const userMsg = document.createElement('div');
        userMsg.className = 'message outgoing';
        userMsg.textContent = messageText;
        chatMessages.appendChild(userMsg);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

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
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
    }
});
