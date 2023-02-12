import React, { Fragment } from "react";

const Boolean = ({ json, key }) => <span key={key} className="obj-text-1">{`${json}`}</span>;
const StringArray = (json) => <span className="obj-text-2 px-sm">" {json} "" </span>;
const Image = ({ json }) => <img src={json} style={{ maxWidth: 100, objectFit: "contain" }} />;
const ArrayImages = ({ json }) => json.map((_i) => <img key={_i} src={_i} style={{ width: 150 }} />);
const Function = ({ json, key }) => {
    return (
        <span onClick={json} key={key} className="text-green text-base">
            {JSON.stringify(json.toString().split("{")[0]?.split("=>")[0] || "undefined function")}
        </span>
    );
};
const String = ({ json, key }) => (
    <span key={key} className="obj-text-1">
        " {json} "
    </span>
);
const Number = ({ json, key }) => (
    <span key={key} className="obj-text-1">
        {json}
    </span>
);
const Array = ({ json }) => {
    json = Object.values(json)
        .filter((value) => nullables.includes(value) === false)
        .sort((o) => (sortByType(o[1]) ? -1 : 1));
    return (
        <div className="obj">
            <span className="obj-text-3 px-sm">{"["}</span>
            {json.map((_i, i) => {
                let _type = getType(_i);
                return <Fragment key={i}>{_type === "Object" || _type === "Array" ? <_Object json={_i} /> : StringArray(_i)}</Fragment>;
            })}
            <span className="obj-text-3 px-sm" style={{ alignSelf: "end" }}>
                {"]"}
            </span>
        </div>
    );
};
const _Object = ({ json }) => {
    const _json = Object.entries(json)
        .filter(([_, value]) => nullables.includes(value) === false)
        .sort((o) => sortByType(o[1]));
    return (
        <div className="bg-prim rounded-lg p-sm row-center wrap gap-sm">
            <span>{"{"}</span>
            {_json.map(([key, value], _i) => {
                let type = getType(value);
                if (!type) return;
                if (type === "Array") {
                    if (key === "images") {
                        type += "Images";
                        value = Object.values(Object.values(value)[0]);
                    }
                } else if (type === "String" && value.startsWith("http") && (key === "image" || checkIsImageURL(value))) type = "Image";

                return (
                    <div key={_i} className={`obj ${type}`}>
                        <span className={`obj-key`}>{key}</span>
                        {UiKit[type]({ key: _i, json: value })}
                    </div>
                );
            })}
            <span>{"},"}</span>
        </div>
    );
};
const JsonToView = ({ json, className = "json-builder" }) => {
    const _json = Object.entries(json)
        .filter(([_, value]) => nullables.includes(value) === false)
        .sort((o) => (sortByType(o[1]) ? -1 : 1));
    return (
        <div className={className}>
            {_json.map(([key, value], _i) => {
                let type = getType(value);
                if (!type) return;
                if (type === "Array") {
                    if (key === "images") {
                        type += "Images";
                        value = Object.values(Object.values(value)[0]);
                    }
                } else if (type === "String" && value.startsWith("http") && (key === "image" || checkIsImageURL(value))) type = "Image";

                return (
                    <div key={key} id={_json.id} className={`obj ${type}`}>
                        <span className={`obj-key`}>{key}</span>
                        {UiKit[type]({ key: _i, json: value })}
                    </div>
                );
            })}
        </div>
    );
};

export default JsonToView;
const valdTyps = ["String", "Number", "Boolean", "Object", "Array", "ArrayImages", "Undefined", "Null", "Image", "Function"];
const UiKit = { String, Number, Boolean, Image, Function, Object: _Object, Array, ArrayImages, Null: () => <Fragment />, Undefined: () => <Fragment /> };
const nullables = [undefined, null, ""];

const getType = (obj) => {
    let type = Object.prototype.toString.call(obj).slice(8, -1);
    if (valdTyps.includes(type)) return type;
};
const sortByType = (obj) => {
    const type = getType(obj);
    const _sortByType = { String: 1, Number: 2, Boolean: 3, ArrayImages: 4, Image: -1, Object: -1, Array: false, Undefined: false, Null: false };
    return _sortByType[type];
};
const checkIsImageURL = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

let json = {
    id: "943-34234kf-f32f-23f32f-c8",
    name: "Jhon Doe",
    descriptionT: "somthing going on here ok then this is a description so that is not a good idea",
    amBoolean: true,
    colction: ["one ", "test", "four", "four", "four", "owls"],
    objectColctionT: [
        {
            id: "943-34234kf-f32f-23f32f-c8",
            name: "Jhon Doe",
            descriptionT: "somthing going on here ok then this is a description so that is not a good idea",
        },
        {
            id: "943-34234kf-f32f-23f32f-c8",
            name: "Jhon Doe",
            descriptionT: "somthing going on here ok then this is a description so that is not a good idea",
            amBoolean: true,
        },
    ],
    object: {
        id: "K-sdf-KK-sdfK",
        name: "Jhon Doe",
        description: "obdes",
        description: "this is a description",
        idK: "K-sdf-KK-sdfK",
        nameK: "Obdes test by Jhon Doe",
    },
};
