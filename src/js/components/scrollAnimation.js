import setNavListeners from "./setNavListeners";

function getWindowWidth() {
    return document.documentElement.clientWidth;
}

function isWindowTooBig() {
    const MAX_WINDOW_WIDTH = 768;
    return getWindowWidth() > MAX_WINDOW_WIDTH;
}

function setMainMenuListener() {
    if (isWindowTooBig) {
        let menu = document.querySelector(".menu .menu__list");

        if (menu) {
            setNavListeners(menu);
        }
    }
}

function setLinkButtonsListener() {
    let linksButtonsNav = document.querySelector(".header__wrapper-buttons");
    setNavListeners(linksButtonsNav);
}

function setScrollBtnLisstener() {
    let scrollButton = document.querySelector(".header__scroll-btn");

    scrollButton.addEventListener("click", (event) => {
        event.preventDefault();

        const heightFirstBlock = document.querySelector("header.header").offsetHeight;
        const currentPostion = window.pageYOffset;
        const scrollRange = heightFirstBlock - currentPostion;
        const STEP = 25;
        const maxSteps = Math.ceil(scrollRange / STEP);
        let curretnScrolling = 0;

        for (let steps = 0; steps <= maxSteps; steps++) {
            setTimeout(() => {
                curretnScrolling += STEP;
                window.scroll(0, currentPostion + curretnScrolling);
            }, 10 * steps);
        }
    });
}

export default function() {
    setMainMenuListener();
    setLinkButtonsListener();
    setScrollBtnLisstener();
}