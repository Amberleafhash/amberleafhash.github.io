import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import SongInfo from "./SongInfo.jsx";
import ControlButtons from "./ControlButtons.jsx";
import Slider from "./Slider.jsx";
import defaultcover from "./img/defaultalbumcover.png";

const MusicPlayer = ({ repoUrl }) => { // Receive repoUrl as a prop
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [songList, setSongList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Default to first song
    const audioRef = useRef(null);

    const currentSong = songList[currentIndex];

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

    const fetchSongs = async () => {
        const response = await fetch(repoUrl); // Use the dynamic repoUrl
        const data = await response.json();

        const songs = data
            .filter(file => file.name.endsWith('.mp3')) // Filter for MP3 files
            .map(file => ({
                name: file.name.replace('.mp3', ''), // Remove the .mp3 extension for the song name
                artist: 'Unknown Artist', // You can modify this to include artist info if available
                src: file.download_url // Use the download URL provided by GitHub
            }));

        setSongList(songs);
    };

    const playNextSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % songList.length); // Loop to first song if at the end
        setIsPlaying(true);
    };

    const playPreviousSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + songList.length) % songList.length); // Loop to last song if at the start
        setIsPlaying(true);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", updateSliderValue);
        fetchSongs();

        return () => {
            audio.removeEventListener("timeupdate", updateSliderValue);
        };
    }, [repoUrl]); // Fetch songs again when repoUrl changes

    useEffect(() => {
        if (songList.length > 0) {
            const audio = audioRef.current;
            audio.src = currentSong.src; // Update the audio source
            if (isPlaying) {
                audio.play(); // Play the new song if it was already playing
            }
        }
    }, [currentIndex, songList]);

    return (
        <div className="MusicPlayer">
            <SongInfo songName={currentSong?.name} songArtist={currentSong?.artist} albumCover={defaultcover} />
            <ControlButtons
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                playNextSong={playNextSong}
                playPreviousSong={playPreviousSong}
            />
            <Slider
                sliderValue={sliderValue}
                currentTime={currentTime}
                handleSliderChange={handleSliderChange}
            />
            <audio ref={audioRef} />
        </div>
    );
};

export default MusicPlayer;
