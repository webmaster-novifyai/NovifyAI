document.addEventListener('DOMContentLoaded', () => {
    // 1. Men's Luxury Collection Data Array
    const menProducts = [
        {
            id: 'm1',
            title: 'Slim-Fit Wool Velvet Tuxedo',
            price: 2100.00,
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600',
            sizes: ['48R', '50R', '52R', '54R']
        },
        {
            id: 'm2',
            title: 'Structured Camel Hair Topcoat',
            price: 1950.00,
            image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600',
            sizes: ['46R', '48R', '50R', '52R']
        },
        {
            id: 'm3',
            title: 'Handcrafted Calfskin Chelsea Boot',
            price: 850.00,
            image: 'https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=600',
            sizes: ['8', '9', '10', '11']
        },
        {
            id: 'm4',
            title: 'Italian Silk Jacquard Shirt',
            price: 580.00,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600',
            sizes: ['S', 'M', 'L', 'XL']
        }
    ];

    // 2. Target the Products Grid Element on men.html
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    // 3. Dynamically Generate the Cards
    menProducts.forEach(product => {
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

        productsGrid.appendChild(card);
    });

    // 4. Interaction Listener Hook
    productsGrid.addEventListener('click', (e) => {
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
});
