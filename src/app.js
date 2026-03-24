import { initChat } from './chat.js';

function homeView() {
  return `
    <h1>Habla con Jon Snow</h1>
    <p>Bienvenido. Entra al chat y habla con el Guardián del Norte.</p>
  `;
}

function chatView() {
  return `
    <section id="chat-container">
      <div id="messages"></div>
      <form id="chat-form">
        <input type="text" id="chat-input" placeholder="Escribe un mensaje..." autocomplete="off" />
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;
}

function aboutView() {
  return `
    <h1>About</h1>
    <p>Proyecto creado por Ismael Figuera.</p>
  `;
}


function renderView() {
  const path = window.location.pathname;
  const app = document.getElementById('app');

  if (path === '/' || path === '/home') {
    app.innerHTML = homeView();
  } else if (path === '/chat') {
    app.innerHTML = chatView();
    initChat();
  } else if (path === '/about') {
    app.innerHTML = aboutView();
  }
}

function navigate(path) {
  window.history.pushState({}, '', path);
  renderView();
}

// Intercepta los clicks del nav para no recargar la página
document.addEventListener('click', (e) => {
  if (e.target.matches('nav a')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }
});

// Back/forward del navegador
window.addEventListener('popstate', renderView);

// Renderiza la vista al cargar la página
renderView();