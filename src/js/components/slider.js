const SLIDE_SELECTOR = ".slider .slider__slide";
const SLIDER_SELECTOR = ".slider .slider__wrapper";
const DOT_SELECTOR = ".slider .slider__dot";
const DOT_ACTIVE_CLASS = "slider__dot--active";

let slideWidth = document.querySelector(SLIDE_SELECTOR).clientWidth;
let slidesLength = document.querySelectorAll(SLIDE_SELECTOR).length;
let dots = document.querySelectorAll(DOT_SELECTOR);

function removeActiveClass(elements, activeClassName) {
    elements.forEach((elem) => {
        if (elem.classList.contains(activeClassName)) {
            elem.classList.remove(activeClassName);
        }
    });
}

function moveSlider(index) {
    let wrapper = document.querySelector(SLIDER_SELECTOR);
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
}

let Swiper = {
    maxIndex: slidesLength - 1,
    currIndex: 0,

    _changeSlide() {
        moveSlider(this.currIndex);
        removeActiveClass(dots, DOT_ACTIVE_CLASS);
        dots[this.currIndex].classList.add(DOT_ACTIVE_CLASS);
    },

    swipe(touchStart, touchEnd) {
        const MINIMUM_SWIPE_LENGTH = 70;
        const swipeLength = touchStart - touchEnd;

        if (
            touchStart > touchEnd &&
            swipeLength > MINIMUM_SWIPE_LENGTH &&
            this.currIndex < this.maxIndex
        ) {
            this.currIndex++;
            this._changeSlide();
        } else if (
            touchStart < touchEnd &&
            swipeLength < -MINIMUM_SWIPE_LENGTH &&
            this.currIndex > 0
        ) {
            this.currIndex--;
            this._changeSlide();
        }
    },
};

function setDotsListener() {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            removeActiveClass(dots, DOT_ACTIVE_CLASS);
            dot.classList.add(DOT_ACTIVE_CLASS);
            moveSlider(index);
            Swiper.currIndex = index;
        });
    });
}

function setTouchListener() {
    let slider = document.querySelector(SLIDER_SELECTOR);
    let touchStart = 0;
    let touchEnd = 0;

    slider.addEventListener("touchstart", (event) => {
        touchStart = event.changedTouches[0].pageX;
    });

    slider.addEventListener("touchend", (event) => {
        touchEnd = event.changedTouches[0].pageX;
        Swiper.swipe(touchStart, touchEnd);
    });
}

export default function () {
    if (slidesLength !== dots.length) {
        throw new Error("количество slide и dot не равны");
    }

    setDotsListener();
    setTouchListener();

    window.addEventListener("resize", () => {
        slideWidth = document.querySelector(SLIDE_SELECTOR).clientWidth;
        slidesLength = document.querySelectorAll(SLIDE_SELECTOR).length;
    });
}
