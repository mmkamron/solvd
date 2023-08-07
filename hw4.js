// #1
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    street: {
        name: "bla"
    },
    updateInfo(info) {
        Object.keys(info).forEach((prop) => {
            if (person.hasOwnProperty(prop)) {
                Object.defineProperty(person, prop, {
                    value: info[prop],
                    writeable: false,
                })
            }
        })
    }
}

Object.keys(person).forEach((prop) => {
    Object.defineProperty(person, prop, {
        writable: false,
    })
})

Object.defineProperty(person, "address", {
    value: {},
    writable: true,
    enumerable: false,
    configurable: false
})

person.updateInfo({
    firstName: "Kamron",
    age: 20,
})

person.address = { street: "Grójecka" }

// console.log(`${person.firstName} is ${person.age} years old. He lives in ${person.address.street} street`)


// #2
const product = {
    name: "Laptop",
    price: 1000,
    quantity: 5
};

Object.defineProperty(product, 'price', {
    writable: false,
    enumerable: false,
    configurable: false
});

Object.defineProperty(product, 'quantity', {
    writable: false,
    enumerable: false,
});

const getTotalPrice = (product) => {
    const price = Object.getOwnPropertyDescriptor(product, "price").value;
    const quantity = Object.getOwnPropertyDescriptor(product, "quantity").value;

    return price * quantity;
}

const deleteNonConfigurable = (obj, prop) => {
    const property = Object.getOwnPropertyDescriptor(obj, prop);
    if (!property) {
        throw new Error(`there is no property: ${prop}`)
    } else if (!property.configurable) {
        throw new Error(`${prop} is non-configurable`)
    }
    delete obj[prop];
    return obj
}

// console.log(`Total price: $${getTotalPrice(product)}`);
// deleteNonConfigurable(product, "price")
// console.log(`Total price: $${getTotalPrice(product)}`);


// #3

const bankAccount = {
    balance: 1000,
    get formattedBalance() {
        return `$${this.balance}`
    },
    set newFormattedBalance(balance) {
        this.balance = balance;
    },
    transfer(target, amount) {
        if (this.balance < amount) {
            throw new Error("Not enough balance")
        }
        this.balance -= amount;
        target.balance += amount;
        this.newFormattedBalance = this.balance;
        target.newFormattedBalance = target.balance;
    }
}

// const account1 = Object.create(bankAccount)
// const account2 = Object.create(bankAccount)
// account2.balance = 300;
//
// account1.transfer(account2, 200);
// console.log("Account 1:", account1.formattedBalance);
// console.log("Account 2:", account2.formattedBalance);


// #4

const createImmutableObject = (obj) => {
    const newObj = {}
    const props = Object.getOwnPropertyNames(obj);
    for (const prop of props) {
        const desc = Object.getOwnPropertyDescriptor(obj, prop)
        if (typeof desc.value === "object") {
            createImmutableObject(desc.value)
        }
        Object.defineProperty(newObj, prop, desc)
    }
    return Object.freeze(newObj);
}

// const immutPerson = createImmutableObject(person)
// console.log(Object.getOwnPropertyDescriptor(immutPerson, "age"))


// #5

const observeObject = (obj, cb) => {
    return new Proxy(obj, {
        get(target, prop) {
            if (prop in target) {
                return cb(prop, "get")
            }
            throw new Error(`${prop} not found in ${target}`)
        },
        set(target, prop, val) {
            obj.updateInfo({ [prop]: val })
            if (prop in target) {
                return cb(prop, "set")
            }
            throw new Error(`${prop} not found in ${target}`)
        }
    })
}

const callback = (prop, action) => {
    console.log(`${action} ${prop}`)
}

// const observePerson = observeObject(person, callback)
// observePerson.age = 21
// console.log(observePerson)


// #6

const deepCloneObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const clone = Array.isArray(obj) ? [] : {}

    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = deepCloneObject(obj[key]);
        return acc
    }, clone)
}

// const cloned = deepCloneObject(person);
// cloned.age = 25;
// console.log(person.age)
// console.log(cloned.age)


// #7
const validateObject = (obj, schema) => {
    for (const prop in schema) {
        if (!(prop in obj)) {
            return false;
        }
        for (const prop in obj) {
            if (typeof obj[prop] !== schema[prop].type) {
                return false
            } else if (prop === "age") {
                return obj[prop] > schema[prop].min
            }
        }
        return true
    }
}
// const validation = {
//     name: { type: "string" },
//     age: { type: "number", min: 18}
// }
//
// const person1 = {
//     name: "Kamron",
//     age: 17,
// }
// console.log(validateObject(person1, validation))
