import React from "react";

const Loading = ({ provider }) => {
    return (
        <div className="absolute z-50" style={{ top: "50%", left: "50%" }}>
            <div className="relative">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
