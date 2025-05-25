document.addEventListener('DOMContentLoaded', function() {
    // Productos del menú
    const menuItems = {
        platosCriollos: [
            {
                id: 1,
                name: "Picante de Cuy 1/2",
                price: 35.00,
                description: "Tradicional plato andino preparado con cuy fresco, papas amarillas, maní y ají panca. Acompañado de arroz y ensalada.",
                image: "images/menu/picante-cuy.jpg",
                available: true
            },
            {
                id: 2,
                name: "Chicharrón de Chancho",
                price: 28.00,
                description: "Crujiente chicharrón de cerdo acompañado de camote frito, zarza criolla y mote.",
                image: "images/menu/chicharron.jpg",
                available: true
            },
            {
                id: 3,
                name: "Frejolada de Pato",
                price: 32.00,
                description: "Delicioso pato cocido a la olla con frejoles canarios, culantro y especias. Servido con arroz y salsa criolla.",
                image: "images/menu/frejolada-pato.jpg",
                available: true
            },
            {
                id: 4,
                name: "Cabrito Norteño",
                price: 38.00,
                description: "Tierno cabrito cocinado en salsa de ají panca y especias, acompañado de frijoles, yuca y plátano maduro.",
                image: "images/menu/cabrito.jpg",
                available: false
            },
            {
                id: 5,
                name: "Costillar",
                price: 40.00,
                description: "Costillar de cerdo marinado y cocido a la parrilla, servido con papas doradas y ensalada fresca.",
                image: "images/menu/costillar.jpg",
                available: true
            },
            {
                id: 6,
                name: "Pepian Pavita de Corral",
                price: 30.00,
                description: "Pavita cocida en salsa de maní y ají mirasol, acompañada de arroz y papa amarilla.",
                image: "images/menu/pepian.jpg",
                available: true
            },
            {
                id: 7,
                name: "Chancho a la Caja China",
                price: 45.00,
                description: "Exquisito chancho horneado a la caja china por 8 horas, servido con camote, ensalada y salsas especiales.",
                image: "images/menu/caja-china.jpg",
                available: true
            },
            {
                id: 8,
                name: "Caldo de Gallina",
                price: 22.00,
                description: "Reconfortante caldo preparado con gallina criolla, fideos, papa, huevo y hierbas aromáticas.",
                image: "images/menu/caldo-gallina.jpg",
                available: true
            },
            {
                id: 9,
                name: "Ceviche",
                price: 28.00,
                description: "Fresco ceviche de pescado marinado en limón, con cebolla, ají limo, camote y cancha serrana.",
                image: "images/menu/ceviche.jpg",
                available: false
            },
            {
                id: 10,
                name: "Chicharrón de Pescado",
                price: 26.00,
                description: "Filete de pescado empanizado y frito al punto perfecto, servido con yuca frita y salsa tártara.",
                image: "images/menu/chicharron-pescado.jpg",
                available: true
            }
        ],
        bebidas: [
            {
                id: 11,
                name: "Caseosas 1L",
                price: 8.00,
                description: "Refresco gaseoso de 1 litro en diversos sabores: cola, naranja, limón, etc.",
                image: "images/menu/gaseosa.jpg",
                available: true
            },
            {
                id: 12,
                name: "Caseosa 1/2 L",
                price: 5.00,
                description: "Refresco gaseoso de 500ml en diversos sabores.",
                image: "images/menu/gaseosa-mediana.jpg",
                available: true
            },
            {
                id: 13,
                name: "Cervezas",
                price: 10.00,
                description: "Cerveza nacional e internacional en botella de 625ml.",
                image: "images/menu/cerveza.jpg",
                available: true
            },
            {
                id: 14,
                name: "Agua Mineral",
                price: 4.00,
                description: "Agua mineral sin gas de 500ml.",
                image: "images/menu/agua.jpg",
                available: true
            }
        ]
    };

    // Renderizar productos
    function renderMenuItems(items, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item animate__animated';
            menuItem.setAttribute('data-animation', 'animate__fadeInUp');
            
            let availableControls = '';
            if (item.available) {
                availableControls = `
                    <div class="menu-item-footer">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="add-to-cart" data-id="${item.id}">Agregar</button>
                    </div>
                `;
            } else {
                availableControls = '<span class="sold-out">AGOTADO</span>';
            }

            menuItem.innerHTML = `
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">S/ ${item.price.toFixed(2)}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    ${availableControls}
                </div>
            `;

            container.appendChild(menuItem);
        });
    }

    // Renderizar menús
    renderMenuItems(menuItems.platosCriollos, 'platos-criollos');
    renderMenuItems(menuItems.bebidas, 'bebidas');

    // Carrito de compras
    let cart = [];

    // Elementos del DOM
    const cartBtn = document.getElementById('cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartQuantityElement = document.getElementById('cart-quantity');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Abrir carrito
    cartBtn.addEventListener('click', function() {
        cartOverlay.classList.add('active');
        renderCartItems();
    });

    // Cerrar carrito
    closeCartBtn.addEventListener('click', function() {
        cartOverlay.classList.remove('active');
    });

    // Cerrar al hacer clic fuera
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });

    // Añadir al carrito
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${itemId}"]`);
            const quantity = parseInt(quantityInput.value);
            
            addToCart(itemId, quantity);
        }
    });

    // Aumentar cantidad
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('plus')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const input = document.querySelector(`.quantity-input[data-id="${itemId}"]`);
            input.value = parseInt(input.value) + 1;
        }
    });

    // Disminuir cantidad
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('minus')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
                        const input = document.querySelector(`.quantity-input[data-id="${itemId}"]`);
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }
    });

    // Añadir producto al carrito
    function addToCart(itemId, quantity) {
        // Buscar el producto en ambos arrays
        let product = [...menuItems.platosCriollos, ...menuItems.bebidas].find(item => item.id === itemId);
        
        if (!product) return;
        
        // Verificar si ya está en el carrito
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        updateCart();
        showAddToCartNotification(product.name, quantity);
    }

    // Mostrar notificación de agregado al carrito
    function showAddToCartNotification(productName, quantity) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification animate__animated animate__fadeInUp';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${quantity} ${quantity > 1 ? 'unidades' : 'unidad'} de ${productName} añadido${quantity > 1 ? 's' : ''} al carrito</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('animate__fadeOutDown');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Renderizar items del carrito
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            checkoutBtn.disabled = true;
            return;
        }
        
        checkoutBtn.disabled = false;
        
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">S/ ${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <span class="remove-item" data-id="${item.id}">Eliminar</span>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        updateCartTotal();
    }

    // Actualizar cantidad en el carrito
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('increase-quantity')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === itemId);
            if (item) item.quantity += 1;
            updateCart();
        }
        
        if (e.target.classList.contains('decrease-quantity')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                updateCart();
            }
        }
        
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }
    });

    // Actualizar input de cantidad en el carrito
    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity > 0) {
                const item = cart.find(item => item.id === itemId);
                if (item) item.quantity = newQuantity;
                updateCart();
            }
        }
    });

    // Actualizar total y cantidad del carrito
    function updateCart() {
        renderCartItems();
        
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Calcular total del carrito
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;
    }

    // Finalizar compra
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        
        const now = new Date();
        const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        let message = `*Pedido - Los Gemelos Restaurante Campestre*%0A%0A`;
        message += `*Fecha:* ${dateStr}%0A%0A`;
        message += `*Detalle del pedido:*%0A%0A`;
        
        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity} x S/ ${item.price.toFixed(2)})%0A`;
        });
        
        message += `%0A*Total:* S/ ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}%0A%0A`;
        message += `*Notas adicionales:* (escriba aquí cualquier indicación especial)`;
        
        const phoneNumber = '+51987654321'; // Reemplazar con número real
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(url, '_blank');
        
        // Vaciar carrito después de enviar
        cart = [];
        updateCart();
    });

    // Cargar carrito desde localStorage al iniciar
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }

    loadCart();
});