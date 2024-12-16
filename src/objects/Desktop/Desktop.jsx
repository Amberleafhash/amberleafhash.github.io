import "./Desktop.css";
import React from 'react';
import musicplayericon from "./img/icons/musicplayer.png";
import settingsicon from "./img/icons/settings.png";
import equalizericon from "./img/icons/equalizer.png";

const Desktop = ({ onOpenMusicPlayer, onOpenSettings, onOpenEqualizer }) => {
    return (
        <div className="Desktop">
            <div className="iconBox">
                <DesktopIcon
                    icon={settingsicon}
                    iconName="Settings"
                    onClick={onOpenSettings} // Open Settings
                />
                <DesktopIcon
                    icon={musicplayericon}
                    iconName="Music Player"
                    onClick={onOpenMusicPlayer} // Open Music Player
                />
                <DesktopIcon
                    icon={equalizericon}
                    iconName="Equalizer"
                    onClick={onOpenEqualizer}
                />
            </div>
        </div>
    );
};

const DesktopIcon = ({ icon, iconName, onClick }) => {
    return (
        <div className="DesktopIcon" onClick={onClick}>
            <img src={icon} alt={iconName} />
            <div className="iconName">
                <p>{iconName}</p>
            </div>
        </div>
    );
};

export default Desktop;
