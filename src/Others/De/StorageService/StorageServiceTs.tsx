import  StorageServiceJs from '../../../services/CashService';

type PagenationServiceProps = {
    baseURL:string,
    headers:any,
    onResult:any,
    storageKey:string,
    storage:any,
}

export default class PagenationService extends StorageServiceJs{
    constructor(props:PagenationServiceProps) {
        super(props);
    }
}
