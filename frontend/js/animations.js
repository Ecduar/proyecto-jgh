function initAnimations() {
  // Animación de scroll reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observar elementos
  const elements = document.querySelectorAll('.content-card, .biografia-content, .encuesta-card');
  elements.forEach(el => observer.observe(el));
}

function animateCards() {
  const cards = document.querySelectorAll('.content-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('fade-in');
    }, index * 100);
  });
}