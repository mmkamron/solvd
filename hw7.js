class AsyncOperationManager {
    // simulateAsyncOperation methods takes delay as a parameter and uses setTimeout to delay logs
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log(`timer ended in ${delay}ms`)
            // microtask is scheduled inside setTimeout
            process.nextTick(() => console.log("Microtask inside setTimeout"))
        }, delay);
        // microtask is scheduled outside setTimeout
        process.nextTick(() => console.log("Microtask outside setTimeout"))
    }
    // scheduleImmediate uses setImmediate to execute code asynchronously and as soon as possible
    scheduleImmediate() {
        setImmediate(() => {
            console.log("Immediate")
            // microtask is scheduled inside setImmediate
            process.nextTick(() => console.log("Microtask inside setImmediate"))
        })
        // microtask is scheduled outside setImmediate
        process.nextTick(() => console.log("Microtask outside setImmediate"))
    }
}

// creating an istance from AsyncOperationManager class
const manager = new AsyncOperationManager
// using simulateAsyncOperation method of manager object with the delay of 500ms
manager.simulateAsyncOperation(500)
// using scheduleImmediate method of manager to run asynchronous code
manager.scheduleImmediate()
console.log("Synchronous log")

/* 1) all the synchronous code is executed first, in our case it's console.log("Synchronous log")
2) event loop enters the timers phase and checks for callbacks. In our case simulateAsyncOperation method'd delay time is 500ms which means it is not ready yet.
3) it skips pending callbacks phase as we don't have any TCP errors.
4) It skips poll phase as we don't have any I/O operations.
5) in the check phase event loop finds scheduleImmediate and executes it and the microtask inside setImmediate on the NEXT iteration of the event loop. Microtasks outside methods are executed immediately
6) it skips close callbacks phase as in our code there is no close event.
7) Then it loops again until settimeout is finished then it is executed with the microtask inside setTimeout. NOTE: when delay is under ~14ms, timeout callback executes faster then setImmediate as timers phase comes first after the 1st event loop.)*/
