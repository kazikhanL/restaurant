import setNavListeners from "./setNavListeners";

function createHTML() {
    document.body.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="burger-menu">
            <a href="#" class="burger-menu__button">
                <div class="burger-menu__lines"></div>
            </a>
            <div class="burger-menu__overlay"></div>
            <nav class="burger-menu__nav">
                <ul>
                    <li><a href="#home">HOME</a></li>
                    <li><a href="#about-us">ABOUT</a></li>
                    <li><a href="#team">TEAM</li>
                    <li><a href="#booking">BOOKING</a></li>
                    <li><a href="#catalog-menu">MENU</a></li>
                    <li><a href="#gallery">GALLERY</a></li>
                    <li><a href="#events">EVENTS</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
            </nav>
        </div>
    `
    );
}

const SELECTOR_BURGER_MENU = ".burger-menu";
const CLASS_NAME_BURGER_MENU_ACTIVE = "burger-menu--active";
const SELECTOR_BURGER_MENU_BUTTON = ".burger-menu__button";
const SELECTOR_BURGER_MENU_OVERLAY = ".burger-menu__overlay";
const SELECTOR_BURGER_MENU_NAV = ".burger-menu__nav";

function existsBurgerMenu() {
    const burgerMenu = document.querySelector(SELECTOR_BURGER_MENU);
    return burgerMenu !== null;
}

function removeHTML() {
    if (existsBurgerMenu()) {
        document.querySelector(SELECTOR_BURGER_MENU).remove();
    }
}

let scroll = {
    _blocked: false,

    block() {
        document.body.style.overflow = "hidden";
        this._blocked = true;
    },

    unblock() {
        document.body.style.overflow = "";
        this._blocked = false;
    },

    toggle() {
        if (this._blocked) {
            this.unblock();
        } else {
            this.block();
        }
    },
};

function setListeners() {
    let burgerMenu = document.querySelector(SELECTOR_BURGER_MENU);
    let bgButton = burgerMenu.querySelector(SELECTOR_BURGER_MENU_BUTTON);
    let bgOverlay = burgerMenu.querySelector(SELECTOR_BURGER_MENU_OVERLAY);
    let bgNavList = burgerMenu.querySelector(SELECTOR_BURGER_MENU_NAV);

    bgButton.addEventListener("click", (event) => {
        event.preventDefault();
        burgerMenu.classList.toggle(CLASS_NAME_BURGER_MENU_ACTIVE);
        scroll.toggle();
    });

    bgOverlay.addEventListener("click", () => {
        burgerMenu.classList.remove(CLASS_NAME_BURGER_MENU_ACTIVE);
        scroll.unblock();
    });

    bgNavList.addEventListener("click", (event) => {
        const isLink = event.target.tagName === "A";

        if (isLink) {
            burgerMenu.classList.remove(CLASS_NAME_BURGER_MENU_ACTIVE);
            scroll.unblock();
        }
    });

    setNavListeners(bgNavList);
}

function getWindowWidth() {
    return document.documentElement.clientWidth;
}

function isWindowTooBig() {
    const MAX_WINDOW_WIDTH = 768;
    return getWindowWidth() > MAX_WINDOW_WIDTH;
}

let burgerMenu = {
    create() {
        if (!existsBurgerMenu()) {
            createHTML();
            setListeners();
        }
    },

    remove() {
        removeHTML();
    },
};

export default function () {
    if (!isWindowTooBig()) {
        burgerMenu.create();
    }

    window.addEventListener("resize", () => {
        if (!isWindowTooBig()) {
            burgerMenu.create();
        } else {
            burgerMenu.remove();
        }
    });
}
