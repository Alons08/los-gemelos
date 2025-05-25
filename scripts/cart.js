// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
let cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');

// Mostrar/ocultar carrito
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Vaciar carrito
clearCartBtn.addEventListener('click', () => {
    cart = [];
    cartCount = 0;
    cartTotal = 0;
    updateCart();
    localStorage.removeItem('cart');
});

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    cart = [];
    cartCount = 0;
    cartTotal = 0;
    updateCart();
    localStorage.removeItem('cart');
    cartModal.classList.remove('active');
});

// Delegación de eventos
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        const quantity = parseInt(quantityInput.value);
        addToCart(product, quantity);
    }
    
    if (e.target.classList.contains('plus') && e.target.closest('.quantity-control')) {
        const productId = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        input.value = parseInt(input.value) + 1;
    }
    
    if (e.target.classList.contains('minus') && e.target.closest('.quantity-control')) {
        const productId = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }
    
    if (e.target.classList.contains('plus') && e.target.closest('.cart-item-controls')) {
        const productId = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.cart-item-quantity[data-id="${productId}"]`);
        input.value = parseInt(input.value) + 1;
        input.dispatchEvent(new Event('change'));
    }
    
    if (e.target.classList.contains('minus') && e.target.closest('.cart-item-controls')) {
        const productId = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.cart-item-quantity[data-id="${productId}"]`);
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            input.dispatchEvent(new Event('change'));
        } else {
            removeFromCart(productId);
        }
    }
    
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const productId = parseInt(e.target.dataset.id || e.target.closest('.remove-item').dataset.id);
        removeFromCart(productId);
    }
});

// Manejar cambios de cantidad
cartItemsContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('cart-item-quantity')) {
        const productId = parseInt(e.target.dataset.id);
        const newQuantity = parseInt(e.target.value);
        
        if (newQuantity < 1) {
            e.target.value = 1;
            return;
        }
        
        const itemIndex = cart.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
            updateCart();
        }
    }
});

// Funciones del carrito
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    cartCount += quantity;
    cartTotal += product.price * quantity;
    
    updateCart();
    cartBtn.classList.add('cart-pulse');
    setTimeout(() => cartBtn.classList.remove('cart-pulse'), 1000);
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cartTotal -= item.product.price * item.quantity;
        cart.splice(itemIndex, 1);
        updateCart();
    }
}

function updateCart() {
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = `S/ ${cartTotal.toFixed(2)}`;
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        localStorage.removeItem('cart');
        return;
    }
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        cartItemElement.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.product.name}</h4>
                <p class="cart-item-price">S/ ${item.product.price.toFixed(2)}</p>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.product.id}">-</button>
                    <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.product.id}">
                    <button class="quantity-btn plus" data-id="${item.product.id}">+</button>
                    <button class="remove-item" data-id="${item.product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
}