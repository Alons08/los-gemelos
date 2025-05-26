// Cargar navbar y footer
document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar
    fetch('fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            setupNavbar();
        });

    // Cargar footer
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Configurar lazy loading de imágenes
    setupLazyLoading();
    
    // Configurar menú
    setupMenu();
});

// Configurar navbar
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('navbar-menu');

    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle del menú móvil
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Configurar lazy loading
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Configurar menú
function setupMenu() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItemsContainer = document.getElementById('menu-items');
    
    // Filtrar productos
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Cambiar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar productos
            const category = this.getAttribute('data-category');
            displayMenuItems(category);
        });
    });
    
    // Mostrar todos los productos inicialmente
    displayMenuItems('comidas');
}

// Mostrar items del menú
function displayMenuItems(category) {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';
    
    const filteredProducts = products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        menuItemsContainer.innerHTML = '<p class="no-items">No hay productos disponibles en esta categoría.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const itemHTML = `
            <div class="menu-item">
                <img src="${product.image}" alt="${product.name}" class="menu-item-img" loading="lazy">
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${product.name}</h3>
                    <p class="menu-item-price">S/${product.price.toFixed(2)}</p>
                    <p class="menu-item-desc">${product.description}</p>
                    ${product.available ? 
                        `<button class="menu-item-btn" data-id="${product.id}">Agregar al carrito</button>` : 
                        `<p class="menu-item-unavailable">No disponible</p>`}
                </div>
            </div>
        `;
        menuItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
    
    // Configurar eventos para los botones del menú
    document.querySelectorAll('.menu-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
}