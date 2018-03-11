class GenericEvent {
    constructor(object) {
        this.subject = object;
        this.propagating = true;
    }

    isPropagating() {
        return this.propagating;
    }

    stop() {
        this.propagating = false;
    }

    subject() {
        return this.subject();
    }

    subject(val) {
        this.subject = val;
    }
}

export default GenericEvent;