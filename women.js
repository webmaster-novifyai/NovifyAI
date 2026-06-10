document.addEventListener('DOMContentLoaded', () => {
    // 1. Women's Luxury Collection Data Array
    const womenProducts = [
        {
            id: 'w1',
            title: 'Silk Satin Evening Gown',
            price: 1250.00,
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600',
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            id: 'w2',
            title: 'Cashmere Double-Breasted Coat',
            price: 1850.00,
            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600',
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 'w3',
            title: 'Tailored Tuxedo Blazer',
            price: 950.00,
            image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600',
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            id: 'w4',
            title: 'Asymmetrical Pleated Skirt',
            price: 650.00,
            image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600',
            sizes: ['S', 'M', 'L']
        }
    ];

    // 2. Target the Products Grid Element on women.html
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    // Clear any fallback text or placeholders
    productsGrid.innerHTML = '';

    // 3. Dynamically Generate the Premium Product Cards
    womenProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;

        // Build elegant luxury dropdown selectors
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

    // 4. Hook up simple Click Actions for the "Add to Bag" buttons
    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('.product-title').textContent;
            const size = card.querySelector('.luxury-size-selector').value;
            
            alert(`Added ${title} (Size ${size}) to your Shopping Bag.`);
            
            // Optional basic cart badge incrementor hook
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent || '0') + 1;
            }
        }
    });
});
