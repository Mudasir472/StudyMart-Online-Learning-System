import { useState, useRef, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";
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
    const [conversations, setConversations] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hi! I am StudyMart AI Tutor.\n\nYou can ask me study related questions like:\n•"
        }
    ]);
    const token = localStorage.getItem('token');
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


    const clearChat = async () => {

        const result = await Swal.fire({
            title: "Delete Chat?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        });


        if (!result.isConfirmed) return;

        try {

            // 🔥 delete from backend
            if (activeChatId) {
                await axios.delete(
                    `${URI}/api/ai/chat/${activeChatId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            // 🔥 remove from sidebar
            setConversations((prev) =>
                prev.filter(chat => chat._id !== activeChatId)
            );

            // 🔥 reset UI
            setActiveChatId(null);
            setMessages([
                {
                    sender: "ai",
                    text: "Hi! I am StudyMart AI Tutor.\n\nYou can ask me study related questions like:\n"
                }
            ]);

            // ✅ success popup
            Swal.fire({
                title: "Deleted!",
                text: "Your chat has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (err) {
            console.log(err);

            // ❌ error popup
            Swal.fire({
                title: "Error",
                text: "Failed to delete chat",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadChat = (chat) => {
        setActiveChatId(chat._id);
        setMessages(chat.messages);
    };
    useEffect(() => {
        if (!token) return; 
        const fetchChats = async () => {
            try {
                const res = await axios.get(`${URI}/api/ai/chats`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setConversations(res.data);

                if (res.data.length > 0) {
                    setActiveChatId(res.data[0]._id);
                    setMessages(res.data[0].messages);
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchChats();
    }, []);

    // const askAI = async () => {

    //     if (!question.trim()) return;

    //     const newMessages = [
    //         ...messages,
    //         { sender: "user", text: question }
    //     ];

    //     setMessages(newMessages);
    //     setQuestion("");
    //     setTyping(true);
    //     const res = await axios.post(
    //         `${URI}/api/ai/ask`,
    //         {
    //             question,
    //             chatId: activeChatId
    //         }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         withCredentials: true,
    //     }
    //     );
    //     setTyping(false);
    //     const updatedMessages = [
    //         ...newMessages,
    //         { sender: "ai", text: res.data.answer }
    //     ];

    //     setMessages(updatedMessages);

    //     if (!activeChatId) {
    //         setActiveChatId(res.data.chatId);
    //     }

    //     const updatedChat = {
    //         _id: res.data.chatId,
    //         title: res.data.title || "New Chat",
    //         messages: updatedMessages
    //     };

    //     setConversations((prev) => {
    //         const filtered = prev.filter(
    //             (c) => c._id !== updatedChat._id
    //         );
    //         return [updatedChat, ...filtered];
    //     });
    // };

    const askAI = async () => {

        if (!question.trim()) return;

        const newMessages = [
            ...messages,
            { sender: "user", text: question }
        ];

        setMessages(newMessages);
        setQuestion("");
        setTyping(true);

        try {

            const res = await axios.post(
                `${URI}/api/ai/ask`,
                {
                    question,
                    chatId: token ? activeChatId : null // 👈 no chatId if guest
                },
                {
                    headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : {}, // 👈 no token for guest
                }
            );

            setTyping(false);

            const updatedMessages = [
                ...newMessages,
                { sender: "ai", text: res.data.answer }
            ];

            setMessages(updatedMessages);

            // ✅ only save chats if logged in
            if (token) {
                if (!activeChatId) {
                    setActiveChatId(res.data.chatId);
                }

                const updatedChat = {
                    _id: res.data.chatId,
                    title: res.data.title || "New Chat",
                    messages: updatedMessages
                };

                setConversations((prev) => {
                    const filtered = prev.filter(
                        (c) => c._id !== updatedChat._id
                    );
                    return [updatedChat, ...filtered];
                });
            }

        } catch (err) {
            setTyping(false);
            console.log(err);
        }
    };
    return (
        <>
            {/* Floating Button */}
            <div className="ai-button" onClick={() => setOpen(!open)}>
                🤖
            </div>

            {open && (
                <div className={`ai-wrapper ${token ? "with-sidebar" : "no-sidebar"}`}>

                    {/* Sidebar */}
                    {token && (
                        <div className="ai-sidebar">

                        <div className="sidebar-title">
                            Recent Chats
                        </div>

                        <button
                            className="new-chat-btn"
                            onClick={() => {
                                setActiveChatId(null);   // 🔥 important
                                setMessages([
                                    {
                                        sender: "ai",
                                        text: "Hi! I am StudyMart AI Tutor.\n\nYou can ask me study related questions like:\n"
                                    }
                                ]);
                                setQuestion("");
                            }}
                        >
                            + New Chat
                        </button>

                        {conversations.map((chat) => (

                            <div
                                key={chat._id}
                                className={`chat-item ${activeChatId === chat._id ? "active" : ""}`}
                                onClick={() => loadChat(chat)}
                            >
                                {chat.title || "New Chat"}
                            </div>

                        ))}

                    </div>
                    )}

                    {/* Main Chat Area */}
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

                                                return (
                                                    <code className={className}>
                                                        {children}
                                                    </code>
                                                );
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

                </div>
            )}
        </>
    );
}

export default AITutorPopup;