import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import SongInfo from "./SongInfo.jsx";
import ControlButtons from "./ControlButtons.jsx";
import Slider from "./Slider.jsx";
import defaultcover from "./img/defaultalbumcover.png";
import musicMetadata from 'music-metadata-browser'; // Import the music-metadata library

const MusicPlayer = ({ repoUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [songList, setSongList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [songMetadata, setSongMetadata] = useState(null); // Store song metadata
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
        const response = await fetch(repoUrl);
        const data = await response.json();

        const songs = data
            .filter(file => file.name.endsWith('.mp3'))
            .map(file => ({
                name: file.name.replace('.mp3', ''),  // Remove the '.mp3' extension to use as the title
                artist: 'Unknown Artist',
                src: file.download_url
            }));

        setSongList(songs);
    };

    const fetchMetadata = async (url, songName) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const metadata = await musicMetadata.parseBlob(blob);
            const { common, picture } = metadata;

            setSongMetadata({
                title: common.title || songName,  // Fallback to songName if no title is found
                artist: common.artist || 'Unknown Artist',
                albumCover: picture ? `data:${picture.format};base64,${picture.data.toString('base64')}` : defaultcover,
            });
        } catch (error) {
            console.error('Error fetching metadata:', error);
            setSongMetadata({
                title: songName, // Use songName as the fallback title if metadata fetch fails
                artist: 'Unknown Artist',
                albumCover: defaultcover,
            });
        }
    };

    const playNextSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % songList.length);
        setIsPlaying(true);
    };

    const playPreviousSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + songList.length) % songList.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", updateSliderValue);
        fetchSongs();

        return () => {
            audio.removeEventListener("timeupdate", updateSliderValue);
        };
    }, [repoUrl]);

    useEffect(() => {
        if (songList.length > 0) {
            const audio = audioRef.current;
            audio.src = currentSong.src; // Set the audio source
            fetchMetadata(currentSong.src, currentSong.name); // Fetch metadata for the new song
            if (isPlaying) {
                audio.play(); // Play the new song
            }
        }
    }, [currentIndex, songList]);

    return (
        <div className="MusicPlayer">
            <SongInfo
                songName={songMetadata?.title}
                songArtist={songMetadata?.artist}
                albumCover={songMetadata?.albumCover}
            />
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
