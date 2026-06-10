// ==========================================
// 1. MASTER CATALOG DATA Matrix
// ==========================================
const products = [
    // --- Women's Couture Collection ---
    {
        id: "w-01",
        title: "Onyx Velvet Evening Gown",
        price: 850.00,
        category: "women",
        img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: "w-02",
        title: "Midnight Gold Embroidered Blazer",
        price: 1200.00,
        category: "women",
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
        sizes: ["S", "M", "L"]
    },
    {
        id: "w-03",
        title: "Baroque Silk Pantsuit",
        price: 950.00,
        category: "women",
        img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: "w-04",
        title: "Gilded Rose Silk Cocktail Dress",
        price: 750.00,
        category: "women",
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600",
        sizes: ["XS", "S", "M", "L"]
    },

    // --- Men's Tailoring Collection ---
    {
        id: "m-01",
        title: "Classic Obsidian Three-Piece Tuxedo",
        price: 1100.00,
        category: "men",
        img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600",
        sizes: ["38R", "40R", "42R", "44R", "46R"]
    },
    {
        id: "m-02",
        title: "Imperial Gold Brocade Blazer",
        price: 1350.00,
        category: "men",
        img: "https://images.unsplash.com/photo-1621570161042-bbaf0d2d312a?q=80&w=600",
        sizes: ["40R", "42R", "44R"]
    },
    {
        id: "m-03",
        title: "Midnight Wool Double-Breasted Suit",
        price: 1250.00,
        category: "men",
        img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
        sizes: ["38R", "40R", "42R", "44R", "46R"]
    },
    {
        id: "m-04",
        title: "Sovereign Velvet Smoking Jacket",
        price: 900.00,
        category: "men",
        img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=600",
        sizes: ["S", "M", "L", "XL"]
    }
];

// Persistent LocalStorage Cart Sync Engine
let cart = JSON.parse(localStorage.getItem("vogue_cart")) || [];

