import React, { useState } from "react";

export const Chat = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Estado para mostrar/ocultar el chat

    const sendMessage = async () => {
        if (!message.trim()) return; // Evita enviar mensajes vacíos

        const newChat = [...chat, { sender: "user", text: message }]; // Añade el mensaje del usuario

        setChat(newChat);
        setMessage("");

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            setChat([...newChat, { sender: "bot", text: data.reply }]); // Añade la respuesta del chatbot
        } catch (error) {
            setChat([...newChat, { sender: "bot", text: "Error en la respuesta" }]);
        }
    };

    return (
        <div>
            {/* Botón flotante para abrir/cerrar el chat */}
            <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
                💬 Chat
            </button>

            {/* Chat flotante */}
            {isOpen && (
                <div className="chat-container">
                    <div className="chat-header">
                        <span>Chatbot</span>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    <div className="chat-body">
                        {chat.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chat-footer">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                        />
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
            )}

            {/* Estilos */}
            <style>{`
                .chat-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 16px;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                }

                .chat-container {
                    position: fixed;
                    bottom: 80px;
                    right: 20px;
                    width: 300px;
                    background: white;
                    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #ccc;
                }

                .chat-header {
                    background: #007bff;
                    color: white;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chat-body {
                    padding: 10px;
                    height: 200px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .chat-footer {
                    display: flex;
                    padding: 10px;
                    gap: 5px;
                }

                .chat-footer input {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .chat-footer button {
                    padding: 8px;
                    background: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }

                .chat-footer button:hover {
                    background: #0056b3;
                }

                .chat-message {
                    padding: 8px;
                    border-radius: 10px;
                    max-width: 80%;
                }

                .user {
                    background: #007bff;
                    color: white;
                    align-self: flex-end;
                }

                .bot {
                    background: #e5e5e5;
                    color: black;
                    align-self: flex-start;
                }
            `}</style>
        </div>
    );
};
