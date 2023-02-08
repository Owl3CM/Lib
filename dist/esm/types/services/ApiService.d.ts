interface IApiServiceOptions {
    baseURL: string;
    headers?: any;
    onResponse?: (res: any) => void;
    onError?: (err: any) => void;
    storageKey?: string;
    storage?: any;
}
export default class ApiService {
    storage?: any;
    storageKey?: string;
    getCleanString: any;
    get: (endpoint: string) => Promise<any>;
    post: (endpoint: string, body: any) => Promise<any>;
    put: (endpoint: string, body: any) => Promise<any>;
    delete: (endpoint: string) => Promise<any>;
    patch: (endpoint: string, body: any) => Promise<any>;
    constructor({ baseURL, headers, storageKey, storage, onResponse, onError, }: IApiServiceOptions);
    getStored: any;
    removeStorage: (store_key: string) => any;
    setStorage: (store_key: string, data: any) => any;
    clearStorage: () => void;
    static StatusCodeByMessage: any;
}
export {};
