// Cargar navbar y footer
document.addEventListener('DOMContentLoaded', () => {
    // Cargar navbar
    fetch('fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initNavbar();
        });
    
    // Cargar footer
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
    
    // Inicializar scroll animations
    initScrollAnimations();
    
    // Manejar clics en enlaces del navbar para desplazamiento suave
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Cerrar navbar móvil si está abierto
                const navbarMenu = document.getElementById('navbar-menu');
                if (navbarMenu.classList.contains('active')) {
                    document.body.classList.remove('navbar-open');
                    navbarMenu.classList.remove('active');
                    document.getElementById('navbar-toggle').classList.remove('active');
                }
            }
        }
    });
});

// Inicializar navbar
function initNavbar() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            const isOpening = !navbarMenu.classList.contains('active');
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            
            // Bloquear/desbloquear scroll
            if (isOpening) {
                document.body.classList.add('navbar-open');
            } else {
                document.body.classList.remove('navbar-open');
            }
        });
    }
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Inicializar animaciones al hacer scroll
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Bloquear scroll cuando el carrito está abierto
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    
    if (cartBtn && cartModal && closeCart) {
        cartBtn.addEventListener('click', () => {
            document.body.classList.add('cart-open');
            cartModal.classList.add('active');
        });
        
        closeCart.addEventListener('click', () => {
            document.body.classList.remove('cart-open');
            cartModal.classList.remove('active');
        });
        
        // Prevenir scroll del body cuando el carrito está abierto
        cartModal.addEventListener('scroll', (e) => {
            if (cartModal.scrollTop + cartModal.clientHeight >= cartModal.scrollHeight) {
                cartModal.scrollTop = cartModal.scrollHeight - cartModal.clientHeight;
            }
        });
    }
});