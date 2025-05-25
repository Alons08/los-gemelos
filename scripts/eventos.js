document.addEventListener('DOMContentLoaded', () => {
  // Formulario de reserva de eventos
  const eventForm = document.getElementById('event-form');
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simular envío del formulario
      const submitBtn = eventForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = '¡Enviado!';
        
        // Mostrar mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <p>¡Gracias! Nos pondremos en contacto contigo pronto.</p>
        `;
        eventForm.parentNode.insertBefore(successMessage, eventForm.nextSibling);
        
        // Ocultar formulario
        eventForm.style.display = 'none';
        
        // Resetear después de 3 segundos (simulación)
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          eventForm.reset();
          eventForm.style.display = 'block';
          successMessage.remove();
        }, 3000);
      }, 1500);
    });
  }
  
  // Efecto hover para las tarjetas de eventos
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.5s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
  
  // Estilo para mensajes de éxito
  const style = document.createElement('style');
  style.textContent = `
    .success-message {
      background-color: var(--success-color);
      color: white;
      padding: 1.5rem;
      border-radius: 5px;
      text-align: center;
      margin-top: 1rem;
      animation: fadeIn 0.5s ease;
    }
    
    .success-message i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
    }
    
    .success-message p {
      margin: 0;
      font-size: 1.1rem;
    }
  `;
  document.head.appendChild(style);
});