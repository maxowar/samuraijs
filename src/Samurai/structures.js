
class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue(element) {
        this.elements.push(element);
    }

    dequeue() {
        return this.elements.shift();
    }

    length() {
        return this.elements.length;
    }

    isEmpty() {
        return this.length() === 0;
    }
}

class Collection {
    constructor() {
        this.elements = [];
    }

    add() {

    }

    remove() {

    }

    filter() {

    }

    map() {

    }

    count() {
        return this.elements.length;
    }
}

export default {
    Queue,
    Collection
};