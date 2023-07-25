export function addValues(arg1, arg2) {
    switch (typeof arg1) {
        case "number":
            switch (typeof arg2) {
                case "number":
                    return arg1 + arg2;
                case "bigint":
                    return BigInt(arg1) + arg2;
                case "string":
                    return String(arg1) + arg2
                default:
                    throw new Error("cannot add values for given types")
            }
        case "string":
            switch (typeof arg2) {
                case "number":
                    return arg1 + String(arg2)
                case "string":
                    return arg1 + arg2;
                default:
                    throw new Error("cannot add values for given types")
            }
        case "bigint":
            switch (typeof arg2) {
                case "number":
                    return arg1 + BigInt(arg2)
                case "bigint":
                    return arg1 + arg2;
                default:
                    throw new Error("cannot add values for given types")
            }
        default:
            throw new Error("cannot add values for given types")
    }
}

export function stringifyValue(arg1) {
    switch (typeof arg1) {
        case "object":
            return arg1 !== null ? JSON.stringify(arg1) : "null"
        default:
            return String(arg1)
    }
}

export function invertBoolean(arg1) {
    if (typeof arg1 === "boolean") {
        return !arg1
    } else {
        throw new Error("cannot invert value for given type")
    }
}

export function convertToNumber(arg1) {
    switch (typeof arg1) {
        case "number":
            return arg1
        case "string":
            const value = parseInt(arg1) //we can also use parseFloat
            if (Number.isNaN(value)) {
                throw new Error("cannot convert given string to number")
            }
            return value;
        case "boolean":
            return arg1 ? 1 : 0;
        case "bigint":
            return Number(arg1)
        default:
            throw new Error("cannot convert value to number");
    }
}

export function coerceToType(value, type) {
    switch (type) {
        case "string":
            return stringifyValue(value)
        case "number":
            return convertToNumber(value)
        case "boolean":
            return value ? true : false;
        case "object":
            return JSON.parse(value)
        case "bigint":
            return BigInt(value);
        default:
            throw new Error("cannot convert value to the given type");
    }
}

export function stringToBinary(inputString) {
    return inputString
        .split('')
        .map(char => char.charCodeAt(0).toString(2))
        .join(' ');
}
