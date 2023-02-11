import  { PagenationServiceJs } from './PagenationServiceJs';

type PagenationServiceProps = {
    baseURL:string,
    headers?:any,
    endpoint:string,
    onResult?:any,
    storageKey?:string,
    storage?:any,
    autoFetch?:boolean,
    useCash?:boolean,
    limit?:number
}
export default class PagenationService extends PagenationServiceJs{
    constructor(props:PagenationServiceProps) {
        super(props);
    }
}
