import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = "AIzaSyAGd6a6quAwg08tB3hJJemZ2UoOwrNrp9Q";

app.use(cors());
app.use(bodyParser.json());

let conversationHistory = [{ role: "system", content: "Eres un asistente amigable que ama los gatos. Responde solo cuando las consultas sean relacionadas con gatos." }];

app.post("/chat", async (req, res) => {
    try {
        console.log("Mensaje recibido:", req.body.message);

        const { message } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: "Eres un experto en gatos. Responde siempre con información útil sobre gatos." },
                                { text: message }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log("Respuesta de Gemini:", JSON.stringify(data, null, 2)); // 🔹 Imprimir toda la respuesta

        if (data.error) {
            console.error("Error en la API de Gemini:", data.error);
            return res.status(500).json({ error: data.error.message });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se recibió respuesta";

        res.json({ reply });
    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
