const app = {
  currentUser: null,
  contenidos: [],
  encuestas: []
};

document.addEventListener('DOMContentLoaded', async () => {
  showLoader();
  
  await checkAuth();
  await loadContenidos();
  await loadEncuestas();
  
  initEventListeners();
  initSearch();
  initAnimations();
  
  setTimeout(hideLoader, 1000);
});

async function checkAuth() {
  const user = await auth.getCurrentUser();
  if (user) {
    app.currentUser = user;
    updateUIForAuthUser();
  }
}

async function loadContenidos() {
  try {
    const response = await api.get('/contenidos');
    
    if (response.success) {
      app.contenidos = response.data;
      renderContenidos(app.contenidos);
    }
  } catch (error) {
    console.error('Error al cargar contenidos:', error);
    // Mostrar contenido de ejemplo si falla
    app.contenidos = getDemoContent();
    renderContenidos(app.contenidos);
  }
}

function renderContenidos(contenidos) {
  const container = document.getElementById('contentGrid');
  
  if (!contenidos || contenidos.length === 0) {
    container.innerHTML = '<p class="no-results">No se encontraron resultados</p>';
    return;
  }
  
  container.innerHTML = contenidos.map(item => `
    <div class="content-card">
      <img src="${item.imagen || 'https://via.placeholder.com/400x300'}" alt="${item.titulo}">
      <div class="content-card-body">
        <h3>${item.titulo}</h3>
        <p>${item.descripcion.substring(0, 150)}...</p>
        
      </div>
    </div>
  `).join('');
  
  animateCards();
}

async function loadEncuestas() {
  if (!app.currentUser) return;
  
  try {
    const response = await api.get('/encuestas');
    
    if (response.success) {
      app.encuestas = response.data;
      renderEncuestas(app.encuestas);
    }
  } catch (error) {
    console.error('Error al cargar encuestas:', error);
  }
}

function renderEncuestas(encuestas) {
  const container = document.getElementById('encuestasContainer');
  
  if (!app.currentUser) {
    container.innerHTML = '<p class="info-message">Debes iniciar sesión para ver las encuestas</p>';
    return;
  }
  
  if (encuestas.length === 0) {
    container.innerHTML = '<p class="info-message">No hay encuestas disponibles</p>';
    return;
  }
  
  container.innerHTML = encuestas.map(encuesta => `
    <div class="encuesta-card">
      <h3>${encuesta.titulo}</h3>
      <p>${encuesta.descripcion}</p>
      <button onclick="abrirEncuesta('${encuesta._id}')" class="btn-primary">
        Responder Encuesta
      </button>
    </div>
  `).join('');
}

function initEventListeners() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();
  
  console.log(' Formulario enviado');
  
  // Validar formulario
  const validator = new FormValidator(e.target);
  if (!validator.validate()) {
    console.log(' Validación fallida');
    return;
  }
  
  console.log(' Validación exitosa');
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  console.log(' Datos a enviar:', data);
  
  const submitBtn = e.target.querySelector('.btn-submit');
  
  try {
    toggleButtonLoader(submitBtn, true);
    
    console.log(' Enviando a:', `${API_URL}/contactos`);
    
    const response = await api.post('/contactos', data);
    
    console.log(' Respuesta recibida:', response);
    
    if (response.success) {
      showNotification('Mensaje enviado exitosamente', 'success');
      e.target.reset();
      validator.clearErrors();
    } else {
      showNotification('Error al enviar el mensaje', 'error');
    }
  } catch (error) {
    console.error(' Error completo:', error);
    showNotification(error.message || 'Error al enviar el mensaje', 'error');
  } finally {
    toggleButtonLoader(submitBtn, false);
  }
}

function updateUIForAuthUser() {
  const btnLogin = document.getElementById('btnLogin');
  if (btnLogin && app.currentUser) {
    btnLogin.textContent = app.currentUser.nombre;
    btnLogin.onclick = (e) => {
      e.preventDefault();
      if (confirm('¿Deseas cerrar sesión?')) {
        auth.logout();
      }
    };
  }
}

function abrirEncuesta(id) {
  window.location.href = `pages/encuestas.html?id=${id}`;
}

function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.remove('hidden');
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
}

function toggleButtonLoader(button, show) {
  const text = button.querySelector('.btn-text');
  const loader = button.querySelector('.btn-loader');
  
  if (show) {
    text.style.display = 'none';
    loader.style.display = 'inline-block';
    button.disabled = true;
  } else {
    text.style.display = 'inline-block';
    loader.style.display = 'none';
    button.disabled = false;
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

function getDemoContent() {
  return [
    {
      titulo: 'Biografía del Dr. José Gregorio',
      descripcion: 'Conoce la vida y obra del médico de los pobres...',
      imagen: '/frontend/assets/images/cnne-986135-jose-gregorio-hernandez-un-simbolo-de-venezuela.jpg',
      createdAt: new Date()
    },
    {
      titulo: 'Milagros Atribuidos',
      descripcion: 'Testimonios de fe y milagros del Dr. José Gregorio...',
      imagen: '/frontend/assets/images/Papaya25-Orgullo-venezolano-en-Panama-696x870.jpg',
      createdAt: new Date()
    },
    {
      titulo: 'Beatificación',
      descripcion: 'Proceso de beatificación y canonización...',
      imagen: '/frontend/assets/images/vaticano-instala-imagen-jose-gregorio-hernandez-en-la-santa-sede-previo-a-su-canonizacion-185447.jpg',
      createdAt: new Date()
    }
  ];
}