class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log(`${delay}ms`)
        }, delay);
    }
    scheduleImmediate() {
        setImmediate(() => console.log("Immediate"))
    }
}

const manager = new AsyncOperationManager
manager.simulateAsyncOperation(500)
manager.scheduleImmediate()
process.nextTick(() => console.log("Microtask"))
console.log("test")

/* First, all the synchronous code is executed, in our case it's console.log("test"). Then event loop enters the timers phase and checks for callbacks. In our case simulateAsyncOperation method'd delay time is 500ms which means it is not ready yet. Then it skips pending callbacks phase as we don't have any TCP errors. It also skips poll phase as we don't have any I/O operations. Then in the check phase event loop finds scheduleImmediate and executes it on the NEXT iteration of the event loop that's why even though scheduleImmediate comes first in our code it is executed after process.nextTick because latter is executed on the same phase. Then it also skips close callbacks phase as in our there is no close event. Then it loops again until settimeout is finished then it is executed. NOTE: when delay is under ~14ms, timeout callback executes faster then setImmediate as timers phase comes first after the 1st event loop.)*/
