import setPhoneMask from "./phone";
import ModalWindow from "./modal";

function setMaskForPhoneInputs() {
    let phoneInputs = document.querySelectorAll("input[name=phone]");
    
    for (let phoneInput of phoneInputs) {
        setPhoneMask(phoneInput);
    }
}

function getFormInfo(form) {
    let data = {};

    for (let input of form.elements) {
        const key = input.getAttribute("name");

        if (key !== null) {
            if (key === "phone") {
                data[key] = input.value.replace(/[ ()-]/gi, "");
            } else {
                data[key] = input.value;
            }
        }
    }

    return data;
}

function sendEmail(user) {
    const POST_URL = "./post.php"
    const data = JSON.stringify(user);

    let request = new XMLHttpRequest();
    request.open("POST", POST_URL);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    request.send(data);

    let modalWindow = new ModalWindow("loading...");
    
    request.addEventListener("load", () => {
        if (request.status === 200) {
            if (request.response === "sent") {
                modalWindow.setTextContent("Thanks!")
            } else {
                modalWindow.setTextContent("server error")
            }
        }
        else if (request.status === 404) {
            modalWindow.setTextContent(`error: ${request.status} ${request.statusText}`);
        } else {
            modalWindow.setTextContent("error")
        }
    });
}

export default function() {
    setMaskForPhoneInputs();
    
    for (let form of document.forms) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            sendEmail(getFormInfo(form));
            form.reset();
        });
    }
}
