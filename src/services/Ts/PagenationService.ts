import Utils from "../../Utils";
import ApiService from "./ApiService";

interface PagenationServiceProps {
    baseURL:string,
    headers?:any,
    endpoint:string,
    onResult?:any,
    storageKey?:string,
    storage?:any,
    // autoFetch?:boolean,
    useCash?:boolean,
    limit?:number
}
type PagenationServiceState = "none" | "searching" | "reloading" | "itemsLoading" | "error";
type QueryParams = { [key: string]: { value: any; title: string } };
type QueryParam = { id: string; value: any; title: string };
export default class PagenationService extends ApiService{
    items = [];
    setItems = (items:any) => {};
    state = "none";
    setState = (state:any) => {};
    
    offset = 0;
    limit = 25;
    query = "";
    canFetch = false;
    // autoFetch? = false;
    useCash? = false;
    queryParams:QueryParams = {};
    
    apiService:ApiService;
    addItem = (item:any) => {};
    updateItem = (query:any) => {};
    onResult = (result:any, service:PagenationService)  => {return result};
    onError = (error:any, service:PagenationService) => {};
    
    loadMore = async () => {};
    search = async () => {};
    reload = async () => {};
    
    clearStorage = async () => {
        this.apiService.clearStorage();
        this.setItems([]);
    };
    
    
    #_init = false;
    
    constructor({ baseURL, headers, endpoint, onResult, storageKey, storage,  useCash, limit = 25 }: PagenationServiceProps) {
        super({ baseURL, headers, storageKey, storage });
        this.apiService = new ApiService({baseURL,headers,storageKey,storage,});
        this.useCash = useCash;
        // this.autoFetch = autoFetch;
        this.onResult = onResult;
        this.limit = limit;

        this.search = async () => {
            this.canFetch = false;
            this.offset = 0;
            if (!this.queryParams.limit && this.limit) this.queryParams.limit = { value: this.limit, title: "_" };

            this.query = Utils.generateQuery(this.queryParams, endpoint);

            if (this.useCash) {
                let cashItems = this.apiService.getStored(this.query);
                if (cashItems) {
                    if (!this.#_init) {
                        this.#_init = true;
                        this.items = cashItems;
                    } else this.setItems(cashItems);
                    this.offset = cashItems.length;
                    this.setState("none");
                    setTimeout(() => {
                        this.canFetch = true;
                    }, 10);
                    return;
                }
            }
            this.state = "searching";
            this.setState("searching");
            try {
                const result = await this.apiService.get(this.query);
                this.#onResult(result, this);
            } catch (error) {
                this.#onError(error, this);
            }
        };

        this.reload = async () => {
            this.canFetch = false;
            this.offset = 0;
            this.query = Utils.generateQuery(this.queryParams, endpoint);
            this.setState("reloading");
            try {
                const result = await this.apiService.get(this.query);
                this.clearStorage();
                this.#onResult(result, this);
            } catch (error) {
                this.#onError(error, this);
            }
        };

        this.loadMore = async () => {
            this.canFetch = false;
            let query = this.query + `&offset=${this.offset}`;
            this.setState("itemsLoading");
            try {
                const result = await this.apiService.get(query);
                this.#onResult(result, this);
            } catch (error) {
                this.#onError(error, this);
            }
        };
    }

    initQueryParams = (values:QueryParams) => {
        this.queryParams = values;
        this.search();
    };
    setQueryParmas = (values:QueryParams) => {
        this.queryParams = values;
        this.search();
    };
    updateQueryParams = (child:QueryParam) => {
        if (Utils.hasValue(child.value)) this.queryParams[child.id] = { value: child.value, title: child.title || "_" };
        else delete this.queryParams[child.id];
        this.search();
    };

    #onError = (error:any, service:PagenationService) => {
        console.log(error);
        service.onError(error,service);
        if (error.stack) error = { message: error.message, stack: error.stack };
        service.setState({ state: "error", error });
    };

    #onResult = async (data:any, service:PagenationService) => {
        if (service.onResult) {
            let modfied = await service.onResult(data, service);
            if (modfied) data = modfied;
        }
        let items:any = [];
        let _data:any= {};
        if (!Array.isArray(data)) {
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) items = value;
                else _data[key] = value;
            });
        } else items = data || [];

        if (service.useCash) {
            const apiService = service.apiService;
            if (service.offset === 0) {
                let allCashQueries = apiService.getStored("") || [];
                if (!allCashQueries.includes(service.query)) {
                    allCashQueries.push(service.query);
                    apiService.setStorage("", allCashQueries);
                }
                apiService.setStorage(service.query, items);
            } else {
                let oldItems = apiService.getStored(service.query) || [];
                apiService.setStorage(service.query, [...oldItems, ...items]);
            }
        }

        if (service.offset === 0) service.setItems(items);
        else service.setItems((_prev:any) => [..._prev, ...items]);

        service.offset += items.length;

        setTimeout(() => {
            service.canFetch = !!(service.limit && items.length >= service.limit) ;
        }, 100);

        // if (service.autoFetch) {
        //     const scroller = document.getElementById(service.scrollerId);
        //     console.log(service.scrollerId, scroller);
        //     setTimeout(() => {
        //         scroller && scroller.scrollTo({ top: scroller.scrollHeight, left: 0, behavior: "auto" });
        //     }, 100);
        // } else 
        service.setState(service.items.length > 0 || items.length > 0 ? "none" : "noData");
    };
}

