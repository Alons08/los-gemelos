document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar y footer
    loadFragments();
    
    // Inicializar componentes
    initNavbar();
    initHero();
    initScrollAnimations();
});

function loadFragments() {
    // Cargar navbar
    fetch('./fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));
    
    // Cargar footer
    fetch('./fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function initNavbar() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            document.body.classList.toggle('navbar-open');
            
            if(navbarMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic en enlaces (solo en móvil)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    document.body.classList.remove('navbar-open');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

function initHero() {
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('loaded');
        }, 100);
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

// Efecto de sombra en navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 6px rgba(0, 0, 0, 0.1)';
        }
    }
});