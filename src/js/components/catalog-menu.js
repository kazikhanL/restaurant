const TAB_SELECTOR = ".catalog-menu__tab";
const TAB_ACTIVE_CLASS = "catalog-menu__tab--active";
const CONTENT_SELECTOR = ".catalog-menu__tab-content";
const CONTENT_ACTIVE_CLASS = "catalog-menu__tab-content--active";

let tabs = document.querySelectorAll(TAB_SELECTOR);
let menu = document.querySelectorAll(CONTENT_SELECTOR);

function removeActiveClass(elements, activeClassName) {
    elements.forEach((elem) => {
        if (elem.classList.contains(activeClassName)) {
            elem.classList.remove(activeClassName);
        }
    });
}

export default function () {
    tabs.forEach((tab) => {
        tab.addEventListener("click", (event) => {
            removeActiveClass(tabs, TAB_ACTIVE_CLASS);
            removeActiveClass(menu, CONTENT_ACTIVE_CLASS);

            tab.classList.add(TAB_ACTIVE_CLASS);

            menu.forEach((content) => {
                if (content.dataset.section === tab.dataset.section) {
                    content.classList.add(CONTENT_ACTIVE_CLASS);
                }
            });
        });
    });
}
