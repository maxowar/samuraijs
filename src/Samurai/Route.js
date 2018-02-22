/**
 * Created by Maxowar on 21/02/2018.
 */

class Route {
    constructor(name, parameters) {
        this.name = name;
        this.parameters = parameters;
    }

    name() {
        return this.name;
    }
}

export default Route;