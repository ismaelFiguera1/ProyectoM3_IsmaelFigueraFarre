import { GEMINI_URL, SYSTEM_PROMPT } from "./config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Tiene que ser un metodo POST" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { messages } = body;

    const geminiMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      GEMINI_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiMessages,
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    res.status(200).json({ reply: text });
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con Gemini" });
  }
}
