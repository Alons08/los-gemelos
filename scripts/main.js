document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar y footer
    loadFragments();
    
    // Inicializar componentes
    initNavbar();
    initCart();
    initScrollAnimations();
});

function loadFragments() {
    // Cargar navbar
    fetch('fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initNavbar(); // Re-inicializar después de cargar
        });
    
    // Cargar footer
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

function initNavbar() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Alternar menú sin recargar
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            document.body.classList.toggle('navbar-open');
        });
        
        // Cerrar menú al hacer clic en enlaces
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 767) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    document.body.classList.remove('navbar-open');
                }
                
                // Desplazamiento suave
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    
    if (cartBtn && cartModal && closeCart) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Abrir carrito sin recargar
            cartModal.classList.add('active');
            document.body.classList.add('cart-open');
        });
        
        closeCart.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar carrito
            cartModal.classList.remove('active');
            document.body.classList.remove('cart-open');
        });
    }
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => observer.observe(element));
}