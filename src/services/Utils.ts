export default class Utils {
    // static Round = (num) => Math.round(num * 100) / 100;
    // static getStorage = (key) => JSON.parse(localStorage.getItem(key));
    // static setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    // static removeAllChildNodes(parent) {
    //     while (parent.firstChild) parent.removeChild(parent.firstChild);
    // }
    // static uuid() {
    //     return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    //         var r = (Math.random() * 16) | 0,
    //             v = c == "x" ? r : (r & 0x3) | 0x8;
    //         return v.toString(16);
    //     });
    // }
    // // static hasValue = (value) => [undefined, null, -1, "", "-1"].includes(value) === false;
    // static hasValue = (value) => [undefined, null, ""].includes(value) === false;
    // static Formate = (amount) => {
    //     let newVal = `${amount}`?.replace("-", "").split("."),
    //         beforPoint = newVal[0],
    //         length = beforPoint?.length,
    //         owl = newVal[1] && !newVal[1]?.startsWith("00") ? `.${newVal[1].length > 2 ? newVal[1].substring(0, 2) : newVal[1]}` : "";
    //     for (let o = length; o > 0; o -= 3) o - 3 > 0 ? (owl = `,${beforPoint.substring(o, o - 3)}${owl}`) : (owl = beforPoint.substring(0, o) + owl);
    //     return amount >= 0 ? owl : `- ${owl}`;
    // };

    // static FormateWithCurrency = (amount, currencyId) => {
    //     let newVal = `${amount}`?.replace("-", "").split("."),
    //         beforPoint = newVal[0],
    //         length = beforPoint?.length,
    //         owl = newVal[1] && !newVal[1]?.startsWith("00") ? `.${newVal[1].length > 2 ? newVal[1].substring(0, 2) : newVal[1]}` : "";
    //     for (let o = length; o > 0; o -= 3) o - 3 > 0 ? (owl = `,${beforPoint.substring(o, o - 3)}${owl}`) : (owl = beforPoint.substring(0, o) + owl);

    //     let formated = `${owl}  ${getShortCurrency(currencyId)}`;
    //     return amount >= 0 ? formated : `${formated} -`;
    // };

     static hasValue = (value:any) => [undefined, null, ""].includes(value) === false;
     static generateQuery = (query:any, url:string) => {
         query = Object.entries(query).reduce((acc:any, [id, value]:any) => {
             if (Utils.hasValue(value.value)) acc[id] = value.value;
             return acc;
         }, {});
         return `/${url}?${new URLSearchParams(query)}`;
     };

    // static sleep = (ms = 3000) => {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // };

    // static setupStorage = ({ service, storageKey, storageType = "local" }) => {
    //     const storage = storageType === "local" ? localStorage : sessionStorage;

    //     const getCleanString = (text = "") => storageKey + text.replace(/[?&=/!]/g, "-");
    //     service.getStored = (store_key) => JSON.parse(storage.getItem(getCleanString(store_key)));
    //     service.setStorage = (store_key, data) => {
    //         let _storeKey = getCleanString(store_key);
    //         if (Object.values(data).length > 0) storage.setItem(_storeKey, JSON.stringify(data));
    //         else storage.removeItem(_storeKey);
    //     };
    //     service.removeStored = () => {
    //         for (let i = 0; i < storage.length; i++) {
    //             let key = storage.key(i);
    //             if (key.startsWith(storageKey)) storage.removeItem(key);
    //         }
    //     };
    // };
}

// export const getShortCurrency = (currencyId) =>
//     ({ undefined: "", 0: "د.ع", 1: "د.ع", 2: "$", 3: "€", 4: "£", 5: "₪", 6: "₹", 7: "₩", 8: "¥", 9: "₺", 10: "₴", 11: "₫" }[currencyId]);

// export const AccountsStatues = {
//     //
//     "دائن / علينا": "Credit",
//     "مدين / لنا": "Debt",
//     "دائن علينا": "Credit",
//     "مدين لنا": "Debt",
//     "": "Debt",
//     null: 0,
//     undefined: 0,
// };

// export const ConvertStateToKey = (state) => AccountsStatues[state];
