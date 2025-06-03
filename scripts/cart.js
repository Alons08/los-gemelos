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
            updateCart(); // Actualizar la vista del carrito al cargar
            return true;
        } else {
            clearCart();
        }
    }
    return false;
}

// Guardar carrito con timestamp
function saveCartWithTimestamp() {
    if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartTimestamp', new Date().getTime().toString());
        startCartExpirationTimer(20 * 60 * 1000); // 20 minutos
    } else {
        clearCart(); // Limpiar completamente si el carrito está vacío
    }
}

// Iniciar temporizador de expiración
function startCartExpirationTimer(duration) {
    if (cartExpirationTimer) clearTimeout(cartExpirationTimer);
    cartExpirationTimer = setTimeout(clearCart, duration);
}

// Limpiar carrito completamente
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTimestamp');
    updateCart();
    updateCartCount();
}

// Actualizar contador del carrito
function updateCartCount() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartElements.count) {
        cartElements.count.textContent = itemCount;
    }
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
    close2: document.getElementById('close-cart-2'),
    checkout: document.getElementById('checkout'),
    backToCart: document.getElementById('back-to-cart'),
    cancelOrder: document.getElementById('cancel-order'),
    submitOrder: document.getElementById('submit-order'),
    form: document.getElementById('order-form'),
    deliveryType: document.getElementById('delivery-type'),
    pickupFields: document.getElementById('pickup-fields'),
    deliveryFields: document.getElementById('delivery-fields'),
    step1: document.getElementById('cart-step-1'),
    step2: document.getElementById('cart-step-2')
};

// Inicializar carrito
function initCart() {
    loadCartWithExpiration();
    setupCartEvents();
    setupDeliveryToggle();
    updateCartCount();
    
    // Mostrar siempre el paso 1 al abrir el carrito
    cartElements.step1.classList.add('active');
    cartElements.step2.classList.remove('active');
}

// Configurar eventos de tipo de entrega
function setupDeliveryToggle() {
    if (cartElements.deliveryType) {
        cartElements.deliveryType.addEventListener('change', function() {
            const deliveryType = this.value;
            
            // Ocultar todos los campos primero
            cartElements.pickupFields.classList.remove('active');
            cartElements.deliveryFields.classList.remove('active');
            
            // Mostrar los campos correspondientes
            if (deliveryType === 'pickup') {
                cartElements.pickupFields.classList.add('active');
            } else if (deliveryType === 'delivery') {
                cartElements.deliveryFields.classList.add('active');
            }
        });
    }
}

    let eventsConfigured = false;

    function setupCartEvents() {
        if (eventsConfigured) return; // Evitar duplicación
        eventsConfigured = true;

        if (cartElements.btn) cartElements.btn.addEventListener('click', showCart);
        if (cartElements.close) cartElements.close.addEventListener('click', hideCart);
        if (cartElements.close2) cartElements.close2.addEventListener('click', hideCart);
        if (cartElements.overlay) cartElements.overlay.addEventListener('click', hideCart);
        if (cartElements.checkout) cartElements.checkout.addEventListener('click', goToCheckout);
        if (cartElements.backToCart) cartElements.backToCart.addEventListener('click', backToCart);
        if (cartElements.cancelOrder) cartElements.cancelOrder.addEventListener('click', backToCart);
        if (cartElements.submitOrder) cartElements.submitOrder.addEventListener('click', submitOrder);

        document.addEventListener('productAddedToCart', (e) => {
            console.log('Evento productAddedToCart disparado:', e.detail);
            addToCart(e.detail.product, e.detail.quantity);
        });
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
    }, 2000);
}

// Mostrar/ocultar carrito
function showCart(e) {
    if (e) e.preventDefault();
    cartElements.modal.classList.add('active');
    cartElements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Mostrar siempre el paso 1 al abrir el carrito
    cartElements.step1.classList.add('active');
    cartElements.step2.classList.remove('active');
}

function hideCart() {
    cartElements.modal.classList.remove('active');
    cartElements.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Ir al formulario de checkout
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    cartElements.step1.classList.remove('active');
    cartElements.step2.classList.add('active');
}

// Volver al carrito desde el formulario
function backToCart() {
    cartElements.step2.classList.remove('active');
    cartElements.step1.classList.add('active');
}

