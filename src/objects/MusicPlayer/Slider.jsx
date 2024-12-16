import React from "react";
import { formatTime } from "./utils.jsx";

const Slider = ({ sliderValue, currentTime, handleSliderChange }) => {
    return (
        <div className="audioSlider">
            <p>{formatTime(currentTime)}</p>
            <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                className="slider"
                onChange={(e) => handleSliderChange(e.target.value)}
            />
        </div>
    );
};

export default Slider;
