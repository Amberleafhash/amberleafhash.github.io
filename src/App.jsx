import React, { useState } from 'react';
import './App.css';
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
import Menu98 from "./objects/Menu98/Menu98.jsx";
import MusicPlayer from './objects/MusicPlayer/MusicPlayer.jsx';
import Settings from "./objects/Settings/Settings.jsx";
import Chatbot from "./objects/Custom/Chatbot/Chatbot.jsx"
import musicplayericon from "./objects/Desktop/img/icons/musicplayer.png";
import settingsicon from "./objects/Desktop/img/icons/settings.png";
import equalizericon from "./objects/Desktop/img/icons/equalizer.png";
import aiicon from "./objects/Desktop/img/icons/aiicon.png"

function App() {
    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [repoUrl, setRepoUrl] = useState('https://api.github.com/repos/amberleafhash/toonStorage/contents/'); // Default repo URL

    // Centralized icons data
    const programIcons  = [ // Can fit a max of 9
        { id: 1, name: "Settings", icon: settingsicon, onClick: () => openSettings() },
        { id: 2, name: "Music Player", icon: musicplayericon, onClick: () => openMusicPlayer() },
        { id: 3, name: "Equalizer", icon: equalizericon, onClick: () => openEqualizer() },
        { id: 4, name: "Assistant", icon: aiicon, onClick: () => openAssistant() },
    ];

    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

    const openMusicPlayer = () => setIsMusicPlayerOpen(true);
    const closeMusicPlayer = () => setIsMusicPlayerOpen(false);

    const openEqualizer = () => setIsEqualizerOpen(true);
    const closeEqualizer = () => setIsEqualizerOpen(false);

    const openAssistant = () => setIsAssistantOpen(true);
    const closeAssistant = () => setIsAssistantOpen(false);

    // This function will be passed to Settings to update the repo URL
    const handleMusicRepoChange = (url) => {
        setRepoUrl(url); // Update the repo URL
        closeSettings(); // Close settings after submitting
    };

    return (
        <div className="App">
            {isMusicPlayerOpen && (
                <Menu98 title="Music Player" width={750} height={800} onClose={closeMusicPlayer}>
                    <MusicPlayer repoUrl={repoUrl} /> {/* Pass the repoUrl prop to MusicPlayer */}
                </Menu98>
            )}

            {isSettingsOpen && (
                <Menu98 title="Settings" width={350} height={100} onClose={closeSettings}>
                    <Settings onSubmitRepo={handleMusicRepoChange} /> {/* Pass the handleRepoChange function to Settings */}
                </Menu98>
            )}

            {isAssistantOpen && (
                <Menu98 title="Equalizer" width={800} height={800} onClose={closeAssistant}>
                    <Chatbot />
                </Menu98>
            )}

            {isEqualizerOpen && (
                <Menu98 title="Assistant" width={800} height={800} onClose={closeEqualizer}>
                    <h2>Work in progress lad</h2>
                </Menu98>
            )}

            <Desktop icons={programIcons} />
            <Taskbar icons={programIcons} />
        </div>
    );
}

export default App;
