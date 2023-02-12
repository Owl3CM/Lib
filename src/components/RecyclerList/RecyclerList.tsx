import React from "react";

interface IRecycler {
    service: any;
    itemBuilder: any;
    nodeBuilder?: any;
    viewedItems: number;
    gridClass: string;
    containerClass: string;
    children?: any;
    indecator?: IIndecatorProps;
}
type IIndecatorProps = {
    width: number;
    backgroundColor: string;
    borderRadius: number;
    color: string;
};
export default class RecyclerList extends React.Component<IRecycler> {
    useRecycler: boolean;
    service: any;
    Card: any;
    buildItem: any;
    grid: any;
    container: any;
    containerClass: string;
    scrollerIndecator: any;
    threshold = 200;
    viewedItems = 0;
    initItemsToCalculate = 0;
    lastItem = 0;
    lastScrollTop = 0;
    centerOfContainer = 0;
    scrollHeight = 0;
    colums = 0;
    lastPointerY = 0;
    updateIndecatorPostion = () => {};
    onSwipeIndecator = (e: any) => {};
    initGrid = () => {};
    updateIndecatorProps = () => {};
    indecatorAllowdAreay = 0;
    dir = "ltr";
    children: any;

    indecatorProps: IIndecatorProps = {
        width: 6,
        borderRadius: 3,
        color: "#63cfc999",
        backgroundColor: "#63cfc955",
    };

