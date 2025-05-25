document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario de reserva
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const eventType = document.getElementById('event-type').value;
            const date = document.getElementById('date').value;
            const people = document.getElementById('people').value;
            
            if (!name || !phone || !eventType || !date || !people) {
                showAlert('Por favor complete todos los campos obligatorios', 'error');
                return;
            }
            
            // Simular envío
            showAlert('Su reserva ha sido enviada. Nos pondremos en contacto con usted pronto.', 'success');
            reservationForm.reset();
            
            // Aquí iría el código para enviar realmente el formulario
            // por ejemplo con fetch() a un backend
        });
    }
    
    // Mostrar alerta
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} animate__animated animate__fadeInDown`;
        alert.textContent = message;
        
        const header = document.querySelector('.section-header');
        if (header) {
            header.appendChild(alert);
            
            setTimeout(() => {
                alert.classList.add('animate__fadeOutUp');
                setTimeout(() => alert.remove(), 500);
            }, 5000);
        }
    }
    
    // Animaciones para las cards de eventos
    const eventCards = document.querySelectorAll('.event-card');
    
    function animateCards() {
        eventCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Iniciar animaciones cuando las cards están en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCards();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const eventsSection = document.querySelector('.other-events');
    if (eventsSection) {
        observer.observe(eventsSection);
    }
});