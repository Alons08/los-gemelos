// Carrito de compras
let cart = [];
let cartTotal = 0;

// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.querySelector('.cart-count');
const notification = document.getElementById('notification');

// Mostrar/ocultar carrito
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('show');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

// Cerrar carrito al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

// Función para agregar producto al carrito
function addToCart(productId, quantity) {
    // Buscar producto en los arrays de productos
    let product = products.comidas.find(p => p.id === productId);
    if (!product) {
        product = products.bebidas.find(p => p.id === productId);
    }
    
    if (!product) return;
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    // Actualizar total
    cartTotal += product.price * quantity;
    
    // Actualizar UI
    updateCartUI();
    
    // Mostrar notificación
    showNotification(`${quantity} ${product.name} agregado(s) al carrito`);
}

// Función para actualizar la UI del carrito
function updateCartUI() {
    // Actualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartTotalPrice.textContent = 'S/ 0.00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>S/ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <p class="item-total">S/ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Actualizar total
    cartTotalPrice.textContent = `S/ ${cartTotal.toFixed(2)}`;
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(parseInt(btn.dataset.id));
        });
    });
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartTotal -= item.price * item.quantity;
        cart.splice(itemIndex, 1);
        updateCartUI();
    }
}

// Función para mostrar notificación
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Event delegation para botones "Agregar"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add') || e.target.closest('.btn-add')) {
        const btn = e.target.classList.contains('btn-add') ? e.target : e.target.closest('.btn-add');
        const productId = parseInt(btn.dataset.id);
        const quantityInput = btn.closest('.product-actions').querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);
        
        addToCart(productId, quantity);
    }
    
    // Manejar incremento/decremento de cantidad
    if (e.target.classList.contains('quantity-btn')) {
        const btn = e.target;
        const input = btn.closest('.quantity-selector').querySelector('.quantity-input');
        let value = parseInt(input.value);
        
        if (btn.classList.contains('plus')) {
            input.value = value + 1;
        } else if (btn.classList.contains('minus') && value > 1) {
            input.value = value - 1;
        }
    }
});

// Botón de confirmar pedido
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Agrega productos al carrito primero');
        return;
    }
    
    // Aquí podrías implementar la lógica para enviar el pedido
    showNotification('Pedido confirmado. ¡Gracias por tu compra!');
    cart = [];
    cartTotal = 0;
    updateCartUI();
    cartModal.classList.remove('show');
});