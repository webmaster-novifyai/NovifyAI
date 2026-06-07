// --- Data Source: 10 Men's & 10 Women's Premium Suits ---
const products = [
    // Women's Collection
    { id: 'w1', category: 'women', title: 'Velvet Embroidered Luxury Suit', price: 245.00, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400' },
    { id: 'w2', category: 'women', title: 'Silk Brocade Formal Ensemble', price: 280.00, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400' },
    { id: 'w3', category: 'women', title: 'Chiffon Evening Anarkali', price: 195.00, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400' },
    { id: 'w4', category: 'women', title: 'Organza Floral Festive Wear', price: 210.00, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400' },
    { id: 'w5', category: 'women', title: 'Handcrafted Georgette Suit', price: 320.00, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=400' },
    { id: 'w6', category: 'women', title: 'Raw Silk Festive Kurta Set', price: 185.00, img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=400' },
    { id: 'w7', category: 'women', title: 'Cotton Linen Casual Blazer Suit', price: 150.00, img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=400' },
    { id: 'w8', category: 'women', title: 'Classic Tailored Ivory Tuxedo', price: 395.00, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400' },
    { id: 'w9', category: 'women', title: 'Embellished Jacquard Statement Suit', price: 260.00, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400' },
    { id: 'w10', category: 'women', title: 'Monochrome Modern Pantsuit', price: 225.00, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400' },

    // Men's Collection
    { id: 'm1', category: 'men', title: 'Midnight Black Bespoke Tuxedo', price: 450.00, img: 'https://images.unsplash.com/photo-1593032465175-481da7e47352?q=80&w=400' },
    { id: 'm2', category: 'men', title: 'Charcoal Wool Double-Breasted Suit', price: 420.00, img: 'https://images.unsplash.com/photo-1598805981116-804455e69b7e?q=80&w=400' },
    { id: 'm3', category: 'men', title: 'Classic Navy Italian Cut Suit', price: 390.00, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400' },
    { id: 'm4', category: 'men', title: 'Golden Thread Embroidered Sherwani', price: 550.00, img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400' },
    { id: 'm5', category: 'men', title: 'Premium Silk Blend Kurta Pajama', price: 175.00, img: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=400' },
    { id: 'm6', category: 'men', title: 'Deep Maroon Velvet Dinner Jacket', price: 310.00, img: 'https://images.unsplash.com/photo-1621594500145-50a98b48443e?q=80&w=400' },
    { id: 'm7', category: 'men', title: 'Slim Fit Slate Grey 3-Piece Suit', price: 480.00, img: 'https://images.unsplash.com/photo-1592844306505-72476d8c552c?q=80&w=400' },
    { id: 'm8', category: 'men', title: 'Tailored Tan Summer Linen Suit', price: 290.00, img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=400' },
    { id: 'm9', category: 'men', title: 'Regal Emerald Bandhgala Suit', price: 520.00, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400' },
    { id: 'm10', category: 'men', title: 'Classic Houndstooth Executive Suit', price: 460.00, img: 'https://images.unsplash.com/photo-1505632951788-8b8222138331?q=80&w=400' }
];

// --- Shopping Cart Application State ---
let cart = [];

// --- Lifecycle Event Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initCartEventHandlers();
});

// --- Catalog Rendering Engine ---
function renderProducts() {
    const womenGrid = document.getElementById('women-grid');
    const menGrid = document.getElementById('men-grid');

    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.title}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn-add-cart" onclick="addToCart('${product.id}')">Add to Bag</button>
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

// --- Cart Interface Control Actions ---
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

// --- Core Shopping Cart Logic ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('visible');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    // Compute totals
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
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title} (x${item.quantity})</h4>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
    });
}