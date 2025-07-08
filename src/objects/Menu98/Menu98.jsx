import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import './Menu98.css';
import minimizeicon from "./img/minimizeicon.png";
import maximizeicon from "./img/maximizeicon.png";
import closeicon from "./img/closeicon.png";

const Menu98 = ({ id, title, width, height, children, onClose, position, zIndex, onFocus }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({ id });

    // Calculate the raw new position based on current position + drag transform
    const rawX = position.x + (transform?.x ?? 0);
    const rawY = position.y + (transform?.y ?? 0);

    // Clamp so the window can't be dragged outside the viewport (visible area)
    const clampedX = Math.min(
        Math.max(rawX, 0),
        window.innerWidth - width
    );

    const clampedY = Math.min(
        Math.max(rawY, 0),
        window.innerHeight - height
    );

    const style = {
        width,
        height,
        zIndex,
        transform: `translate3d(${clampedX}px, ${clampedY}px, 0)`
    };

    return (
        <div
            ref={setNodeRef}
            className="Menu98"
            style={style}
            onMouseDown={onFocus}
        >
            <div className="titlebar" {...listeners} {...attributes}>
                <p>{title}</p>
                <div className="buttonContainer">
                    <button
                        className="button"
                        style={{ backgroundImage: `url(${minimizeicon})` }}
                        onClick={() => console.log("Minimize clicked")}
                        onPointerDown={(e) => e.stopPropagation()}  // Prevent drag start
                    />
                    <button
                        className="button"
                        style={{ backgroundImage: `url(${maximizeicon})` }}
                        onClick={() => console.log("Maximize clicked")}
                        onPointerDown={(e) => e.stopPropagation()}  // Prevent drag start
                    />
                    <button
                        className="button"
                        style={{ backgroundImage: `url(${closeicon})` }}
                        onClick={() => {
                            console.log("Close clicked");
                            onClose();
                        }}
                        onPointerDown={(e) => e.stopPropagation()}  // Prevent drag start
                    />
                </div>
            </div>
            <Body>{children}</Body>
        </div>
    );
};

const Body = ({ children }) => {
    return <div className="Body">{children}</div>;
};

export default Menu98;
