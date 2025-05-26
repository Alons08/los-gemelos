// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout');

// Inicializar carrito
function initCart() {
    updateCart();
    setupCartEvents();
}

// Configurar eventos del carrito
function setupCartEvents() {
    cartBtn.addEventListener('click', showCart);
    closeCart.addEventListener('click', hideCart);
    cartOverlay.addEventListener('click', hideCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Evento delegado para añadir productos
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const quantityInput = e.target.closest('.item-actions').querySelector('.quantity-input');
                const quantity = parseInt(quantityInput.value) || 1;
                addToCart(product, quantity);
            }
        }
    });
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Mostrar carrito
function showCart(e) {
    e.preventDefault();
    cartModal.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Ocultar carrito
function hideCart() {
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Actualizar carrito
function updateCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = 'S/0.00';
        cartCount.textContent = '0';
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.product.name}</h4>
                <p>S/${item.product.price.toFixed(2)} c/u</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.product.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.product.id}">
                    <button class="quantity-btn plus" data-id="${item.product.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Actualizar totales
    cartTotal.textContent = `S/${total.toFixed(2)}`;
    cartCount.textContent = itemCount;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Configurar eventos de los items del carrito
    setupCartItemEvents();
}

// Configurar eventos para items del carrito
function setupCartItemEvents() {
    // Botones de cantidad
    document.querySelectorAll('.cart-item .quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const input = this.parentElement.querySelector('.quantity-input');
            let quantity = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                quantity = quantity > 1 ? quantity - 1 : 1;
            } else {
                quantity++;
            }
            
            input.value = quantity;
            updateCartItem(id, quantity);
        });
    });
    
    // Inputs de cantidad
    document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const quantity = parseInt(this.value) || 1;
            updateCartItem(id, quantity);
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            removeFromCart(id);
        });
    });
}

// Añadir al carrito
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    updateCart();
    showNotification(`${product.name} añadido al carrito`);
}

// Actualizar item del carrito
function updateCartItem(id, quantity) {
    const item = cart.find(item => item.product.id === id);
    if (item) {
        item.quantity = quantity;
        updateCart();
    }
}

// Eliminar del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.product.id !== id);
    updateCart();
    showNotification('Producto eliminado', 'warning');
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    let message = '¡Hola! Quiero realizar el siguiente pedido:\n\n';
    
    cart.forEach(item => {
        message += `- ${item.product.name} (x${item.quantity}): S/${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    message += `\n*Total: S/${total.toFixed(2)}*`;
    message += '\n\nPor favor, confirmen mi pedido. ¡Gracias!';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51987654321?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    cart = [];
    updateCart();
    hideCart();
}

// Inicializar carrito
if (document.readyState !== 'loading') {
    initCart();
} else {
    document.addEventListener('DOMContentLoaded', initCart);
}