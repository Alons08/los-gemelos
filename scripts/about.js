document.addEventListener('DOMContentLoaded', function() {
    // Animación para la sección de historia
    const aboutStory = document.querySelector('.about-story');
    setTimeout(() => {
        aboutStory.style.opacity = '1';
        aboutStory.style.transform = 'translateY(0)';
    }, 300);
    
    // Efecto hover para las tarjetas de valores
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
    
    // Animación para el mapa y la información de ubicación
    const locationContainer = document.querySelector('.location-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(locationContainer);
});