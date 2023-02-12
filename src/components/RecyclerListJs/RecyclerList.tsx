import React from "react";
import { RecyclerListJs } from "./RecyclerListJs";

type IRecyclerScroller ={
    service: any;
    itemBuilder: any;
    nodeBuilder?: any;
    viewedItems: number;
    gridClass: string;
    containerClass: string;
}

const RecyclerListTs:React.FC<IRecyclerScroller> = (props: IRecyclerScroller) => <RecyclerListJs {...props} />
export default RecyclerListTs;