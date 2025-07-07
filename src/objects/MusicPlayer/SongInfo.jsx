import React from "react";
import "./song-info.css"; // Ensure styles are applied correctly

const SongInfo = ({ songName, songArtist, albumCover }) => {
    return (
        <div className="song-info">
            <div className="album-info">
                <img src={albumCover} alt="Album cover" className="album-cover" />
                <div className="song-details">
                    <h2 className="song-name">{songName}</h2>
                    <h3 className="song-artist">{songArtist}</h3>
                </div>
            </div>
        </div>
    );
};

export default SongInfo;
