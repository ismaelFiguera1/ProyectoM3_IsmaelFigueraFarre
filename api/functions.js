import { GEMINI_URL, SYSTEM_PROMPT } from "./config.js";

// Handler serverless que hace de puente entre el frontend y Gemini.
// El navegador habla con esta funcion; esta funcion habla con Gemini.

// Serverless Function de Vercel que actúa como proxy entre el frontend y Gemini.
// El frontend nunca llama a Gemini directamente — la API key solo existe en el servidor.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Tiene que ser un metodo POST" });
  }

  try {
    // Vercel Dev a veces entrega el body como string — lo parseamos si hace falta
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { messages } = body;

    // Gemini usa "user" y "model" — nuestro frontend usa "user" y "character"
    const geminiMessages = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Enviamos el prompt de sistema y toda la conversacion ya convertida
    // al formato que espera la API de Gemini.
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, // personalidad del personaje
        contents: geminiMessages, // historial completo para que Gemini tenga contexto
      }),
    });

    // La respuesta util del modelo llega anidada dentro de candidates.
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    res.status(200).json({ reply: text });
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con Gemini" });
  }
}
