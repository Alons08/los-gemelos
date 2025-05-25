document.addEventListener('DOMContentLoaded', () => {
  // Datos de los productos (comidas y bebidas)
  const productos = {
    comidas: [
      {
        id: 1,
        nombre: "Lomo Saltado",
        descripcion: "Clásico peruano con carne, cebolla, tomate y papas fritas.",
        precio: 35.00,
        imagen: "../images/comida1.jpg",
        disponible: true
      },
      {
        id: 2,
        nombre: "Seco de Cordero",
        descripcion: "Tierno cordero cocido con culantro y frejoles.",
        precio: 40.00,
        imagen: "../images/comida2.jpg",
        disponible: true
      },
      {
        id: 3,
        nombre: "Ceviche Clásico",
        descripcion: "Fresco pescado marinado en limón con cebolla y ají.",
        precio: 30.00,
        imagen: "../images/comida3.jpg",
        disponible: true
      },
      {
        id: 4,
        nombre: "Aji de Gallina",
        descripcion: "Pollo desmenuzado en crema de ají amarillo con pan francés.",
        precio: 32.00,
        imagen: "../images/comida1.jpg",
        disponible: true
      },
      {
        id: 5,
        nombre: "Arroz con Pato",
        descripcion: "Arroz cocido con pato, culantro y cerveza negra.",
        precio: 38.00,
        imagen: "../images/comida2.jpg",
        disponible: false
      },
      {
        id: 6,
        nombre: "Causa Limeña",
        descripcion: "Puré de papa amarilla con relleno de pollo o atún.",
        precio: 28.00,
        imagen: "../images/comida3.jpg",
        disponible: true
      }
    ],
    bebidas: [
      {
        id: 101,
        nombre: "Chicha Morada",
        descripcion: "Refrescante bebida a base de maíz morado.",
        precio: 8.00,
        imagen: "../images/bebida1.jpg",
        disponible: true
      },
      {
        id: 102,
        nombre: "Inca Kola",
        descripcion: "La bebida gaseosa más popular del Perú.",
        precio: 7.00,
        imagen: "../images/bebida2.jpg",
        disponible: true
      },
      {
        id: 103,
        nombre: "Pisco Sour",
        descripcion: "Cóctel peruano a base de pisco, limón, clara de huevo y jarabe de goma.",
        precio: 25.00,
        imagen: "../images/bebida1.jpg",
        disponible: true
      },
      {
        id: 104,
        nombre: "Jugo de Maracuyá",
        descripcion: "Refrescante jugo natural de maracuyá.",
        precio: 10.00,
        imagen: "../images/bebida2.jpg",
        disponible: false
      },
      {
        id: 105,
        nombre: "Cerveza Artesanal",
        descripcion: "Selección de cervezas artesanales locales.",
        precio: 15.00,
        imagen: "../images/bebida1.jpg",
        disponible: true
      }
    ]
  };

  // Variables del carrito
  let carrito = [];
  const carritoItems = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartCount = document.querySelector('.cart-count');
  const cartToggle = document.getElementById('cart-toggle');
  const closeCart = document.getElementById('close-cart');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartOverlay = document.querySelector('.cart-overlay');
  const clearCartBtn = document.getElementById('clear-cart');
  const checkoutBtn = document.getElementById('checkout');
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category');

  // Cargar productos en la página
  function cargarProductos() {
    const comidasGrid = document.getElementById('comidas-grid');
    const bebidasGrid = document.getElementById('bebidas-grid');
    
    // Limpiar grids
    if (comidasGrid) comidasGrid.innerHTML = '';
    if (bebidasGrid) bebidasGrid.innerHTML = '';
    
    // Cargar comidas
    productos.comidas.forEach(comida => {
      const comidaElement = crearProductoElemento(comida);
      if (comidasGrid) comidasGrid.appendChild(comidaElement);
    });
    
    // Cargar bebidas
    productos.bebidas.forEach(bebida => {
      const bebidaElement = crearProductoElemento(bebida);
      if (bebidasGrid) bebidasGrid.appendChild(bebidaElement);
    });
  }
  
  // Crear elemento HTML para un producto
  function crearProductoElemento(producto) {
    const productoElement = document.createElement('div');
    productoElement.className = 'menu-item slide-up';
    
    let disponibilidadHTML = '';
    if (!producto.disponible) {
      disponibilidadHTML = '<span class="out-of-stock">AGOTADO</span>';
    }
    
    productoElement.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="menu-item-img">
      ${disponibilidadHTML}
      <div class="menu-item-content">
        <h3 class="menu-item-title">${producto.nombre}</h3>
        <p class="menu-item-description">${producto.descripcion}</p>
        <span class="menu-item-price">S/ ${producto.precio.toFixed(2)}</span>
        <div class="menu-item-actions">
          <div class="quantity-control">
            <button class="quantity-btn minus">-</button>
            <input type="number" class="quantity-input" value="1" min="1" ${!producto.disponible ? 'disabled' : ''}>
            <button class="quantity-btn plus">+</button>
          </div>
          <button class="add-to-cart" ${!producto.disponible ? 'disabled' : ''}>
            ${producto.disponible ? 'Agregar' : 'No disponible'}
          </button>
        </div>
      </div>
    `;
    
    // Agregar eventos a los botones
    if (producto.disponible) {
      const addToCartBtn = productoElement.querySelector('.add-to-cart');
      const minusBtn = productoElement.querySelector('.minus');
      const plusBtn = productoElement.querySelector('.plus');
      const quantityInput = productoElement.querySelector('.quantity-input');
      
      minusBtn.addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
        }
      });
      
      plusBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
      
      addToCartBtn.addEventListener('click', () => {
        agregarAlCarrito(producto, parseInt(quantityInput.value));
        quantityInput.value = 1;
        
        // Efecto visual al agregar
        addToCartBtn.textContent = '¡Agregado!';
        setTimeout(() => {
          addToCartBtn.textContent = 'Agregar';
        }, 1000);
      });
    }
    
    return productoElement;
  }
  
  // Agregar producto al carrito
  function agregarAlCarrito(producto, cantidad) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({
        ...producto,
        cantidad: cantidad
      });
    }
    
    actualizarCarrito();
    mostrarNotificacion(`${cantidad} ${producto.nombre} agregado(s) al carrito`);
  }
  
  // Actualizar la visualización del carrito
  function actualizarCarrito() {
    // Guardar en localStorage
    localStorage.setItem('carritoLosGemelos', JSON.stringify(carrito));
    
    // Actualizar contador
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar lista de productos
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
      carritoItems.innerHTML = '<div class="empty-cart"><p>Tu carrito está vacío</p></div>';
      cartTotalPrice.textContent = 'S/ 0.00';
      return;
    }
    
    let total = 0;
    
    carrito.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      
      itemElement.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.nombre}</h4>
          <p class="cart-item-price">S/ ${item.precio.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="decrease">-</button>
            <span>${item.cantidad}</span>
            <button class="increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
      `;
      
      // Agregar eventos a los botones
      const decreaseBtn = itemElement.querySelector('.decrease');
      const increaseBtn = itemElement.querySelector('.increase');
      const removeBtn = itemElement.querySelector('.cart-item-remove');
      const quantitySpan = itemElement.querySelector('.cart-item-quantity span');
      
      decreaseBtn.addEventListener('click', () => {
        if (item.cantidad > 1) {
          item.cantidad--;
          quantitySpan.textContent = item.cantidad;
        } else {
          carrito = carrito.filter(cartItem => cartItem.id !== item.id);
          itemElement.remove();
        }
        actualizarCarrito();
      });
      
      increaseBtn.addEventListener('click', () => {
        item.cantidad++;
        quantitySpan.textContent = item.cantidad;
        actualizarCarrito();
      });
      
      removeBtn.addEventListener('click', () => {
        carrito = carrito.filter(cartItem => cartItem.id !== item.id);
        itemElement.remove();
        actualizarCarrito();
        mostrarNotificacion(`${item.nombre} eliminado del carrito`);
      });
      
      carritoItems.appendChild(itemElement);
      total += item.precio * item.cantidad;
    });
    
    cartTotalPrice.textContent = `S/ ${total.toFixed(2)}`;
  }
  
  // Mostrar notificación
  function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notificacion.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notificacion);
      }, 300);
    }, 3000);
    
    // Estilo para la notificación
    const estilo = document.createElement('style');
    estilo.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .notification.show {
        opacity: 1;
      }
    `;
    document.head.appendChild(estilo);
  }
  
  // Cargar carrito desde localStorage
  function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carritoLosGemelos');
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarCarrito();
    }
  }
  
  // Eventos del carrito
  cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  clearCartBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
      if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = [];
        actualizarCarrito();
        mostrarNotificacion('Carrito vaciado');
      }
    }
  });
  
  checkoutBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito está vacío');
      return;
    }
    
    // Crear mensaje para WhatsApp
    let mensaje = '¡Hola! Quiero hacer un pedido:%0A%0A';
    
    carrito.forEach(item => {
      mensaje += `- ${item.nombre} x${item.cantidad} (S/ ${(item.precio * item.cantidad).toFixed(2)})%0A`;
    });
    
    mensaje += `%0ATotal: S/ ${carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2)}`;
    mensaje += '%0A%0A¡Gracias!';
    
    // Abrir WhatsApp
    window.open(`https://wa.me/51987654321?text=${mensaje}`, '_blank');
  });
  
  // Cambiar entre categorías de menú
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover clase active de todas las pestañas
      menuTabs.forEach(t => t.classList.remove('active'));
      
      // Agregar clase active a la pestaña clickeada
      tab.classList.add('active');
      
      // Ocultar todas las categorías
      menuCategories.forEach(cat => cat.classList.remove('active'));
      
      // Mostrar la categoría correspondiente
      const categoryId = tab.getAttribute('data-category');
      document.getElementById(categoryId).classList.add('active');
    });
  });
  
  // Inicializar
  cargarProductos();
  cargarCarrito();
  
  // Animaciones para los productos
  setTimeout(() => {
    const productElements = document.querySelectorAll('.menu-item');
    productElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 300);
});