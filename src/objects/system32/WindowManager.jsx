import React from 'react';
import Menu98 from '../Menu98/Menu98.jsx';
import MusicPlayer from '../MusicPlayer/MusicPlayer.jsx';
import Settings from "../Settings/Settings.jsx";
import Chatbot from "../Custom/Chatbot/Chatbot.jsx";
import CMD from "../CMD/CMD.jsx";
import BgEdit from "../system32/BgEdit.jsx";
import Calculator from '../system32/Calculator.jsx';
import Notepad from "../system32/Notepad.jsx";
import NewUserMenu from "../system32/NewUserMenu.jsx";

export default function WindowManager({
                                          windowStates,
                                          repoUrl,
                                          handleRepoChange,
                                          bringToFront,
                                          closeWindow,
                                          setDesktopBgColor,
                                          openBgEdit,
                                          openCalculator,
                                          openNewUserMenu,
                                          setActiveUser,
                                          activeUser,
                                          onUserUpdate,  // <-- Added prop here
                                      }) {
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
                    width={400}
                    height={500}
                    onClose={() => closeWindow("settings")}
                    onFocus={() => bringToFront("settings")}
                    position={windowStates.settings}
                    zIndex={windowStates.settings.zIndex}
                >
                    {/* Pass activeUser data AND onUserUpdate callback to Settings */}
                    <Settings
                        onSubmitRepo={handleRepoChange}
                        username={activeUser?.username}
                        profilePic={activeUser?.profile_pic || activeUser?.profilePic} // support both keys if any
                        userId={activeUser?.id}  // pass user ID as well
                        onUserUpdate={onUserUpdate} // notify App.jsx about changes
                    />
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

            {windowStates.cmd.isOpen && (
                <Menu98
                    id="cmd"
                    title="CMD"
                    width={800}
                    height={500}
                    onClose={() => closeWindow("cmd")}
                    onFocus={() => bringToFront("cmd")}
                    position={windowStates.cmd}
                    zIndex={windowStates.cmd.zIndex}
                >
                    <CMD openBgEdit={openBgEdit} openCalculator={openCalculator} openNewUserMenu={openNewUserMenu}/>
                </Menu98>
            )}

            {windowStates.bgedit.isOpen && (
                <Menu98
                    id="bgedit"
                    title="Background Editor"
                    width={800}
                    height={800}
                    onClose={() => closeWindow("bgedit")}
                    onFocus={() => bringToFront("bgedit")}
                    position={windowStates.bgedit}
                    zIndex={windowStates.bgedit.zIndex}
                >
                    <BgEdit setDesktopBgColor={setDesktopBgColor} />
                </Menu98>
            )}

            {windowStates.calculator.isOpen && (
                <Menu98
                    id="calculator"
                    title="Calculator"
                    width={300}
                    height={500}
                    onClose={() => closeWindow("calculator")}
                    onFocus={() => bringToFront("calculator")}
                    position={windowStates.calculator}
                    zIndex={windowStates.calculator.zIndex}
                >
                    <Calculator />
                </Menu98>
            )}

            {windowStates.notepad.isOpen && (
                <Menu98
                    id="notepad"
                    title="Notepad"
                    width={800}
                    height={500}
                    onClose={() => closeWindow("notepad")}
                    onFocus={() => bringToFront("notepad")}
                    position={windowStates.notepad}
                    zIndex={windowStates.notepad.zIndex}
                >
                    <Notepad />
                </Menu98>
            )}

            {windowStates.newusermenu.isOpen && (
                <Menu98
                    id="newusermenu"
                    title="New User Setup"
                    width={600}
                    height={500}
                    onClose={() => closeWindow("newusermenu")}
                    onFocus={() => bringToFront("newusermenu")}
                    position={windowStates.newusermenu}
                    zIndex={windowStates.newusermenu.zIndex}
                >
                    <NewUserMenu
                        setActiveUser={setActiveUser}
                        closeWindow={() => closeWindow("newusermenu")}
                    />
                </Menu98>
            )}
        </>
    );
}
