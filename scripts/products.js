// Array completo de productos
const products = [
    {
        id: 1,
        name: "Picante de Cuy 1/2",
        category: "comidas",
        price: 45.00,
        description: "Delicioso cuy al horno acompañado de papas doradas y arroz.",
        image: "./images/menu/picante-de-cuy.jpg",
        available: true
    },
    {
        id: 2,
        name: "Chicharrón de Chancho",
        category: "comidas",
        price: 35.00,
        description: "Crujiente chicharrón de cerdo servido con camote frito, mote y salsa criolla.",
        image: "./images/menu/chicharron-de-chancho.jpg",
        available: true
    },
    {
        id: 3,
        name: "Frejolada de Pato",
        category: "comidas",
        price: 35.00,
        description: "Tradicional frejolada preparada con pato tierno y especias.",
        image: "./images/menu/frejolada-de-pato.jpg",
        available: true
    },
    {
        id: 4,
        name: "Cabrito Norteno",
        category: "comidas",
        price: 35.00,
        description: "Exquisito cabrito preparado al estilo norteño con frijoles y yuca.",
        image: "./images/menu/cabrito-norteno.jpg",
        available: true
    },
    {
        id: 5,
        name: "Costillar",
        category: "comidas",
        price: 35.00,
        description: "Costillar de cerdo glaseado con salsa barbacoa, acompañado de puré de papas.",
        image: "./images/menu/costillar.jpg",
        available: true
    },
    {
        id: 6,
        name: "Pepian Pavita de Corral",
        category: "comidas",
        price: 35.00,
        description: "Pavita criolla en salsa de pepian con arroz y papas.",
        image: "./images/menu/pepian-pavita.jpg",
        available: true
    },
    {
        id: 7,
        name: "Caldo de Gallina",
        category: "comidas",
        price: 25.00,
        description: "Reconfortante caldo preparado con gallina criolla, fideos y hierbas aromáticas.",
        image: "./images/menu/caldo-gallina.jpg",
        available: true
    },
    {
        id: 8,
        name: "Ceviche",
        category: "comidas",
        price: 35.00,
        description: "Fresco ceviche de pescado con leche de tigre, camote y cancha serrana.",
        image: "./images/menu/ceviche.jpg",
        available: true
    },
    {
        id: 9,
        name: "Chicharrón de Pescado",
        category: "comidas",
        price: 35.00,
        description: "Filete de pescado empanizado y frito, servido con yuca y salsa tartara.",
        image: "./images/menu/chicharron-pescado.jpg",
        available: true
    },
    {
        id: 10,
        name: "Chancho a la Caja China",
        category: "comidas",
        price: 30.00,
        description: "Chancho cocinado en caja china con ensalada y papas doradas.",
        image: "./images/menu/chancho-caja-china.jpg",
        available: true
    },
    {
        id: 11,
        name: "Chuleta de Chancho",
        category: "comidas",
        price: 30.00,
        description: "Chuleta de cerdo a la parrilla con ensalada y papas doradas.",
        image: "./images/menu/chuleta-chancho.jpg",
        available: true
    },
    {
        id: 12,
        name: "Shambar",
        category: "comidas",
        price: 15.00,
        description: "Tradicional sopa norteña preparada con trigo, menestras y carne.",
        image: "./images/menu/shambar.jpg",
        available: false
    },
        /* BEBIDASSSSSSSSS */
    {
        id: 100,
        name: "Gaseosas 1L",
        category: "bebidas",
        price: 8.00,
        description: "Refrescos gaseosos de 1 litro. Sabores: Coca Cola, Inca Kola, Sprite, Fanta.",
        image: "./images/menu/gaseosa-1l.jpg",
        available: true
    },
    {
        id: 101,
        name: "Gaseosa 1/2L",
        category: "bebidas",
        price: 4.00,
        description: "Refrescos gaseosos de 1/2 litro. Sabores: Coca Cola, Inca Kola, Sprite, Fanta.",
        image: "./images/menu/gaseosa-500ml.jpg",
        available: true
    },
    {
        id: 102,
        name: "Cerveza Pilsen",
        category: "bebidas",
        price: 9.00,
        description: "Refrescante cerveza nacional, perfecta para acompañar tus comidas.",
        image: "./images/menu/cerveza-pilsen.jpg",
        available: true
    },
    {
        id: 103,
        name: "Cerveza Cusqueña Trigo",
        category: "bebidas",
        price: 10.00,
        description: "Cerveza artesanal de trigo con un sabor suave y único.",
        image: "./images/menu/cerveza-trigo.jpg",
        available: true
    },
    {
        id: 103,
        name: "Cerveza Cusqueña Negra",
        category: "bebidas",
        price: 10.00,
        description: "Cerveza negra con notas de malta tostada y un sabor intenso.",
        image: "./images/menu/cerveza-negra.jpg",
        available: true
    },
    {
        id: 105,
        name: "Agua Mineral",
        category: "bebidas",
        price: 2.00,
        description: "Agua mineral sin gas de 500ml.",
        image: "./images/menu/agua-mineral.jpg",
        available: true
    }, 
    {
        id: 106,
        name: "Chicha Morada",
        category: "bebidas",
        price: 15.00,
        description: "Refrescante bebida peruana hecha con maíz morado, frutas y especias.",
        image: "./images/menu/chicha-morada.jpg",
        available: true
    }
];

// Hacer el array accesible globalmente
window.restaurantProducts = products;

function renderProducts(category = 'comidas') {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = '';

    const filteredProducts = products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        menuItemsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-utensils"></i>
                <p>No hay productos disponibles en esta categoría</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'menu-item';
        productElement.innerHTML = `
            <div class="item-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${!product.available ? '<span class="sold-out">Agotado</span>' : ''}
            </div>
            <div class="item-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <span class="price">S/ ${product.price.toFixed(2)}</span>
                ${product.available ? `
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" data-id="${product.id}">
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        Añadir al carrito
                    </button>
                </div>
                ` : ''}
            </div>
        `;
        menuItemsContainer.appendChild(productElement);
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.category);
        });
    });
}

function setupProductEvents() {
    // Evento delegado para controles de cantidad
    document.addEventListener('click', function(e) {
        const quantityBtn = e.target.closest('.quantity-btn');
        if (quantityBtn) {
            const input = quantityBtn.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (quantityBtn.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            } else if (quantityBtn.classList.contains('plus')) {
                input.value = value + 1;
            }
        }
        
        // Evento para añadir al carrito
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = window.restaurantProducts.find(p => p.id === productId);
            
            if (product) {
                const quantityInput = e.target.closest('.item-actions').querySelector('.quantity-input');
                const quantity = parseInt(quantityInput.value) || 1;
                
                const event = new CustomEvent('productAddedToCart', {
                    detail: { product, quantity }
                });
                document.dispatchEvent(event);
            }
        }
    });
}

function initProducts() {
    renderProducts('comidas');
    setupFilters();
    setupProductEvents();
}

document.addEventListener('DOMContentLoaded', initProducts);