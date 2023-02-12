import React from "react";

const Progressing = ({ service }) => {
    return (
        <div className="absolute justify-center inset-0 col-center z-50 bg-popup">
            <div className="relative">
                <div className="lds-ripple">
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
};

export default Progressing;
