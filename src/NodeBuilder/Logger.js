import JsonParser from "./JsonParser";
import { Div, Span } from "./NodeBuilder";

let containerEl = false;
const showOnLog = true;
const popup = true;
const Logger = (json, prop) => {
    if (!containerEl) createContainerEl();
    if (prop?.clear) {
        containerEl.clear();
    }
    if (containerEl.getAttribute("is") === "colabs") {
        containerEl.count++;
        containerEl.setAttribute("log-count", containerEl.count > 0 ? containerEl.count : "hide");
    } else {
        containerEl.count = 0;
        containerEl.setAttribute("log-count", "hide");
    }
    if (!json) json = `${json}`;
    if (typeof json !== "object") json = { [containerEl.childElementCount - 1]: json };
    console.log(json);
    let jsonEl = JsonParser(json);
    if (prop?.type) {
        jsonEl.setAttribute("type", prop.type);
        containerEl.show();
    } else if (showOnLog) containerEl.show();

    containerEl.insertBefore(jsonEl, containerEl.firstChild);
    containerEl.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // if (timer) setTimeout(() => containerEl?.remove(), timer);
};

export default Logger;

function createContainerEl() {
    containerEl = Div({ id: "logger-container", className: "logger-container scroller" }, [
        Span({
            className: "clear-btn",
            innerText: "clear",
            id: "clear-btn",
            onclick: (e) => {
                e.stopPropagation();
                containerEl.setAttribute("is", "colabs");
                setTimeout(() => {
                    containerEl.clear();
                }, 200);
            },
        }),
    ]);
    containerEl.count = 0;
    containerEl.setAttribute("is", "colabs");

    containerEl.clear = () => {
        console.clear();
        if (!containerEl) return;
        containerEl.replaceChildren(
            Span({
                className: "clear-btn",
                innerText: "clear",
                id: "clear-btn",
                onclick: (e) => {
                    e.stopPropagation();
                    containerEl.setAttribute("is", "colabs");
                    setTimeout(() => {
                        containerEl.clear();
                    }, 200);
                },
            })
        );

        containerEl.count = 0;
    };

    let moved = [containerEl.offsetLeft, containerEl.offsetTop];
    let startX = 0,
        startY = 0;
    const onMove = (x, y) => {
        x -= startX;
        y -= startY;
        containerEl.style.left = `${moved[0] + x}px`;
        containerEl.style.top = `${moved[1] + y}px`;
    };

    containerEl.onmousedown = ({ target, clientX, clientY }) => {
        startX = clientX;
        startY = clientY;
        moved = [containerEl.offsetLeft, containerEl.offsetTop];
        containerEl.style.transitionDuration = "0s";
        const onMoveHandler = ({ clientX: x, clientY: y }) => {
            onMove(x, y);
        };
        const onUpHandler = () => {
            containerEl.style.transitionDuration = "0.2s";
            window.removeEventListener("mousemove", onMoveHandler);
            window.removeEventListener("mouseup", onUpHandler);
            if (containerEl.childElementCount === 1) return;
            if (moved[0] !== containerEl.offsetLeft || moved[1] !== containerEl.offsetTop) {
                moved = [containerEl.offsetLeft, containerEl.offsetTop];
                return;
            }

            const overScreen = containerEl.offsetTop > window.innerHeight / 2 || containerEl.offsetLeft > window.innerWidth / 2;
            if (containerEl.offsetLeft < 0) containerEl.style.left = "10px";
            const isColabs = containerEl.getAttribute("is") === "colabs";
            containerEl.setAttribute("is", isColabs ? (overScreen ? "default" : "visible") : "colabs");

            if (isColabs) {
                containerEl.classList.remove("hide-child");
                containerEl.count = 0;
                containerEl.setAttribute("log-count", "hide");
            } else {
                setTimeout(() => {
                    containerEl.classList.add("hide-child");
                }, 200);
            }
        };
        window.addEventListener("mousemove", onMoveHandler);
        window.addEventListener("mouseup", onUpHandler);
    };
    containerEl.show = () => {
        const isColabs = containerEl.getAttribute("is") === "colabs";
        if (!isColabs) return;
        const overScreen = containerEl.offsetTop > window.innerHeight / 2 || containerEl.offsetLeft > window.innerWidth / 2;
        if (containerEl.offsetLeft < 0) containerEl.style.left = "10px";

        containerEl.setAttribute("is", overScreen ? "default" : "visible");
        setTimeout(() => {
            containerEl.classList.remove("hide-child");
        }, 200);
    };

    document.body.append(containerEl);
    setTimeout(() => (containerEl.style.opacity = "1"), 10);
}
{
    /* <span */
}
// aria-label="sapreator"
// style={{ borderRadius: "10px", padding: "3px", margin: "auto" }}
// ref={(ref) => {
//     if (!ref || ref.childElementCount > 0) return;
//     new Sapreator({ ref: ref.parentElement, vertical, sapreatorColors, spliter: ref, minBefor, minAfter, initialRatios, storageKey });
// }}
// />
