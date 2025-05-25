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
        // ... otros platos
    ],
    bebidas: [
        {
            id: 101,
            name: "Gaseosa 1L",
            price: 8.00,
            description: "Refresco de 1 litro. Sabores: Coca Cola, Inca Kola, Sprite.",
            image: "images/menu/gaseosa.jpg",
            available: true
        },
        // ... otras bebidas
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