import React from "react";
export { default as Button } from "./Button";

const RecyclerListJs = require("./RecyclerList/RecyclerScroller.js").default;

export const RecyclerList =(props:{service: any;itemBuilder: any;nodeBuilder?: any;viewedItems: number;gridClass: string;containerClass: string;})=> <RecyclerListJs {...props} />
