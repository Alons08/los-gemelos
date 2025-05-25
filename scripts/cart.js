let cart = [];

function initCart() {
    loadCart();
    setupCartButton();
    setupAddToCartButtons();
}

function loadCart() {
    const savedCart = localStorage.getItem('gemelosCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCounter();
    }
}

function saveCart() {
    localStorage.setItem('gemelosCart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const counter = document.querySelector('.cart-counter');
    if (counter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function setupCartButton() {
    const cartButton = document.createElement('div');
    cartButton.className = 'floating-cart-button';
    cartButton.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-counter"></span>
    `;
    document.body.appendChild(cartButton);
    updateCartCounter();
    
    cartButton.addEventListener('click', toggleCartModal);
}

function toggleCartModal() {
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.classList.toggle('show');
        if (modal.classList.contains('show')) {
            renderCartItems();
        }
    } else {
        createCartModal();
    }
}

function createCartModal() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal show';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h3>Tu Pedido</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items-container"></div>
            <div class="cart-total">
                <span>Total:</span>
                <span class="total-amount">S/ 0.00</span>
            </div>
            <button class="checkout-btn">Realizar Pedido</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-cart').addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    modal.querySelector('.checkout-btn').addEventListener('click', checkout);
    
    renderCartItems();
}

function renderCartItems() {
    const container = document.querySelector('.cart-items-container');
    const totalElement = document.querySelector('.total-amount');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        if (totalElement) totalElement.textContent = 'S/ 0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const menuItem = menuItems.find(mi => mi.id === item.id);
        if (!menuItem) return;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${menuItem.name}</h4>
                <p>S/ ${menuItem.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="change-quantity minus" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="change-quantity plus" data-index="${index}">+</button>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="cart-item-subtotal">
                S/ ${(menuItem.price * item.quantity).toFixed(2)}
            </div>
        `;
        container.appendChild(cartItem);
        
        total += menuItem.price * item.quantity;
    });
    
    if (totalElement) totalElement.textContent = `S/ ${total.toFixed(2)}`;
    
    // Add event listeners for quantity changes
    document.querySelectorAll('.change-quantity.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                saveCart();
                renderCartItems();
            }
        });
    });
    
    document.querySelectorAll('.change-quantity.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            cart[index].quantity++;
            saveCart();
            renderCartItems();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1);
            saveCart();
            renderCartItems();
        });
    });
}

function setupAddToCartButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.dataset.id);
            const quantityInput = e.target.closest('.menu-item-actions').querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            
            addToCart(itemId, quantity);
        }
    });
}

function addToCart(itemId, quantity = 1) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            quantity: quantity
        });
    }
    
    saveCart();
    
    // Show added to cart feedback
    const floatingCart = document.querySelector('.floating-cart-button');
    if (floatingCart) {
        floatingCart.classList.add('pulse');
        setTimeout(() => {
            floatingCart.classList.remove('pulse');
        }, 500);
    }
}

function checkout() {
    if (cart.length === 0) return;
    
    const phoneNumber = "51987654321"; // Reemplazar con número real
    let message = "¡Hola! Quiero hacer el siguiente pedido:\n\n";
    
    let total = 0;
    
    cart.forEach(item => {
        const menuItem = menuItems.find(mi => mi.id === item.id);
        if (menuItem) {
            message += `${menuItem.name} x ${item.quantity} - S/ ${(menuItem.price * item.quantity).toFixed(2)}\n`;
            total += menuItem.price * item.quantity;
        }
    });
    
    message += `\nTotal: S/ ${total.toFixed(2)}\n\nGracias!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    renderCartItems();
    toggleCartModal();
}