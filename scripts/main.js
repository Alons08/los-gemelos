// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 500);
});

// Cargar fragments
document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar fragments
    const loadFragment = (elementId, filePath) => {
        if(document.getElementById(elementId)) {
            fetch(filePath)
                .then(response => response.text())
                .then(data => {
                    document.getElementById(elementId).innerHTML = data;
                    // Actualizar año en footer
                    if(elementId === 'footer') {
                        document.getElementById('current-year').textContent = new Date().getFullYear();
                    }
                    // Inicializar navbar después de cargar
                    if(elementId === 'navbar') {
                        initNavbar();
                    }
                })
                .catch(error => console.error('Error loading fragment:', error));
        }
    };

    // Cargar navbar y footer
    loadFragment('navbar', 'fragments/navbar.html');
    loadFragment('footer', 'fragments/footer.html');

    // Inicializar navbar
    function initNavbar() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if(hamburger) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Cerrar menu al hacer clic en un link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});