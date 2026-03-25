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

export function initChat() {
  const form = document.getElementById("chat-form");
  form.removeEventListener("submit", handleSubmit);
  form.addEventListener("submit", handleSubmit);
  renderMessages();
}
