class Stack {
    constructor() {
        this.arr = []
    }
    push(elem) {
        this.arr.push(elem);
    }
    pop() {
        if (this.arr.length === 0) {
            return "stack is empty"
        }
        return this.arr.pop()
    }
    peek() {
        if (this.arr.length === 0) {
            return "stack is empty"
        }
        return this.arr[this.arr.length - 1]
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
        this.arr = []
    }
    enqueue(elem) {
        this.arr.push(elem)
    }
    dequeue() {
        if (this.arr.length === 0) {
            return "queue is empty"
        }
        return this.arr.shift()
    }
    peek() {
        if (this.arr.length === 0) {
            return "queue is empty"
        }
        return this.arr[0]
    }
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
        this.root = null
    }

    insert(elem) {
        const node = new TreeNode(elem);

        if (!this.root) {
            this.root = node
        } else {
            this._insertRecursively(this.root, node)
        }
    }

    _insertRecursively(current, node) {
        if (node.value < current.value) {
            if (current.left === null) {
                current.left = node;
            } else {
                this._insertRecursively(current.left, node)
            }
        } else {
            if (current.right === null) {
                current.right = node
            } else {
                this._insertRecursively(current.right, node)
            }
        }
    }

    search(elem) {
        return this._searchRecursively(this.root, elem);
    }

    _searchRecursively(current, elem) {
        if (!current) {
            return null;
        }

        if (elem === current.value) {
            return current;
        } else if (elem < current.value) {
            return this._searchRecursively(current.left, elem)
        } else {
            return this._searchRecursively(current.right, elem)
        }
    }

    inOrderTraversal() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.value)
            this._inOrder(node.right, result)
        }
    }

    preOrderTraversal() {
        const result = [];
        this._preOrder(this.root, result);
        return result
    }

    _preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preOrder(node.left, result)
            this._preOrder(node.right, result)
        }
    }

    postOrderTraversal() {
        const result = [];
        this._postOrder(this.root, result)
        return result;
    }

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

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1);
        }
    }

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
    insert(elem) {
        const node = new ListNode(elem)
        if (!this.head) {
            this.head = node
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
    }
    delete(elem) {
        const node = new ListNode(elem)
        if (!this.head) {
            return "list is empty"
        } else if (this.head.data === elem) {
            this.head = this.head.next
        } else {
            let current = this.head
            while (current.next.data !== elem) {
                current = current.next
            }
            current.next = current.next.next
        }
    }
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

    push(elem) {
        this.stack.push(elem)

        if (this.minStack.length === 0 || elem <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(elem);
        }

        if (this.maxStack.length === 0 || elem >= this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.push(elem)
        }
    }

    pop() {
        if (this.stack.length === 0) {
            return "stack is empty"
        }

        const poppedElem = this.stack.pop()

        if (poppedElem === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop()
        } else if (poppedElem === this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.pop()
        }

        return poppedElem;
    }

    getMin() {
        if (this.minStack.length === 0) {
            return "minStack is empty";
        }
        return this.minStack[this.minStack.length - 1]
    }

    getMax() {
        if (this.maxStack.length === 0) {
            return "maxStack is empty";
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
