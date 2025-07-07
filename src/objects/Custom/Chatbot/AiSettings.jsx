import tickimg from "./icons/tick.png"
import React from "react";

const AiSettings = () => {
    return (
        <div className="AiSettings">

            <div className="inputContainer">
                <input placeholder="Server IP"></input>
                <div className="ipSubmitButton"><img src={tickimg} alt=""/></div>
            </div>
        </div>
    )
}

export default AiSettings;