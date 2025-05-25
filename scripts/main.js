document.addEventListener('DOMContentLoaded', () => {
    // Cargar navbar y footer
    fetch('fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initNavbar();
        });
    
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    initScrollAnimations();
    initNavbarLinks();
    initCart();
});

function initNavbar() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpening = !navbarMenu.classList.contains('active');
            
            if (isOpening) {
                document.body.classList.add('navbar-open');
                navbarMenu.classList.add('active');
                navbarToggle.classList.add('active');
            } else {
                document.body.classList.remove('navbar-open');
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }
}

function initNavbarLinks() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar navbar móvil
                const navbarMenu = document.getElementById('navbar-menu');
                if (navbarMenu && navbarMenu.classList.contains('active')) {
                    document.body.classList.remove('navbar-open');
                    navbarMenu.classList.remove('active');
                    document.getElementById('navbar-toggle').classList.remove('active');
                }
                
                // Desplazamiento suave
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
}

function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    
    if (cartBtn && cartModal && closeCart) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('cart-open');
            cartModal.classList.add('active');
        });
        
        closeCart.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.remove('cart-open');
            cartModal.classList.remove('active');
        });
    }
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => observer.observe(element));
}