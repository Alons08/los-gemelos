// Carrito de compras
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');
const toast = document.getElementById('toast');

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
    showToast('Carrito vaciado');
});

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('El carrito está vacío', 'error');
        return;
    }
    
    showToast('Pedido realizado con éxito');
    cart = [];
    cartCount = 0;
    cartTotal = 0;
    updateCart();
    cartModal.classList.remove('active');
});

// Agregar producto al carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        const quantity = parseInt(quantityInput.value);
        
        addToCart(product, quantity);
    }
    
    // Incrementar cantidad
    if (e.target.classList.contains('plus')) {
        const productId = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        input.value = parseInt(input.value) + 1;
    }
    
    // Decrementar cantidad
    if (e.target.classList.contains('minus')) {
        const productId = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }
});

// Manejar cambios de cantidad en el carrito
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
            updateCart();
        }
    }
});

// Eliminar producto del carrito
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.dataset.id);
        removeFromCart(productId);
    }
});

// Función para agregar al carrito
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
    showToast(`${product.name} agregado al carrito`);
}

// Función para eliminar del carrito
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cartTotal -= item.product.price * item.quantity;
        cart.splice(itemIndex, 1);
        
        updateCart();
        showToast(`${item.product.name} eliminado del carrito`, 'warning');
    }
}

// Función para actualizar el carrito
function updateCart() {
    // Actualizar contador
    cartCountElement.textContent = cartCount;
    
    // Actualizar total
    cartTotalElement.textContent = `S/ ${cartTotal.toFixed(2)}`;
    
    // Actualizar items del carrito
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
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
}

// Función para mostrar notificaciones
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast';
    
    switch (type) {
        case 'success':
            toast.style.backgroundColor = 'var(--success-color)';
            break;
        case 'error':
            toast.style.backgroundColor = 'var(--danger-color)';
            break;
        case 'warning':
            toast.style.backgroundColor = 'var(--warning-color)';
            break;
        default:
            toast.style.backgroundColor = 'var(--success-color)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}