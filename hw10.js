class Stack {
    constructor() {
        this.arr = [];
    }

    // push adds the element onto the stack
    push(elem) {
        this.arr.push(elem);
    }

    // pop removes and returns the top element from the stack
    pop() {
        if (this.arr.length === 0) {
            throw new Error("stack is empty")
        }
        return this.arr.pop();
    }

    // peek returns the top element of the stack without removing it
    peek() {
        if (this.arr.length === 0) {
            throw new Error("stack is empty")
        }
        return this.arr[this.arr.length - 1];
    }
}

// const stack = new Stack();
// stack.push(5);
// stack.push(3);
// stack.push(7);
//
// stack.pop();
// console.log("Popped element:", stack.pop()); // Output: Popped element: 3

class Queue {
    constructor() {
        this.arr = [];
    }

    // enqueue adds an element to the back of the queue
    enqueue(elem) {
        this.arr.push(elem);
    }

    // dequeue removes and returns the front element from the queue
    dequeue() {
        if (this.arr.length === 0) {
            return "queue is empty";
        }
        return this.arr.shift();
    }

    // peek returns the front element of the queue without removing it
    peek() {
        if (this.arr.length === 0) {
            return "queue is empty";
        }
        return this.arr[0];
    }

    // toArray converts the queue into an array
    toArray() {
        return [...this.arr];
    }
}

// const queue = new Queue();
//
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
//
// console.log("Queue:", queue.toArray());
// console.log("Front of the queue:", queue.peek());
//
// console.log("Dequeued item:", queue.dequeue());
//
// console.log("Queue after dequeue:", queue.toArray());

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Inserts an element into the binary tree while maintaining the Binary Search Tree (BST) property.
    insert(elem) {
        const node = new TreeNode(elem);

        if (!this.root) {
            this.root = node;
        } else {
            this._insertRecursively(this.root, node);
        }
    }

    // Recursively inserts a node into the binary tree based on its value.
    _insertRecursively(current, node) {
        if (node.value < current.value) {
            if (current.left === null) {
                current.left = node;
            } else {
                this._insertRecursively(current.left, node);
            }
        } else {
            if (current.right === null) {
                current.right = node;
            } else {
                this._insertRecursively(current.right, node);
            }
        }
    }

    // Searches for an element in the binary tree.
    search(elem) {
        return this._searchRecursively(this.root, elem);
    }

    // Recursively searches for an element in the binary tree.
    _searchRecursively(current, elem) {
        if (!current) {
            return null;
        }

        if (elem === current.value) {
            return current;
        } else if (elem < current.value) {
            return this._searchRecursively(current.left, elem);
        } else {
            return this._searchRecursively(current.right, elem);
        }
    }

    // Performs an in-order traversal of the tree.
    inOrderTraversal() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    // Helper function for in-order traversal.
    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.value);
            this._inOrder(node.right, result);
        }
    }

    // Performs an pre-order traversal of the tree.
    preOrderTraversal() {
        const result = [];
        this._preOrder(this.root, result);
        return result
    }

    // Helper function for pre-order traversal.
    _preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preOrder(node.left, result)
            this._preOrder(node.right, result)
        }
    }

    // Performs an post-order traversal of the tree.
    postOrderTraversal() {
        const result = [];
        this._postOrder(this.root, result)
        return result;
    }

    // Helper function for post-order traversal.
    _postOrder(node, result) {
        if (node !== null) {
            this._postOrder(node.left, result)
            this._postOrder(node.right, result)
            result.push(node.value);
        }
    }
}

// const binaryTree = new BinaryTree();
// binaryTree.insert(10);
// binaryTree.insert(5);
// binaryTree.insert(15);
// binaryTree.insert(3);
// binaryTree.insert(7);
//
// console.log("In-Order Traversal:", binaryTree.inOrderTraversal()); 
// console.log("Pre-Order Traversal:", binaryTree.preOrderTraversal());
// console.log("Post-Order Traversal:", binaryTree.postOrderTraversal());
//
// const searchResult = binaryTree.search(7);
// console.log("Search Result:", searchResult);

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // Adds a vertex to the graph.
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Adds an edge between two vertices in the graph.
    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1);
        }
    }

    // Performs Depth-First Search (DFS) starting from a specified vertex.
    dfs(startVertex) {
        const visited = {};
        const result = [];

        const dfsRecursive = (vertex) => {
            if (!vertex) return;
            visited[vertex] = true;
            result.push(vertex);

            this.adjacencyList[vertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    dfsRecursive(neighbor);
                }
            });
        };

        dfsRecursive(startVertex);
        return result;
    }

    // Performs Breadth-First Search (BFS) starting from a specified vertex.
    bfs(startVertex) {
        const queue = [startVertex];
        const visited = {};
        const result = [];

        visited[startVertex] = true;

        while (queue.length) {
            const currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }

    // Finds the shortest path between two vertices using Dijkstra's algorithm.
    dijkstra(startVertex, endVertex) {
        const distances = {};
        const previous = {};
        const priorityQueue = new PriorityQueue(); // Assuming you have a priority queue implementation

        for (let vertex in this.adjacencyList) {
            if (vertex === startVertex) {
                distances[vertex] = 0;
                priorityQueue.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                priorityQueue.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        while (!priorityQueue.isEmpty()) {
            const currentVertex = priorityQueue.dequeue();

            if (currentVertex === endVertex) {
                const path = [];
                let current = endVertex;
                while (current !== null) {
                    path.unshift(current);
                    current = previous[current];
                }
                return path;
            }

            if (distances[currentVertex] !== Infinity) {
                for (let neighbor of this.adjacencyList[currentVertex]) {
                    const potentialDistance = distances[currentVertex] + neighbor.weight;

                    if (potentialDistance < distances[neighbor.node]) {
                        distances[neighbor.node] = potentialDistance;
                        previous[neighbor.node] = currentVertex;
                        priorityQueue.enqueue(neighbor.node, potentialDistance);
                    }
                }
            }
        }

        return null;
    }

    // Finds the shortest path between two vertices using modified BFS.
    findShortestPathBFS(startVertex, endVertex) {
        const queue = [{ vertex: startVertex, path: [startVertex] }];
        const visited = {};

        while (queue.length) {
            const { vertex, path } = queue.shift();
            if (vertex === endVertex) {
                return path;
            }
            visited[vertex] = true;
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited[neighbor]) {
                    const newPath = [...path, neighbor];
                    queue.push({ vertex: neighbor, path: newPath });
                    visited[neighbor] = true;
                }
            }
        }
        return null;
    }
}

