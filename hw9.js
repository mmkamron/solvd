class Book {
    constructor(title, author, isbn, price, availability) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.availability = availability;
    }

    // a method to get the type of book, will be overwritten in subclasses to utilize polymorphism
    getType() {
        return "Unknown"
    }
}

class FictionBook extends Book {
    getType() {
        return "Fiction"
    }
}

class NonFictionBook extends Book {
    getType() {
        return "Non-Fiction"
    }
}

class User {
    constructor(name, email, userId) {
        this.name = name;
        this.email = email;
        this.userId = userId;
    }
}

class Cart {
    constructor(user) {
        this.user = user;
        this.items = [];
    }

    // add a book to the cart and log the action
    add(book) {
        this.items.push(book)
        console.log(`${book.title} (${book.getType()}) is added to the cart`)
    }

    // remove a book from the cart and log the action
    remove(book) {
        const index = this.items.indexOf(book)
        if (index !== -1) {
            this.items.splice(index, 1)
            console.log(`${book.title} (${book.getType()}) is removed from the cart`)
        } else {
            console.log(`${book.title} (${book.getType()}) is not in the cart`)
        }
    }

    //calculate the total price of books in the cart
    calculate() {
        let total = 0;
        for (const book of this.items) {
            total += book.price
        }
        return total;
    }
}

class Order {
    constructor(cart) {
        this.cart = cart
    }

    // calculate method is used from the cart object to calculate the total price and log it
    checkout() {
        const total = this.cart.calculate()
        if (total > 0) {
            console.log(`Total price: $${total}`)
        }
    }

    // buy method shows the books purchased
    buy() {
        if (this.cart.items.length > 0) {
            console.log(`You bought the following: \n\t${this.cart.items.map((item) => `${item.title}`).join("\n\t")}`)
            cart.items.length = 0
        } else {
            console.log("Your cart is empty")
        }
    }
}

// below are instances of classes to simulate the interaction
const fictionBook1 = new FictionBook("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565", 12.99, true);
const nonFictionBook1 = new NonFictionBook("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "978-0062316097", 14.99, true);

const user1 = new User("John Doe", "johndoe@example.com", "user123");
const user2 = new User("Alice Smith", "alice@example.com", "user456");

const cart = new Cart(user1)
cart.add(fictionBook1)
cart.add(nonFictionBook1)
// cart.remove(fictionBook1)

// perform checkout and buy actions
const order = new Order(cart)
order.checkout()
order.buy()
