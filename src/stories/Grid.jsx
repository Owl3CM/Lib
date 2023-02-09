import React from "react";


const Grid = ({ service } ) => {
    [service.items, service.setItems] = React.useState(service.items);
    return (
        <div>
            {service.items.map((item, index) => {
                return <div key={index}>{item.name}</div>;
            })}
        </div>
    );
};

export default Grid;
