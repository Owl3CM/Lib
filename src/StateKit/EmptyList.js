import React from "react";

const EmptyList = ({ service }) => {
    return (
        <div className="flex col-span-full flex-col items-center justify-center m-auto">
            <p className="text-white text-center animate-bounce rounded-full font-bold bg-crow text-prim" style={{ padding: "0px 25px", opacity: 0.3 }}>
                No Data!
            </p>
        </div>
    );
};

export default React.memo(EmptyList);
