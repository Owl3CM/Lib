import React from "react";
import JsonParser from "./JsonParser";
const JsonBuilder = ({ item, containerClass, onClick, setItem }) => (
    <div
        id={item.id}
        ref={(ref) => {
            if (!ref || ref.innerHTML) return;
            const _setItem = (item) => {
                ref.innerHTML = "";
                ref.append(JsonParser(item, _setItem, containerClass, onClick));
            };
            _setItem(item);
        }}
    />
);

export default JsonBuilder;
