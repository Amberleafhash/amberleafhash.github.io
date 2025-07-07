import React from 'react';
import './App.css';
import { DndContext } from '@dnd-kit/core';
import useWindowManager from './objects/useWindowManager.js';
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
import WindowManager from "./objects/WindowManager.jsx"; // 👈 new import

import musicplayericon from "./objects/Desktop/img/icons/musicplayer.png";
import settingsicon from "./objects/Desktop/img/icons/settings.png";
import equalizericon from "./objects/Desktop/img/icons/equalizer.png";
import aiicon from "./objects/Desktop/img/icons/aiicon.png";

function App() {
    const {
        windowStates,
        repoUrl,
        handleRepoChange,
        handleDragEnd,
        bringToFront,
        openWindow,
        closeWindow
    } = useWindowManager('https://api.github.com/repos/amberleafhash/toonStorage/contents/');

    const programIcons = [
        { id: 1, name: "Settings", icon: settingsicon, onClick: () => openWindow("settings") },
        { id: 2, name: "Music Player", icon: musicplayericon, onClick: () => openWindow("music") },
        { id: 3, name: "Equalizer", icon: equalizericon, onClick: () => openWindow("equalizer") },
        { id: 4, name: "Assistant", icon: aiicon, onClick: () => openWindow("assistant") },
    ];

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="App">
                <WindowManager
                    windowStates={windowStates}
                    repoUrl={repoUrl}
                    handleRepoChange={handleRepoChange}
                    bringToFront={bringToFront}
                    closeWindow={closeWindow}
                />

                <Desktop icons={programIcons} />
                <Taskbar icons={programIcons} />
            </div>
        </DndContext>
    );
}

export default App;
