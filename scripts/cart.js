// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout');

// Event listeners
cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);
checkoutBtn.addEventListener('click', checkout);

// Función para alternar el carrito
function toggleCart() {
    cartModal.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartModal.classList.contains('active') ? 'hidden' : 'auto';
    
    if (cartModal.classList.contains('active')) {
        renderCartItems();
    }
}

// Función para agregar al carrito
function addToCart(product) {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        // Incrementar cantidad
        existingItem.quantity += 1;
    } else {
        // Agregar nuevo item
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Actualizar localStorage
    updateCart();
    
    // Mostrar notificación
    showNotification(`${product.name} agregado al carrito`);
}

// Función para remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    renderCartItems();
}

// Función para actualizar cantidad
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity > 0 ? newQuantity : 1;
        updateCart();
        renderCartItems();
    }
}

// Función para renderizar items del carrito
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartTotal.textContent = 'S/0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">S/${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove" data-id="${item.id}">Eliminar</button>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
    
    // Actualizar total
    cartTotal.textContent = `S/${total.toFixed(2)}`;
    
    // Configurar eventos para los botones
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) updateQuantity(productId, item.quantity - 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) updateQuantity(productId, item.quantity + 1);
        });
    });
}

// Función para actualizar el carrito
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para finalizar compra
function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Aquí puedes implementar la lógica de checkout
    // Por ahora solo mostraremos un mensaje y limpiaremos el carrito
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Enviar mensaje por WhatsApp
    const phoneNumber = '51987654321';
    let message = '¡Hola! Quiero realizar el siguiente pedido:\n\n';
    
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - S/${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\nTotal: S/${total.toFixed(2)}\n\nGracias.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito
    cart = [];
    updateCart();
    renderCartItems();
    toggleCart();
    
    // Mostrar mensaje de agradecimiento
    showNotification('¡Gracias por tu pedido! Te contactaremos pronto.');
}

// Actualizar contador del carrito al cargar la página
updateCartCount();