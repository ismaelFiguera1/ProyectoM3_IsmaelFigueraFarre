import { initChat } from './chat.js';

// Devuelve el HTML de la vista Home
function homeView() {
  return `
    <h1>Habla con Jon Snow</h1>
    <p>Bienvenido. Entra al chat y habla con el Guardián del Norte.</p>
  `;
}

// Devuelve el HTML de la vista Chat (área de mensajes + formulario)
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

// Devuelve el HTML de la vista About
function aboutView() {
  return `
    <h1>About</h1>
    <p>Proyecto creado por Ismael Figuera.</p>
  `;
}

// Inyecta en #app el HTML correspondiente a la ruta actual
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

// Cambia la URL sin recargar la página y renderiza la vista correspondiente
function navigate(path) {
  window.history.pushState({}, '', path);
  renderView();
}

// Intercepta los clicks del nav para que no recarguen la página
document.addEventListener('click', (e) => {
  if (e.target.matches('nav a')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }
});

// Permite que los botones back/forward del navegador funcionen correctamente
window.addEventListener('popstate', renderView);

// Renderiza la vista inicial al cargar la página
renderView();
