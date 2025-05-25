// Efectos de animación para elementos con clases específicas
document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.slide-up, .fade-in');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Ejecutar al cargar y al hacer scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Inicializar elementos con animaciones
  const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
  animatedElements.forEach(el => {
    if (el.classList.contains('slide-up')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    } else if (el.classList.contains('fade-in')) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 1s ease';
    }
  });
});