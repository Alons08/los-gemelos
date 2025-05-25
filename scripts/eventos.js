document.addEventListener('DOMContentLoaded', function() {
    // Efecto de acordeón para las descripciones de eventos
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const description = card.querySelector('.event-description');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'read-more-btn';
        toggleBtn.innerHTML = 'Leer más <i class="fas fa-chevron-down"></i>';
        
        // Solo aplica si la descripción es muy larga
        if (description.scrollHeight > 80) {
            description.style.maxHeight = '80px';
            description.style.overflow = 'hidden';
            description.parentNode.insertBefore(toggleBtn, description.nextSibling);

            toggleBtn.addEventListener('click', function() {
                if (description.style.maxHeight === '80px') {
                    description.style.maxHeight = description.scrollHeight + 'px';
                    toggleBtn.innerHTML = 'Leer menos <i class="fas fa-chevron-up"></i>';
                } else {
                    description.style.maxHeight = '80px';
                    toggleBtn.innerHTML = 'Leer más <i class="fas fa-chevron-down"></i>';
                }
            });
        }
    });

    // Galería interactiva
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });
});