// src/objects/WindowManager.jsx
import React from 'react';
import Menu98 from './Menu98/Menu98.jsx';
import MusicPlayer from './MusicPlayer/MusicPlayer.jsx';
import Settings from "./Settings/Settings.jsx";
import Chatbot from "./Custom/Chatbot/Chatbot.jsx";

export default function WindowManager({ windowStates, repoUrl, handleRepoChange, bringToFront, closeWindow }) {
    return (
        <>
            {windowStates.music.isOpen && (
                <Menu98
                    id="music"
                    title="Music Player"
                    width={750}
                    height={800}
                    onClose={() => closeWindow("music")}
                    onFocus={() => bringToFront("music")}
                    position={windowStates.music}
                    zIndex={windowStates.music.zIndex}
                >
                    <MusicPlayer repoUrl={repoUrl} />
                </Menu98>
            )}

            {windowStates.settings.isOpen && (
                <Menu98
                    id="settings"
                    title="Settings"
                    width={350}
                    height={100}
                    onClose={() => closeWindow("settings")}
                    onFocus={() => bringToFront("settings")}
                    position={windowStates.settings}
                    zIndex={windowStates.settings.zIndex}
                >
                    <Settings onSubmitRepo={handleRepoChange} />
                </Menu98>
            )}

            {windowStates.equalizer.isOpen && (
                <Menu98
                    id="equalizer"
                    title="Equalizer"
                    width={800}
                    height={800}
                    onClose={() => closeWindow("equalizer")}
                    onFocus={() => bringToFront("equalizer")}
                    position={windowStates.equalizer}
                    zIndex={windowStates.equalizer.zIndex}
                >
                    <h2>Work in progress lad</h2>
                </Menu98>
            )}

            {windowStates.assistant.isOpen && (
                <Menu98
                    id="assistant"
                    title="Assistant"
                    width={800}
                    height={800}
                    onClose={() => closeWindow("assistant")}
                    onFocus={() => bringToFront("assistant")}
                    position={windowStates.assistant}
                    zIndex={windowStates.assistant.zIndex}
                >
                    <Chatbot />
                </Menu98>
            )}
        </>
    );
}
