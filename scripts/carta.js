document.addEventListener('DOMContentLoaded', function() {
    // Productos disponibles
    const productos = {
        comidas: [
            {
                id: 1,
                nombre: "Picante de Cuy 1/2",
                descripcion: "Tradicional plato andino preparado con cuy fresco, papas y ají mirasol.",
                precio: 35.00,
                imagen: "images/platillos/picante-de-cuy.jpg",
                disponible: true
            },
            {
                id: 2,
                nombre: "Chicharrón de Chancho",
                descripcion: "Crujiente chicharrón de cerdo acompañado de camote frito, maíz y salsa criolla.",
                precio: 28.00,
                imagen: "images/platillos/chicharron-de-chancho.jpg",
                disponible: true
            },
            {
                id: 3,
                nombre: "Frejolada de Pato",
                descripcion: "Delicioso frejol colado con pierna de pato, acompañado de arroz y salsa criolla.",
                precio: 32.00,
                imagen: "images/platillos/frejolada-de-pato.jpg",
                disponible: true
            },
            {
                id: 4,
                nombre: "Cabrito Norteno",
                descripcion: "Exquisito cabrito al estilo norteño, cocido a fuego lento con especias.",
                precio: 38.00,
                imagen: "images/platillos/cabrito-norteno.jpg",
                disponible: false
            },
            {
                id: 5,
                nombre: "Costillar",
                descripcion: "Costillar de cerdo glaseado con salsa agridulce, acompañado de puré de manzana.",
                precio: 34.00,
                imagen: "images/platillos/costillar.jpg",
                disponible: true
            },
            {
                id: 6,
                nombre: "Pepian Pavita de Corral",
                descripcion: "Pepian preparado con pavita de corral, acompañado de arroz y papas doradas.",
                precio: 36.00,
                imagen: "images/platillos/pepian-pavita.jpg",
                disponible: true
            },
            {
                id: 7,
                nombre: "Chancho a la Caja China",
                descripcion: "Lechón cocido a la caja china, servido con tamalitos verdes y salsa criolla.",
                precio: 40.00,
                imagen: "images/platillos/chancho-a-la-caja-china.jpg",
                disponible: true
            },
            {
                id: 8,
                nombre: "Caldo de Gallina",
                descripcion: "Reconfortante caldo preparado con gallina de corral, fideos y hierbas aromáticas.",
                precio: 22.00,
                imagen: "images/platillos/caldo-de-gallina.jpg",
                disponible: true
            },
            {
                id: 9,
                nombre: "Ceviche",
                descripcion: "Clásico ceviche peruano preparado con pescado fresco, limón, ají y camote.",
                precio: 30.00,
                imagen: "images/platillos/ceviche.jpg",
                disponible: true
            },
            {
                id: 10,
                nombre: "Chicharrón de Pescado",
                descripcion: "Filetes de pescado empanizados y fritos, acompañados de yuca y salsa tártara.",
                precio: 28.00,
                imagen: "images/platillos/chicharron-de-pescado.jpg",
                disponible: false
            }
        ],
        bebidas: [
            {
                id: 11,
                nombre: "Gaseosas 1/2L",
                descripcion: "Refrescos de 500ml en diferentes sabores: Coca Cola, Inca Kola, Sprite, Fanta.",
                precio: 5.00,
                imagen: "images/bebidas/gaseosas.jpg",
                disponible: true
            },
            {
                id: 12,
                nombre: "Cervezas",
                descripcion: "Cervezas nacionales e internacionales: Cristal, Pilsen, Heineken, Corona.",
                precio: 8.00,
                imagen: "images/bebidas/cervezas.jpg",
                disponible: true
            },
            {
                id: 13,
                nombre: "Agua Mineral",
                descripcion: "Agua mineral sin gas de 500ml.",
                precio: 3.00,
                imagen: "images/bebidas/agua-mineral.jpg",
                disponible: true
            }
        ]
    };

    // Cargar productos en la página
    function cargarProductos(categoria) {
        const menuGrid = document.querySelector(`#${categoria} .menu-grid`);
        menuGrid.innerHTML = '';
        
        productos[categoria].forEach(producto => {
            const productoHTML = `
                <div class="menu-item ${producto.disponible ? '' : 'agotado'}">
                    <div class="item-image" style="background-image: url('${producto.imagen}')">
                        ${producto.disponible ? '' : '<span class="agotado-label">Agotado</span>'}
                    </div>
                    <div class="item-info">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                        <div class="item-price">S/. ${producto.precio.toFixed(2)}</div>
                        ${producto.disponible ? `
                        <div class="item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" class="quantity-input" value="1" min="1">
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="add-to-cart" data-id="${producto.id}" data-categoria="${categoria}">Agregar</button>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            menuGrid.innerHTML += productoHTML;
        });
    }

    // Cambiar entre categorías
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.dataset.category;
            document.querySelectorAll('.menu-items').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(category).classList.remove('hidden');
        });
    });

    // Inicializar carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Actualizar contador del carrito
    function actualizarContadorCarrito() {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }
    
    // Mostrar/ocultar carrito
    const cartButton = document.querySelector('.cart-button');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    
    cartButton.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        actualizarCarrito();
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    
    // Actualizar vista del carrito
    function actualizarCarrito() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total span');
        
        cartItems.innerHTML = '';
        
        if (carrito.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            cartTotal.textContent = 'S/. 0.00';
            return;
        }
        
        let total = 0;
        
        carrito.forEach(item => {
            const producto = [...productos.comidas, ...productos.bebidas].find(p => p.id === item.id);
            
            if (producto) {
                const subtotal = producto.precio * item.cantidad;
                total += subtotal;
                
                const cartItemHTML = `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${producto.nombre}</h4>
                            <p>S/. ${producto.precio.toFixed(2)} x ${item.cantidad}</p>
                        </div>
                        <div class="cart-item-subtotal">S/. ${subtotal.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                cartItems.innerHTML += cartItemHTML;
            }
        });
        
        cartTotal.textContent = `S/. ${total.toFixed(2)}`;
        
        // Configurar botón de WhatsApp
        const checkoutBtn = document.querySelector('.checkout-btn');
        const mensaje = generarMensajeWhatsApp();
        checkoutBtn.href = `https://wa.me/51987654321?text=${encodeURIComponent(mensaje)}`;
        
        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                carrito = carrito.filter(item => item.id !== id);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
                actualizarContadorCarrito();
            });
        });
    }
    
    // Generar mensaje para WhatsApp
    function generarMensajeWhatsApp() {
        let mensaje = '¡Hola! Quiero hacer el siguiente pedido:\n\n';
        
        carrito.forEach(item => {
            const producto = [...productos.comidas, ...productos.bebidas].find(p => p.id === item.id);
            if (producto) {
                mensaje += `- ${producto.nombre} x${item.cantidad} (S/. ${(producto.precio * item.cantidad).toFixed(2)})\n`;
            }
        });
        
        const total = carrito.reduce((sum, item) => {
            const producto = [...productos.comidas, ...productos.bebidas].find(p => p.id === item.id);
            return sum + (producto ? producto.precio * item.cantidad : 0);
        }, 0);
        
        mensaje += `\nTotal: S/. ${total.toFixed(2)}\n\n`;
        mensaje += '¡Gracias!';
        
        return mensaje;
    }
    
    // Vaciar carrito
    document.querySelector('.clear-cart').addEventListener('click', () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarContadorCarrito();
    });
    
    // Agregar producto al carrito
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const id = parseInt(button.dataset.id);
            const categoria = button.dataset.categoria;
            const quantityInput = button.closest('.item-actions').querySelector('.quantity-input');
            const cantidad = parseInt(quantityInput.value);
            
            // Verificar si el producto ya está en el carrito
            const itemIndex = carrito.findIndex(item => item.id === id);
            
            if (itemIndex >= 0) {
                // Actualizar cantidad si ya existe
                carrito[itemIndex].cantidad += cantidad;
            } else {
                // Agregar nuevo item
                carrito.push({
                    id: id,
                    cantidad: cantidad,
                    categoria: categoria
                });
            }
            
            // Guardar en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            
            // Actualizar contador
            actualizarContadorCarrito();
            
            // Mostrar notificación
            const producto = [...productos.comidas, ...productos.bebidas].find(p => p.id === id);
            if (producto) {
                showNotification(`${cantidad} ${producto.nombre} agregado(s) al carrito`);
            }
            
            // Resetear cantidad
            quantityInput.value = 1;
        }
        
        // Controlar cantidad
        if (e.target.classList.contains('quantity-btn')) {
            const button = e.target;
            const input = button.closest('.quantity-control').querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (button.classList.contains('plus')) {
                value++;
            } else if (button.classList.contains('minus') && value > 1) {
                value--;
            }
            
            input.value = value;
        }
    });
    
    // Mostrar notificación
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Cargar productos iniciales
    cargarProductos('comidas');
    cargarProductos('bebidas');
    actualizarContadorCarrito();
});