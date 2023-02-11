import {ApiServiceJs} from "./ApiServiceJs";

type IApiServiceOptions = {
    baseURL: string;
    headers?: any;
    onResponse?: (res: any) => void;
    onError?: (err: any) => void;
    storageKey?: string;
    storage?:any ;
}

export default class ApiService extends ApiServiceJs {
    constructor(options: IApiServiceOptions) {
        super(options);
    }
}

