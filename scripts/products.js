/**
 * Productos del menú - Restaurante Los Gemelos
 * Formato simplificado para el carrito de compras
 */

const products = [
    // COMIDAS CRIOLLAS
    {
        id: 1,
        name: "Picante de Cuy 1/2",
        category: "comidas",
        price: 35.00,
        description: "Cuy al horno con papas doradas y salsa de maní.",
        image: "images/menu/picante-de-cuy.jpg",
        available: true
    },
    {
        id: 2,
        name: "Chicharrón de Chancho",
        category: "comidas",
        price: 28.00,
        description: "Chicharrón de cerdo con camote frito y salsa criolla.",
        image: "images/menu/chicharron-de-chancho.jpg",
        available: true
    },
    {
        id: 3,
        name: "Frejolada de Pato",
        category: "comidas",
        price: 32.00,
        description: "Frejoles con pato tierno y especias.",
        image: "images/menu/frejolada-de-pato.jpg",
        available: true
    },
    {
        id: 4,
        name: "Cabrito Norteno",
        category: "comidas",
        price: 38.00,
        description: "Cabrito al estilo norteño con frijoles.",
        image: "images/menu/cabrito-norteno.jpg",
        available: false // AGOTADO
    },
    {
        id: 5,
        name: "Costillar",
        category: "comidas",
        price: 40.00,
        description: "Costillar de cerdo con salsa barbacoa.",
        image: "images/menu/costillar.jpg",
        available: true
    },

    // BEBIDAS
    {
        id: 11,
        name: "Gaseosas 1L",
        category: "bebidas",
        price: 8.00,
        description: "Coca Cola, Inca Kola, Sprite o Fanta.",
        image: "images/menu/gaseosa-1l.jpg",
        available: true
    },
    {
        id: 12,
        name: "Gaseosa 1/2L",
        category: "bebidas",
        price: 5.00,
        description: "Coca Cola, Inca Kola, Sprite o Fanta.",
        image: "images/menu/gaseosa-500ml.jpg",
        available: true
    },
    {
        id: 13,
        name: "Cervezas",
        category: "bebidas",
        price: 10.00,
        description: "Nacionales e internacionales.",
        image: "images/menu/cervezas.jpg",
        available: true
    }
];

// Función para generar mensaje de WhatsApp
function generateWhatsAppMessage(cartItems) {
    const phoneNumber = '931088900';
    let message = '¡Hola! Quiero realizar el siguiente pedido:\n\n';
    
    cartItems.forEach(item => {
        message += `➡ ${item.name} x${item.quantity} - S/${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\n💰 TOTAL: S/${total.toFixed(2)}\n`;
    message += '\n📍 Dirección de envío: \n';
    message += '\n👤 Nombre del cliente: \n';
    message += '\n📞 Teléfono de contacto: \n';
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Ejemplo de uso cuando se hace checkout:
// window.location.href = generateWhatsAppMessage(carrito);