import React, { useEffect, useState } from "react";
import "./Taskbar.css";
import startbtnimg from "./img/startbutton.png";
import startmenuimg from "./img/startMenuBarIcon.png";

const Taskbar = ({ icons, taskbarItems = [] }) => {
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

                {/* Dynamic TaskbarItems */}
                {taskbarItems.map(({ id, appTitle, icon, onClick }) => (
                    <TaskbarItem
                        key={id}
                        appTitle={appTitle}
                        icon={icon}
                        onClick={onClick}
                    />
                ))}

                <TaskbarClock />
            </div>
        </div>
    );
};

const TaskbarItem = ({ appTitle, icon, onClick }) => {
    return (
        <div className="TaskbarItem" onClick={onClick}>
            <div><img src={icon} alt={`${appTitle} icon`} /></div>
            <div>{appTitle}</div>
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
            const formattedTime = new Intl.DateTimeFormat([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }).format(new Date());

            setTime(formattedTime);
        }, 60000);

        setTime(new Intl.DateTimeFormat([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(new Date()));

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
                <img className="TaskbarImg" src={startmenuimg} alt="Start Menu Icon" />
            </div>
            <div className="StartMenuContent">
                {icons.map(({ id, name, icon, onClick }) => (
                    <StartMenuItem
                        key={id}
                        menuItemName={name}
                        StartMenuIcon={icon}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    );
};

const StartMenuItem = ({ menuItemName, StartMenuIcon, onClick }) => {
    return (
        <div className="StartMenuItem" onClick={onClick}>
            <img className="StartMenuIcon" src={StartMenuIcon} alt={menuItemName} />
            <p>{menuItemName}</p>
        </div>
    );
};

export default Taskbar;
