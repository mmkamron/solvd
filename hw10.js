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
        this.arr.pop()
    }
    peek() {
        if (this.arr.length === 0) {
            return "stack is empty"
        }
        return this.arr[this.arr.length - 1]
    }
}

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
}

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
}

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
}

// Implement Min/Max Stack, Binary Search Tree, Graph Algorithms...
// Demonstrate usage and provide documentation...
