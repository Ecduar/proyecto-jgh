function initSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce(async (e) => {
    const query = e.target.value.trim();

    if (query.length < 3) {
      loadContenidos();
      return;
    }

    try {
      showLoader();
      const response = await api.get(`/contenidos/buscar?q=${query}`);
      
      if (response.success) {
        renderContenidos(response.data);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      hideLoader();
    }
  }, 300));
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}