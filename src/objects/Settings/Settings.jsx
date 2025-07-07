import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ onSubmitRepo }) => {
    const [repoUrl, setRepoUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (repoUrl) {
            onSubmitRepo(repoUrl); // Pass the URL to the parent component
        }
    };

    return (
        <div className="Settings">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub Repo URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="settings-input"
                />
                <button type="submit" className="settings-button">Submit</button>
            </form>
        </div>
    );
};

export default Settings;
