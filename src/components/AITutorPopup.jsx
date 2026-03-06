import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AITutorPopup.css";
import { URI } from "../../env";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function AITutorPopup() {

    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [typing, setTyping] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hi! I am StudyMart AI Tutor.\n\nYou can ask me study related questions like:\n•"
        }
    ]);

    const suggestions = [
        "What is React?",
        "Explain Java inheritance",
        "What is Angular interpolation?"
    ];

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Answer copied!");
    };
    const clearChat = () => {
        localStorage.removeItem("studyMartAIChat");

        setMessages([
            {
                sender: "ai",
                text: "👋 Hi! I am StudyMart AI Tutor.\n\nYou can ask me study related questions like:\n•"
            }
        ]);
    };

    useEffect(() => {
        const savedChat = localStorage.getItem("studyMartAIChat");

        if (savedChat) {
            setMessages(JSON.parse(savedChat));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("studyMartAIChat", JSON.stringify(messages));
    }, [messages]);

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
        setTyping(true);
        const res = await axios.post(
            `${URI}/api/ai/ask`,
            { question }
        );
        setTyping(false);
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

            {open && (
                <div className="ai-chatbox">

                    <div className="ai-header">

                        <span>StudyMart AI Tutor</span>

                        <button
                            className="clear-chat-btn"
                            onClick={clearChat}
                        >
                            🗑
                        </button>

                    </div>

                    <div className="ai-messages">

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={msg.sender === "user" ? "user-msg" : "ai-msg"}
                            >
                                <ReactMarkdown
                                    components={{
                                        code({ inline, className, children }) {

                                            const match = /language-(\w+)/.exec(className || "");

                                            if (!inline && match) {
                                                const codeString = String(children).replace(/\n$/, "");

                                                return (
                                                    <div className="code-block">

                                                        <button
                                                            className="copy-code-btn"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(codeString);
                                                                setCopiedIndex(i);

                                                                setTimeout(() => {
                                                                    setCopiedIndex(null);
                                                                }, 1500);
                                                            }}
                                                        >
                                                            {copiedIndex === i ? "✔" : "Copy"}
                                                        </button>

                                                        <SyntaxHighlighter
                                                            style={vscDarkPlus}
                                                            language={match[1]}
                                                            PreTag="div"
                                                        >
                                                            {codeString}
                                                        </SyntaxHighlighter>

                                                    </div>
                                                );
                                            }

                                            return <code className={className}>{children}</code>;
                                        }
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>

                            </div>
                        ))}
                        {typing && (
                            <div className="ai-msg typing">
                                AI is typing<span>.</span><span>.</span><span>.</span>
                            </div>
                        )}
                        {/* Suggestions */}
                        {messages.length === 1 && (
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
                        )}

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