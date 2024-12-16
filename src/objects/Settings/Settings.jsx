import "./Settings.css";
import React from 'react';

const Settings = () => {
    return (
        <div className="Settings">
            <input
                type="text"
                placeholder="Enter IP"
                className="settings-input"
            />
            <button className="settings-button">Submit</button>
        </div>
    );
}

export default Settings;
