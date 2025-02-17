import React, { useState } from "react";
import axios from "axios";
import { URI } from "../../../env";

const Chatbot = () => {
    const [message, setMessage] = useState(""); // Message input state
    const [response, setResponse] = useState(""); // Response from API
    const [loading, setLoading] = useState(false); // Loading state for request

    // Function to send message to backend
    const sendMessage = async () => {
        if (!message.trim()) return; // Prevent empty messages
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${URI}/chat`, { message }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setResponse(res.data.reply); // Set the response from the backend
        } catch (error) {
            console.error("Error:", error);
            setResponse("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <h2>Chatbot</h2>
            <div className="chatbox">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask something..."
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? "Loading..." : "Send"}
                </button>
            </div>
            {response && (
                <div className="response">
                    <h4>AI Response:</h4>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
