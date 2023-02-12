import "./service.css";
import React from "react";
import { Grid, PagenationService, PaginationScroller } from "../services";
import { Button } from "../components";

document.documentElement.setAttribute("dir", "rtl");

export const Service = () => {
    const service = React.useMemo(() => {
        const _service = new PagenationService({ baseURL: "https://jsonplaceholder.typicode.com", endpoint: "posts", storageKey: "posts" });
        _service.search();
        console.log(_service);
        return _service;
    }, []);

    return (
        <PaginationScroller service={service} useRefresh>
            <Button
                onClick={() => {
                    service.search();
                }}
                label="Search"
            />
            <Grid
                onClick={() => {}}
                service={service}
                ItemBuilder={({ item }: any) => {
                    return (
                        <div className="item-card font-bold text-xl">
                            <h1>
                                <span className="text-orange">item.title</span>
                                <span>{item.title}</span>
                            </h1>
                            <p>item.body {item.body}</p>
                        </div>
                    );
                }}
            />
        </PaginationScroller>
    );
};
