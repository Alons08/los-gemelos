document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar
    fetch('fragments/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            initNavbar();
        });

    // Cargar footer
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });

    function initNavbar() {
        const toggler = document.querySelector('.navbar-toggler');
        const collapse = document.querySelector('.navbar-collapse');
        
        toggler.addEventListener('click', () => {
            toggler.classList.toggle('active');
            collapse.classList.toggle('show');
        });

        // Cerrar el menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (collapse.classList.contains('show')) {
                    toggler.classList.remove('active');
                    collapse.classList.remove('show');
                }
            });
        });
    }
});