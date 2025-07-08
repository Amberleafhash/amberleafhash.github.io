import React, { useState } from 'react';
import './App.css';
import { DndContext } from '@dnd-kit/core';
import useWindowManager from './objects/system32/useWindowManager.js';
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
import WindowManager from "./objects/system32/WindowManager.jsx";

// Importing icon images
import musicplayericon from "./objects/Desktop/img/icons/musicplayer.png";
import settingsicon from "./objects/Desktop/img/icons/settings.png";
import equalizericon from "./objects/Desktop/img/icons/equalizer.png";
import aiicon from "./objects/Desktop/img/icons/aiicon.png";
import cmdicon from "./objects/Desktop/img/icons/cmd.png";
import notepadicon from "./objects/Desktop/img/icons/notepadicon.png";
import bgediticon from "./objects/Desktop/img/icons/bgediticon.png";

function App() {
    const [desktopBgColor, setDesktopBgColor] = useState('#008C8A');
    const openBgEdit = () => { openWindow("bgedit") };
    const openCalculator = () => { openWindow("calculator") };

    const {
        windowStates,
        repoUrl,
        handleRepoChange,
        handleDragEnd,
        bringToFront,
        openWindow,
        closeWindow,
    } = useWindowManager('https://api.github.com/repos/amberleafhash/toonStorage/contents/');

    const programIcons = [
        { id: 1, name: "Settings", icon: settingsicon, onClick: () => openWindow("settings"), showOnDesktop: true },
        { id: 2, name: "Music Player", icon: musicplayericon, onClick: () => openWindow("music"), showOnDesktop: true },
        { id: 3, name: "Equalizer", icon: equalizericon, onClick: () => openWindow("equalizer"), showOnDesktop: true }, // Not on desktop
        { id: 4, name: "Assistant", icon: aiicon, onClick: () => openWindow("assistant"), showOnDesktop: true },  // Not on desktop
        { id: 5, name: "CMD", icon: cmdicon, onClick: () => openWindow("cmd"), showOnDesktop: true },
        { id: 6, name: "Notepad", icon: notepadicon, onClick: () => openWindow("notepad"), showOnDesktop: false },
        { id: 7, name: "BGedit", icon: bgediticon, onClick: () => openWindow("bgedit"), showOnDesktop: false },
    ];

    // Generate taskbar items based on open windows
    const taskbarItems = Object.entries(windowStates)
        .filter(([windowId, windowData]) => windowData.isOpen)
        .map(([windowId]) => {
            const programIcon = programIcons.find(
                (icon) => icon.name.toLowerCase() === windowId.toLowerCase()
            );

            return {
                id: windowId,
                appTitle: programIcon ? programIcon.name : windowId,
                icon: programIcon ? programIcon.icon : null,
                onClick: () => bringToFront(windowId),
            };
        });

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="App">
                <WindowManager
                    windowStates={windowStates}
                    repoUrl={repoUrl}
                    handleRepoChange={handleRepoChange}
                    bringToFront={bringToFront}
                    closeWindow={closeWindow}
                    setDesktopBgColor={setDesktopBgColor}
                    openBgEdit={openBgEdit}
                    openCalculator={openCalculator}
                />
                {/* Only show desktop icons marked with showOnDesktop */}
                <Desktop icons={programIcons.filter(icon => icon.showOnDesktop)} bgColor={desktopBgColor} />
                {/* Taskbar gets full list for start menu, etc. */}
                <Taskbar icons={programIcons} taskbarItems={taskbarItems} windowStates={windowStates} />
            </div>
        </DndContext>
    );
}

export default App;
