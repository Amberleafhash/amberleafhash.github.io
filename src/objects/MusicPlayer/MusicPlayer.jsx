import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import SongInfo from "./SongInfo.jsx";
import ControlButtons from "./ControlButtons.jsx";
import Slider from "./Slider.jsx";
import odb from "./music/odb.mp3"
import defaultcover from "./img/defaultalbumcover.png"

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const songName = "Fuck with Dre Day";
    const songArtist = "Dr Dre";

    // The URL of the audio file hosted on a server (replace with your own)
    const currentSong = "192.168.178.159:22/music/odb.mp3";  // Example hosted file URL

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (value) => {
        setSliderValue(value);
        audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    };

    const updateSliderValue = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;
            setSliderValue((currentTime / duration) * 100);
            setCurrentTime(currentTime);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", updateSliderValue);

        return () => {
            audio.removeEventListener("timeupdate", updateSliderValue);
        };
    }, []);

    return (
        <div className="MusicPlayer">
            <SongInfo songName={songName} songArtist={songArtist} albumCover="defaultAlbumCover.png" />
            <ControlButtons isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
            <Slider
                sliderValue={sliderValue}
                currentTime={currentTime}
                handleSliderChange={handleSliderChange}
            />
            <audio ref={audioRef} src={currentSong} />
        </div>
    );
};

export default MusicPlayer;
