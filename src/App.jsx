import React, { useState } from 'react';
import './App.css';
// Importing drag-and-drop context provider from dnd-kit library
import { DndContext } from '@dnd-kit/core';
// Custom hook to manage windows' state and actions
import useWindowManager from './objects/system32/useWindowManager.js';
// UI components for taskbar and desktop
import Taskbar from './objects/Taskbar/Taskbar.jsx';
import Desktop from "./objects/Desktop/Desktop.jsx";
// WindowManager component handles rendering and behavior of open windows
import WindowManager from "./objects/system32/WindowManager.jsx";

// Importing icon images for different apps/programs
import musicplayericon from "./objects/Desktop/img/icons/musicplayer.png";
import settingsicon from "./objects/Desktop/img/icons/settings.png";
import equalizericon from "./objects/Desktop/img/icons/equalizer.png";
import aiicon from "./objects/Desktop/img/icons/aiicon.png";
import cmdicon from "./objects/Desktop/img/icons/cmd.png";

// Import BgEdit
import BgEdit from './objects/system32/BgEdit.jsx';

function App() {
    // State for Desktop background color
    const [desktopBgColor, setDesktopBgColor] = useState('#008C8A'); // default dark gray
    const openBgEdit = () => {openWindow("bgedit")}

    // Destructure states and handlers from custom window manager hook
    const {
        windowStates,
        repoUrl,
        handleRepoChange,
        handleDragEnd,
        bringToFront,
        openWindow,
        closeWindow,
    } = useWindowManager('https://api.github.com/repos/amberleafhash/toonStorage/contents/');

    // List of program icons to display on desktop and taskbar, with click handlers to open windows
    const programIcons = [
        { id: 1, name: "Settings", icon: settingsicon, onClick: () => openWindow("settings") },
        { id: 2, name: "Music Player", icon: musicplayericon, onClick: () => openWindow("music") },
        { id: 3, name: "Equalizer", icon: equalizericon, onClick: () => openWindow("equalizer") },
        { id: 4, name: "Assistant", icon: aiicon, onClick: () => openWindow("assistant") },
        { id: 5, name: "CMD", icon: cmdicon, onClick: () => openWindow("cmd") },
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
                    setDesktopBgColor={setDesktopBgColor}
                    openBgEdit={openBgEdit}


                />

                {/* Pass background color to Desktop */}
                <Desktop icons={programIcons} bgColor={desktopBgColor} />
                <Taskbar icons={programIcons} />

                {/* Background editor to control desktopBgColor */}

            </div>
        </DndContext>
    );
}

export default App;
