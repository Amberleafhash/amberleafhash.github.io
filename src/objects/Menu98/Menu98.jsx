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

    const style = {
        width,
        height,
        zIndex,
        transform: transform
            ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
            : `translate3d(${position.x}px, ${position.y}px, 0)`
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
                    />
                    <button
                        className="button"
                        style={{ backgroundImage: `url(${maximizeicon})` }}
                        onClick={() => console.log("Maximize clicked")}
                    />
                    <button
                        className="button"
                        style={{ backgroundImage: `url(${closeicon})` }}
                        onClick={() => {
                            console.log("Close clicked");
                            onClose();
                        }}
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
