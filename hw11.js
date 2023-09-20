class CustomHashTable {
    // Default size of table is 10
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size);
    }

    // Private method for calculating the hash value of a key using simple hashing algorithm with a prime number
    #hash(key) {
        let hashValue = 0;
        const prime = 17;

        for (let i = 0; i < key.length; i++) {
            const char = key.charCodeAt(i);
            hashValue = (hashValue * prime + char) % this.size;
        }

        return hashValue;
    }

    //Inserts a key value pair into the hash table
    insert(key, value) {
        const index = this.#hash(key);

        if (!this.table[index]) {
            this.table[index] = [];
        }

        // If the key already exists in the list at this index, and updates the value
        const entries = this.table[index];
        for (const entry of entries) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }

        // If the key doesn't exist pair is pushed to the list
        entries.push({ key, value });
    }

    get(key) {
        const index = this.#hash(key);

        if (!this.table[index]) {
            throw new Error(`Key "${key}" not found.`);
        }

        const entries = this.table[index];
        for (const entry of entries) {
            if (entry.key === key) {
                return entry.value;
            }
        }

        throw new Error(`Key "${key}" not found.`);
    }

    //Deletes a key value pair from the hash table using key
    delete(key) {
        const index = this.#hash(key);

        //Throws an error if there is no such key
        if (!this.table[index]) {
            throw new Error(`Key "${key}" not found.`);
        }

        // Loops through the hash table indices and if keys are the same, it removes the pair
        const entries = this.table[index];
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].key === key) {
                entries.splice(i, 1);
                return;
            }
        }

        throw new Error(`Key "${key}" not found.`);
    }
}

const hashTable = new CustomHashTable(); //Create object from class

hashTable.insert("name", "Kamron");
hashTable.insert("name", "John"); //Update name to John
hashTable.insert("age", 20);
hashTable.insert("age", 30); //Update age to 30

console.log(hashTable.get("name"));
console.log(hashTable.get("age"));

hashTable.delete("age");
// console.log(hashTable.get("age")); // Throws an error


// Performance analysis: All methods have the same time complexity
/* Method insert:
 *  - best case O(1) because it only calculates the hash and adds the pair to the appropriate index
 *  - worst case O(n) because of collisions it has to iterate through the array and check for duplicates and then update/insert key value pair
 * Method get:
 *  - best case O(1) because of no collisions, key is directly accessible
 *  - worst case O(n) because of collisions it has to iterate through the array and retrieve the key value pair
 * Method delete:
 *  - best case O(1) because of no collisions, key is directly accessible for deletion
 *  - worst case O(n) because of collisions it has to iterate through the array to find and delete the key value pair

Chaining using sub-arrays can lead to performance degradation, will rewrite using Linked List to optimize */
