// Cargar navbar y footer
function loadFragments() {
    fetch('fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            setupNavbar();
        });
    
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Configurar navbar responsive
function setupNavbar() {
    const toggleBtn = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    toggleBtn.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
    
    // Cerrar navbar al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbarLinks.classList.remove('active');
            }
        });
    });
}

// Smooth scrolling para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('.navbar').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Animaciones al hacer scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Cargar menú de productos
function loadMenu() {
    const comidasContainer = document.getElementById('comidas');
    const bebidasContainer = document.getElementById('bebidas');
    
    products.comidas.forEach(product => {
        comidasContainer.appendChild(createProductCard(product));
    });
    
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
                    Agregar
                </button>
            </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadFragments();
    setupScrollAnimations();
    loadMenu();
});