// const graph = new Graph();
//
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
//
// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('B', 'E');
// graph.addEdge('C', 'D');
// graph.addEdge('D', 'E');
//
// console.log("DFS:", graph.dfs('A'))
// console.log("BFS:", graph.bfs('A'))
// console.log("BFS:", graph.findShortestPathBFS('A', 'D'))

class ListNode {
    constructor(elem) {
        this.data = elem
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
    }
    // Inserts a new element at the end of the linked list.
    insert(elem) {
        const node = new ListNode(elem);
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    }

    // Deletes the first occurrence of a specified element from the linked list.
    delete(elem) {
        const node = new ListNode(elem);
        if (!this.head) {
            throw new Error("The list is empty")
        } else if (this.head.data === elem) {
            this.head = this.head.next;
            return
        } else {
            let current = this.head;
            while (current.next) {
                if (current.next.data === elem) {
                    current.next = current.next.next;
                    return;
                }
                current = current.next;
            }
            console.error(`${elem} is not found in the list`);
        }
    }

    // Searches for a specified element in the linked list.
    search(elem) {
        let current = this.head;
        while (current) {
            if (current.data === elem) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    // Converts the linked list to an array and returns the array.
    toArray() {
        const result = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
}

// const linkedList = new LinkedList();
// linkedList.insert(1);
// linkedList.insert(2);
// linkedList.insert(3);
//
// console.log("Linked List:", linkedList.toArray());
//
// linkedList.delete(4);
// linkedList.delete(2);
// console.log("Linked List after deletion:", linkedList.toArray());
//
// const searchResult = linkedList.search(3);
// console.log("Search Result:", searchResult);

// Implement Min/Max Stack, Binary Search Tree, Graph Algorithms...
// Demonstrate usage and provide documentation...
class MinMaxStack {
    constructor() {
        this.stack = []
        this.minStack = []
        this.maxStack = []
    }

    // Pushes an element onto the stack and updates minStack and maxStack if necessary.
    push(elem) {
        this.stack.push(elem)

        if (this.minStack.length === 0 || elem <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(elem);
        }

        if (this.maxStack.length === 0 || elem >= this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.push(elem)
        }
    }

    // Pops the top element from the stack and updates minStack and maxStack if necessary.
    pop() {
        if (this.stack.length === 0) {
            throw new Error("Stack is empty")
        }

        const poppedElem = this.stack.pop()

        if (poppedElem === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop()
        } else if (poppedElem === this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.pop()
        }

        return poppedElem;
    }

    // Returns the minimum element in the stack.
    getMin() {
        if (this.minStack.length === 0) {
            throw new Error("minStack is empty")
        }
        return this.minStack[this.minStack.length - 1]
    }

    // Returns the maximum element in the stack.
    getMax() {
        if (this.maxStack.length === 0) {
            throw new Error("maxStack is empty")
        }
        return this.maxStack[this.maxStack.length - 1]
    }
}

// const minMaxStack = new MinMaxStack();
// minMaxStack.push(5);
// minMaxStack.push(3);
// minMaxStack.push(7);
//
// console.log("Min:", minMaxStack.getMin()); // Output: Min: 3
// console.log("Max:", minMaxStack.getMax()); // Output: Max: 7

function isBST(root, min = null, max = null) {
    if (root === null) {
        return true;
    }

    if ((min !== null && root.value <= min) || (max !== null && root.value >= max)) {
        return false;
    }

    return (
        isBST(root.left, min, root.value) && isBST(root.right, root.value, max)
    );
}

// Example usage:
// const root = new TreeNode(10)
// root.left = new TreeNode(5)
// root.right = new TreeNode(15)
// root.left.left = new TreeNode(3)
// root.left.right = new TreeNode(7)
// root.right.left = new TreeNode(11)
//
// console.log(isBST(root))
//
// root.left.right.value = 12;
//
// console.log(isBST(root))

function isCycle(head) {
    if (!head || !head.next) {
        return false
    }
    let tortoise = head
    let hare = head
    while (hare !== null && hare.next !== null) {
        tortoise = tortoise.next
        hare = hare.next.next
        if (tortoise === hare) {
            return true
        }
    }
    return false
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
//
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node2;
//
// console.log(isCycle(node1))
