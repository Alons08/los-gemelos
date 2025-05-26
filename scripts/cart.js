// Carrito de compras con expiración
let cart = [];
let cartExpirationTimer = null;

// Cargar carrito con verificación de expiración
function loadCartWithExpiration() {
    const cartData = localStorage.getItem('cart');
    const cartTimestamp = localStorage.getItem('cartTimestamp');
    
    if (cartData && cartTimestamp) {
        const now = new Date().getTime();
        const expirationTime = 20 * 60 * 1000; // 20 minutos en milisegundos
        
        if (now - parseInt(cartTimestamp) < expirationTime) {
            cart = JSON.parse(cartData);
            startCartExpirationTimer(expirationTime - (now - parseInt(cartTimestamp)));
        } else {
            clearCart();
        }
    }
}

// Guardar carrito con timestamp
function saveCartWithTimestamp() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTimestamp', new Date().getTime().toString());
    startCartExpirationTimer(20 * 60 * 1000); // 20 minutos
}

// Iniciar temporizador de expiración
function startCartExpirationTimer(duration) {
    if (cartExpirationTimer) clearTimeout(cartExpirationTimer);
    cartExpirationTimer = setTimeout(clearCart, duration);
}

// Limpiar carrito
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTimestamp');
    updateCart();
}

// Elementos del DOM
const cartElements = {
    btn: document.getElementById('cart-btn'),
    modal: document.getElementById('cart-modal'),
    overlay: document.getElementById('cart-overlay'),
    items: document.getElementById('cart-items'),
    total: document.getElementById('cart-total'),
    count: document.getElementById('cart-count'),
    close: document.getElementById('close-cart'),
    checkout: document.getElementById('checkout')
};

// Inicializar carrito
function initCart() {
    loadCartWithExpiration();
    setupCartEvents();
    
    document.addEventListener('productAddedToCart', (e) => {
        addToCart(e.detail.product, e.detail.quantity);
    });
}

// Configurar eventos
function setupCartEvents() {
    if (cartElements.btn) cartElements.btn.addEventListener('click', showCart);
    if (cartElements.close) cartElements.close.addEventListener('click', hideCart);
    if (cartElements.overlay) cartElements.overlay.addEventListener('click', hideCart);
    if (cartElements.checkout) cartElements.checkout.addEventListener('click', checkout);
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Mostrar/ocultar carrito
function showCart(e) {
    if (e) e.preventDefault();
    cartElements.modal.classList.add('active');
    cartElements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideCart() {
    cartElements.modal.classList.remove('active');
    cartElements.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Actualizar vista del carrito
function updateCart() {
    if (!cartElements.items) return;
    
    cartElements.items.innerHTML = '';
    
    if (cart.length === 0) {
        cartElements.items.innerHTML = '';
        if (cartElements.total) cartElements.total.textContent = 'S/0.00';
        if (cartElements.count) cartElements.count.textContent = '0';
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
        cartElements.items.appendChild(cartItem);
    });
    
    if (cartElements.total) cartElements.total.textContent = `S/${total.toFixed(2)}`;
    if (cartElements.count) cartElements.count.textContent = itemCount;
    
    saveCartWithTimestamp();
    setupCartItemEvents();
}

// Configurar eventos de items del carrito
function setupCartItemEvents() {
    document.querySelectorAll('.cart-item .quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const input = this.parentElement.querySelector('.quantity-input');
            let quantity = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                quantity = Math.max(1, quantity - 1);
            } else {
                quantity++;
            }
            
            input.value = quantity;
            updateCartItem(id, quantity);
        });
    });
    
    document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            updateCartItem(id, Math.max(1, parseInt(this.value) || 1));
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}

// Funciones del carrito
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

function updateCartItem(id, quantity) {
    const item = cart.find(item => item.product.id === id);
    if (item) {
        item.quantity = quantity;
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.product.id !== id);
    updateCart();
    // Eliminada la línea que mostraba la notificación al eliminar
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
    
    message += `\n*Total: S/${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}*`;
    message += '\n\nPor favor, confirmen mi pedido. ¡Gracias!';
    
    window.open(`https://wa.me/51931088900?text=${encodeURIComponent(message)}`, '_blank');
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initCart);