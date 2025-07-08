import "./CMD.css"
import React from 'react';
import {useState} from "react";


const CMD = ({ openWindow }) => {
    const [command, setCommand] = useState("");
    const [textColor, setTextColor] = useState("white");

    const handleCommand = () => {
        const trimmedCommand = command.trim().toLowerCase();

        if (trimmedCommand === "bgedit") {
            if (openWindow) {
                openWindow("bgedit");
            } else {
                console.error("openWindow function is not available");
            }
        } else if (trimmedCommand === "color 2") {
            setTextColor("#009500");
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCommand();
            setCommand("");
        }
    };

    return (
        <div className="CMD">
            <div className="initialText" style={{ color: textColor }}>
                <p>Microsoft Windows [Version 98]</p>
                <p>(c) Microsoft Corporation. All rights reserved.</p>
                <p>--</p>
            </div>
            <div className="userInput" style={{ color: textColor }}>
                <p>C:\Users\user0</p>
                <input
                    placeholder="Enter command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default CMD