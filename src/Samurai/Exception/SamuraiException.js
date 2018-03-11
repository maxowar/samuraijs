/**
 * Created by maxowar on 28/02/2018.
 */

class SamuraiException {
    constructor(message, code, previous) {
        this.message = message;
        this.code = code;
        this.previous = previous;
    }

    toString() {
        return this.message;
    }

}

export default SamuraiException;