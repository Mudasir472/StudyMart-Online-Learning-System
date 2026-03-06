import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AITutorPopup.css";
import { URI } from "../../env";

function AITutorPopup() {

    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hi! I am StudyMart AI Tutor.\n\nYou can ask me study related questions like:\n• What is React?\n• Explain Java inheritance\n• What is Angular interpolation?"
        }
    ]);

    const suggestions = [
        "What is React?",
        "Explain Java inheritance",
        "What is Angular interpolation?"
    ];
    {
        messages.length === 1 && (
            <div className="ai-suggestions">
                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setQuestion(s)}
                        className="suggestion-btn"
                    >
                        {s}
                    </button>
                ))}
            </div>
        )
    }
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const askAI = async () => {

        if (!question.trim()) return;

        const newMessages = [
            ...messages,
            { sender: "user", text: question }
        ];

        setMessages(newMessages);
        setQuestion("");

        const res = await axios.post(
            `${URI}/api/ai/ask`,
            { question }
        );

        setMessages([
            ...newMessages,
            { sender: "ai", text: res.data.answer }
        ]);
    };

    return (
        <>
            {/* Floating Button */}
            <div className="ai-button" onClick={() => setOpen(!open)}>
                🤖
            </div>

            {/* Chat Window */}
            {open && (
                <div className="ai-chatbox">

                    <div className="ai-header">
                        StudyMart AI Tutor
                    </div>

                    <div className="ai-messages">

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={msg.sender === "user" ? "user-msg" : "ai-msg"}
                            >
                                {msg.text}
                            </div>
                        ))}

                        <div ref={messagesEndRef} />

                    </div>

                    <div className="ai-input">

                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask your study doubt..."
                            onKeyDown={(e) => e.key === "Enter" && askAI()}
                        />

                        <button onClick={askAI} className="send-btn">
                            ➤
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}

export default AITutorPopup;