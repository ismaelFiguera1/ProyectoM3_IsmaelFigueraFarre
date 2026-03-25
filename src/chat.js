// Historial de mensajes de la sesión actual
// Cada mensaje: { role: "user" | "character", content: string }
let messages = [];

// Recorre el array de mensajes y genera el HTML en el DOM
// Aplica clase .user o .character según el rol para diferenciarlos visualmente
// Hace scroll automático al último mensaje
function renderMessages() {
  const messagesDiv = document.getElementById("messages");

  messagesDiv.innerHTML = messages
    .map(
      (msg) => `
    <div class="message ${msg.role}">
      <p>${msg.content}</p>
    </div>
  `
    )
    .join("");

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Maneja el envío del formulario:
// 1. Añade el mensaje del usuario al historial
// 2. Envía todo el historial a /api/functions
// 3. Añade la respuesta del personaje al historial
// 4. En caso de error, muestra un mensaje en personaje
async function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  messages.push({ role: "user", content: text });
  input.value = "";
  renderMessages();

  try {
    const response = await fetch("/api/functions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    if (!response.ok || !data.reply) throw new Error(data.error);
    messages.push({ role: "character", content: data.reply });
  } catch (error) {
    messages.push({ role: "character", content: "Something is wrong. The ravens are not responding." });
  }

  renderMessages();
}

// Inicializa el chat cuando se carga la vista /chat
// Usa removeEventListener antes de añadir para evitar listeners duplicados
// si el usuario navega al chat varias veces en la misma sesión
export function initChat() {
  const form = document.getElementById("chat-form");
  form.removeEventListener("submit", handleSubmit);
  form.addEventListener("submit", handleSubmit);
  renderMessages();
}
