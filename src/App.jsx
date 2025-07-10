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
import minesweepericon from "./objects/Custom/Minesweeper/img/minesweepericon.png";

// Supabase client for user data fetching
import { supabase } from './objects/system32/dbConnect/supabaseClient.js';

function App() {
    const [desktopBgColor, setDesktopBgColor] = useState('#008C8A');
    const [activeUser, setActiveUser] = useState(null); // { id, username, profile_pic }

    const {
        windowStates,
        repoUrl,
        handleRepoChange,
        handleDragEnd,
        bringToFront,
        openWindow,
        closeWindow,
    } = useWindowManager('https://api.github.com/repos/amberleafhash/toonStorage/contents/');

    // Openers for specific system windows
    const openBgEdit = () => openWindow("bgedit");
    const openCalculator = () => openWindow("calculator");
    const openNewUserMenu = () => openWindow("newusermenu");

    // Program icons and click handlers
    const programIcons = [
        { id: 1, name: "Settings", icon: settingsicon, onClick: () => openWindow("settings"), showOnDesktop: true },
        { id: 2, name: "Music Player", icon: musicplayericon, onClick: () => openWindow("music"), showOnDesktop: true },
        { id: 3, name: "Equalizer", icon: equalizericon, onClick: () => openWindow("equalizer"), showOnDesktop: true },
        { id: 4, name: "Assistant", icon: aiicon, onClick: () => openWindow("assistant"), showOnDesktop: true },
        { id: 5, name: "CMD", icon: cmdicon, onClick: () => openWindow("cmd"), showOnDesktop: true },
        { id: 6, name: "Notepad", icon: notepadicon, onClick: () => openWindow("notepad"), showOnDesktop: false },
        { id: 7, name: "BGedit", icon: bgediticon, onClick: () => openWindow("bgedit"), showOnDesktop: false },
        { id: 9, name: "Minesweeper", icon: minesweepericon, onClick: () => openWindow("minesweeper"), showOnDesktop: true },
    ];

    // Taskbar items from open windows
    const taskbarItems = Object.entries(windowStates)
        .filter(([_, windowData]) => windowData?.isOpen)
        .map(([windowId]) => {
            const programIcon = programIcons.find(icon => icon.name.toLowerCase() === windowId.toLowerCase());
            return {
                id: windowId,
                appTitle: programIcon ? programIcon.name : windowId,
                icon: programIcon ? programIcon.icon : null,
                onClick: () => bringToFront(windowId),
            };
        });

    // Fetch user info from Supabase
    const fetchUserInfo = async (userId) => {
        if (!userId) return null;
        const { data, error } = await supabase
            .from('users')
            .select('id, username, profile_pic')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user info:', error.message);
            return null;
        }
        return data;
    };

    // Update activeUser from DB
    const handleUserUpdate = async () => {
        if (!activeUser?.id) return;
        const updatedUser = await fetchUserInfo(activeUser.id);
        if (updatedUser) setActiveUser(updatedUser);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="App">
                {activeUser && (
                    <div className="welcome-banner" style={{ padding: '8px', color: 'white' }}>
                        Welcome, {activeUser.username}!
                        {activeUser.profile_pic && (
                            <img
                                src={activeUser.profile_pic}
                                alt="User Profile"
                                style={{ width: 30, height: 30, borderRadius: '50%', marginLeft: 10 }}
                            />
                        )}
                    </div>
                )}

                <WindowManager
                    windowStates={windowStates}
                    repoUrl={repoUrl}
                    handleRepoChange={handleRepoChange}
                    bringToFront={bringToFront}
                    closeWindow={closeWindow}
                    setDesktopBgColor={setDesktopBgColor}
                    openBgEdit={openBgEdit}
                    openCalculator={openCalculator}
                    openNewUserMenu={openNewUserMenu}
                    setActiveUser={setActiveUser}
                    activeUser={activeUser}
                    onUserUpdate={handleUserUpdate}
                    userId={activeUser?.id}  // Pass userId here for convenience
                />

                <Desktop
                    icons={programIcons.filter(icon => icon.showOnDesktop)}
                    bgColor={desktopBgColor}
                />

                <Taskbar
                    icons={programIcons}
                    taskbarItems={taskbarItems}
                    windowStates={windowStates}
                />
            </div>
        </DndContext>
    );
}

export default App;
