export default class ApiServiceJSX {
    constructor({ baseURL, headers, onResponse, onError, storageKey, storageType = "session" }) {
        this.storageKey = storageKey;
        if (storageKey) {
            this.storage = window[storageType + "Storage"];
            this.getCleanString = (text = "") => storageKey + text.replace(/[?&=/!]/g, "-");
        }

        const create = async (method) => {
            this[method] = (endpoint, body) => {
                const abortId = `${method}-${endpoint.includes("?") ? endpoint.split("?")[0] : endpoint}`;
                if (this[abortId]) {
                    console.warn("A B O R T E D \nhttps: " + baseURL.slice(6) + endpoint.split("?")[0] + "\n?" + endpoint.split("?")[1]);
                    this[abortId].abort();
                }
                this[abortId] = new AbortController();
                let _url = !endpoint || endpoint.startsWith("/") ? `${baseURL}${endpoint}` : `${baseURL}/${endpoint}`;
                let props = { "Content-Type": "application/json", signal: this[abortId].signal, method, headers }; // mode: "no-cors",
                if (body) props.body = JSON.stringify(body);
                return new Promise(async (resolve, reject) => {
                    try {
                        const res = await fetch(_url, props);
                    this[abortId] = null;
                        if (res.ok) {
                            let jsonRes = await res?.json();
                            onResponse && onResponse(jsonRes);
                            resolve(jsonRes);
                        } else {
                            let { bodyUsed, redirected, status, statusText, type } = res;
                            reject({
                                bodyUsed,
                                ...props,
                                redirected,
                                status,
                                statusText,
                                type,
                                url: _url,
                                statusMessage: ApiServiceJSX.StatusCodeByMessage[status] || "Unknown Error",
                            });
                        }
                    } catch (err) {
                        if (err.name === "AbortError") return;
                        onError && onError(err);
                        throw err;
                    }
                });
            };
        };
        this.get=async(endpoint)=>await create("get",this).then(()=>this.get(endpoint))
        this.post=async(endpoint,body)=>await create("post",this).then(()=>this.post(endpoint,body))
        this.put=async(endpoint,body)=>await create("put",this).then(()=>this.put(endpoint,body))
        this.delete=async(endpoint)=>await create("delete",this).then(()=>this.delete(endpoint))
        this.patch=async(endpoint,body)=>await create("patch",this).then(()=>this.patch(endpoint,body))
    }

    getStored = (store_key) => JSON.parse(this.storage.getItem(this.getCleanString(store_key)));
    removeStorage = (store_key) => this.storage.removeItem(this.getCleanString(store_key));
    setStorage = (store_key, data) =>
        Object.values(data).length > 0 ? this.storage.setItem(this.getCleanString(store_key), JSON.stringify(data)) : this.removeStorage(store_key);

    clearStorage = () => {
        for (let i = 0; i < this.storage.length; i++) {
            let key = this.storage.key(i);
            if (key.startsWith(this.storageKey)) this.storage.removeItem(key);
        }
    };

    static StatusCodeByMessage = {
        0: "There Is No Response From Server Body Is Empty Connection May Be Very Slow",

        100: " Continue ",
        101: " Switching protocols ",
        102: " Processing ",
        103: " Early Hints ",

        //2xx Succesful
        200: " OK ",
        201: " Created ",
        202: " Accepted ",
        203: " Non-Authoritative Information ",
        204: " No Content ",
        205: " Reset Content ",
        206: " Partial Content ",
        207: " Multi-Status ",
        208: " Already Reported ",
        226: " IM Used ",

        //3xx Redirection
        300: " Multiple Choices ",
        301: " Moved Permanently ",
        302: " Found (Previously 'Moved Temporarily') ",
        303: " See Other ",
        304: " Not Modified ",
        305: " Use Proxy ",
        306: " Switch Proxy ",
        307: " Temporary Redirect ",
        308: " Permanent Redirect ",

        //4xx Client Error
        400: " Bad Request ",
        401: " Unauthorized ",
        402: " Payment Required ",
        403: " Forbidden ",
        404: " Not Found ",
        405: " Method Not Allowed ",
        406: " Not Acceptable ",
        407: " Proxy Authentication Required ",
        408: " Request Timeout ",
        409: " Conflict ",
        410: " Gone ",
        411: " Length Required ",
        412: " Precondition Failed ",
        413: " Payload Too Large ",
        414: " URI Too Long ",
        415: " Unsupported Media Type ",
        416: " Range Not Satisfiable ",
        417: " Expectation Failed ",
        418: " I'm a Teapot ",
        421: " Misdirected Request ",
        422: " Unprocessable Entity ",
        423: " Locked ",
        424: " Failed Dependency ",
        425: " Too Early ",
        426: " Upgrade Required ",
        428: " Precondition Required ",
        429: " Too Many Requests ",
        431: " Request Header Fields Too Large ",
        451: " Unavailable For Legal Reasons ",

        //5xx Server Error
        500: " Internal Server Error ",
        501: " Not Implemented ",
        502: " Bad Gateway ",
        503: " Service Unavailable ",
        504: " Gateway Timeout ",
        505: " HTTP Version Not Supported ",
        506: " Variant Also Negotiates ",
        507: " Insufficient Storage ",
        508: " Loop Detected ",
        510: " Not Extended ",
        511: " Network Authentication Required ",
    };
}
