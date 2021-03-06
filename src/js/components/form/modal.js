class ModalWindow {
    constructor(text = "") {
        this.el = null;
        this._createHTML();
        this._setListener();
        this.setTextContent(text);
        this._show();
    }

    _createHTML() {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="modal">
                <div class="modal__window"></div>
            </div>
            `
        );

        this.el = document.querySelector(".modal");
    }

    _show() {
        this.el.style.display = "block";
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            this.el.style.opacity = "1";
        });
    }

    _remove() {
        this.el.style.opacity = "0";
        document.body.style.overflow = "";

        setTimeout(() => {
            this.el.style.display = "none";
            this.el.remove();
        }, 1000);
    }

    _setListener() {
        this.el.addEventListener("click", () => {
            this._remove();
        });
    }

    setTextContent(text) {
        this.el.querySelector(".modal__window").textContent = text;
    }
}

export default ModalWindow;
