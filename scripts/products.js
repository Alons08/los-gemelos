// Productos del menú
const products = [
    {
        id: 1,
        name: "Picante de Cuy 1/2",
        category: "comidas",
        price: 35.00,
        description: "Delicioso cuy al horno acompañado de papas doradas y salsa de maní.",
        image: "images/menu/picante-de-cuy.jpg",
        available: true
    },
    {
        id: 2,
        name: "Chicharrón de Chancho",
        category: "comidas",
        price: 28.00,
        description: "Crujiente chicharrón de cerdo servido con camote frito, mote y salsa criolla.",
        image: "images/menu/chicharron-de-chancho.jpg",
        available: true
    },
    {
        id: 3,
        name: "Frejolada de Pato",
        category: "comidas",
        price: 32.00,
        description: "Tradicional frejolada preparada con pato tierno y especias.",
        image: "images/menu/frejolada-de-pato.jpg",
        available: true
    },
    {
        id: 4,
        name: "Cabrito Norteno",
        category: "comidas",
        price: 38.00,
        description: "Exquisito cabrito preparado al estilo norteño con frijoles y yuca.",
        image: "images/menu/cabrito-norteno.jpg",
        available: false
    },
    {
        id: 5,
        name: "Costillar",
        category: "comidas",
        price: 40.00,
        description: "Costillar de cerdo glaseado con salsa barbacoa, acompañado de puré de papas.",
        image: "images/menu/costillar.jpg",
        available: true
    },
    {
        id: 6,
        name: "Pepian Pavita de Corral",
        category: "comidas",
        price: 30.00,
        description: "Pavita criolla en salsa de pepian con arroz y papas.",
        image: "images/menu/pepian-pavita.jpg",
        available: true
    },
    {
        id: 7,
        name: "Chancho a la Caja China",
        category: "comidas",
        price: 45.00,
        description: "Lechón asado a la caja china, servido con tamalitos verdes y salsa criolla.",
        image: "images/menu/chancho-caja-china.jpg",
        available: true
    },
    {
        id: 8,
        name: "Caldo de Gallina",
        category: "comidas",
        price: 22.00,
        description: "Reconfortante caldo preparado con gallina criolla, fideos y hierbas aromáticas.",
        image: "images/menu/caldo-gallina.jpg",
        available: true
    },
    {
        id: 9,
        name: "Ceviche",
        category: "comidas",
        price: 25.00,
        description: "Fresco ceviche de pescado con leche de tigre, camote y cancha serrana.",
        image: "images/menu/ceviche.jpg",
        available: false
    },
    {
        id: 10,
        name: "Chicharrón de Pescado",
        category: "comidas",
        price: 26.00,
        description: "Filete de pescado empanizado y frito, servido con yuca y salsa tartara.",
        image: "images/menu/chicharron-pescado.jpg",
        available: true
    },
    {
        id: 11,
        name: "Gaseosas 1L",
        category: "bebidas",
        price: 8.00,
        description: "Refrescos gaseosos de 1 litro. Sabores: Coca Cola, Inca Kola, Sprite, Fanta.",
        image: "images/menu/gaseosa-1l.jpg",
        available: true
    },
    {
        id: 12,
        name: "Gaseosa 1/2L",
        category: "bebidas",
        price: 5.00,
        description: "Refrescos gaseosos de 1/2 litro. Sabores: Coca Cola, Inca Kola, Sprite, Fanta.",
        image: "images/menu/gaseosa-500ml.jpg",
        available: true
    },
    {
        id: 13,
        name: "Cervezas",
        category: "bebidas",
        price: 10.00,
        description: "Cervezas nacionales e internacionales. Consultar por marcas disponibles.",
        image: "images/menu/cervezas.jpg",
        available: true
    },
    {
        id: 14,
        name: "Agua Mineral",
        category: "bebidas",
        price: 4.00,
        description: "Agua mineral sin gas de 500ml.",
        image: "images/menu/agua-mineral.jpg",
        available: true
    }
];

function renderProducts(category = 'comidas') {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';

    const filteredProducts = products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'menu-item';
        productElement.setAttribute('data-animate', 'fade-in');
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="menu-item-img">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${product.name}</h3>
                <p class="menu-item-price">S/ ${product.price.toFixed(2)}</p>
                <p class="menu-item-desc">${product.description}</p>
                <div class="menu-item-footer">
                    <span class="availability ${product.available ? 'available' : 'sold-out'}">
                        ${product.available ? 'Disponible' : 'Agotado'}
                    </span>
                    ${product.available ? `
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" data-id="${product.id}">
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Agregar</button>
                    ` : ''}
                </div>
            </div>
        `;

        menuItemsContainer.appendChild(productElement);
    });

    setTimeout(() => {
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('animate');
        });
    }, 100);
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(button.dataset.category);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('comidas');
    document.querySelector('.filter-btn[data-category="comidas"]').classList.add('active');
});