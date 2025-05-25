const menuItems = [
    {
        id: 1,
        name: "Picante de Cuy 1/2",
        description: "Delicioso cuy cocinado al estilo tradicional con ají y especias.",
        price: 35.00,
        image: "images/platillos/picante-de-cuy.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 2,
        name: "Chicharrón de Chancho",
        description: "Crujiente chicharrón de cerdo acompañado de mote y salsa criolla.",
        price: 28.00,
        image: "images/platillos/chicharron-de-chancho.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 3,
        name: "Frejolada de Pato",
        description: "Frejoles cocidos con pato y especias, un plato lleno de sabor.",
        price: 32.00,
        image: "images/platillos/frejolada-de-pato.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 4,
        name: "Cabrito Norteño",
        description: "Exquisito cabrito preparado al estilo norteño con guarniciones.",
        price: 38.00,
        image: "images/platillos/cabrito-norteno.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 5,
        name: "Costillar",
        description: "Costillar de cerdo asado lentamente para un sabor incomparable.",
        price: 40.00,
        image: "images/platillos/costillar.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 6,
        name: "Pepian Pavita de Corral",
        description: "Pavita criolla en salsa de pepian con maní y especias.",
        price: 36.00,
        image: "images/platillos/pepian-pavita.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 7,
        name: "Chancho a la Caja China",
        description: "Cerdo entero cocinado a la caja china, ideal para compartir.",
        price: 120.00,
        image: "images/platillos/chancho-caja-china.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 8,
        name: "Caldo de Gallina",
        description: "Reconfortante caldo de gallina criolla con fideos y hierbas.",
        price: 18.00,
        image: "images/platillos/caldo-gallina.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 9,
        name: "Ceviche",
        description: "Fresco ceviche de pescado con limón, cebolla y ají limo.",
        price: 25.00,
        image: "images/platillos/ceviche.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 10,
        name: "Chicharrón de Pescado",
        description: "Pescado frito en trozos crujientes acompañado de yuca y salsa.",
        price: 28.00,
        image: "images/platillos/chicharron-pescado.jpg",
        available: true,
        category: "comida"
    },
    {
        id: 11,
        name: "Gaseosa 1L",
        description: "Refresco de 1 litro en varios sabores.",
        price: 8.00,
        image: "images/platillos/gaseosa-1l.jpg",
        available: true,
        category: "bebida"
    },
    {
        id: 12,
        name: "Gaseosa 1/2 L",
        description: "Refresco de 1/2 litro en varios sabores.",
        price: 5.00,
        image: "images/platillos/gaseosa-500ml.jpg",
        available: true,
        category: "bebida"
    },
    {
        id: 13,
        name: "Cerveza",
        description: "Cerveza nacional e internacional.",
        price: 10.00,
        image: "images/platillos/cerveza.jpg",
        available: true,
        category: "bebida"
    },
    {
        id: 14,
        name: "Agua Mineral",
        description: "Agua mineral sin gas de 500ml.",
        price: 3.50,
        image: "images/platillos/agua-mineral.jpg",
        available: true,
        category: "bebida"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems();
    initCart();
});

function renderMenuItems() {
    const foodContainer = document.querySelector('.menu-food');
    const drinkContainer = document.querySelector('.menu-drinks');
    
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = `menu-item ${item.available ? '' : 'unavailable'}`;
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                ${!item.available ? '<span class="sold-out">AGOTADO</span>' : ''}
            </div>
            <div class="menu-item-info">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price">S/ ${item.price.toFixed(2)}</p>
                ${item.available ? `
                <div class="menu-item-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" class="quantity-input">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${item.id}">Agregar</button>
                </div>
                ` : ''}
            </div>
        `;
        
        if (item.category === 'comida') {
            foodContainer.appendChild(menuItem);
        } else {
            drinkContainer.appendChild(menuItem);
        }
    });
}

function initCart() {
    // Implementación del carrito en cart.js
}