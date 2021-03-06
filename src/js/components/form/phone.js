function getSimbol(phoneNumber) {
    switch (phoneNumber.length) {
        case 0:
            return "+7 ( ";
        case 3:
            return " ) - ";
        case 6:
        case 8:
            return " - ";
        default:
            return "";
    }
}

export default function(input) {
    let phoneNumber = [];

    input.addEventListener("focus", () => {
        if (phoneNumber.length === 0) {
            input.value = getSimbol(phoneNumber);
        }
    });

    input.closest("form").addEventListener("reset", () => {
        phoneNumber = [];
    })
    
    input.addEventListener("keydown", event => {
        event.preventDefault();
    
        const key = event.key;
    
        if (phoneNumber.length === 0) {
            input.value = getSimbol(phoneNumber);
        }
    
        if (key === "Backspace" || key === "Delete") {
            const lastChar = input.value[input.value.length - 1];
    
            if (
                Number.isInteger(Number(lastChar)) &&
                lastChar !== " " &&
                phoneNumber.length > 0
            ) {
                phoneNumber.pop();
            }
    
            input.value = input.value.substring(0, input.value.length - 1);
        } else if (
            key !== " " &&
            Number.isInteger(Number(key)) &&
            phoneNumber.length < 10
        ) {
            phoneNumber.push(Number(key));
            input.value = input.value + key + getSimbol(phoneNumber);
        }
    });
}
