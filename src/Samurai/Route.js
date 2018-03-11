/**
 * Created by Maxowar on 21/02/2018.
 */

class Route {
    constructor(name, parameters) {
        this.name = name;
        this.parameters = parameters;
    }

    get controller() {
        return this.parameters.controller;
    }

    get action() {
        return this.parameters.action;
    }

    name() {
        return this.name;
    }

    called(name) {
        this.name;
    }
}

export default Route;