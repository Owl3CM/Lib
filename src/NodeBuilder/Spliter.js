import React from "react";

const Spliter = ({
    vertical,
    sapreatorColors = ["#56799c", "#88d9e3"],
    minBefor = 0.1,
    minAfter = 0.1,
    initialRatios,
    storageKey,
    className = "p-xs bg-red text-red",
}) => {
    return (
        <span
            aria-label="sapreator"
            className={className}
            style={{ borderRadius: "10px", margin: "auto" }}
            ref={(ref) => {
                if (!ref || ref.childElementCount > 0) return;
                new Sapreator({ ref: ref.parentElement, vertical, sapreatorColors, spliter: ref, minBefor, minAfter, initialRatios, storageKey });
            }}
        />
    );
};

export default React.memo(Spliter);

class Sapreator {
    constructor({ ref, storageKey, initialRatios, sapreatorColors, minBefor, minAfter, vertical, spliter }) {
        spliter.id = Math.random().toString(36).slice(2, 9);
        spliter.type = "sapreator";
        let children = Object.values(ref.children);
        let childCount = children.filter((child) => child.ariaLabel !== "sapreator").length;
        this.delyed = false;
        spliter.style.backgroundColor = sapreatorColors[0];

        let _initialRatios = [];
        if (initialRatios) {
            children.forEach((child) => {
                if (child.ariaLabel !== "sapreator") {
                    _initialRatios.push(initialRatios[0]);
                    initialRatios = initialRatios.splice(1);
                } else if (child.id === spliter.id) {
                    _initialRatios.push(0);
                }
            });
        }

        if (vertical) {
            spliter.style.width = "20%";
            spliter.style.cursor = "row-resize";
            this.setResutl = (nowPostion) => (this.result = Round((nowPostion - this.startPostino) / this.parentDim));
        } else {
            spliter.style.height = "20%";
            spliter.style.cursor = "col-resize";
            this.setResutl = (nowPostion) => (this.result = Round((this.startPostino - nowPostion) / this.parentDim));
        }

        let stored = JSON.parse(localStorage.getItem(storageKey));
        if (stored && stored.length === ref.childElementCount) _initialRatios = stored;
        else if (!_initialRatios || _initialRatios.length !== ref.childElementCount) {
            _initialRatios = [];
            for (let i = 0; i < ref.childElementCount; i++) _initialRatios.push(Round(1 / childCount));
        }

        this.cols = _initialRatios;

        let dim = "flexGrow";

        const AddSeparativespliter = () => {
            let client = "client" + (vertical ? "Y" : "X");

            spliter.addEventListener("mousedown", (e) => {
                spliter.style.backgroundColor = sapreatorColors[1];
                this.startPostino = vertical ? e.clientY : e.clientX;
                this.startDim = Round(this.targetChild.style[dim]);
                this.relatedStartedDim = Round(this.relatedChild.style[dim]);
                this.parentDim = vertical ? ref.clientHeight : ref.clientWidth;

                this.minTarget = this.targetChild.getAttribute("min") || minBefor;
                this.minRelated = this.relatedChild.getAttribute("min") || minAfter;

                let onMove = (nowPostion) => {
                    // if (this.delyed) return;
                    // this.delyed = true;
                    // setTimeout(() => {
                    // this.delyed = false;
                    // }, 10);

                    this.setResutl(nowPostion);

                    this.newDim = Round(this.startDim + this.result);
                    if (this.newDim < this.minTarget) return;

                    this.newRelatedDim = Round(this.relatedStartedDim - this.result);
                    if (this.newRelatedDim < this.minRelated) return;

                    this.targetChild.style[dim] = `${this.newDim}`;
                    this.relatedChild.style[dim] = `${this.newRelatedDim}`;
                };

                const mouseMove = (e) => onMove(e[client]);

                let mouseUp = (e) => {
                    SaveCols();
                    spliter.style.backgroundColor = sapreatorColors[0];
                    document.removeEventListener("mousemove", mouseMove);
                    document.removeEventListener("mouseup", mouseUp);
                };
                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            });

            // spliter.addEventListener("touchstart", (e) => {
            //     this.startPostino = e.touches[0][client];
            //     spliter.style.backgroundColor = sapreatorColors[1];
            //     this.startDim = Round(this.cols[i]);
            //     this.relatedStartedDim = Round(this.cols[i + 1]);
            //     this.parentDim = vertical ? ref.clientHeight : ref.clientWidth;

            //     this.minTarget = targetChild.getAttribute("min") || min;
            //     this.minRelated = relatedChild.getAttribute("min") || min;

            //     const touchMove = ({ touches }) => onMove(touches[0][client], i);
            //     let tochEnd = (e) => {
            //         SaveCols();
            //         spliter.style.backgroundColor = sapreatorColors[0];
            //         document.removeEventListener("touchmove", touchMove);
            //         document.removeEventListener("touchend", tochEnd);
            //     };
            //     document.addEventListener("touchmove", touchMove);
            //     document.addEventListener("touchend", tochEnd);
            // });
        };

        const SaveCols = () => {
            this.cols = children.map((child) => Round(child.style[dim]));
            storageKey && localStorage.setItem(storageKey, JSON.stringify(this.cols));
        };

        let cols = [];

        children.forEach((child, i) => {
            if (child.ariaLabel !== "sapreator") {
                child.style[dim] = _initialRatios[i];
                child.style.flexBasis = "0";
                // child.style.overflow = "auto";
                child.classList.add("scroller");
            } else if (child.id === spliter.id) {
                this.targetChild = children[i - 1];
                this.relatedChild = children[i + 1];
                if (!this.relatedChild) return;
                // this.targetChild.style.transition = "all  5ms ease-out";
                // this.relatedChild.style.transition = "all 5ms ease-out";
                AddSeparativespliter();
                ref.style.display = "flex";
                ref.style.flexDirection = vertical ? "column" : "row";
                ref.style.flexWrap = "nowrap";
                ref.style.gap = "5px";
            }
        });
    }
}
export const Round = (amount) => Math.round(amount * 1000) / 1000;
