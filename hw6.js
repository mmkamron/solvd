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

console.log("Quicksort:")
for (i = 100; i <= 100000; i *= 10) {
    let array = randomArray(i)
    const start = performance.now()
    quicksort(array)
    const end = performance.now()
    console.log((end - start).toFixed(2) + 'ms')
}
console.log("\nBubble sort:")
for (i = 100; i <= 100000; i *= 3) {
    let array = randomArray(i)
    const start = performance.now()
    bubbleSort(array)
    const end = performance.now()
    console.log((end - start).toFixed(2) + 'ms')
}
console.log("\nMerge sort:")
for (i = 100; i <= 100000; i *= 10) {
    let array = randomArray(i)
    const start = performance.now()
    mergeSort(array)
    const end = performance.now()
    console.log((end - start).toFixed(2) + 'ms')
}
