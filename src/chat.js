let messages = [];

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

function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  messages.push({ role: "user", content: text });
  messages.push({ role: "character", content: "You know nothing." });

  input.value = "";
  renderMessages();
}

export function initChat() {
  const form = document.getElementById("chat-form");
  form.removeEventListener("submit", handleSubmit);
  form.addEventListener("submit", handleSubmit);
  renderMessages();
}
