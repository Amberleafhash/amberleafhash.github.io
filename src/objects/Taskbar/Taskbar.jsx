import React, {useEffect, useState} from "react";
import "./Taskbar.css";
import startbtnimg from "./img/startbutton.png";
import startmenuimg from "./img/startMenuBarIcon.png";

const Taskbar = ({ icons }) => {
    const [isStartMenuVisible, setStartMenuVisible] = useState(false);

    const toggleStartMenu = () => {
        setStartMenuVisible((prevState) => !prevState);
    };

    return (
        <div className="TaskbarContainer">
            {isStartMenuVisible && (
                <div className="StartMenu">
                    <StartMenu icons={icons} />
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
            <img className="TaskbarImg" src={startbtnimg} alt="Start Button" />
        </div>
    );
};

const TaskbarClock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        const timer = setInterval(() => {
            // Use Date object and format it using Intl.DateTimeFormat for better accuracy
            const formattedTime = new Intl.DateTimeFormat([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // This enables AM/PM formatting
            }).format(new Date());

            setTime(formattedTime);
        }, 60000); // Update the time every minute

        // Initial time setup
        setTime(new Intl.DateTimeFormat([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(new Date()));

        // Clear the interval when the component is unmounted
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="TaskbarClock">
            <p>{time}</p>
        </div>
    );
};

const StartMenu = ({ icons }) => {
    return (
        <div className="StartMenu">
            <div className="leftBar">
                <img className="TaskbarImg" src={startmenuimg} alt="image of button" />
            </div>
            <div className="StartMenuContent">
                {icons.map(({ id, name, icon, onClick }) => (
                    <StartMenuItem
                        key={id}
                        menuItemName={name}
                        StartMenuIcon={icon}
                        onClick={onClick} // Pass the onClick handler
                    />
                ))}
            </div>
        </div>
    );
};

const StartMenuItem = ({ menuItemName, StartMenuIcon, onClick }) => {
    return (
        <div className="StartMenuItem" onClick={onClick}> {/* Attach the onClick handler */}
            <img className="StartMenuIcon" src={StartMenuIcon} alt={menuItemName} />
            <p>{menuItemName}</p>
        </div>
    );
};


export default Taskbar;
