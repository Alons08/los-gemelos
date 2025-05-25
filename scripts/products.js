// Productos del menú
const products = {
    comidas: [
        {
            id: 1,
            name: "Picante de Cuy 1/2",
            price: 35.00,
            description: "Tradicional plato andino preparado con cuy fresco, papas y maní tostado.",
            image: "images/menu/picante-cuy.jpg",
            available: true
        },
        {
            id: 2,
            name: "Chicharrón de Chancho",
            price: 28.00,
            description: "Crujiente chicharrón de cerdo acompañado de camote frito, zarza criolla y maíz.",
            image: "images/menu/chicharron-chancho.jpg",
            available: true
        },
        {
            id: 3,
            name: "Frejolada de Pato",
            price: 32.00,
            description: "Delicioso estofado de pato con frejoles canarios, servido con arroz y salsa criolla.",
            image: "images/menu/frejolada-pato.jpg",
            available: true
        },
        {
            id: 4,
            name: "Cabrito Norteño",
            price: 38.00,
            description: "Exquisito cabrito en salsa de ají panca y especias, acompañado de frijoles y yuca.",
            image: "images/menu/cabrito-norteno.jpg",
            available: true
        },
        {
            id: 5,
            name: "Costillar",
            price: 40.00,
            description: "Costillar de cerdo al horno con salsa barbacoa, servido con puré de papas y ensalada.",
            image: "images/menu/costillar.jpg",
            available: true
        },
        {
            id: 6,
            name: "Pepian Pavita de Corral",
            price: 30.00,
            description: "Pavo criollo en salsa de maní y ají mirasol, acompañado de arroz y papa amarilla.",
            image: "images/menu/pepian-pavita.jpg",
            available: true
        },
        {
            id: 7,
            name: "Chancho a la Caja China",
            price: 45.00,
            description: "Lechón asado a la caja china, servido con camote al horno y ensalada criolla.",
            image: "images/menu/chancho-caja-china.jpg",
            available: true
        },
        {
            id: 8,
            name: "Caldo de Gallina",
            price: 22.00,
            description: "Reconfortante caldo preparado con gallina criolla, fideos, papa y hierbabuena.",
            image: "images/menu/caldo-gallina.jpg",
            available: true
        },
        {
            id: 9,
            name: "Ceviche",
            price: 30.00,
            description: "Clásico ceviche peruano con pescado fresco, limón, cebolla, ají y camote.",
            image: "images/menu/ceviche.jpg",
            available: true
        },
        {
            id: 10,
            name: "Chicharrón de Pescado",
            price: 26.00,
            description: "Filete de pescado empanizado y frito, servido con yuca frita y salsa criolla.",
            image: "images/menu/chicharron-pescado.jpg",
            available: true
        }
    ],
    bebidas: [
        {
            id: 101,
            name: "Gaseosas 1L",
            price: 8.00,
            description: "Refresco de 1 litro. Sabores: Coca Cola, Inca Kola, Sprite.",
            image: "images/menu/gaseosa-1l.jpg",
            available: true
        },
        {
            id: 102,
            name: "Gaseosa 1/2 L",
            price: 5.00,
            description: "Refresco de 500ml. Sabores: Coca Cola, Inca Kola, Sprite.",
            image: "images/menu/gaseosa-500ml.jpg",
            available: true
        },
        {
            id: 103,
            name: "Cervezas",
            price: 10.00,
            description: "Cerveza nacional. Marcas: Cristal, Pilsen Callao, Cusqueña.",
            image: "images/menu/cerveza.jpg",
            available: true
        },
        {
            id: 104,
            name: "Agua Mineral",
            price: 4.00,
            description: "Agua mineral sin gas de 500ml.",
            image: "images/menu/agua-mineral.jpg",
            available: true
        }
    ]
};

// Función para cargar los productos en el menú
function loadMenu() {
    const comidasContainer = document.getElementById('comidas');
    const bebidasContainer = document.getElementById('bebidas');
    
    // Cargar comidas
    products.comidas.forEach(product => {
        comidasContainer.appendChild(createProductCard(product));
    });
    
    // Cargar bebidas
    products.bebidas.forEach(product => {
        bebidasContainer.appendChild(createProductCard(product));
    });
    
    // Manejar tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.menu-items').forEach(container => {
                container.classList.add('hidden');
            });
            
            document.getElementById(tab.dataset.category).classList.remove('hidden');
        });
    });
}

// Función para crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${!product.available ? '<div class="sold-out">Agotado</div>' : ''}
        </div>
        <div class="product-details">
            <h3>${product.name}</h3>
            <p class="price">S/ ${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            
            ${product.available ? `
            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                    <input type="number" value="1" min="1" class="quantity-input">
                    <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                </div>
                <button class="btn btn-add" data-id="${product.id}">
                    Agregar <i class="fas fa-cart-plus"></i>
                </button>
            </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Cargar menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadMenu);