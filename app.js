// ==========================================
// 1. DATA SOURCES & GLOBAL STATE
// ==========================================

// Luxury Inventory with Extended Color Palette
// --- Data Source: Vogue Avenue Store Luxury Inventory ---
const products = [
    // Women's Luxury Collection (Vogue Avenue Curated)
    { id: 'w1', category: 'women', title: 'Crimson Velvet Embroidered Anarkali', price: 245.00, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
    { id: 'w2', category: 'women', title: 'Royal Silk Brocade Festive Suit', price: 280.00, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop' },
    { id: 'w3', category: 'women', title: 'Midnight Onyx Tailored Blazer Set', price: 295.00, img: 'https://images.unsplash.com/photo-1611042553975-08733608b2db?q=80&w=600&auto=format&fit=crop' },
    { id: 'w4', category: 'women', title: 'Organza Pastel Floral Luxury Kurta', price: 210.00, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop' },
    { id: 'w5', category: 'women', title: 'Handcrafted Ivory Premium Ensemble', price: 395.00, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop' },
    { id: 'w6', category: 'women', title: 'Sage Georgette Detailed Festive Wear', price: 320.00, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop' },
    { id: 'w7', category: 'women', title: 'Blush Pink Organza Statement Dress', price: 185.00, img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop' },
    { id: 'w8', category: 'women', title: 'Embellished Jacquard Modern Suit', price: 260.00, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop' },
    { id: 'w9', category: 'women', title: 'Monochrome Designer Occasion Suit', price: 225.00, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop' },
    { id: 'w10', category: 'women', title: 'Premium Mulberry Silk Kurta Set', price: 275.00, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop' },

    // Men's Collection (10 Products)
    { id: 'm1', category: 'men', title: 'Midnight Black Bespoke Tuxedo', price: 450.00, img: 'https://images.unsplash.com/photo-1593032465175-481da7e47352?q=80&w=600&auto=format&fit=crop' },
    { id: 'm2', category: 'men', title: 'Charcoal Wool Double-Breasted Suit', price: 420.00, img: 'https://images.unsplash.com/photo-1598805981116-804455e69b7e?q=80&w=600&auto=format&fit=crop' },
    { id: 'm3', category: 'men', title: 'Classic Navy Italian Cut Suit', price: 390.00, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop' },
    { id: 'm4', category: 'men', title: 'Golden Thread Embroidered Sherwani', price: 550.00, img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop' },
    { id: 'm5', category: 'men', title: 'Premium Silk Blend Kurta Pajama', price: 175.00, img: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=600&auto=format&fit=crop' },
    { id: 'm6', category: 'men', title: 'Deep Maroon Velvet Dinner Jacket', price: 310.00, img: 'https://images.unsplash.com/photo-1621594500145-50a98b48443e?q=80&w=600&auto=format&fit=crop' },
    { id: 'm7', category: 'men', title: 'Slim Fit Slate Grey 3-Piece Suit', price: 480.00, img: 'https://images.unsplash.com/photo-1592844306505-72476d8c552c?q=80&w=600&auto=format&fit=crop' },
    { id: 'm8', category: 'men', title: 'Tailored Tan Summer Linen Suit', price: 290.00, img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=600&auto=format&fit=crop' },
    { id: 'm9', category: 'men', title: 'Regal Emerald Bandhgala Suit', price: 520.00, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop' },
    { id: 'm10', category: 'men', title: 'Classic Houndstooth Executive Suit', price: 460.00, img: 'https://images.unsplash.com/photo-1505632951788-8b8222138331?q=80&w=600&auto=format&fit=crop' }
];


// Extended Color Palette - 22 Premium Colors
const colorPalette = [
    { name: 'Midnight Black', hex: '#111111' },
    { name: 'Charcoal Grey', hex: '#36454F' },
    { name: 'Deep Navy', hex: '#002040' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Rose Gold', hex: '#B76E79' },
    { name: 'Emerald Green', hex: '#046307' },
    { name: 'Sapphire Blue', hex: '#0F52BA' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Wine Red', hex: '#722F37' },
    { name: 'Plum Purple', hex: '#660066' },
    { name: 'Forest Green', hex: '#228B22' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Copper', hex: '#B87333' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Champagne', hex: '#F7E7CE' },
    { name: 'Ivory', hex: '#FFFFF0' },
    { name: 'Burgundy Wine', hex: '#8B0000' },
    { name: 'Slate Blue', hex: '#6A5ACD' },
    { name: 'Mustard Yellow', hex: '#FFDB58' },
    { name: 'Deep Brown', hex: '#654321' },
    { name: 'Petrol Blue', hex: '#004B49' },
    { name: 'Maroon', hex: '#800000' }
];

const standardSizes = ['Small', 'Medium', 'Large', 'XL', 'XXL'];

// Shopping Cart & Modal Application State
let cart = [];
let selectedProductModal = null;

// ==========================================
// 2. MASTER APP INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initCartEventHandlers();
    initAIChatbot();
});
// =================== AI chat Bot=====================
document.addEventListener("DOMContentLoaded", () => {
    // --- AI Chatbot Elements ---
    const chatToggle = document.getElementById("chat-toggle");
    const chatWindow = document.getElementById("chat-window");
    const chatClose = document.getElementById("chat-close");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatMessages = document.getElementById("chat-messages");

    // Open Chat Window
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener("click", () => {
            chatWindow.classList.remove("hidden");
            chatWindow.classList.add("active");
            chatToggle.style.transform = "scale(0)"; // Smoothly hide toggle button
            setTimeout(() => { chatToggle.style.display = "none"; }, 200);
        });
    }

    // Close Chat Window
    if (chatClose && chatWindow) {
        chatClose.addEventListener("click", () => {
            chatWindow.classList.remove("active");
            chatWindow.classList.add("hidden");
            if (chatToggle) {
                chatToggle.style.display = "flex";
                setTimeout(() => { chatToggle.style.transform = "scale(1)"; }, 50);
            }
        });
    }

    // Handle Sending Messages (Simulated Concierge Response)
    function handleSendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Append User Message
        const userMsg = document.createElement("div");
        userMsg.className = "message outgoing";
        userMsg.textContent = messageText;
        chatMessages.appendChild(userMsg);
        
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulated Luxury Concierge Response Delay
        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.className = "message incoming";
            botMsg.textContent = "Thank you for contacting Vogue Avenue. An executive concierge associate is reviewing your inquiry regarding our bespoke collections.";
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    if (chatSend && chatInput) {
        chatSend.addEventListener("click", handleSendMessage);
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleSendMessage();
        });
    }
});




// =================Search================================
document.addEventListener("DOMContentLoaded", () => {
    const searchTrigger = document.getElementById("search-trigger-btn");
    const searchOverlay = document.getElementById("search-overlay");
    const searchClose = document.getElementById("search-close");
    const searchInput = document.getElementById("search-input");
    const searchResultsGrid = document.getElementById("search-results-grid");

    // Open Search UI
    if (searchTrigger) {
        searchTrigger.addEventListener("click", () => {
            searchOverlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
            setTimeout(() => searchInput.focus(), 100);
        });
    }

    // Close Search UI
    if (searchClose) {
        searchClose.addEventListener("click", () => {
            searchOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
            searchInput.value = "";
            searchResultsGrid.innerHTML = "";
        });
    }

    // Live Evaluation Match Filter Engine
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResultsGrid.innerHTML = "";

            if (query.length < 2) return;

            // Filter standard global product catalog structure array
            const matchedProducts = products.filter(product => 
                product.title.toLowerCase().includes(query) || 
                product.category.toLowerCase().includes(query)
            );

            if (matchedProducts.length === 0) {
                searchResultsGrid.innerHTML = `<p class="empty-message">No couture matches found for "${e.target.value}".</p>`;
                return;
            }

            // Render matched results using identical structural cards matching catalog display
            matchedProducts.forEach(product => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <div class="image-container">
                        <img src="${product.img}" alt="${product.title}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="btn-add-cart" onclick="openProductModal('${product.id}')">View Options</button>
                    </div>
                `;
                searchResultsGrid.appendChild(card);
            });
        });
    }
});




// ==================================================





// ==========================================
// 3. CATALOG RENDERING ENGINE
// ==========================================
function renderProducts() {
    const womenGrid = document.getElementById('women-grid');
    const menGrid = document.getElementById('men-grid');

    if (!womenGrid || !menGrid) return;

    womenGrid.innerHTML = '';
    menGrid.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="product-card" id="card-${product.id}">
                <div class="image-container">
                    <img src="${product.img}" alt="${product.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn-add-cart" onclick="openProductModal('${product.id}')">Select Options</button>
                </div>
            </div>
        `;

        if (product.category === 'women') {
            womenGrid.innerHTML += productHTML;
        } else if (product.category === 'men') {
            menGrid.innerHTML += productHTML;
        }
    });
}

// ==========================================
// 4. PRODUCT SELECTION MODAL (POP-UP)
// ==========================================
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Build Swatches HTML
    let swatchesHTML = '';
    colorPalette.forEach((color, index) => {
        const isActive = index === 0 ? 'active' : '';
        swatchesHTML += `
            <div class="swatch ${isActive}" 
                 style="background-color: ${color.hex};" 
                 data-color="${color.name}"
                 title="${color.name}"
                 onclick="selectModalColor(this)">
            </div>
        `;
    });

    // Build Size Dropdown HTML
    let sizesHTML = `<select id="modal-size" class="size-selector">`;
    standardSizes.forEach(size => {
        sizesHTML += `<option value="${size}">${size}</option>`;
    });
    sizesHTML += `</select>`;

    const modalHTML = `
        <div id="product-modal-overlay" class="product-modal-overlay" onclick="closeProductModal()"></div>
        <div id="product-modal" class="product-modal">
            <button class="modal-close-btn" onclick="closeProductModal()">&times;</button>
            
            <div class="modal-content">
                <div class="modal-image">
                    <img src="${product.img}" alt="${product.title}">
                </div>
                
                <div class="modal-details">
                    <h2>${product.title}</h2>
                    <p class="modal-price">$${product.price.toFixed(2)}</p>
                    
                    <div class="modal-variants">
                        <div class="variant-section">
                            <label class="variant-label">SELECT COLOR</label>
                            <div class="color-swatches">${swatchesHTML}</div>
                        </div>
                        
                        <div class="variant-section">
                            <label class="variant-label">SELECT SIZE</label>
                            ${sizesHTML}
                        </div>
                    </div>
                    
                    <button class="btn-add-to-cart-modal" onclick="addToCartFromModal('${product.id}')">Add to Bag</button>
                </div>
            </div>
        </div>
    `;

    // Safe clear of existing elements
    closeProductModal();

    // Insert new modal elements
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    selectedProductModal = productId;
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('product-modal-overlay');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
    selectedProductModal = null;
}

function selectModalColor(swatchElement) {
    const container = swatchElement.parentElement;
    const swatches = container.querySelectorAll('.swatch');
    swatches.forEach(s => s.classList.remove('active'));
    swatchElement.classList.add('active');
}

function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const activeSwatch = modal.querySelector('.swatch.active');
    
    const selectedColor = activeSwatch ? activeSwatch.getAttribute('data-color') : 'Midnight Black';
    const selectedColorHex = activeSwatch ? activeSwatch.style.backgroundColor : '#111111';
    const selectedSize = modal.querySelector('#modal-size').value;

    const variantCartId = `${productId}-${selectedColor}-${selectedSize}`;
    const existingItem = cart.find(item => item.variantCartId === variantCartId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            ...product, 
            variantCartId: variantCartId,
            selectedColor: selectedColor,
            selectedColorHex: selectedColorHex,
            selectedSize: selectedSize,
            quantity: 1 
        });
    }

    updateCartUI();
    closeProductModal();
    
    // Auto open side cart drawer panel
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartDrawer) cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('visible');
}

// ==========================================
// 5. SHOPPING CART CORE HANDLERS
// ==========================================
function initCartEventHandlers() {
    const cartToggle = document.getElementById('cart-toggle-btn');
    const cartClose = document.getElementById('cart-close-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');

    if (!cartToggle || !cartDrawer || !cartOverlay) return;

    cartToggle.addEventListener('click', () => {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('visible');
    });

    const closeCart = () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('visible');
    };

    if (cartClose) cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

function removeFromCart(variantCartId) {
    cart = cart.filter(item => item.variantCartId !== variantCartId);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    if (!cartContainer || !cartCount || !cartSubtotal) return;
    
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    cartCount.innerText = totalItems;
    cartSubtotal.innerText = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-message">Your cart is currently empty.</p>';
        return;
    }

    cartContainer.innerHTML = '';
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div style="width:60px; height:75px; flex-shrink:0; margin-right:15px; border-radius:4px; border:2px solid ${item.selectedColorHex}; display:flex; align-items:center; justify-content:center;">
                    <div style="width:50px; height:65px; background-color:${item.selectedColorHex}; border-radius:3px;"></div>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title} (x${item.quantity})</h4>
                    <div class="cart-item-meta">
                        <span style="color:${item.selectedColorHex}; font-weight:bold;">■</span> ${item.selectedColor} | Size: ${item.selectedSize}
                    </div>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.variantCartId}')">Remove</button>
                </div>
            </div>
        `;
    });
}

// ==========================================
// 6. PREMIUM AI CONCIERGE ENGINE
// ==========================================
function initAIChatbot() {
    const chatToggleBtn = document.getElementById('chat-toggle-btn-floating');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseX = document.getElementById('chat-close-x');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatToggleBtn || !chatWindow) return;

    // Visibility Toggles
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden') && chatInput) {
            chatInput.focus();
        }
    });

    if (chatCloseX) {
        chatCloseX.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    // Message processing pipelines
    function handleSendMessage() {
        if (!chatInput) return;
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'outgoing');
        chatInput.value = '';

        setTimeout(() => {
            simulateAIResponse(messageText);
        }, 800);
    }

    function appendMessage(text, direction) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', direction);
        
        const textPara = document.createElement('p');
        textPara.textContent = text;
        
        messageDiv.appendChild(textPara);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let reply = "Thank you for contacting the Vogue Avenue. A styling specialist will verify your request shortly.";

        if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
            reply = "We offer complimentary express worldwide shipping on all orders. Domestic shipments take 2-3 business days, while international shipping safely arrives within 5-7 business days.";
        } 
        else if (lowerMessage.includes('men') || (lowerMessage.includes('suit') && !lowerMessage.includes('women'))) {
            const menItems = products.filter(p => p.category === 'men').slice(0, 2);
            reply = `Our Men's Collection features luxury tailored pieces like the "${menItems[0].title}" ($${menItems[0].price}) and the "${menItems[1].title}" ($${menItems[1].price}). You can explore the full range directly via the 'Shop Men' button.`;
        } 
        else if (lowerMessage.includes('women') || lowerMessage.includes('blazer') || lowerMessage.includes('anarkali')) {
            const womenItems = products.filter(p => p.category === 'women').slice(0, 2);
            reply = `The Women's Collection balances premium luxury fabrics with exquisite modern structure. Exceptional examples include our "${womenItems[0].title}" ($${womenItems[0].price}) and the elegant "${womenItems[1].title}" ($${womenItems[1].price}).`;
        } 
        else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
            reply = "Vogue Avenue garments are curated to a bespoke slim, elegant fit. When choosing an item, click 'Select Options' to view available metrics from Small up to XXL.";
        }

        appendMessage(reply, 'incoming');
    }

    // Assign Input Listeners
    if (chatSendBtn) chatSendBtn.addEventListener('click', handleSendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }
}
