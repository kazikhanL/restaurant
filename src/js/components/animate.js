class Animation {
    constructor(el) {
        this.el = el;
    }

    isPartiallyVisible() {
        let elementBoundary = this.el.getBoundingClientRect();

        const top = elementBoundary.top;
        const height = elementBoundary.height;
        const bottom = elementBoundary.bottom;

        return top + height >= 0 && height + window.innerHeight >= bottom;
    }
}

class AnimationElement extends Animation {
    constructor(element) {
        super(element);
        this.element = element;
    }

    _getAnimationClass() {
        for (let className of this.element.classList) {
            if (className.startsWith("animation-")) {
                return className;
            }
        }
    }

    _setAnimationActiveClass() {
        const className = this._getAnimationClass();
        const activeClassName = className + "--active";
        this.element.classList.add(activeClassName);
    }

    animate() {
        this._setAnimationActiveClass();
    }
}

class Block extends Animation {
    constructor(element) {
        super(element);
        this._block = element;
        this._animatedElements = [];
        this._timeInterval = 300;

        this.getElements();
    }

    setTimeInterval(milliseconds) {
        this._timeInterval = milliseconds;
    }

    getElements() {
        const animatedElements = this._block.querySelectorAll(".animated");

        if (animatedElements.length > 0) {
            for (let element of animatedElements) {
                const newElement = new AnimationElement(element);
                this._animatedElements.push(newElement);
            }
        }
    }

    animate() {
        if (this._animatedElements) {
            for (let i = 0; i < this._animatedElements.length; i++) {
                setTimeout(() => {
                    this._animatedElements[i].animate();
                }, this._timeInterval * i);
            }
        }
    }
}


function setScrollListener(elements) {
    window.addEventListener("scroll", () => {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].isPartiallyVisible()) {
                elements[i].animate();
                elements.splice(i, 1);
            }
        }
    });
}

export default function () {
    const allRawBlocks = document.querySelectorAll(".block-animation");
    let allBlocks = [];

    if (allRawBlocks.length == 0) {
        return;
    }

    for (let block of allRawBlocks) {
        let newBlock = new Block(block);
        allBlocks.push(newBlock);
    }

    // animate first block
    allBlocks[0].animate();
    allBlocks.shift();

    setScrollListener(allBlocks);

    // ========================================================================

    const allRawElements = Array.from(document.querySelectorAll(".animated"));
    let allElements = allRawElements.filter(el => el.closest('.block-animation') === null);
    allElements = allElements.map(el => new AnimationElement(el));

    setScrollListener(allElements);
}
