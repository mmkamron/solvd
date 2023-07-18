String.prototype.plus = function(other) {
    let result = "";
    let carry = 0;
    let maxLength = this.length > other.length ? this.length : other.length;

    for (let i = 1; i <= maxLength; i++) {
        const digit1 = this.length >= i ? parseInt(this[this.length - i]) : 0;
        const digit2 = other.length >= i ? parseInt(other[other.length - i]) : 0;
        let sum = digit1 + digit2 + carry;
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
        result = carry + result
    }
    return result
}

String.prototype.minus = function(other) {
    let result = "";
    let borrow = 0;
    let maxLength = this.length > other.length ? this.length : other.length;

    for (let i = 1; i <= maxLength; i++) {
        const digit1 = this.length >= i ? parseInt(this[this.length - i]) : 0;
        const digit2 = other.length >= i ? parseInt(other[other.length - i]) : 0;
        let diff = digit1 - digit2 - borrow;
        diff += (diff < 0) ? 10 : 0;
        borrow = Math.floor(diff / 10);

        result = (diff % 10) + result;
    }

    result = result.replace(/^0+/, "")
    return result;
}

String.prototype.divide = function(other) {
    const dividend = this;
    const divisor = other;

    if (divisor === "0") {
        throw new Error("Division by zero is not allowed.");
    }

    if (dividend === "0") {
        return "0";
    }

    let quotient = "";
    let remainder = "";
    let currentIndex = 0;

    while (currentIndex < dividend.length) {
        remainder += dividend[currentIndex];
        let quotientDigit = "0";

        while (compare(remainder, divisor)) {
            remainder = remainder.minus(divisor);
            quotientDigit = (parseInt(quotientDigit) + 1).toString();
        }

        quotient += quotientDigit;
        currentIndex++;
    }

    quotient = quotient.replace(/^0+/, "");
    return quotient;
};

String.prototype.multiply = function(other) {
    const multiplicand = this;
    const multiplier = other;

    let product = "0";
    let currentMultiplierIndex = multiplier.length - 1;

    while (currentMultiplierIndex >= 0) {
        let currentDigit = multiplier[currentMultiplierIndex];
        let partialProduct = multiplicand
            .multiplyByDigit(currentDigit)
            .padEnd(multiplier.length - currentMultiplierIndex - 1, "0");
        product = product.plus(partialProduct);
        currentMultiplierIndex--;
    }

    return product;
};

String.prototype.multiplyByDigit = function(digit) {
    let result = "";
    let multiplicand = this;
    let carry = 0;

    for (let i = multiplicand.length - 1; i >= 0; i--) {
        const digit1 = parseInt(multiplicand[i]);
        const digit2 = parseInt(digit);
        const product = digit1 * digit2 + carry;

        result = (product % 10) + result;
        carry = Math.floor(product / 10);
    }

    if (carry > 0) {
        result = carry + result;
    }
    return result;
};

function compare(num1, num2) {
    if (num1.length > num2.length) {
        return true;
    } else if (num1.length < num2.length) {
        return false;
    } else {
        for (let i = 0; i < num1.length; i++) {
            const digit1 = parseInt(num1[i]);
            const digit2 = parseInt(num2[i]);

            if (digit1 > digit2) {
                return true;
            } else if (digit1 < digit2) {
                return false;
            }
        }
        return true;
    }
}

const num1 = "99999999999999999999999999999999";
const num2 = "3";

console.log(num1.plus(num2));
console.log(num1.minus(num2));
console.log(num1.divide(num2));
console.log(num1.multiply(num2));
