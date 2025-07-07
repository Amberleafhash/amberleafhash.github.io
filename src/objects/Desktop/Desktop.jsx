import "./Desktop.css";
import React from 'react';

const Desktop = ({ icons }) => {
    return (
        <div className="Desktop">
            <div className="iconBox">
                {icons.map(({ id, icon, name, onClick }) => (
                    <DesktopIcon key={id} icon={icon} iconName={name} onClick={onClick} />
                ))}
            </div>
        </div>
    );
};

const DesktopIcon = ({ icon, iconName, onClick }) => {
    return (
        <div className="DesktopIcon" onClick={onClick}>
            <div className="item">
                <img src={icon} alt={iconName} />
                <div className="iconName">
                    <p>{iconName}</p>
                </div>
            </div>


        </div>
    );
};

export default Desktop;
