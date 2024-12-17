// App.jsx
import './App.css';
import React, { useState } from 'react';
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
import Menu98 from "./objects/Menu98/Menu98.jsx";
import MusicPlayer from './objects/MusicPlayer/MusicPlayer.jsx';
import Settings from "./objects/Settings/Settings.jsx";

function App() {
    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [repoUrl, setRepoUrl] = useState('https://api.github.com/repos/amberleafhash/toonStorage/contents/'); // Default repo URL

    const openMusicPlayer = () => setIsMusicPlayerOpen(true);
    const closeMusicPlayer = () => setIsMusicPlayerOpen(false);

    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

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

            <Desktop
                onOpenMusicPlayer={openMusicPlayer}
                onOpenSettings={openSettings}
            />
            <Taskbar />
        </div>
    );
}

export default App;