    constructor({
        service,
        itemBuilder,
        nodeBuilder,
        gridClass = "grid",
        viewedItems = 25,
        containerClass = "wrapper relative hide-scroller",
        children,
        indecator,
    }: IRecycler) {
        super({ service, itemBuilder, nodeBuilder, gridClass, viewedItems, containerClass });
        this.dir = document.documentElement.getAttribute("dir") || "ltr";
        this.useRecycler = localStorage.getItem("useRecycler") !== "Disable Recycler";
        this.service = service;
        this.Card = itemBuilder;
        this.containerClass = containerClass;
        this.children = children;
        this.indecatorProps = indecator || this.indecatorProps;

        if (!this.useRecycler) return;

        service.setItems = (callBack: Function | any[], clear?: boolean) => {
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
        this.buildItem = nodeBuilder ? (item: any) => nodeBuilder(item) : (item: any) => convertToNode(itemBuilder, item);

        this.grid = document.createElement("div");
        this.grid.className = gridClass;
        this.initGrid = () => {
            this.grid.append(...service.items.slice(0, this.viewedItems).map((item: any) => this.buildItem(item)));
            this.handleCalculations();
        };
        this.initGrid();
    }
    componentDidMount() {
        if (!this.useRecycler) return;
        this.container = document.getElementById("recycler");
        this.container.append(this.grid);
        this.initGrid();
        createIndecator(this);
        this.container.addEventListener("scroll", ({ target }: any) => recyclingOnScroll(target, this));
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
                <div id="recycler" className={this.containerClass}>
                    {this.children && this.children}
                </div>
            ) : (
                <div className={this.containerClass}>
                    <div className="grid">
                        {this.service.items.map((item: any, i: any) => (
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
        setTimeout(this.updateIndecatorProps, 100);
    };
}
const recyclingOnScroll = (target: any, recycler: any) => {
    const scrollDown = target.scrollTop >= recycler.lastScrollTop;
    recycler.lastScrollTop = target.scrollTop;
    recycler.updateIndecatorPostion();

    if (scrollDown) {
        if (target.scrollTop > recycler.centerOfContainer + recycler.threshold) {
            if (recycler.lastItem + recycler.colums < recycler.service.items.length) {
                onScrollDown(recycler);
                if (target.scrollTop < target.scrollHeight) setTimeout(() => (target.scrollTop = target.scrollTop - 10), 5);
            } else if (recycler.service.canFetch)
                recycler.service.loadMore().then(() => {
                    recycler.updateIndecatorProps();
                    setTimeout(() => onScrollDown(recycler), 10);
                });
        }
    } else if (target.scrollTop < recycler.centerOfContainer - recycler.threshold && recycler.lastItem > recycler.viewedItems) {
        onScrollUp(recycler);
        if (target.scrollTop < 1) setTimeout(() => (target.scrollTop = 10), 5);
    }
};

const onScrollDown = (recycler: any) => {
    let start = recycler.lastItem;
    recycler.lastItem += recycler.colums;
    let array = recycler.service.items.slice(start, recycler.lastItem);
    for (let i = 0; i < array.length; i++) {
        let itemNode = recycler.buildItem(array[i]);
        recycler.grid.firstChild.remove();
        recycler.grid.append(itemNode);
    }
};

const onScrollUp = (recycler: any) => {
    recycler.lastItem -= recycler.colums;
    let end = recycler.lastItem - recycler.viewedItems;
    let start = end + recycler.colums;
    let array = recycler.service.items.slice(end, start);
    for (let i = array.length - 1; i > -1; i--) {
        let itemNode = recycler.buildItem(array[i]);
        recycler.grid.lastChild.remove();
        recycler.grid.prepend(itemNode);
    }
};

const createIndecator = (recycler: any) => {
    const indecatorContainer = document.createElement("div");
    indecatorContainer.style.position = "relative";
    indecatorContainer.style.height = `${recycler.container.offsetHeight}px`;
    indecatorContainer.style.backgroundColor = recycler.indecatorProps.backgroundColor;
    indecatorContainer.style.width = `${recycler.indecatorProps.width}px`;

    const scrollerIndecator = document.createElement("p");
    scrollerIndecator.className = "scroller-indecator";
    scrollerIndecator.style.backgroundColor = recycler.indecatorProps.color;
    scrollerIndecator.style.width = `${recycler.indecatorProps.width}px`;
    scrollerIndecator.style.borderRadius = `${recycler.indecatorProps.borderRadius}px`;

    recycler.updateIndecatorPostion = () => {
        scrollerIndecator.style.top = `${((recycler.lastItem - recycler.viewedItems) / recycler.service.items.length) * recycler.indecatorAllowdAreay}px`;
    };
    recycler.updateIndecatorProps = () => {
        if (!recycler.lastItem || !recycler.service.items.length) {
            scrollerIndecator.style.height = `0px`;
            recycler.indecatorAllowdAreay = recycler.container.offsetHeight;
            recycler.updateIndecatorPostion();
            return;
        }
        let height = (recycler.container.offsetHeight / (recycler.service.items.length / recycler.colums)) * 15;
        height = height < 20 ? 20 : height > recycler.container.offsetHeight ? recycler.container.offsetHeight - 20 : height;
        scrollerIndecator.style.height = `${height}px`;
        recycler.indecatorAllowdAreay = recycler.container.offsetHeight;
        recycler.updateIndecatorPostion();
    };
    setTimeout(recycler.updateIndecatorProps, 1000);

    recycler.onSwipeIndecator = (e: any) => {
        const lastIndex = Math.floor((e.clientY / recycler.container.offsetHeight) * recycler.service.items.length);
        if (lastIndex <= recycler.viewedItems || lastIndex > recycler.service.items.length) return;
        const scrollDown = e.clientY > recycler.lastPointerY;
        recycler.lastPointerY = e.clientY;
        recycler.lastItem = lastIndex;
        if (scrollDown) {
            onScrollDown(recycler);
            recycler.container.scrollTop = recycler.scrollHeight;
        } else {
            onScrollUp(recycler);
            recycler.container.scrollTop = 0;
        }
        recycler.updateIndecatorPostion();
    };

    scrollerIndecator.addEventListener("mousedown", (e) => {
        recycler.lastPointerY = e.clientY;
        // scrollerIndecator.style.transition = "unset";
        const mouseUp = () => {
            // scrollerIndecator.style.transition = "top 0.1s linear";
            if (recycler.lastItem - recycler.viewedItems < 0) recycler.lastItem = recycler.viewedItems;
            else if (recycler.lastItem > recycler.service.items.length) recycler.lastItem = recycler.service.items.length;
            recycler.grid.replaceChildren(
                ...recycler.service.items.slice(recycler.lastItem - recycler.viewedItems, recycler.lastItem).map((item: any) => recycler.buildItem(item))
            );
            recycler.container.scrollTop = recycler.container.scrollTop > recycler.centerOfContainer ? recycler.container.scrollHeight : 0;
            window.removeEventListener("mousemove", recycler.onSwipeIndecator);
            window.removeEventListener("mouseup", mouseUp);
        };
        window.addEventListener("mousemove", recycler.onSwipeIndecator);
        window.addEventListener("mouseup", mouseUp);
    });

    const parent = recycler.container.parentElement;

    indecatorContainer.append(scrollerIndecator);
    parent.style.display = "grid";
    if (recycler.dir === "ltr") {
        parent.style.gridTemplateColumns = "auto 1fr";
        parent.prepend(indecatorContainer);
    } else {
        parent.style.gridTemplateColumns = "1fr auto";
        parent.append(indecatorContainer);
    }
    recycler.scrollerIndecator = scrollerIndecator;
};

// const observe = new IntersectionObserver(
//     (entries) => entries.forEach((entry) => (entry.isIntersecting ? entry.target.classList.add("intersecting") : entry.target.classList.remove("intersecting")))
//     // ,{ threshold: 1, root: document.getElementById("recycler"), rootMargin: "0px" }
// );

const convertToNode = (node: any, item: any) => create(node({ item }));

const create = (reactComponent: any) => {
    const element = document.createElement(reactComponent.type);
    Object.entries(reactComponent.props).map(([key, value]: any) => {
        if (key === "children") return;
        if (key !== "className") key = key.toLocaleLowerCase();
        if (key === "style") return Object.entries(value).map(([styleKey, styleValue]: any) => (element.style[styleKey] = styleValue));
        element[key] = value;
    });
    if (typeof reactComponent.props.children === "object") {
        Array.isArray(reactComponent.props.children)
            ? Object.values(reactComponent.props.children).forEach((nestedChild) => element.append(create(nestedChild)))
            : element.append(create(reactComponent.props.children));
    } else element.append(reactComponent.props.children);
    return element;
};
