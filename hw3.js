// #1
const calculateDiscountedPrice = (products, discountPercentage) => {
    if (
        !Array.isArray(products) ||
        discountPercentage < 0 ||
        discountPercentage > 100 ||
        typeof discountPercentage !== "number"
    ) {
        throw new Error(
            "Invalid input: An array of products with discount number between 0 and 100 is required"
        );
    }
    return products.map((product) => ({
        name: product.name,
        discountedPrice: product.price * (1 - discountPercentage / 100),
    }))
}

const calculateTotalPrice = (products) => {
    if (!Array.isArray(products)) {
        throw new Error("Invalid input: An array of products is required")
    }
    return products.reduce((acc, product) => acc + product.discountedPrice, 0)
}

const products = [
    { name: 'Product 1', price: 50 },
    { name: 'Product 2', price: 100 },
    { name: 'Product 3', price: 75 },
]

const discountPercentage = 40;

const discountedProducts = calculateDiscountedPrice(products, discountPercentage)
const totalPrice = calculateTotalPrice(discountedProducts)
console.log(discountedProducts);
console.log(`Total price with discount: ${totalPrice}`);

// #2
const getFullName = (person) => {
    if (typeof person !== "object" || !("firstName" in person) || !("lastName" in person)) {
        throw new Error("Invalid input: An object with firstName and lastName parameter is required")
    }
    return `${person.firstName} ${person.lastName}`;
}

const person = {
    firstName: "Kamron",
    lastName: "Mirsamatov"
}

console.log(getFullName(person));


const splitIntoWords = (text) => {
    if (typeof text !== "string") {
        throw new Error("Invalid input: given text should be of type string")
    }
    return text.split(/\s+/)
};
const uniqueArray = (arr) => [...new Set(arr)];
const sortAlphabetically = (arr) => arr.sort();

const filterUniqueWords = (text) => {
    return sortAlphabetically(uniqueArray(splitIntoWords(text)))
}

console.log(filterUniqueWords("mouse monitor mouse keyboard headphones keyboard"))


const grades = (students) => students.flatMap((student) => student.grades);
const average = (grades) => (grades.reduce((sum, grade) => sum + grade, 0) / grades.length).toFixed(2);
const getAverageGrade = (students) => {
    if (!Array.isArray(students)) {
        throw new Error("Invalid input: Array of students with property name and grades should be passed")
    }
    return average(grades(students))
}

const studentData = [
    { name: 'John', grades: [2, 4, 4, 3, 5] },
    { name: 'Alice', grades: [3, 3, 5, 4, 5] },
    { hey: 'Bob', grades: [2, 2, 3, 2, 3] },
];

console.log(`Average grade of all students: ${getAverageGrade(studentData)}`)


// #3
const createCounter = () => {
    let count = 0;

    function counter() {
        return count++
    }

    return counter;
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(`\n1st counter:\n${counter1()}`);
console.log(counter1());

console.log(`\n2nd counter:\n${counter2()}`);
console.log(counter2());
console.log(counter2());
console.log(counter2());

const repeatFunction = (func, num) => {
    if (typeof func !== "function" || typeof num !== "number" || !Number.isInteger(num)) {
        throw new Error("Invalid input: arguments should be of type function and whole integer");
    }
    if (num < 0) {
        return function() {
            while (true) {
                func();
            }
        }
    }

    return function() {
        for (let i = 0; i < num; i++) {
            func();
        }
    }
}

function test() {
    console.log("test")
}

const repeatFunc = repeatFunction(test, 3)
repeatFunc()

// #4
const calculateFactorial = (num) => {
    if (typeof num != "number" || !Number.isInteger(num) || num < 0) {
        throw new Error("Invalid input: provide a positive integer as an argument")
    } else if (num === 1 || num === 0) return 1;
    return num * calculateFactorial(num - 1);
}

console.log(calculateFactorial(4));

const power = (base, exp = 1) => {
    if (typeof base !== "number" || typeof exp !== "number") {
        throw new Error("Invalid input: provide numbers as an argument")
    }
    else if (exp === 0) {
        return 1
    } else if (exp < 0) {
        return 1 / power(base, -exp)
    }
    return base * power(base, exp - 1)
}

console.log(power(14, 1))
console.log(power(4, 3))
console.log(power(8, -1))

// #5
const lazyMap = (array, mapFunc) => {
    if (!Array.isArray(array) || typeof mapFunc !== "function") {
        throw new Error("Invalid input: provide an array and a fucntion as an argument")
    }
    let i = 0;
    return {
        next: function() {
            if (i < array.length) {
                const result = mapFunc(array[i]);
                i++;
                return result;
            } else {
                return "done"
            }
        }
    }
}

const nums = [3, 4, 5, 6, 7];
const mappedFunc = lazyMap(nums, calculateFactorial)
const mapIterator = mappedFunc;
for (let i = 0; i < 6; i++) {
    console.log(mapIterator.next())
}

const fibonacciGenerator = () => {
  let prev = 0;
  let curr = 1;

  return {
    next: function() {
      const result = curr;
      [prev, curr] = [curr, prev + curr]
      return result;
    }
  }
}

const fibIterator = fibonacciGenerator();
for (let i = 0; i < 10; i++) {
  console.log(fibIterator.next());
}
