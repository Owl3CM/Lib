import React, { Fragment } from "react";
import ItemsLoading from "./ItemsLoading";
import Loading from "./Loading";
import Error from "./Error";
import Progressing from "./Progressing";
import Searching from "./Searching";
import EmptyList from "./EmptyList";

const PageStateKit = {
    loading: Loading,
    itemsLoading: ItemsLoading,
    progressing: Progressing,
    error: Error,
    searching: Searching,
    noData: EmptyList,
    none: () => <Fragment />,
};

export default PageStateKit;
