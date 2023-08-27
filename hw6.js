const randomArray = (length) => {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        randomArray.push(randomNumber);
    }
    return randomArray;
}

const quicksort = (arr) => {
    if (arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return [...quicksort(left), pivot, ...quicksort(right)]
}

const bubbleSort = (arr) => {
    let swapped;

    do {
        swapped = false
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    }
    while (swapped)
    return arr
}

const merge = (left, right) => {
    let sorted = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sorted.push(left.shift())
        } else {
            sorted.push(right.shift())
        }
    }

    return [...sorted, ...left, ...right]
}

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))

    return merge(left, right)
}

const measure = (sortFn, array) => {
    const start = performance.now();
    sortFn(array)
    const end = performance.now()
    return (end - start).toFixed(2) + 'ms'
}

// Array unsorted
// When there are over ~50 random elements in an array, QuickSort and Merge Sort start to consistently outperform BubbleSort
const arrayLength = [10, 50, 70, 100, 200, 500, 1000, 3000]

const sortedArrayResults = [
    ["Sorted Array"],
    ["Array Length", "QuickSort Time", "BubbleSort Time", "Merge Sort Time"],
];

function arrayToString(arr, tSize) {
    let s = "";
    let sep = "\t".repeat(tSize);
    for (let item of arr) {
        s += item + sep;
    }
    return s
}

let title = arrayToString(sortedArrayResults[1], 2)
console.log(title)
console.log('\nRandom Array:\n')

for (let length of arrayLength) {
    let array = randomArray(length)
    
    let sorts = [quicksort, bubbleSort, mergeSort];
    let results = [length];

    for(let sort of sorts) {
        results.push(measure(sort, array))
    }

    let result = arrayToString(results, 3)
    console.log(result)
}

console.log('\nSorted Array:\n')


for (let length of arrayLength) {
    let array = randomArray(length).sort()
    
    let sorts = [quicksort, bubbleSort, mergeSort];
    let results = [length];

    for(let sort of sorts) {
        results.push(measure(sort, array))
    }

    let result = arrayToString(results, 3)
    console.log(result)
}


console.log('\nBackward Array:\n')

for (let length of arrayLength) {
    let array = randomArray(length).sort((a, b) => b - a)
    
    let sorts = [quicksort, bubbleSort, mergeSort];
    let results = [length];

    for(let sort of sorts) {
        results.push(measure(sort, array))
    }

    let result = arrayToString(results, 3)
    console.log(result)
}

/* Conclusions
When the array is sorted or array size is small Bubble sort is faster. Otherwise, Quicksort or Mergesort is preferred.

Quicksort and mergesort both use divide and conquer approaches. Quicksort's speed depends on pivot, while Mergesort offers predictable performance. 
*/
