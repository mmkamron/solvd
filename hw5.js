// #1
const customFilterUnique = (arr, cb) => {
    const uniqueSet = new Set();
    for (const elem of arr) {
        if (cb(elem)) {
            uniqueSet.add(elem)
        }
    }
    return [...uniqueSet];
}

const priceFilter = (elem) => {
    if (elem.price > 3) {
        return true
    }
    return false
}


// const fruits = [
//     { name: "Apple", price: 3.5 },
//     { name: "Banana", price: 2.0 },
//     { name: "Kiwi", price: 4.0 },
//     { name: "Orange", price: 6.0 },
//     { name: "Grapefruit", price: 2.5 }
// ];
//
// console.log(customFilterUnique(fruits, priceFilter))

// const nums = [3, 5, 10, 3, 7, 5, 13, 10]
// console.log(customFilterUnique(nums, num => num > 3))


// #2
const chunkArray = (arr, size = 0) => {
    if (size === 0) {
        return arr;
    }
    const chunked = [];
    let i = 0
    while (i < arr.length) {
        let slice = arr.splice(i, size)
        chunked.push(slice)
    }
    return chunked
}

// const nums = [2, 4, 6, 8, 10, 12, 14]
// console.log(chunkArray(nums, 2))


// #3
const customShuffle = (arr) => {
    let curr = arr.length;
    while (curr > 0) {
        let rand = Math.floor(Math.random() * curr);
        curr--
        [arr[curr], arr[rand]] = [arr[rand], arr[curr]]
    }
    return arr
}

// const nums = [4, 6, 8, 10, 12, 14];
// console.log(customShuffle(nums));


// #4
const getArrayIntersection = (arr1, arr2) => {
    const common = [];
    for (const elem of arr1) {
        if (arr2.includes(elem)) {
            common.push(elem);
        }
    }
    return common;
}

const getArrayUnion = (arr1, arr2) => {
    const unionSet = new Set([...arr1, ...arr2]);
    return Array.from(unionSet);
}

// const array1 = [1, 8, 1, 4, 5];
// const array2 = [5, 4, 7, 6, 7, 8];
// console.log(getArrayIntersection(array1, array2));
// console.log(getArrayUnion(array1, array2));


// #5
const measureArrayPerformance = (fn, arr) => {
    const start = performance.now();
    fn(arr);
    const end = performance.now();
    const total = end - start;
    return total;
}
