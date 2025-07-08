import "./CMD.css"
import React from 'react';
import {useState} from "react";


const CMD = ({ openBgEdit, openCalculator }) => {
    const [command, setCommand] = useState("");
    const [textColor, setTextColor] = useState("white");

    const handleCommand = () => {
        const trimmedCommand = command.trim().toLowerCase();

        if (trimmedCommand === "bgedit") {
            if (openBgEdit) {
                openBgEdit();
            } else {
                console.error("openWindow function is not available");
            }
        } else if (trimmedCommand === "color 2") {
            setTextColor("#009500");
        } else if (trimmedCommand === "color 6") {
            setTextColor("yellow");
        } else if (trimmedCommand === "calc") {
            openCalculator()
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
                <p>{"C:\\Windows\\System32>"}</p>
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