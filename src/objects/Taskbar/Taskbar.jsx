import React, { useState } from "react";
import "./Taskbar.css";
import startbtnimg from "./img/startbutton.png";

const Taskbar = () => {
    const [isStartMenuVisible, setStartMenuVisible] = useState(false);

    const toggleStartMenu = () => {
        setStartMenuVisible(prevState => !prevState);
    };

    return (
        <div className="TaskbarContainer">
            {isStartMenuVisible && (
                <div className="StartMenu">
                    <StartMenu />
                </div>
            )}
            <div className="Taskbar">
                <StartButton onClick={toggleStartMenu} />
                <TaskbarClock />
            </div>
        </div>
    );
};

const StartButton = ({ onClick }) => {
    return (
        <div className="StartButton" onClick={onClick}>
            <img className="TaskbarImg" src={startbtnimg} alt="image of button" />
        </div>
    );
};

const TaskbarClock = () => {
    return (
        <div className="TaskbarClock">
            <p>04:20 PM</p>
        </div>
    );
};

const StartMenu = () => {
    return (
        <div className="StartMenu">
            <StartMenuItem menuItemName="Settings" />
            <StartMenuItem menuItemName="Music Player" />
        </div>
    );
};

const StartMenuItem = ({ menuItemName, StartMenuIcon }) => {
    return (
        <div className="StartMenuItem">
            <div className="StartMenuIcon"></div>
            <p>{menuItemName}</p>
        </div>
    );
};


export default Taskbar;