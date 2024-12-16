import React from "react";

const SongInfo = ({ songName, songArtist, albumCover }) => {
    const albumCoverStyle = { backgroundImage: `url(${albumCover})` };

    return (
        <div className="songInfo">
            <div className="albumCover" style={albumCoverStyle}></div>
            <div className="infobar"><p>{songName}</p></div>
            <div className="infobar"><p>{songArtist}</p></div>
        </div>
    );
};

export default SongInfo;
