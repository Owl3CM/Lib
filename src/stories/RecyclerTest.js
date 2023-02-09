import React from "react";
// import RecyclerGrid, { RecyclerScroller } from "../Lib/ServiceProvider/Nodes/RecyclerScroller";
import Utils from "../../Utils";
import { RecyclerList } from "../components";

const MockItemsGenerator = (count, items = []) => {
    count += items.length;
    const generateWords = (count) => {
        let words = [];
        for (let i = 0; i < count; i++) {
            words.push(`word ${i}`);
        }
        return words;
    };

    for (let i = items.length; i < count; i++) {
        items.push({
            i,
            id: i,
            name: `Item ${i}`,
            description: `Description ${i}`,
            name: `name ${i}`,
            wholeSalePrice: `wholeSalePrice ${i}`,
            morabaaId: `morabaaId ${i}`,
            // test: generateWords(Math.random() * 100),
        });
    }
    return items;
};
const fromApi = false;
const RecyclerTest = () => {
    const service = React.useMemo(() => {
        const _service = fromApi
            ? new PagenationService()
            : {
                  items: MockItemsGenerator(1_00),
                  canFetch: true,
                  loadMore: async () => {
                      service.canFetch = false;
                      console.log("load more");
                      await Utils.sleep(500);
                      service.items = MockItemsGenerator(25, service.items);
                      console.log("loaded");
                      service.canFetch = true;
                      return true;
                  },
                  search: () => {
                      console.log("search");
                  },
              };
        _service.search();
        return _service;
    }, []);
    [service.items, service.setItems] = React.useState(service.items);
    console.log("init service");

    return service.items.length > 0 && <RecyclerList service={service} itemCard={ItemCard} nodeBuilder={ItemNode} />;
    // return service.items.length > 0 && <RecyclerGrid service={service} ItemBuilder={ItemNode} />;
};

export default RecyclerTest;

// import React, { useState, useEffect } from "react";
// const MockItemsGenerator = (count) => {
//     let items = [];
//     for (let i = 0; i < count; i++) {
//         items.push({
//             id: i,
//             name: `Item ${i}`,
//             description: `Description ${i}`,
//             name: `name ${i}`,
//             wholeSalePrice: `wholeSalePrice ${i}`,
//             morabaaId: `morabaaId ${i}`,
//             test: `test ${i}`,
//         });
//     }
//     return items;
// };

// const items = MockItemsGenerator(200);

// const renderItem = ({ item, index }) => {
//     return (
//         <div key={index} className="bg-prim rounded-2xl p-xl text-center" style={{ height: 100, backgroundColor: "var(--prim)" }}>
//             <p className="text-center text-5xl">{item.id}</p>
//             <p>{item.description}</p>
//         </div>
//     );
// };

// let itemHeight = 100;
// let delay = false;
// const RecyclerTest = () => {
//     const [startIndex, setStartIndex] = useState(0);
//     const [endIndex, setEndIndex] = useState(20);

//     useEffect(() => {
//         itemHeight = renderItem({ item: items[0], index: 0 }).props.style.height;
//         console.log(renderItem({ item: items[0], index: 0 }).props);
//     }, []);

//     const handleScroll = (event) => {
//         if (delay) return;
//         delay = true;
//         setTimeout(() => {
//             delay = false;
//         }, 10);
//         const { scrollHeight } = event.currentTarget;
//         const { scrollTop } = event.currentTarget;
//         const { clientHeight } = event.currentTarget;
//         const nextStartIndex = Math.floor(scrollTop / itemHeight);
//         const nextEndIndex = Math.ceil((scrollTop + clientHeight) / itemHeight);

//         if (nextStartIndex !== startIndex || nextEndIndex !== endIndex) {
//             setStartIndex(nextStartIndex);
//             setEndIndex(nextEndIndex);
//         }
//     };

//     return (
//         <div onScroll={handleScroll} className="gap-md col" style={{ overflow: "scroll", height: items.length * 100 }}>
//             {items.slice(startIndex, endIndex).map((item, index) => renderItem({ item, index: index + startIndex }))}
//         </div>
//     );
// };
// export default RecyclerTest;
