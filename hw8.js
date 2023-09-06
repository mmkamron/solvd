// #1
const promiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        const results = []
        for (let promise of promises) {
            promise
                .then((result) => {
                    results.push(result)
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        }
    })
}

// const promises = [
//     Promise.resolve(1),
//     Promise.resolve(2),
//     Promise.resolve(3)
// ];
//
// promiseAll(promises)
//     .then(results => {
//         console.log("All promises resolved:", results); // Expected: [1, 2, 3]
//     })
//     .catch(error => {
//         console.error("At least one promise rejected:", error);
//     });


// #2
const promiseAllSettled = (promises) => {
    return new Promise((resolve, reject) => {
        const results = []
        let settled = 0
        for (let promise of promises) {
            promise
                .then((result) => {
                    results.push({ status: 'fulfilled', value: result })
                })
                .catch((error) => {
                    results.push({ status: 'rejected', reason: error })
                })
                .finally(() => {
                    settled++
                    if (settled === promises.length) {
                        resolve(results)
                    }
                })
        }
    })
}

// const promises = [
//     Promise.resolve(1),
//     Promise.reject("Error occurred"),
//     Promise.resolve(3)
// ];
//
// promiseAllSettled(promises)
//     .then(results => {
//         console.log("All promises settled:", results);
//         // Expected: [{ status: 'fulfilled', value: 1 },
//         //            { status: 'rejected', reason: 'Error occurred' },
//         //            { status: 'fulfilled', value: 3 }]
//     });


// #3
const chainPromises = (fns) => {
    let result = Promise.resolve()
    for (let fn of fns) {
        result = result
            .then((result) => {
                return fn(result)
            })
            .catch((error) => {
                result = Promise.reject(error)
                return result
            })
    }
    return result
}

function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

chainPromises(functionsArray)
    .then(result => {
        console.log("Chained promise result:", result);
        // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
    })
    .catch(error => {
        console.error("Chained promise error:", error);
    });


// #4
const promisify = (cb) => {
    return (value) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            };
            cb(value, callback);
        });
    };
}


function callbackStyleFunction(value, callback) {
    setTimeout(() => {
        if (value > 0) {
            callback(null, value * 2);
        } else {
            callback("Invalid value", null);
        }
    }, 1000);
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
    .then(result => {
        console.log("Promised function result:", result); // Expected: 6
    })
    .catch(error => {
        console.error("Promised function error:", error);
    });


