import React from "react";
const RecyclerListJs  = require('./RecyclerListJs').default;

interface IRecyclerScroller {
    service: any;
    itemBuilder: any;
    nodeBuilder?: any;
    viewedItems: number;
    gridClass: string;
    containerClass: string;
}

const RecyclerList:React.FC<IRecyclerScroller> = (props: IRecyclerScroller) => <RecyclerListJs {...props} />
export default RecyclerList;