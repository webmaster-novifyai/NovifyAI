// ==========================================================================
// 1. CORE GLOBAL STATE MANAGEMENT
// ==========================================================================
window.cart = JSON.parse(localStorage.getItem("vogue_cart")) || [];

// Unified collection data dictionary lookup engine
const products = [
    // Men's Collection Data
    { id: "m1", title: "Bespoke Navy Tuxedo", price: 1450.00, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600", category: "men", sizes: ["48R", "50R", "52R", "54R"] },
    { id: "m2", title: "Classic Charcoal Blazer", price: 890.00, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600", category: "men", sizes: ["46R", "48R", "50R", "52R"] },
    { id: "m3", title: "Premium Wool Cashmere Coat", price: 1850.00, img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600", category: "men", sizes: ["S", "M", "L", "XL"] },
    
    // Women's Collection Data (Preserving variants for structural alignment)
    { id: "w1", title: "Silk Evening Gown", price: 2100.00, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600", category: "women", sizes: ["XS", "S", "M", "L"] },
    { id: "w2", title: "Classic Tailored Trench", price: 1250.00, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600", category: "women", sizes: ["S", "M", "L"] },
    { id: "w3", title: "Velvet Cocktail Dress", price: 950.00, img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600", category: "women", sizes: ["XS", "S", "M"] }
];

// ==========================================================================
// 2. DATA GRID RENDERING AUTOMATION HOOKS
// ==========================================================================
function initializeStorefrontGrids() {
    // Render dynamic target arrays into pages depending on structural placement
    const menGrid = document.getElementById("men-grid");
    const womenGrid = document.getElementById("women-grid");
    const indexGrid = document.getElementById("index-grid"); // Fallback check for new arrivals

    if (menGrid) {
        renderLuxuryGrid(products.filter(p => p.category === "men"), menGrid);
    }
    if (womenGrid) {
        renderLuxuryGrid(products.filter(p => p.category === "women"), womenGrid);
    }
    if (indexGrid) {
        renderLuxuryGrid(products, indexGrid); // Shows all variations sequentially on home page
    }
}

function renderLuxuryGrid(itemsList, targetContainer) {
    if (!targetContainer) return;
    targetContainer.innerHTML = "";

    itemsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        let sizeOptionsHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");

        card.innerHTML = `
            <div class="image-container" onclick="openProductModal('${product.id}')" style="cursor: pointer; position: relative; width:100%;">
                <img src="${product.img}" alt="${product.title}" class="product-image" loading="lazy">
                <div class="quick-view-overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; opacity:0; transition: opacity 0.3s ease;">
                    <span style="color:#fff; border:1px solid #fff; padding: 8px 16px; text-transform:uppercase; font-size:11px; letter-spacing:1px; background:rgba(0,0,0,0.7);">Quick View</span>
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
        
        // Manual override hooks to clear out CSS flickering events
        const imgContainer = card.querySelector(".image-container");
        const overlay = card.querySelector(".quick-view-overlay");
        if (imgContainer && overlay) {
            imgContainer.addEventListener("mouseover", () => overlay.style.opacity = "1");
            imgContainer.addEventListener("mouseout", () => overlay.style.opacity = "0");
        }

        targetContainer.appendChild(card);
    });
}

// ==========================================================================
// 3. QUICK VIEW CONTROLLER LAYER
// ==========================================================================
window.openProductModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const imgContainer = document.getElementById("modal-product-img-container");
    const titleContainer = document.getElementById("modal-product-title");
    const priceContainer = document.getElementById("modal-product-price");
    const sizeSelector = document.getElementById("modal-size-selector");
    const addToBagBtn = document.getElementById("modal-add-to-bag-btn");

    if (imgContainer) imgContainer.innerHTML = `<img src="${product.img}" alt="${product.title}">`;
    if (titleContainer) titleContainer.textContent = product.title;
    if (priceContainer) priceContainer.textContent = `$${product.price.toFixed(2)}`;

    if (sizeSelector) {
        sizeSelector.innerHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");
    }

    if (addToBagBtn) {
        addToBagBtn.setAttribute("onclick", `processAddToBagFromModal('${product.id}')`);
    }

    const modal = document.getElementById("product-modal");
    if (modal) modal.classList.add("active");
};

window.closeProductModal = function() {
    const modal = document.getElementById("product-modal");
    if (modal) modal.classList.remove("active");
};

// ==========================================================================
// 4. BUSINESS LOGIC ENGINE: CENTRAL CART PIPELINE
// ==========================================================================
window.processAddToBag = function(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const sizeSelector = document.getElementById(`size-${productId}`);
    const chosenSize = sizeSelector ? sizeSelector.value : "Standard";

    executeCoreCartPush(item, chosenSize);
};

window.processAddToBagFromModal = function(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const sizeSelector = document.getElementById("modal-size-selector");
    const chosenSize = sizeSelector ? sizeSelector.value : "Standard";

    executeCoreCartPush(item, chosenSize);
    window.closeProductModal();
};

function executeCoreCartPush(item, chosenSize) {
    const existingItem = window.cart.find(i => i.id === item.id && i.size === chosenSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        window.cart.push({
            id: item.id,
            title: item.title,
            price: Number(item.price),
            img: item.img,
            size: chosenSize,
            quantity: 1
        });
    }

    localStorage.setItem("vogue_cart", JSON.stringify(window.cart));
    refreshCartUI();
    
    // Slid open side drawer automatically
    const cartDrawer = document.getElementById("cart-drawer");
    if (cartDrawer) cartDrawer.classList.add("active");
}

function refreshCartUI() {
    const cartCountBadge = document.getElementById("cart-count");
    const container = document.getElementById("cart-items-container");
    const subtotalLabel = document.getElementById("cart-subtotal");

    const totalQuantity = window.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalQuantity;

    if (!container) return;
    container.innerHTML = "";

    if (window.cart.length === 0) {
        container.innerHTML = `<p class="empty-message">Your cart is currently empty.</p>`;
        if (subtotalLabel) subtotalLabel.textContent = "$0.00";
        return;
    }

    let calculatedSum = 0;

    window.cart.forEach((item, index) => {
        calculatedSum += (item.price * item.quantity);
        const row = document.createElement("div");
        row.style.cssText = "display: flex; gap: 15px; margin-bottom: 20px; border-bottom: 1px solid #222; padding-bottom: 15px; align-items: center;";
        row.innerHTML = `
            <img src="${item.img}" style="width: 60px; height: 75px; object-fit: cover; border: 1px solid #333;">
            <div style="flex: 1; text-align: left;">
                <h4 style="margin:0; font-size:14px; color:#fff;">${item.title}</h4>
                <p style="margin: 3px 0; font-size:11px; color:#d4af37;">Size: ${item.size}</p>
                <p style="margin:0; font-size:12px; color:#aaa;">${item.quantity} x $${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeItemFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:16px;">&times;</button>
        `;
        container.appendChild(row);
    });

    if (subtotalLabel) subtotalLabel.textContent = `$${calculatedSum.toFixed(2)}`;
}

window.removeItemFromCart = function(index) {
    window.cart.splice(index, 1);
    localStorage.setItem("vogue_cart", JSON.stringify(window.cart));
    refreshCartUI();
};

// ==========================================================================
// 5. DOM COMPONENT INTERFACES LIFECYCLE ROUTINES
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initializeStorefrontGrids();
    refreshCartUI();

    // Shopping Side Drawer Event Bindings
    const cartTrigger = document.getElementById("cart-trigger");
    const cartCloseBtn = document.getElementById("cart-close-btn");
    const cartDrawer = document.getElementById("cart-drawer");

    if (cartTrigger && cartDrawer) {
        cartTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            cartDrawer.classList.add("active");
        });
    }
    if (cartCloseBtn && cartDrawer) {
        cartCloseBtn.addEventListener("click", () => cartDrawer.classList.remove("active"));
    }

    // Modal Close Action Register
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const productModal = document.getElementById("product-modal");

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", window.closeProductModal);
    if (productModal) {
        productModal.addEventListener("click", (e) => {
            if (e.target === productModal) window.closeProductModal();
        });
    }

    // ==========================================================================
    // ADDITIONAL COMPONENT BACKWARDS COMPATIBILITY (SEARCH & CHAT LAYOUTS)
    // ==========================================================================
    const searchTrigger = document.getElementById("search-trigger-btn");
    const searchClose = document.getElementById("search-close");
    const searchOverlay = document.getElementById("search-overlay");

    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener("click", () => searchOverlay.classList.add("active"));
    }
    if (searchClose && searchOverlay) {
        searchClose.addEventListener("click", () => searchOverlay.classList.remove("active"));
    }

    const chatToggle = document.getElementById("chat-toggle");
    const chatCloseX = document.getElementById("chat-close");
    const chatWindow = document.getElementById("chat-window");

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener("click", () => chatWindow.classList.toggle("hidden"));
    }
    if (chatCloseX && chatWindow) {
        chatCloseX.addEventListener("click", () => chatWindow.classList.add("hidden"));
    }
});
