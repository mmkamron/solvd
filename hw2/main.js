import {stringToBinary, addValues, invertBoolean, coerceToType, stringifyValue, convertToNumber} from "./lib/coercion.js"

// console.log(addValues(null, 3))
console.log("\naddValues:")
console.log(addValues(5n, 7))
console.log(addValues("test", 123))
console.log(addValues(12, 34))

console.log("\nstringifyValue:")
console.log(typeof stringifyValue(13))
console.log(stringifyValue("test"))
console.log(stringifyValue(true))
console.log(stringifyValue({ name: "Kamron" }))
console.log(stringifyValue(null))

console.log("\ninvertBoolean:")
console.log(invertBoolean(true))
console.log(invertBoolean(false))

console.log("\nconvertToNumber:")
// console.log(convertToNumber("$14"))
console.log(typeof convertToNumber("13"))
console.log(convertToNumber(98n))
console.log(convertToNumber(true))

console.log("\ncoerceToType:")
console.log(coerceToType(13, "bigint"))
console.log(coerceToType(0, "boolean"))
console.log(coerceToType('{"test": "object"}', "object"))

console.log("\nstringToBinary:")
console.log(stringToBinary('solvd'));
