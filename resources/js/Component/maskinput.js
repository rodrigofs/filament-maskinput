import VMasker from '../vendor/vanilla-masker';


export default (elementId) => {
    const inputElement = document.getElementById(elementId);

    if (!inputElement) {
        console.warn(`Elemento inválido com id: ${elementId}`);
        return null;
    }

    const inputHandler = (masks, max, event) => {
        let c = event.target;
        let v = c.value.replace(/\D/g, '');
        let m = c.value.length > max ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(masks[m]);
        c.value = VMasker.toPattern(v, masks[m]);
    }

    const dynamicMask = (masks, maxlength = 1) => {
        if (inputElement.value.length > 0 && inputElement.value.length < maxlength) {
            VMasker(inputElement).maskPattern(masks[0]);

        } else {
            VMasker(inputElement).maskPattern(masks[1]);
        }

        inputElement.addEventListener('input', (event) => inputHandler(masks, maxlength, event), false);

    }
    const maskPattern = (mask) => {
        VMasker(inputElement).maskPattern(`${mask}`);
    }

    const maskMoney = (moneyMask) => {
        VMasker(inputElement).maskMoney(moneyMask);
    }

    return {dynamicMask, maskPattern, maskMoney};
};
