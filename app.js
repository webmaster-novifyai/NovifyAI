// --- Data Source: Luxury Inventory with Color and Size Matrix ---
const products = [
    // Women's Collection (10 Products)
    { id: 'w1', category: 'women', title: 'Velvet Embroidered Luxury Suit', price: 245.00, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop' },
    { id: 'w2', category: 'women', title: 'Silk Brocade Formal Ensemble', price: 280.00, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop' },
    { id: 'w3', category: 'women', title: 'Chiffon Evening Anarkali', price: 195.00, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
    { id: 'w4', category: 'women', title: 'Organza Floral Festive Wear', price: 210.00, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop' },
    { id: 'w5', category: 'women', title: 'Handcrafted Georgette Suit', price: 320.00, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop' },
    { id: 'w6', category: 'women', title: 'Raw Silk Festive Kurta Set', price: 185.00, img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop' },
    { id: 'w7', category: 'women', title: 'Onyx Tailored Blazer Suit', price: 295.00, img: 'https://images.unsplash.com/photo-1611042553975-08733608b2db?q=80&w=600&auto=format&fit=crop' },
    { id: 'w8', category: 'women', title: 'Classic Ivory Tuxedo Suit', price: 395.00, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop' },
    { id: 'w9', category: 'women', title: 'Embellished Jacquard Statement Suit', price: 260.00, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop' },
    { id: 'w10', category: 'women', title: 'Monochrome Modern Pantsuit', price: 225.00, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop' },

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

// Available options configuration
const colorPalette = [
    { name: 'black', hex: '#111111' },
    { name: 'gold', hex: '#D4AF37' },
    { name: 'navy', hex: '#002040' },
    { name: 'emerald', hex: '#046307' }
];
const standardSizes = ['Small', 'Medium', 'Large', 'XL'];

// Shopping Cart Application State
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initCartEventHandlers();
});

// --- Catalog Rendering Engine ---
function renderProducts() {
    const womenGrid = document.getElementById('women-grid');
    const menGrid = document.getElementById('men-grid');

    womenGrid.innerHTML = '';
    menGrid.innerHTML = '';

    products.forEach(product => {
        // Build Swatches HTML
        let swatchesHTML = '';
        colorPalette.forEach((color, index) => {
            const isActive = index === 0 ? 'active' : '';
            swatchesHTML += `
                <div class="swatch ${isActive}" 
                     style="background-color: ${color.hex};" 
                     data-color="${color.name}"
                     onclick="changeProductColor(this, '${product.id}')">
                </div>
            `;
        });

        // Build Size Dropdown HTML
        let sizesHTML = `<select id="size-${product.id}" class="size-selector">`;
        standardSizes.forEach(size => {
            sizesHTML += `<option value="${size}">${size}</option>`;
        });
        sizesHTML += `</select>`;

        const productHTML = `
            <div class="product-card" id="card-${product.id}">
                <div class="image-container color-tint-black" id="img-container-${product.id}">
                    <img src="${product.img}" alt="${product.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    
                    <div class="product-variants">
                        <div>
                            <div class="variant-label">Color</div>
                            <div class="color-swatches">${swatchesHTML}</div>
                        </div>
                        <div>
                            <div class="variant-label">Size</div>
                            ${sizesHTML}
                        </div>
                    </div>

                    <button class="btn-add-cart" onclick="processAddToBag('${product.id}')">Add to Bag</button>
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

// --- Live Color Variant Swap Engine ---
function changeProductColor(swatchElement, productId) {
    const container = swatchElement.parentElement;
    
    // Remove active status from sibling swatches inside this specific product card
    const swatches = container.querySelectorAll('.swatch');
    swatches.forEach(s => s.classList.remove('active'));
    
    // Make clicked swatch active
    swatchElement.classList.add('active');
    
    // Update Image Container filter class
    const chosenColor = swatchElement.getAttribute('data-color');
    const imgContainer = document.getElementById(`img-container-${productId}`);
    
    // Clear old filter classes and add the new matching variant theme class
    imgContainer.className = 'image-container'; 
    imgContainer.classList.add(`color-tint-${chosenColor}`);
}

// --- Cart Handlers & Processing ---
function initCartEventHandlers() {
    const cartToggle = document.getElementById('cart-toggle-btn');
    const cartClose = document.getElementById('cart-close-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');

    const openCart = () => {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('visible');
    };

    const closeCart = () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('visible');
    };

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

function processAddToBag(productId) {
    const product = products.find(p => p.id === productId);
    
    // Gather selected attributes from DOM
    const card = document.getElementById(`card-${productId}`);
    const activeSwatch = card.querySelector('.swatch.active');
    const selectedColor = activeSwatch ? activeSwatch.getAttribute('data-color') : 'black';
    const selectedSize = document.getElementById(`size-${productId}`).value;

    // Create a composite tracking key to allow separate cart item entries if identical items have unique variants
    const variantCartId = `${productId}-${selectedColor}-${selectedSize}`;
    
    const existingItem = cart.find(item => item.variantCartId === variantCartId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            ...product, 
            variantCartId: variantCartId,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            quantity: 1 
        });
    }

    updateCartUI();
    
    // Slide cart outward
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('visible');
}

function removeFromCart(variantCartId) {
    cart = cart.filter(item => item.variantCartId !== variantCartId);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
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
                <div class="image-container color-tint-${item.selectedColor}" style="width:60px; height:75px; flex-shrink:0; margin-right:15px;">
                    <img src="${item.img}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title} (x${item.quantity})</h4>
                    <div class="cart-item-meta">Color: ${item.selectedColor} | Size: ${item.selectedSize}</div>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.variantCartId}')">Remove</button>
                </div>
            </div>
        `;
    });
}