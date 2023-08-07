// #1
const customFilterUnique = (arr, cb) => {
    const unique = [];

    for (const elem of arr) {
        if (!unique.some(item => cb(item, elem))) {
            unique.push(elem);
        }
    }

    return unique;
}

const filter = (a, b) => a.fruit === b.fruit

// const objects = [
//     { id: 1, fruit: 'apple' },
//     { id: 2, fruit: 'orange' },
//     { id: 3, fruit: 'apple' },
//     { id: 4, fruit: 'grape' },
//     { id: 5, fruit: 'banana' }
// ];

// console.log(customFilterUnique(objects, filter))


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
