import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import './App.css';
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
import Menu98 from "./objects/Menu98/Menu98.jsx";
import MusicPlayer from './objects/MusicPlayer/MusicPlayer.jsx';
import Settings from "./objects/Settings/Settings.jsx";
import Chatbot from "./objects/Custom/Chatbot/Chatbot.jsx";
import musicplayericon from "./objects/Desktop/img/icons/musicplayer.png";
import settingsicon from "./objects/Desktop/img/icons/settings.png";
import equalizericon from "./objects/Desktop/img/icons/equalizer.png";
import aiicon from "./objects/Desktop/img/icons/aiicon.png";

function App() {
    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [repoUrl, setRepoUrl] = useState('https://api.github.com/repos/amberleafhash/toonStorage/contents/');

    const [topZIndex, setTopZIndex] = useState(5);
    const [windowStates, setWindowStates] = useState({
        music: { x: 100, y: 100, zIndex: 1 },
        settings: { x: 120, y: 120, zIndex: 2 },
        equalizer: { x: 140, y: 140, zIndex: 3 },
        assistant: { x: 160, y: 160, zIndex: 4 },
    });

    const handleDragEnd = (event) => {
        const { delta, active } = event;
        const id = active.id;

        setWindowStates((prev) => {
            const current = prev[id] || { x: 100, y: 100, zIndex: topZIndex };
            return {
                ...prev,
                [id]: {
                    ...current,
                    x: current.x + delta.x,
                    y: current.y + delta.y,
                },
            };
        });
    };

    const bringToFront = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                zIndex: topZIndex,
            }
        }));
        setTopZIndex(prev => prev + 1);
    };

    const programIcons = [
        { id: 1, name: "Settings", icon: settingsicon, onClick: () => openSettings() },
        { id: 2, name: "Music Player", icon: musicplayericon, onClick: () => openMusicPlayer() },
        { id: 3, name: "Equalizer", icon: equalizericon, onClick: () => openEqualizer() },
        { id: 4, name: "Assistant", icon: aiicon, onClick: () => openAssistant() },
    ];

    const openSettings = () => { setIsSettingsOpen(true); bringToFront("settings"); };
    const closeSettings = () => setIsSettingsOpen(false);

    const openMusicPlayer = () => { setIsMusicPlayerOpen(true); bringToFront("music"); };
    const closeMusicPlayer = () => setIsMusicPlayerOpen(false);

    const openEqualizer = () => { setIsEqualizerOpen(true); bringToFront("equalizer"); };
    const closeEqualizer = () => setIsEqualizerOpen(false);

    const openAssistant = () => { setIsAssistantOpen(true); bringToFront("assistant"); };
    const closeAssistant = () => setIsAssistantOpen(false);

    const handleMusicRepoChange = (url) => {
        setRepoUrl(url);
        closeSettings();
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="App">
                {isMusicPlayerOpen && (
                    <Menu98
                        id="music"
                        title="Music Player"
                        width={750}
                        height={800}
                        onClose={closeMusicPlayer}
                        onFocus={() => bringToFront("music")}
                        position={windowStates.music}
                        zIndex={windowStates.music.zIndex}
                    >
                        <MusicPlayer repoUrl={repoUrl} />
                    </Menu98>
                )}
                {isSettingsOpen && (
                    <Menu98
                        id="settings"
                        title="Settings"
                        width={350}
                        height={100}
                        onClose={closeSettings}
                        onFocus={() => bringToFront("settings")}
                        position={windowStates.settings}
                        zIndex={windowStates.settings.zIndex}
                    >
                        <Settings onSubmitRepo={handleMusicRepoChange} />
                    </Menu98>
                )}
                {isEqualizerOpen && (
                    <Menu98
                        id="equalizer"
                        title="Equalizer"
                        width={800}
                        height={800}
                        onClose={closeEqualizer}
                        onFocus={() => bringToFront("equalizer")}
                        position={windowStates.equalizer}
                        zIndex={windowStates.equalizer.zIndex}
                    >
                        <h2>Work in progress lad</h2>
                    </Menu98>
                )}
                {isAssistantOpen && (
                    <Menu98
                        id="assistant"
                        title="Assistant"
                        width={800}
                        height={800}
                        onClose={closeAssistant}
                        onFocus={() => bringToFront("assistant")}
                        position={windowStates.assistant}
                        zIndex={windowStates.assistant.zIndex}
                    >
                        <Chatbot />
                    </Menu98>
                )}

                <Desktop icons={programIcons} />
                <Taskbar icons={programIcons} />
            </div>
        </DndContext>
    );
}

export default App;
