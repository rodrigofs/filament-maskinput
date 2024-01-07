export default (() => {
    const DIGIT = "9",
        ALPHA = "A",
        ALPHANUM = "S",
        BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
        isAllowedKeyCode = function (keyCode) {
            for (let i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
                if (keyCode === BY_PASS_KEYS[i]) {
                    return false;
                }
            }
            return true;
        },
        mergeMoneyOptions = function (opts) {
            opts = opts || {};
            opts = {
                thousandsSeparator: opts.hasOwnProperty("thousandsSeparator") ? opts.thousandsSeparator : ".",
                lastOutput: opts.lastOutput,
                decimalPrecision: opts.hasOwnProperty("decimalPrecision") ? opts.decimalPrecision : 2,
                decimalSeparator: opts.decimalSeparator || ",",
                allowNegative: Boolean(opts.allowNegative) || false
            };

            return opts;
        },
        // Fill wildcards past index in output with placeholder
        addPlaceholdersToOutput = function (output, index, placeholder) {
            for (; index < output.length; index++) {
                if (output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
                    output[index] = placeholder;
                }
            }
            return output;
        };

    const VanillaMasker = function (elements) {
        this.elements = elements;
    };

    VanillaMasker.prototype.unbindElementToMask = function () {
        const that = this;

        for (let i = 0, len = this.elements.length; i < len; i++) {
            this.elements[i].lastOutput = "";
            this.elements[i].onkeyup = false;
            this.elements[i].onkeydown = false;

            if (this.elements[i].value.length) {
                this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
            }
        }
    };

    VanillaMasker.prototype.bindElementToMask = function (maskFunction) {
        const that = this,
            onType = function (event) {
                //e = e || window.event;
                const source = event.currentTarget;

                if (isAllowedKeyCode(event.keyCode)) {
                    setTimeout(function () {
                        that.opts.lastOutput = source.lastOutput;
                        source.value = VMasker[maskFunction](source.value, that.opts);
                        source.lastOutput = source.value;
                    }, 0);
                }
            }
        ;

        for (let i = 0, len = this.elements.length; i < len; i++) {
            this.elements[i].lastOutput = "";
            this.elements[i].onkeyup = onType;
            if (this.elements[i].value.length) {
                this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
            }
        }
    };

    VanillaMasker.prototype.maskMoney = function (opts) {
        this.opts = mergeMoneyOptions(opts);
        this.bindElementToMask("toMoney");
    };

    VanillaMasker.prototype.maskNumber = function () {
        this.opts = {};
        this.bindElementToMask("toNumber");
    };

    VanillaMasker.prototype.maskAlphaNum = function () {
        this.opts = {};
        this.bindElementToMask("toAlphaNumeric");
    };

    VanillaMasker.prototype.maskPattern = function (pattern) {
        this.opts = {pattern: pattern};
        this.bindElementToMask("toPattern");
    };

    VanillaMasker.prototype.unMask = function () {
        this.unbindElementToMask();
    };

    const VMasker = function (el) {
        if (!el) {
            throw new Error("VanillaMasker: There is no element to bind.");
        }
        const elements = ("length" in el) ? (el.length ? el : []) : [el];
        return new VanillaMasker(elements);
    };

    VMasker.toMoney = function (value, opts) {

        opts = mergeMoneyOptions(opts);

        let number = String(value);

        if (number.includes(opts.decimalSeparator)) {

            let [integer, decimal] = number.split(opts.decimalSeparator);

            if (decimal && decimal.length > opts.decimalPrecision) {
                decimal = decimal.substring(0, opts.decimalPrecision);
            }

            number = integer + opts.decimalSeparator + decimal;

            return number;
        }

        let negativeSignal = ""


        if (opts.allowNegative === true){
            negativeSignal = "(^[^-]?)|";
        }

        number = number.replace(new RegExp(negativeSignal + `([^0-9\\${opts.thousandsSeparator}\\${opts.decimalSeparator}])`, "g"), '');

        number = number.replace(new RegExp(`\\${opts.thousandsSeparator}`, "g"), '').replace(new RegExp(`\\${opts.decimalSeparator}`, "g"), opts.thousandsSeparator);

        let [integer, decimal] = number.split(opts.thousandsSeparator);

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousandsSeparator);

        number = integer + (decimal ? opts.decimalSeparator + decimal : '');

        return number;
    };

    VMasker.toPattern = function (value, opts) {
        const pattern = (typeof opts === 'object' ? opts.pattern : opts),
            patternChars = pattern.replace(/\W/g, ''),
            output = pattern.split(""),
            values = value.toString().replace(/\W/g, ""),
            charsValues = values.replace(/\W/g, ''),
            outputLength = output.length,
            placeholder = (typeof opts === 'object' ? opts.placeholder : undefined);

        let index = 0,
            i;

        for (i = 0; i < outputLength; i++) {
            // Reached the end of input
            if (index >= values.length) {
                if (patternChars.length === charsValues.length) {
                    return output.join("");
                } else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
                    return addPlaceholdersToOutput(output, i, placeholder).join("");
                } else {
                    break;
                }
            }
            // Remaining chars in input
            else {
                if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
                    (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
                    (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
                    output[i] = values[index++];
                } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
                    if (placeholder !== undefined) {
                        return addPlaceholdersToOutput(output, i, placeholder).join("");
                    } else {
                        return output.slice(0, i).join("");
                    }
                    // exact match for a non-magic character
                } else if (output[i] === values[index]) {
                    index++;
                }

            }
        }
        return output.join("").slice(0, i);
    };

    VMasker.toNumber = function (value) {
        return value.toString().replace(/(?!^-)[^0-9]/g, "");
    };

    VMasker.toAlphaNumeric = function (value) {
        return value.toString().replace(/[^a-z0-9 ]+/i, "");
    };

    return VMasker;
})();
