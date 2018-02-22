class Event {

    constructor(name) {
        this.name = name;
        this.propagating = true;
    }

    stop() {
        this.propagating = false;
    }

    propagating() {
        return this.propagating;
    }

}

export default Event;