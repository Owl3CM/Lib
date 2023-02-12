import React from "react";
 
interface IRecycler {
    service: any;
    itemBuilder: any;
    nodeBuilder?: any;
    viewedItems: number;
    gridClass: string;
    containerClass: string;
}

export default class RecyclerList extends React.Component<IRecycler> {
    useRecycler: boolean;
    service: any;
    Card: any;
    buildItem: any;
    grid:any;
    container:any
    containerClass: string;
    scrollerIndecator: any;
    threshold = 200;
    viewedItems= 0;
    initItemsToCalculate= 0;
    lastItem= 0;
    lastScrollTop= 0;
    centerOfContainer= 0;
    scrollHeight= 0;
    colums= 0;
    lastPointerY= 0;
    updateIndecator=()=>{};
    onSwipeIndecator = (e:any) =>{}
    initGrid=()=>{}

    constructor({ service, itemBuilder, nodeBuilder, gridClass = "grid", viewedItems = 25,containerClass="wrapper relative hide-scroller py-5xl" }: IRecycler) {
        super({ service, itemBuilder, nodeBuilder, gridClass, viewedItems,containerClass });
        this.useRecycler = localStorage.getItem("useRecycler") !== "Disable Recycler";
        this.service = service;
        this.Card = itemBuilder;
        this.containerClass = containerClass;

        if (!this.useRecycler) return;

        service.setItems = (callBack:Function |any[], clear?:boolean) => {
            const _clear = clear || service.items.length <= 0;
            if (typeof callBack === "function") {
                _clear && this.initGrid();
                service.items = callBack(service.items);
            } else {
                if (!Array.isArray(callBack)) throw new Error("setItems must be a function or an array");
                if (service.items.length <= 0) {
                    service.items = callBack;
                    this.initGrid();
                } else service.items = callBack;
            }
        };
        this.viewedItems = viewedItems;
        this.initItemsToCalculate = 10;
        this.buildItem = nodeBuilder ? (item:any) => nodeBuilder(item) : (item:any) => convertToNode(itemBuilder, item);

        this.grid = document.createElement("div");
        this.grid.className = gridClass;
        this.grid.append(...service.items.slice(0, this.initItemsToCalculate).map((item:any) => this.buildItem(item)));

        this.initGrid = () => {
            this.grid.replaceChildren(...service.items.slice(0, this.initItemsToCalculate).map((item:any) => this.buildItem(item)));
            this.handleCalculations();
            this.grid.append(...service.items.slice(this.initItemsToCalculate, this.viewedItems).map((item:any) => this.buildItem(item)));
            this.handleCalculations();
        };
    }
    componentDidMount() {
        if (!this.useRecycler) return;
        this.container = document.getElementById("recycler");
        this.container.append(this.grid);
        this.handleCalculations();
        console.log(this.grid);
        this.grid.append(...this.service.items.slice(this.initItemsToCalculate, this.viewedItems).map((item:any) => this.buildItem(item)));
        this.handleCalculations();
        this.scrollerIndecator = createIndecator(this);
        this.container.parentElement.append(this.scrollerIndecator);
        this.container.addEventListener("scroll", ({ target }:any) => recyclingOnScroll(target, this));
        window.addEventListener("resize", this.handleCalculations);
    }
    render = () => (
        <div className="relative">
            <p
                onClick={() => {
                    this.useRecycler = !this.useRecycler;
                    localStorage.setItem("useRecycler", this.useRecycler ? "Enable Recycler" : "Disable Recycler");
                    window.location.reload();
                }}
                className="button fixed z-50">
                {this.useRecycler ? "Disable Recycler" : "Enable Recycler"}
            </p>
            {this.useRecycler ? (
                <div id="recycler" className={this.containerClass} />
            ) : (
                <div className={this.containerClass}>
                    <div className="grid" style={{ paddingBottom: "200px" }}>
                        {this.service.items.map((item:any,i:any) => (
                            <this.Card key={i} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
    handleCalculations = () => {
        if (!this.grid.firstChild) return;
        this.colums = Math.floor(this.container.offsetWidth / this.grid.firstChild.offsetWidth);
        this.viewedItems = Math.floor(this.viewedItems / this.colums) * this.colums;
        this.scrollHeight = this.container.scrollHeight - this.container.offsetHeight;
        this.centerOfContainer = this.scrollHeight / 2;
        this.lastItem = this.viewedItems;
    };

  
}

const recyclingOnScroll = (target:any, recycler:any) => {
    const scrollDown = target.scrollTop >= recycler.lastScrollTop;
    recycler.lastScrollTop = target.scrollTop;

    recycler.updateIndecator();

    if (target.scrollTop > recycler.centerOfContainer + recycler.threshold) {
        if (scrollDown) {
            if (recycler.lastItem + recycler.colums >= recycler.service.items.length) {
                if (!recycler.service.canFetch) return;
                recycler.service.loadMore().then(() => {
                    setTimeout(() => onScrollDown(recycler), 10);
                    const height = ((40 || recycler.lastItem) / recycler.service.items.length) * 1000;
                    recycler.scrollerIndecator.style.height = `${height < 40 ? 40 : height}px`;
                });
                return;
            }
            onScrollDown(recycler);
        }
    } else if (target.scrollTop < recycler.centerOfContainer - recycler.threshold) {
        if (!scrollDown) {
            if (recycler.lastItem <= recycler.viewedItems) return;
            onScrollUp(recycler);
            if (target.scrollTop < 1) setTimeout(() => (target.scrollTop = 10), 5);
        }
    }
};

const onScrollDown = (recycler:any) => {
    let start = recycler.lastItem;
    recycler.lastItem += recycler.colums;
    let array = recycler.service.items.slice(start, recycler.lastItem);
    for (let i = 0; i < array.length; i++) {
        let itemNode = recycler.buildItem({ item: array[i], setItem: recycler.service.setItem });
        recycler.grid.firstChild.remove();
        recycler.grid.append(itemNode);
    }
};

const onScrollUp = (recycler:any) => {
    recycler.lastItem -= recycler.colums;
    let end = recycler.lastItem - recycler.viewedItems;
    let start = end + recycler.colums;
    let array = recycler.service.items.slice(end, start);
    for (let i = array.length - 1; i > -1; i--) {
        let itemNode = recycler.buildItem({ item: array[i], setItem: recycler.service.setItem });
        recycler.grid.lastChild.remove();
        recycler.grid.prepend(itemNode);
    }
};

const createIndecator = (recycler:any) => {
    const scrollerIndecator = document.createElement("p");
    scrollerIndecator.className = "scroller-indecator";
    const height = ((40 || recycler.lastItem) / recycler.service.items.length) * 1000;
    scrollerIndecator.style.height = `${height < 40 ? 40 : height}px`;
    recycler.updateIndecator = () => {
        scrollerIndecator.style.top = `${
            ((recycler.lastItem - recycler.viewedItems + recycler.colums) / recycler.service.items.length) * recycler.container.offsetHeight
        }px`;
    };
    recycler.onSwipeIndecator = (e:any) => {
        const scrollDown = e.clientY > recycler.lastPointerY;
        recycler.lastPointerY = e.clientY;
        const lastIndex = (e.clientY / recycler.container.offsetHeight) * recycler.service.items.length;
        if (lastIndex < recycler.viewedItems || lastIndex > recycler.service.items.length) return;
        recycler.lastItem = lastIndex - (lastIndex % recycler.colums);
        if (scrollDown) {
            onScrollDown(recycler);
            recycler.container.scrollTop = recycler.scrollHeight;
        } else {
            onScrollUp(recycler);
            recycler.container.scrollTop = 0;
        }
        recycler.updateIndecator();
    };

    scrollerIndecator.addEventListener("mousedown", (e) => {
        recycler.lastPointerY = e.clientY;
        const mouseUp = () => {
            console.log(recycler.lastItem);
            recycler.grid.replaceChildren(
                ...recycler.service.items.slice(recycler.lastItem - recycler.viewedItems, recycler.lastItem).map((item:any) => recycler.buildItem(item))
            );
            recycler.container.scrollTop = recycler.container.scrollTop > recycler.centerOfContainer ? recycler.container.scrollHeight : 0;
            window.removeEventListener("mousemove", recycler.onSwipeIndecator);
            window.removeEventListener("mouseup", mouseUp);
        };
        window.addEventListener("mousemove", recycler.onSwipeIndecator);
        window.addEventListener("mouseup", mouseUp);
    });

    return scrollerIndecator;
};

// const observe = new IntersectionObserver(
//     (entries) => entries.forEach((entry) => (entry.isIntersecting ? entry.target.classList.add("intersecting") : entry.target.classList.remove("intersecting")))
//     // ,{ threshold: 1, root: document.getElementById("recycler"), rootMargin: "0px" }
// );

const convertToNode = (node:any, item:any) => create(node({item}));

const create = (reactComponent:any) => {
    const element = document.createElement(reactComponent.type);
    Object.entries(reactComponent.props).map(([key, value]:any) => {
        if (key === "children") return;
        if (key !== "className") key = key.toLocaleLowerCase();
        if (key === "style") return Object.entries(value).map(([styleKey, styleValue]:any) => (element.style[styleKey] = styleValue));
        element[key] = value;
    });
    if (typeof reactComponent.props.children === "object") {
        Array.isArray(reactComponent.props.children)
            ? Object.values(reactComponent.props.children).forEach((nestedChild) => element.append(create(nestedChild)))
            : element.append(create(reactComponent.props.children));
    } else element.append(reactComponent.props.children);
    return element;
};
