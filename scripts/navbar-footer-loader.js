// Función para cargar fragmentos HTML
async function loadFragment(url, elementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // Si es el navbar, inicializar el toggle
    if (elementId === 'navbar-placeholder') {
      const toggle = document.getElementById('navbar-toggle');
      const menu = document.getElementById('navbar-menu');
      
      if (toggle && menu) {
        toggle.addEventListener('click', () => {
          menu.classList.toggle('active');
        });
      }
    }
  } catch (error) {
    console.error(`Error loading ${url}:`, error);
  }
}

// Cargar navbar y footer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  loadFragment('fragments/navbar.html', 'navbar-placeholder');
  loadFragment('fragments/footer.html', 'footer-placeholder');
});