import './App.css';
import React from 'react';
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
import Menu98 from "./objects/Menu98/Menu98.jsx";
import MusicPlayer from './objects/MusicPlayer/MusicPlayer.jsx';
import Settings from "./objects/Settings/Settings.jsx"
import { useState } from "react";

function App() {
    // State to control visibility of Music Player and Settings windows
    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);

    // Functions to open/close Music Player
    const openMusicPlayer = () => setIsMusicPlayerOpen(true);
    const closeMusicPlayer = () => setIsMusicPlayerOpen(false);

    // Functions to open/close Settings
    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

    // Functions to open/close Equalizer
    const openEqualizer = () => setIsEqualizerOpen(true);
    const closeEqualizer = () => setIsEqualizerOpen(false);

    return (
        <div className="App">
            {/* Conditionally render the Menu98 for Music Player */}
            {isMusicPlayerOpen && (
                <Menu98 title="Music Player" width={750} height={800} onClose={closeMusicPlayer}>
                    <MusicPlayer />
                </Menu98>
            )}

            {/* Conditionally render the Menu98 for Settings */}
            {isSettingsOpen && (
                <Menu98 title="Settings" width={350} height={100} onClose={closeSettings}>
                    <Settings />
                </Menu98>
            )}

            {/* Conditionally render the Menu98 for Equalizer */}
            {isEqualizerOpen && (
                <Menu98 title="Equalizer" width={750} height={300} onClose={closeEqualizer}>
                    <h1>hash</h1>
                </Menu98>
            )}


            {/* Pass open functions as props to the Desktop */}
            <Desktop
                onOpenMusicPlayer={openMusicPlayer}
                onOpenSettings={openSettings}
                onOpenEqualizer={openEqualizer}
            />
            <Taskbar />
        </div>
    );
}

export default App;
