import { useState } from "react";
import axios from "axios";
import { URI } from "../../env";
export default function Chat() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);

    const askAI = async () => {
        if (!question.trim()) return;

        // show user message
        const newMessages = [
            ...messages,
            { role: "user", text: question }
        ];
        setMessages(newMessages);

        try {
            const res = await axios.post(
                `${URI}/api/ai/ask`,
                {
                    question,
                    studentId: "67b30c2a82337da8378f066c"
                }
            );

            setMessages([
                ...newMessages,
                { role: "ai", text: res.data.answer }
            ]);

            setQuestion("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h2>🎓 StudyMart AI Tutor</h2>

            {/* Chat Window */}
            <div
                style={{
                    border: "1px solid #ccc",
                    height: "400px",
                    overflowY: "auto",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.role === "user" ? "right" : "left",
                            margin: "8px 0"
                        }}
                    >
                        <span
                            style={{
                                background:
                                    msg.role === "user" ? "#007bff" : "#eee",
                                color: msg.role === "user" ? "#fff" : "#000",
                                padding: "8px 12px",
                                borderRadius: "10px",
                                display: "inline-block"
                            }}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input */}
            <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your doubt..."
                style={{ width: "75%", padding: "10px" }}
            />

            <button
                onClick={askAI}
                style={{ padding: "10px", marginLeft: "10px" }}
            >
                Ask
            </button>
        </div>
    );
}