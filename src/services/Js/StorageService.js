import ApiService from "./ApiService";

export default class StorageService {
    static local = ({ baseURL, headers, onResult, storageKey }) => new StorageService({ baseURL, headers, onResult, storageKey, storageType: "local" });
    static session = ({ baseURL, headers, onResult, storageKey }) => new StorageService({ baseURL, headers, onResult, storageKey, storageType: "local" });

    constructor({ baseURL, headers, onResult, storageKey, storageType = "local" }) {
        this.api = new ApiService({ baseURL, headers, onResult, storageKey, storageType });
        this.storage = window[storageType + "Storage"];
        this.storageKey = storageKey;

        this.get = async (endpoint, body) => {
            const res = this.api.getStored(endpoint);
            if (!res) {
                const res = await this.api.get(endpoint, body);
                this.api.setStorage(endpoint, res);
            }
            return res;
        };
        this.post = async (endpoint, body) => {
            this.api
                .post(endpoint, body)
                .then((result) => {
                    alert("done");
                    console.log("done");
                    return result;
                })
                .catch((err) => {
                    console.log({ err });
                    if (err.message === "Network Error") this.api.setStorage(`post-${endpoint}`, body);
                    throw err;
                });
        };
        this.put = async (endpoint, body) => {
            this.api
                .put(endpoint, body)
                .then((result) => {
                    alert("done");
                    console.log("done");
                    return result;
                })
                .catch((err) => {
                    console.log({ err });
                    if (err.message === "Network Error") this.api.setStorage(`put-${endpoint}`, body);
                    throw err;
                });
        };
        this.delete = async (endpoint, body) => {
            this.api
                .delete(endpoint, body)
                .then((result) => {
                    alert("done");
                    console.log("done");
                    return result;
                })
                .catch((err) => {
                    console.log({ err });
                    if (err.message === "Network Error") this.api.setStorage(`delete-${endpoint}`, body);
                    throw err;
                });
        };
    }
    #onError = (err) => {
        console.log({ ERR: err });
        // Logger(err);
        if (err.message === "Network Error" || err.message === "Failed to fetch") {
            // Toast({ title: "NoInternetConnection", type: "error", timeout: 10000 });
            return err;
        }

        let response = err.response;
        if (response?.status !== 404) {
            if (err.config?.url?.includes("login")) {
                // Toast({ title: "RongPasswordOrPhoneNumber", type: "error" });
            } else {
                // let details = response?.data?.details || ErrorTitles.Error;
                // let errText = ErrorTitles[details] || details;
                // Toast({ title: "Error", content: response?.data?.details, type: "error" });
            }
        } else if (response.status === 401) {
            localStorage.removeItem("token");
        }
        return err;
    };
}
