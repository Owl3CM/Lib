import React from "react";
import SearchingIcon from "./SearchingIcon";

const ItemsLoading = ({ service }) => {
    return (
        <div className="p-10 fixed left-0 right-0" style={{ bottom: 60 }}>
            <SearchingIcon />
        </div>
    );
};

export default ItemsLoading;
