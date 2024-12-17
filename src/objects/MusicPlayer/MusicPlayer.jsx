import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import SongInfo from "./SongInfo.jsx";
import ControlButtons from "./ControlButtons.jsx";
import Slider from "./Slider.jsx";
import odb from "./music/odb.mp3";
import defaultcover from "./img/defaultalbumcover.png";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [songList, setSongList] = useState([
        { name: "Song 1", artist: "Artist 1", src: "song1.mp3" },
        { name: "Fuck with Dre Day", artist: "Dr Dre", src: "odb.mp3" },
        { name: "Song 3", artist: "Artist 3", src: "song3.mp3" }
    ]);
    const [currentIndex, setCurrentIndex] = useState(1); // Start with the second song (index 1)
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
        const response = await fetch('https://api.github.com/repos/amberleafhash/toonStorage/contents/');
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
    }, []);

    return (
        <div className="MusicPlayer">
            <SongInfo songName={currentSong.name} songArtist={currentSong.artist} albumCover="defaultAlbumCover.png" />
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
            <audio ref={audioRef} src={currentSong.src} />
        </div>
    );
};

export default MusicPlayer;
