// src/hooks/useWindowManager.js
import { useState } from 'react';

export default function useWindowManager(initialRepoUrl) {
    const [topZIndex, setTopZIndex] = useState(5);
    const [repoUrl, setRepoUrl] = useState(initialRepoUrl);

    const [windowStates, setWindowStates] = useState({
        music: { x: 100, y: 100, zIndex: 1, isOpen: false },
        settings: { x: 120, y: 120, zIndex: 2, isOpen: false },
        equalizer: { x: 140, y: 140, zIndex: 3, isOpen: false },
        assistant: { x: 160, y: 160, zIndex: 4, isOpen: false },
    });

    const openWindow = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: true,
                zIndex: topZIndex,
            },
        }));
        setTopZIndex(prev => prev + 1);
    };

    const closeWindow = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: false,
            },
        }));
    };

    const bringToFront = (id) => {
        setWindowStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                zIndex: topZIndex,
            },
        }));
        setTopZIndex(prev => prev + 1);
    };

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

    const handleRepoChange = (url) => {
        setRepoUrl(url);
        closeWindow("settings");
        alert('You have set the url to ' + url);
    };

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
