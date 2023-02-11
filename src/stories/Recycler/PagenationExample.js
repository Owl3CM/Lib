import { PagenationService } from "../../services";

export default class PagenationExample extends PagenationService {
    constructor() {
        // const baseURL = "https://falcon.samwise.morabaa.com/api/v1";
        // const endpoint = "companies";
        // const baseURL = "http://localhost:18699/api/v1";

        const baseURL = "https://repsapi.morabaaapps.com/api/v1";
        const headers = { "App-Package": "com.morabaa.reps", Authorization: "VZNjk7Iu9WiuwEP0UBXQpBK33wo5YgAIDAWWMUgkt8MH0psj" };
        const endpoint = "items";

        super({
            baseURL,
            headers,
            onResult: (data) => {
                this.i = this.items.length;
                return data.map((item) => {
                    this.i++;
                    return { ...item, i: this.i };
                });
                // return data.map((item) => ({ ...item, price: item.sellPriceObject.price }));
            },
            endpoint,
            // storageKey: "example-storage",
            useCash: true,
        });
        this.endpoint = endpoint;
        this.id = "example-service";
        this.i = 0;
    }

    getItem = async (id) => {
        return await this.apiService.get(`${this.endpoint}/id`);
    };
    deleteItem = async (id) => {
        return await this.apiService.delete(`${this.endpoint}/id`);
    };
    addItem = async (item) => {
        return await this.apiService.post(this.endpoint, item);
    };
    updateItem = async (item) => {
        return await this.apiService.put(this.endpoint, item);
    };
}
