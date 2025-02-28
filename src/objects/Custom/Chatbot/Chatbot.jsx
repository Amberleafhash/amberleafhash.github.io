import React, { useState } from "react";
import "./Chatbot.css";
import { generateReply } from "./AI.jsx";
import AiSettings from "./AiSettings.jsx";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [currentView, setCurrentView] = useState("chat"); // "chat", "settings", "help", etc.

    const addMessage = (newMessage, sender) => {
        if (newMessage.trim() !== "") {
            setMessages((messages) => [...messages, { text: newMessage, sender }]);
        }
    };

    return (
        <div className="Chatbot">
            <div className="titleBar">
                <div className="settingsButton" onClick={() => setCurrentView(currentView === "settings" ? "chat" : "settings")}> </div>
                <h2>Ollama AI in ReactJS</h2>
            </div>

            {/* Conditional Rendering Based on currentView */}
            {currentView === "settings" && <AiSettings />}
            {currentView === "help" && <HelpMenu />}
            {currentView === "chat" && (
                <>
                    <ChatBody messages={messages} />
                    <UserInput addMessage={addMessage} />
                </>
            )}
        </div>
    );
};

const ChatBody = ({ messages }) => {
    return (
        <div className="chatBody">
            <div className="responseBox">
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
            </div>
        </div>
    );
};

const UserInput = ({ addMessage }) => {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (input.trim() === "") return;
        addMessage(input, "user");
        setInput("");

        generateReply({ input_message: input })
            .then((response) => {
                addMessage(response, "ai");
            })
            .catch((error) => console.error("Error generating reply:", error));
    };

    return (
        <div className="userInput">
            <input
                placeholder="Enter Your Prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <div className="submitButton" onClick={handleSubmit}>
                <h3>Enter</h3>
            </div>
        </div>
    );
};

const Message = ({ message }) => {
    return (
        <div className={`Message ${message.sender}`}>
            <p>{message.text}</p>
        </div>
    );
};

const HelpMenu = () => {
    return (
        <div className="helpMenu">
            <h3>Help & FAQs</h3>
            <p>Here you can find help and frequently asked questions.</p>
        </div>
    );
};

export default Chatbot;
