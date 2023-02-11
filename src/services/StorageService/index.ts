export { default } from "./StorageService";
// const requireService = require.context(".", false, /\.ts$/);
// console.log({require});


// const services = requireService.keys().reduce((services: any, servicePath: string) => {
//     const serviceName = servicePath.replace(/(\.\/|\.ts)/g, "");
//     if (serviceName === "index") return services;
//     services[serviceName] = requireService(servicePath).default;
//     return services;
// }, {});
// export default services;

// const ApiServiceJs = require("./ApiService").default;
// const PagenationServiceJs = require("./PagenationService").default;

// export const ApiService = (props: {
//     baseURL: string;
//     headers?: any;
//     storageKey?: string;
//     storage?: any;
// }) => {
//     return new ApiServiceJs(props);
// };

// export const PagenationService = (props: {
//     baseURL: string;
//     headers?: any;
//     endpoint: string;
//     onResult?: any;
//     storageKey?: string;
//     storage?: any;
//     useCash?: boolean;
//     limit?: number;
// }) => {
//     return new PagenationServiceJs(props);
// };

