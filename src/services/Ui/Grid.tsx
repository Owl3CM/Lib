import React from "react";
// import { JsonBuilder } from "../../NodeBuilder";

interface GridProps {
    service: any;
    ItemBuilder?: any;
    className?: string;
    onClick?: any;
}

const Grid : React.FC<GridProps> = ({ service, ItemBuilder , className = "grid", onClick }:GridProps) => {
    [service.items, service.setItems] = React.useState(service.items);
    service.setItem = React.useMemo(() => (item?:any) => service.setItems((items?:any) => items.map((i:any) => (i.id === item.id ? item : i))), []);
    return (
        <div id="grid-container" className={className} onClick={onClick}>
            {service.items.map((item: any, i: number) => (
                <ItemBuilder key={i} item={item} />
            ))}
        </div>
    );
};

export default Grid;

// import React from "react";
// import { JsonToView } from "../../NodeBuilder";

// type GridProps = {
//     service: any;
//     ItemBuilder?: any;
//     className?: string;
//     onClick?: any;
// }

// const Grid = ({ service, ItemBuilder = ({ item }:any) => JsonToView({ json: item }), className = "grid", onClick }: GridProps) => {
//     [service.items, service.setItems] = React.useState(service.items);
//     service.setItem = React.useMemo(() => (item:any) => service.setItems((items:any) => items.map((i:any) => (i.id === item.id ? item : i))), []);
//     return (
//         <div id="grid-container" className={className} onClick={onClick}>
//             {/* {service.items.map((item:any, i:any) => (
//                 <ItemBuilder key={i} item={item} />
//             ))} */}
//         </div>
//     );
// };

// export default React.memo(Grid);









// import React from "react";
// import { JsonToView } from "../NodeBuilder";

// const Grid = ({ service, ItemBuilder = ({ item }) => JsonToView({ json: item }), className = "grid", onClick }) => {
//     [service.items, service.setItems] = React.useState(service.items);
//     service.setItem = React.useMemo(() => (item) => service.setItems((items) => items.map((i) => (i.id === item.id ? item : i))), []);
//     return (
//         <div id="grid-container" className={className} onClick={onClick}>
//             {service.items.map((item, i) => (
//                 <ItemBuilder key={i} item={item} />
//             ))}
//         </div>
//     );
// };
// export default React.memo(Grid);