// Actualizar vista del carrito
function updateCart() {
    if (!cartElements.items) return;
    
    cartElements.items.innerHTML = '';
    
    if (cart.length === 0) {
        cartElements.items.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        if (cartElements.total) cartElements.total.textContent = 'S/0.00';
        updateCartCount();
        saveCartWithTimestamp(); // Guardar estado vacío
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
    updateCartCount();
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
            const newQuantity = Math.max(1, parseInt(this.value) || 1);
            this.value = newQuantity; // Asegurar que el valor sea válido
            updateCartItem(id, newQuantity);
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
    showNotification(`${product.name} añadido al carrito (${quantity})`, 'success');
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
}

// Validar formulario
function validateForm() {
    const form = cartElements.form;
    const deliveryType = cartElements.deliveryType.value;
    
    // Validar campos obligatorios comunes
    if (!form['customer-name'].value.trim()) {
        showNotification('Por favor ingresa tu nombre', 'error');
        return false;
    }
    
    if (!form['customer-phone'].value.trim()) {
        showNotification('Por favor ingresa tu teléfono', 'error');
        return false;
    }
    
    if (!deliveryType) {
        showNotification('Por favor selecciona el tipo de entrega', 'error');
        return false;
    }
    
    // Validar campos específicos según el tipo de entrega
    if (deliveryType === 'delivery') {
        if (!form['delivery-address'].value.trim()) {
            showNotification('Por favor ingresa la dirección de entrega', 'error');
            return false;
        }
        
        const paymentSelected = form.querySelector('input[name="delivery-payment"]:checked');
        if (!paymentSelected) {
            showNotification('Por favor selecciona el método de pago', 'error');
            return false;
        }
    } else if (deliveryType === 'pickup') {
        const paymentSelected = form.querySelector('input[name="delivery-payment"]:checked');
        if (!paymentSelected) {
            showNotification('Por favor selecciona el método de pago', 'error');
            return false;
        }
    }
    
    return true;
}

// Enviar pedido
function submitOrder() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    if (!validateForm()) {
        return;
    }
    
    const form = cartElements.form;
    const deliveryType = cartElements.deliveryType.value;
    
    // Obtener datos del formulario
    const customerName = form['customer-name'].value.trim();
    const customerPhone = form['customer-phone'].value.trim();
    const paymentMethod = form.querySelector('input[name="delivery-payment"]:checked').value; // Asignación común

    if (deliveryType === 'pickup') {
        const notes = form['pickup-notes'].value.trim();

        // Construir mensaje para recoger en el local
        deliveryInfo = `*Recoger en el Local*\n` +
                    (notes ? `*Observaciones:* ${notes}\n` : '');
    } else if (deliveryType === 'delivery') {
        const address = form['delivery-address'].value.trim();
        const reference = form['delivery-reference'].value.trim();
        const notes = form['delivery-notes'].value.trim();

        // Construir mensaje para delivery
        deliveryInfo = `*Delivery*\n` +
                    `*Dirección:* ${address}\n` +
                    (reference ? `*Referencia:* ${reference}\n` : '') +
                    (notes ? `*Observaciones:* ${notes}\n` : '');
    }

    // Construir mensaje para WhatsApp
    let message = `¡Hola Los Gemelos! Quiero realizar el siguiente pedido:\n\n`;
    message += `*DATOS DEL CLIENTE*\n`;
    message += `*Nombre:* ${customerName}\n`;
    message += `*Teléfono:* ${customerPhone}\n`;
    message += `*Método de Pago:* ${paymentMethod}\n\n`; // Método de pago solo aquí

    message += `*DETALLES DE ENTREGA*\n`;
    message += deliveryInfo + '\n';

    message += `*PEDIDO*\n`;
    cart.forEach(item => {
        message += `- ${item.product.name} (x${item.quantity}): S/${(item.product.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: S/${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}*`;
    message += '\n\nPor favor, confirmen mi pedido. ¡Gracias!';
            
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/51931088900?text=${encodeURIComponent(message)}`; /*AQUI EL NUMERO*/
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito y formulario inmediatamente después de enviar
    clearCart();
    resetForm();
    hideCart();
    
    // Mostrar confirmación
    showNotification('Pedido enviado correctamente', 'success');
}

// Resetear formulario
function resetForm() {
    if (cartElements.form) {
        cartElements.form.reset();
        cartElements.pickupFields.classList.remove('active');
        cartElements.deliveryFields.classList.remove('active');
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initCart);