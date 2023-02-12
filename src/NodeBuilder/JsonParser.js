import { Div, Fragment, Img, Span } from "./NodeBuilder";

const Function = ({ item }) => Span({ className: "obj-text-1", onclick: item, innerText: JSON.stringify(item) });
const String = ({ item }) => Span({ className: "obj-text-1", innerText: item });
const Boolean = ({ item }) => Span({ className: "obj-text-1", innerText: item });
const StringArray = (item) => Span({ className: "obj-text-2 px-sm", innerText: `${item}, ` });
const Image = ({ item }) => Img({ style: "max-height: 100px;object-fit: cover;", src: item });
const ArrayImages = ({ item }) => item.map((_i) => Img({ height: 250, src: _i }));
const Array = ({ item }) => {
    item = Object.values(item)
        .filter((value) => nullables.includes(value) === false)
        .sort((o) => (sortByType(o[1]) ? -1 : 1));
    return Div({ className: "obj" }, [
        Span({ className: "objtext-3 px-sm", innerText: "[" }),
        Fragment(
            item.map((_i) => {
                let _type = getType(_i);
                return _type === "Object" || _type === "Array"
                    ? Div({ className: "bg-prim Object rounded-lg p-sm row-center wrap gap-sm my-xs" }, [_Object({ key: "", item: _i })])
                    : StringArray(_i);
            })
        ),
        Span({ className: "obj-text-3 px-sm", innerText: "]" }),
    ]);
};
const _Object = ({ key, item }) => {
    const _item = Object.entries(item)
        .filter(([_, value]) => nullables.includes(value) === false)
        .sort((o) => sortByType(o[1]));
    let nodes = document.createElement("div");
    nodes.className = "bg-prim rounded-lg p-sm row-center wrap gap-sm";
    nodes.id = item.id;

    nodes.append(Span({ innerText: "{" }));

    _item.forEach(([key, value], _i) => {
        let type = getType(value);
        if (!type) return;
        if (type === "Array") {
            if (key === "images") {
                type += "Images";
                value = Object.values(Object.values(value)[0]);
            }
        } else if (type === "String" && value.startsWith("http") && (key === "image" || checkIsImageURL(value))) type = "Image";

        nodes.append(Div({ className: `obj ${type}` }, [Span({ className: `obj-key`, innerText: key }), UiKit[type]({ key: _i, item: value })]));
    });
    nodes.append(Span({ innerText: "}," }));
    return nodes;
};
const JsonParser = (item, setItem, containerClass, onClick) => {
    const _item = Object.entries(item)
        .filter(([_, value]) => nullables.includes(value) === false)
        .sort((o) => (sortByType(o[1]) ? -1 : 1));
    function onclick() {
        setItem && setItem(item);
    }

    let nodes = document.createElement("div");
    nodes.className = "json-builder";
    if (onClick)
        nodes.onclick = () => {
            onClick(item);
            setItem && setItem(item);
        };
    else nodes.onclick = onclick;
    nodes.id = item.id;
    _item.forEach(([key, value], _i) => {
        let type = getType(value);
        if (!type) return;

        if (type === "Array") {
            if (key === "images") {
                type += "Images";
                value = Object.values(Object.values(value)[0]);
            }
        } else if (type === "String" && value.startsWith("http") && (key === "image" || checkIsImageURL(value))) type = "Image";

        nodes.append(Div({ className: `obj ${type}` }, [Span({ className: `obj-key`, innerText: key }), UiKit[type]({ key: _i, item: value })]));
    });
    if (containerClass) {
        if (typeof containerClass === "string") nodes = Div({ className: containerClass }, [nodes]);
        else {
            nodes = Div({ style: containerClass }, [nodes]);
            Object.entries(containerClass).forEach(([key, value]) => {
                nodes.style[key] = value;
            });
        }
    }
    return nodes;
};
export default JsonParser;

const nullables = [undefined, null, ""];
const UiKit = { String, Number: String, Boolean, Object: _Object, Array, ArrayImages, Undefined: Fragment(), Null: Fragment(), Image, Function };
const valdTyps = ["String", "Number", "Boolean", "Object", "Array", "ArrayImages", "Undefined", "Null", "Image", "Function"];

const checkIsImageURL = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
const sortByType = (obj) => {
    const type = getType(obj);
    const _sortByType = { String: 1, Number: 2, Boolean: 3, ArrayImages: 4, Image: -1, Object: -1, Array: false, Undefined: false, Null: false };
    return _sortByType[type];
};
const getType = (obj) => {
    let type = Object.prototype.toString.call(obj).slice(8, -1);
    if (valdTyps.includes(type)) return type;
};
const sample = {
    id: "943-34234kf-f32f-23f32f-c8",
    name: "Jhon Doe",
    descriptionT: "somthing going on here ok then this is a description so that is not a good idea",
    amBoolean: true,
    objectColction: [{ id: "KKKK" }, { name: "Obdestest" }, { description: "obdes" }],
    colction: ["one ", "test", "four", "four", "four", "owls"],
    object: {
        id: "K-sdf-KK-sdfK",
        name: "Jhon Doe",
        description: "this is a description",
        idK: "K-sdf-KK-sdfK",
        nameK: "Obdes test by Jhon Doe",
    },
};
