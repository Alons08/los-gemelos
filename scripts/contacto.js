document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showAlert('Por favor complete todos los campos obligatorios', 'error');
                return;
            }
            
            // Simular envío
            showAlert('Su mensaje ha sido enviado. Nos pondremos en contacto con usted pronto.', 'success');
            contactForm.reset();
        });
    }
    
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
});