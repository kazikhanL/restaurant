function setNavListeners(nav) {
    nav.addEventListener("click", event => {
        let isLink = event.target.tagName == "A";

        if (isLink) {
            event.preventDefault();

            const sectionName = event.target.getAttribute("href").substr(1);
            const sectionPosition = document.getElementById(sectionName).getBoundingClientRect().top;
            const currentPostion = window.pageYOffset;
            const STEP = 25;
            let curretnScrolling = 0;

            if (Math.sign(sectionPosition) === -1) {
                const maxSteps = Math.abs(Math.ceil(sectionPosition / STEP));

                for (let steps = 0; steps <= maxSteps; steps++) {
                    setTimeout(() => {
                        curretnScrolling -= STEP;
                        window.scroll(0, currentPostion + curretnScrolling);
                    }, 10 * steps);
                }
            } else {
                const maxSteps = Math.floor(sectionPosition / STEP);

                for (let steps = 0; steps <= maxSteps; steps++) {
                    setTimeout(() => {
                        curretnScrolling += STEP;
                        window.scroll(0, currentPostion + curretnScrolling);
                    }, 10 * steps);
                }
            }
        }
    });
}

export default setNavListeners;
