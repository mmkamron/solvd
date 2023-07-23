function addValues(arg1, arg2) {
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

// console.log(addValues(null, 3))
console.log(addValues(5n, 7))
console.log(addValues("test", 123))
console.log(addValues(12, 34))

function stringifyValue(arg1) {
    switch (typeof arg1) {
        case "object":
            return arg1 !== null ? JSON.stringify(arg1) : "null"
        case "string":
            return arg1;
        case "number":
        case "boolean":
            return String(arg1);
        default:
            return arg1.toString()
    }
}

console.log(typeof stringifyValue(13))
console.log(stringifyValue("test"))
console.log(stringifyValue(true))
console.log(stringifyValue({name: "Kamron"}))
console.log(stringifyValue(null))

function invertBoolean(arg1) {
    if (typeof arg1 === "boolean") {
        return !arg1
    } else {
        throw new Error("cannot invert value for given type")
    }
}

console.log(invertBoolean(true))

function convertToNumber(arg1) {
    switch (typeof arg1) {
        case "number":
            return arg1
        case "string":
            const value = parseInt(arg1)
            if (Number.isNaN(value)) {
                throw new Error("cannot convert value to number")
            }
        case "bigint", "boolean":
            Number(arg1)
        case "object":
            if (arg1 === null) {
                throw new Error("cannot convert value to number");
            }
        default:
            const defaultValue = Number(arg1);
            if (Number.isNaN(defaultValue)) {
                throw new Error("cannot convert value to number");
            }
            return defaultValue;
    }
}

console.log(typeof convertToNumber("13"))
console.log(convertToNumber(98n))
console.log(convertToNumber(true))

function coerceToType(value, type) {
    switch (type) {
        case "string":
            return String(value)
        case "number":
            return Number(value)
        case "boolean":
            return Boolean(value);
        case "object":
            return JSON.parse(value)
        case "bigint":
            return BigInt(value);
        default:
            throw new Error("cannot convert value to the given type");
    }
}

console.log(coerceToType(13, "bigint"))
console.log(coerceToType(0, "boolean"))

function stringToBinary(inputString) {
  return inputString
    .split('')
    .map(char => char.charCodeAt(0).toString(2))
    .join(' ');
}

console.log(stringToBinary('solvd'));