// ==========================================
// 2. DEFENSIVE GLOBAL INITIALIZATION DOM LINK
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Cart Drawer Interface Bindings ---
    const cartTrigger = document.getElementById("cart-trigger");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartCloseBtn = document.getElementById("cart-close-btn");

    if (cartTrigger && cartDrawer) {
        cartTrigger.addEventListener("click", () => cartDrawer.classList.add("active"));
    }
    if (cartCloseBtn && cartDrawer) {
        cartCloseBtn.addEventListener("click", () => cartDrawer.classList.remove("active"));
    }

    // --- Search Overlay Fullscreen Bindings ---
    const searchTrigger = document.getElementById("search-trigger-btn");
    const searchOverlay = document.getElementById("search-overlay");
    const searchClose = document.getElementById("search-close");
    const searchInput = document.getElementById("search-input");
    const searchResultsGrid = document.getElementById("search-results-grid");

    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener("click", () => {
            searchOverlay.classList.add("active");
            if (searchInput) searchInput.focus();
        });
    }
    if (searchClose && searchOverlay) {
        searchClose.addEventListener("click", () => {
            searchOverlay.classList.remove("active");
            if (searchInput) searchInput.value = "";
            if (searchResultsGrid) searchResultsGrid.innerHTML = "";
        });
    }

    if (searchInput && searchResultsGrid) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) {
                searchResultsGrid.innerHTML = "";
                return;
            }
            const filtered = products.filter(p => p.title.toLowerCase().includes(query));
            renderLuxuryGrid(filtered, searchResultsGrid);
        });
    }

    // --- AI Chatbot Concierge Intent Routing ---
    const chatToggle = document.getElementById("chat-toggle");
    const chatWindow = document.getElementById("chat-window");
    const chatClose = document.getElementById("chat-close");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatMessages = document.getElementById("chat-messages");

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener("click", () => {
            chatWindow.classList.remove("hidden");
            chatWindow.classList.add("active");
            chatToggle.style.transform = "scale(0)"; 
            setTimeout(() => { chatToggle.style.display = "none"; }, 200);
        });
    }

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

    function appendChatMessage(htmlContent, direction) {
        if (!chatMessages) return;
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${direction}`;
        msgDiv.innerHTML = htmlContent;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processConciergeQuery() {
        if (!chatInput) return;
        const userText = chatInput.value.trim();
        if (!userText) return;

        appendChatMessage(userText, "outgoing");
        chatInput.value = "";

        const query = userText.toLowerCase();
        let conciergeResponse = "";

        const coreKeywords = ["suit", "dress", "tuxedo", "size", "chart", "fit", "measure", "return", "refund", "policy", "shipping", "delivery", "men", "women", "couture", "tailoring", "price", "cost", "buy", "order", "fabric", "vogue"];
        const isQueryValid = coreKeywords.some(keyword => query.includes(keyword));

        if (isQueryValid) {
            if (query.includes("size") || query.includes("fit") || query.includes("measure")) {
                conciergeResponse = "You can review our complete body parameters on our dedicated <a href='size-chart.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Size Fit Guide</a> page.";
            } else if (query.includes("return") || query.includes("refund") || query.includes("policy")) {
                conciergeResponse = "Vogue Avenue provides an explicit 14-day validation window. View details on our <a href='refund-policy.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Refund Policy</a> page.";
            } else if (query.includes("women") || query.includes("dress")) {
                conciergeResponse = "Explore premium evening gowns and cocktail wear directly via the <a href='women.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Women's Couture Portfolio</a>.";
            } else if (query.includes("men") || query.includes("suit") || query.includes("tuxedo")) {
                conciergeResponse = "Discover premium high-twist wool blazers and bespoke layouts on our <a href='men.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Men's Tailoring Collection</a>.";
            } else {
                conciergeResponse = "Vogue Avenue Store is committed to elite-tier craftsmanship. Let me know if I can assist you with tracking an active order or verifying fits.";
            }
        } else {
            conciergeResponse = `
                I apologize, but as the digital concierge for <strong>Vogue Avenue Store</strong>, I am only programmed to discuss our luxury apparel line and store parameters.<br><br>
                Please ask a question related to this website or our collections.
                <span style="display:block; margin: 10px 0 5px 0; color: var(--gold-primary); font-weight:600; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Suggested Topics:</span>
                <ul style="margin: 0; padding-left: 18px; text-align: left; list-style-type: square; line-height: 1.6; color: #CCC;">
                    <li>Men's Bespoke Suits & Tailoring</li>
                    <li>Women's Luxury Couture Line</li>
                    <li>Apparel Sizing & Fit Parameters</li>
                    <li>Shipping Frameworks & Return Timelines</li>
                </ul>
            `;
        }

        setTimeout(() => appendChatMessage(conciergeResponse, "incoming"), 600);
    }

    if (chatSend && chatInput) {
        chatSend.addEventListener("click", processConciergeQuery);
        chatInput.addEventListener("keydown", (e) => { if (e.key === "Enter") processConciergeQuery(); });
    }

    // ==========================================
    // 3. TARGET PAGE GRIDS DETECTION & EXECUTION
    // ==========================================
    const womenGrid = document.getElementById("women-grid");
    const menGrid = document.getElementById("men-grid");

    // Execute only if on women.html target space
    if (womenGrid) {
        const womenProducts = products.filter(p => p.category === "women");
        renderLuxuryGrid(womenProducts, womenGrid);
    }

    // Execute only if on men.html target space
    if (menGrid) {
        const menProducts = products.filter(p => p.category === "men");
        renderLuxuryGrid(menProducts, menGrid);
    }

    // Fire baseline cart alignment layout update
    refreshCartUI();
});

// ==========================================================================
// REVISED DYNAMIC RENDERING FRAMEWORK (WITH QUICK-VIEW HOOKS)
// ==========================================================================
function renderLuxuryGrid(itemsList, targetContainer) {
    if (!targetContainer) return;
    targetContainer.innerHTML = "";
    
    if (itemsList.length === 0) {
        targetContainer.innerHTML = `<p class="empty-message">No couture configurations found.</p>`;
        return;
    }

    itemsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        let sizeOptionsHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");

        // Added onclick engine directly to the image layout workspace wrapper
        card.innerHTML = `
            <div class="image-container" onclick="openProductModal('${product.id}')" style="cursor: pointer; position: relative; width:100%;">
                <img src="${product.img}" alt="${product.title}" class="product-image" loading="lazy">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.2); opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
                    <span style="color: #fff; border: 1px solid #fff; padding: 10px 15px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; background: rgba(0,0,0,0.6);">Quick View</span>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title" onclick="openProductModal('${product.id}')" style="cursor: pointer;">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                
                <div class="product-options-wrapper">
                    <label for="size-${product.id}">Select Size:</label>
                    <select id="size-${product.id}" class="luxury-size-selector">
                        ${sizeOptionsHTML}
                    </select>
                </div>

                <button class="btn-add-cart" onclick="processAddToBag('${product.id}')">Add To Bag</button>
            </div>
        `;
        targetContainer.appendChild(card);
    });
}

// ==========================================================================
// INTERACTIVE OVERLAY WINDOW MODAL DISPATCH MECHANISM
// ==========================================================================
window.openProductModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Build sub elements parameters safely
    document.getElementById("modal-product-img-container").innerHTML = `<img src="${product.img}" alt="${product.title}">`;
    document.getElementById("modal-product-title").textContent = product.title;
    document.getElementById("modal-product-price").textContent = `$${product.price.toFixed(2)}`;

    // Generate option elements array string layout 
    const sizeSelector = document.getElementById("modal-size-selector");
    if (sizeSelector) {
        sizeSelector.innerHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");
    }

    // Set dynamic operational routing command execution to the action button node
    const addToBagBtn = document.getElementById("modal-add-to-bag-btn");
    if (addToBagBtn) {
        addToBagBtn.setAttribute("onclick", `processAddToBagFromModal('${product.id}')`);
    }

    // Display Window overlay
    const modal = document.getElementById("product-modal");
    if (modal) modal.classList.add("active");
};

window.closeProductModal = function() {
    const modal = document.getElementById("product-modal");
    if (modal) modal.classList.remove("active");
};

// Handles adding directly from the main grid cards
window.processAddToBag = function(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const sizeSelector = document.getElementById(`size-${productId}`);
    const chosenSize = sizeSelector ? sizeSelector.value : "Standard";

    // This pushes data silently to the cart array
    executeCoreCartPush(item, chosenSize);
};

// Handles adding from inside the Quick View modal window
window.processAddToBagFromModal = function(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const sizeSelector = document.getElementById("modal-size-selector");
    const chosenSize = sizeSelector ? sizeSelector.value : "Standard";

    executeCoreCartPush(item, chosenSize);
    window.closeProductModal(); // Closes the quick-view window automatically
};
function executeCoreCartPush(item, chosenSize) {
    const existingItem = cart.find(i => i.id === item.id && i.size === chosenSize);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            title: item.title,
            price: item.price,
            img: item.img,
            size: chosenSize,
            quantity: 1
        });
    }

    // Save configuration persistently
    localStorage.setItem("vogue_cart", JSON.stringify(cart));
    refreshCartUI();
    
    // Smooth alternative: Slide open the elegant cart drawer instantly
    const cartDrawer = document.getElementById("cart-drawer");
    if (cartDrawer) {
        cartDrawer.classList.add("active");
    }
}

// Append Event Listeners internally to DOMContentLoaded section array area
document.addEventListener("DOMContentLoaded", () => {
    // ... Keep all your existing structural interface code block elements from previous steps here ...

    // Modal Close Trigger Actions hookup setup lines 
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const productModal = document.getElementById("product-modal");

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", window.closeProductModal);
    }
    if (productModal) {
        productModal.addEventListener("click", (e) => {
            if (e.target === productModal) window.closeProductModal();
        });
    }
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
            chatToggle.style.transform = "scale(0)"; 
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

    // Helper to print message structures safely supporting HTML nodes
    function appendChatMessage(htmlContent, direction) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${direction}`;
        msgDiv.innerHTML = htmlContent; // Allows luxury hyperlinks and structural lists
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Smart Evaluation Engine
    function processConciergeQuery() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        // Display User Message
        appendChatMessage(userText, "outgoing");
        chatInput.value = "";

        const query = userText.toLowerCase();
        let conciergeResponse = "";

        // Defensive Brand Keyword Matrix
        const coreKeywords = [
            "suit", "dress", "tuxedo", "size", "chart", "fit", "measure", 
            "return", "refund", "policy", "shipping", "delivery", "men", 
            "women", "couture", "tailoring", "price", "cost", "buy", 
            "order", "fabric", "vogue", "collection", "clothe", "apparel"
        ];

        // Evaluate if query matches any store context keyword
        const isQueryValid = coreKeywords.some(keyword => query.includes(keyword));

        if (isQueryValid) {
            // Contextual responses for valid matching paths
            if (query.includes("size") || query.includes("fit") || query.includes("measure")) {
                conciergeResponse = "You can review our complete body parameters on our dedicated <a href='size-chart.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Size Fit Guide</a> page to find your ideal Italian-cut or couture fit.";
            } else if (query.includes("return") || query.includes("refund") || query.includes("policy")) {
                conciergeResponse = "Vogue Avenue provides an explicit 14-day validation window for exchanges or refunds. Please view our structural compliance mandates on our <a href='refund-policy.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Refund & Returns Policy</a> page.";
            } else if (query.includes("women") || query.includes("dress")) {
                conciergeResponse = "Our current seasonal catalog features elite evening gowns, traditional embroidered luxury wear, and bridal variants. Browse the full collection directly via the <a href='women.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Women's Couture Portfolio</a>.";
            } else if (query.includes("men") || query.includes("suit") || query.includes("tuxedo")) {
                conciergeResponse = "Discover premium high-twist wool blazers, modern slim tuxedo layouts, and bespoke traditional wear on our <a href='men.html' style='color: var(--gold-primary); text-decoration: underline; font-weight:600;'>Men's Tailoring Collection</a> page.";
            } else {
                conciergeResponse = "Vogue Avenue Store is committed to providing elite-tier craftsmanship. Let me know if you would like me to assist you with tracking an active order, verifying fabric weights, or navigating our luxury collections.";
            }
        } else {
            // Guardrail fallback execution for unrelated topics
            conciergeResponse = `
                I apologize, but as the digital concierge for <strong>Vogue Avenue Store</strong>, I am only programmed to discuss our luxury apparel line, order processing, and store documentation parameters.<br><br>
                Please ask me a question related to this website or our collections. 
                <span style="display:block; margin: 10px 0 5px 0; color: var(--gold-primary); font-weight:600; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Suggested Topics:</span>
                <ul style="margin: 0; padding-left: 18px; text-align: left; list-style-type: square; line-height: 1.6; color: #CCC;">
                    <li>Men's Bespoke Suits & Tailoring</li>
                    <li>Women's Luxury Couture & Evening Wear</li>
                    <li>Apparel Sizing & Fit Parameters</li>
                    <li>Shipping Frameworks & Return Timelines</li>
                </ul>
            `;
        }

        // Simulate high-end digital assistance processing lag
        setTimeout(() => {
            appendChatMessage(conciergeResponse, "incoming");
        }, 750);
    }

    // Trigger Bindings
    if (chatSend && chatInput) {
        chatSend.addEventListener("click", processConciergeQuery);
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") processConciergeQuery();
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
