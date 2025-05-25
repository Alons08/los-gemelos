document.addEventListener('DOMContentLoaded', function() {
    // Efecto de hover en el mapa
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });

        mapContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }

    // Animación para los íconos de contacto
    const contactIcons = document.querySelectorAll('.contact-info i');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.2)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
});