import "./Menu98.css";
import React from 'react';
import minimizeicon from "./img/minimizeicon.png";
import maximizeicon from "./img/maximizeicon.png";
import closeicon from "./img/closeicon.png";

const Menu98 = ({ title, width, height, children, onClose }) => {
    return (
        <div className="Menu98" style={{ width: width, height: height }}>
            <div className="titlebar">
                <p>{title}</p>
                <div className="buttonContainer">
                    <div
                        className="button"
                        style={{ backgroundImage: `url(${minimizeicon})` }}
                    ></div>
                    <div
                        className="button"
                        style={{ backgroundImage: `url(${maximizeicon})` }}
                    ></div>
                    <div
                        className="button"
                        style={{ backgroundImage: `url(${closeicon})` }}
                        onClick={onClose} // Call the parent's onClose function
                    ></div>
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
