// src/hooks/useWindowManager.js
import { useState } from 'react';

export default function useWindowManager(initialRepoUrl) {
    // Tracks the highest zIndex value for window stacking order
    const [topZIndex, setTopZIndex] = useState(5);

    // Stores the current repository URL
    const [repoUrl, setRepoUrl] = useState(initialRepoUrl);

    // Stores the states of all windows including position, zIndex, and open/close status
    const [windowStates, setWindowStates] = useState({
        music: { x: 100, y: 100, zIndex: 1, isOpen: false },
        settings: { x: 120, y: 120, zIndex: 2, isOpen: false },
        equalizer: { x: 140, y: 140, zIndex: 3, isOpen: false },
        assistant: { x: 160, y: 160, zIndex: 4, isOpen: false },
        cmd: { x: 160, y: 160, zIndex: 5, isOpen: false },
        bgedit: { x: 160, y: 160, zIndex: 6, isOpen: false },
        calculator: { x: 160, y: 160, zIndex: 6, isOpen: false },
        notepad: { x: 160, y: 160, zIndex: 6, isOpen: false },
        newusermenu: { x: 450, y: 250, zIndex: 7, isOpen: true },
        minesweeper: { x: 100, y: 100, zIndex: 8, isOpen: false },
    });

    // Opens a window by setting isOpen to true and updating its zIndex to topZIndex
    const openWindow = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: true,
                zIndex: topZIndex,
            },
        }));
        setTopZIndex(prev => prev + 1);  // Increment topZIndex so next window can be on top
    };

    // Closes a window by setting isOpen to false
    const closeWindow = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: false,
            },
        }));
    };

    // Brings a window to the front by updating its zIndex to topZIndex
    const bringToFront = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                zIndex: topZIndex,
            },
        }));
        setTopZIndex(prev => prev + 1); // Increment topZIndex for next use
    };

    // Handles the end of a drag event and updates the window's position accordingly
    const handleDragEnd = (event) => {
        const { delta, active } = event;
        const id = active.id;

        setWindowStates((prev) => {
            const current = prev[id];
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

    // Handles changes to the repo URL, closes settings window, and shows alert
    const handleRepoChange = (url) => {
        setRepoUrl(url);
        closeWindow("settings");
        alert('You have set the url to ' + url);
    };

    // Return the states and handlers to be used by components
    return {
        windowStates,
        repoUrl,
        handleRepoChange,
        handleDragEnd,
        bringToFront,
        openWindow,
        closeWindow,
    };
}
