/// <reference types="react" />
import React from 'react';

type options = {
    activeBackgound: string;
    fontLOL: number;
};
interface ButtonProps {
    label: string;
    onClick?: (text: string) => void;
    options?: options;
    kebl?: number;
}
declare const Button: (props: ButtonProps) => JSX.Element;

interface IRecyclerScroller {
    service: any;
    itemBuilder: any;
    nodeBuilder?: any;
    viewedItems: number;
    gridClass: string;
    containerClass: string;
}
declare class RecyclerList extends React.Component {
    useRecycler: boolean;
    service: any;
    Card: any;
    buildItem: any;
    grid: HTMLElement;
    container: HTMLElement;
    containerClass: string;
    scrollerIndecator: any;
    threshold: number;
    viewedItems: number;
    initItemsToCalculate: number;
    lastItem: number;
    lastScrollTop: number;
    centerOfContainer: number;
    scrollHeight: number;
    colums: number;
    lastPointerY: number;
    updateIndecator: () => void;
    onSwipeIndecator: (e: any) => void;
    constructor({ service, itemBuilder, nodeBuilder, viewedItems, gridClass, containerClass }: IRecyclerScroller);
    componentDidMount(): void;
    render: () => JSX.Element;
    handleCalculations: () => void;
}

interface IApiServiceOptions {
    baseURL: string;
    headers?: any;
    onResponse?: (res: any) => void;
    onError?: (err: any) => void;
    storageKey?: string;
    storage?: any;
}
declare class ApiService {
    storage?: any;
    storageKey?: string;
    getCleanString: any;
    get: (endpoint: string) => Promise<any>;
    delete: (endpoint: string) => Promise<any>;
    post: (endpoint: string, body: any) => Promise<any>;
    put: (endpoint: string, body: any) => Promise<any>;
    patch: (endpoint: string, body: any) => Promise<any>;
    constructor({ baseURL, headers, storageKey, storage, onResponse, onError, }: IApiServiceOptions);
    getStored: any;
    removeStorage: (store_key: string) => any;
    setStorage: (store_key: string, data: any) => any;
    clearStorage: () => void;
    static StatusCodeByMessage: any;
}

interface PagenationServiceProps {
    baseURL: string;
    headers?: any;
    endpoint: string;
    onResult?: any;
    storageKey?: string;
    storage?: any;
    useCash?: boolean;
    limit?: number;
}
type QueryParams = {
    [key: string]: {
        value: any;
        title: string;
    };
};
type QueryParam = {
    id: string;
    value: any;
    title: string;
};
declare class PagenationService extends ApiService {
    #private;
    items: never[];
    setItems: (items: any) => void;
    state: string;
    setState: (state: any) => void;
    offset: number;
    limit: number;
    query: string;
    canFetch: boolean;
    useCash?: boolean | undefined;
    queryParams: QueryParams;
    apiService: ApiService;
    addItem: (item: any) => void;
    updateItem: (query: any) => void;
    onResult: (result: any, service: PagenationService) => any;
    onError: (error: any, service: PagenationService) => void;
    loadMore: () => Promise<void>;
    search: () => Promise<void>;
    reload: () => Promise<void>;
    clearStorage: () => Promise<void>;
    constructor({ baseURL, headers, endpoint, onResult, storageKey, storage, useCash, limit }: PagenationServiceProps);
    initQueryParams: (values: QueryParams) => void;
    setQueryParmas: (values: QueryParams) => void;
    updateQueryParams: (child: QueryParam) => void;
}

export { ApiService, Button, PagenationService, RecyclerList };
