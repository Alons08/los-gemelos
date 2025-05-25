document.addEventListener('DOMContentLoaded', () => {
  // Animaciones específicas para about.html
  const historyImage = document.querySelector('.history-image img');
  if (historyImage) {
    historyImage.style.opacity = '0';
    historyImage.style.transform = 'scale(0.9)';
    historyImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      historyImage.style.opacity = '1';
      historyImage.style.transform = 'scale(1)';
    }, 300);
  }
  
  // Efecto hover para las tarjetas de valores
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(0)';
      }
    });
  });
  
  // Animación para el mapa
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    setTimeout(() => {
      mapContainer.style.opacity = '1';
      mapContainer.style.transform = 'translateY(0)';
    }, 500);
  }
});