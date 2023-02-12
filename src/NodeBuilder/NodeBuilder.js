export const CreateTag = (tag, props, children) => {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => (element[key] = value));
    children && element.append(...children);
    return element;
};

export const Div = (props, children) => CreateTag("div", props, children);
export const P = (props, children) => CreateTag("p", props, children);
export const Span = (props) => CreateTag("span", props);
export const Input = (props) => CreateTag("input", props);
export const Img = (props, children) => CreateTag("img", props, children);
export const Button = (props) => CreateTag("button", props);
export const Fragment = (children = []) => CreateTag("fragment", {}, children);
export const LinkButton = (props) => CreateTag("a", props);
export const Br = () => document.createElement("br");

export function Select({ className, value, options, onChange }) {
    const selectNode = document.createElement("select");
    options.forEach((item) => {
        const optionNode = document.createElement("option");
        optionNode.value = item.id;
        optionNode.innerText = item.title;
        selectNode.append(optionNode);
    });
    selectNode.className = className;
    selectNode.onchange = onChange;
    selectNode.value = value;
    return selectNode;
}

export function Video(props, children) {
    props.id = "video";
    return CreateTag("video", props, children);
}
