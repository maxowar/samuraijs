/**
 * Created by Maxowar on 21/02/2018.
 */

class ParametersBag {
    constructor(parameters) {
        this.parameters = parameters;
    }

    has(key) {
        return typeof this.parameters[key] !== 'undefined';
    }

    get(key) {
        if(!this.has(key)) {
            throw new Error("Key not found");
        }
        return this.parameters[key];
    }

    find(key, otherwhise) {
        if(!this.has(key)) {
            return otherwhise;
        }
        return this.parameters[key];
    }
}

export default ParametersBag;