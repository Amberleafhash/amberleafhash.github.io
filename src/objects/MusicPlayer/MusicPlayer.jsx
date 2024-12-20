import React, { useState, useEffect } from "react";
import "./MusicPlayer.css";
import musicObject from "./musicObject.jsx";
import SongInfo from "./SongInfo.jsx";
import ControlButtons from "./ControlButtons.jsx";
import Slider from "./Slider.jsx";
import defaultcover from "./img/defaultalbumcover.png";

const MusicPlayer = ({ repoUrl }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    musicObject.songName = "Fuck with Dre Day"
    musicObject.artistName = "Dr Dre"
    musicObject.albumCover = defaultcover

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    const playNextSong = () => {
        console.log(musicObject);
    };


    const playPreviousSong = () => {

    };


    return (
        <div className="MusicPlayer">
            <SongInfo
                songName={musicObject.songName}
                songArtist={musicObject.artistName}
                albumCover={musicObject.albumCover}
            />
            <ControlButtons
                playNextSong={playNextSong}
                playPreviousSong={playPreviousSong}
            />
            <Slider
                sliderValue={sliderValue}
                currentTime={currentTime}
                handleSliderChange={handleSliderChange}
            />
        </div>
    );
};

export default MusicPlayer;
