import React from "react";
import playButton from "./img/playbutton.png";
import pauseButton from "./img/pausebutton.png";
import forwardButton from "./img/forwardbutton.png";
import rewindButton from "./img/rewindbutton.png";

const ControlButtons = ({ isPlaying, togglePlayPause }) => {
    const pauseButtonStyle = { backgroundImage: `url(${pauseButton})` };
    const playButtonStyle = { backgroundImage: `url(${playButton})` };
    const forwardButtonStyle = { backgroundImage: `url(${forwardButton})` };
    const rewindButtonStyle = { backgroundImage: `url(${rewindButton})` };

    return (
        <div className="buttonContainer">
            <div className="Button" style={rewindButtonStyle}></div>
            <div
                className="Button"
                onClick={togglePlayPause}
                style={isPlaying ? pauseButtonStyle : playButtonStyle}
            ></div>
            <div className="Button" style={forwardButtonStyle}></div>
        </div>
    );
};

export default ControlButtons;
