import React, { useState, useEffect } from 'react';
import './BgEdit.css';

const BgEdit = ({ color, setDesktopBgColor }) => {
    const [selectedColor, setSelectedColor] = useState(color);

    // Update selectedColor if prop 'color' changes
    useEffect(() => {
        setSelectedColor(color);
    }, [color]);

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const applyColor = () => {
        setDesktopBgColor(selectedColor);
    };

    return (
        <div className="BgEdit">
            <h2>Background Editor</h2>
            <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
            />
            <button onClick={applyColor}>Apply Color</button>
        </div>
    );
};

export default BgEdit;
