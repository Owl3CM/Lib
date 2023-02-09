import './service.css';
import React from 'react';
import { ApiService, Button, RecyclerList } from '../index';


export const Recycler  = () => {

//   const service=React.useMemo(()=>{
//     return new ApiService({ baseURL : 'https://jsonplaceholder.typicode.com',storageKey:'test',storage:localStorage})
//   },[])



  return (
    <div className='col-center p-lg' >
        <Button label="لول"
        onClick={()=>{
          console.log((service.get));
          setTimeout(() => {
            service.get('/posts/1')
            .then((res)=>{
              console.log((service.get));
              console.log(res)
            })
          }, 1000);
          }}
        options={{
          activeBackgound: 'cyan',
          fontLOL: 15,
        }}
        />
    </div>
  );
};

//   import Utils from "../Lib/Utils/Utils";
// import ItemNode, { ItemCard } from "./PagenatedServiceExample/ItemNode";
// import PagenationExample from "./PagenatedServiceExample/PagenationExample";
// import TestService from "./ServiceExample/TestService";

// const MockItemsGenerator = (count, items = []) => {
//     count += items.length;
//     const generateWords = (count) => {
//         let words = [];
//         for (let i = 0; i < count; i++) {
//             words.push(`word ${i}`);
//         }
//         return words;
//     };

//     for (let i = items.length; i < count; i++) {
//         items.push({
//             i,
//             id: i,
//             name: `Item ${i}`,
//             description: `Description ${i}`,
//             name: `name ${i}`,
//             wholeSalePrice: `wholeSalePrice ${i}`,
//             morabaaId: `morabaaId ${i}`,
//             // test: generateWords(Math.random() * 100),
//         });
//     }
//     return items;
// };
// const fromApi = false;
// export const RecyclerTest = () => {
//     const service = React.useMemo(() => {
//         const _service = fromApi
//             ? new PagenationExample()
//             : {
//                   items: MockItemsGenerator(1_00),
//                   canFetch: true,
//                   loadMore: async () => {
//                       service.canFetch = false;
//                       console.log("load more");
//                       await Utils.sleep(500);
//                       service.items = MockItemsGenerator(25, service.items);
//                       console.log("loaded");
//                       service.canFetch = true;
//                       return true;
//                   },
//                   search: () => {
//                       console.log("search");
//                   },
//               };
//         _service.search();
//         return _service;
//     }, []);
//     [service.items, service.setItems] = React.useState(service.items);
//     console.log("init service");

//     return service.items.length > 0 && <RecyclerList service={service} itemCard={ItemCard} nodeBuilder={ItemNode} />;
//     // return service.items.length > 0 && <RecyclerGrid service={service} ItemBuilder={ItemNode} />;
// };

 