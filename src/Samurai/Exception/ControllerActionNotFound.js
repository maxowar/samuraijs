import SamuraiException from "./SamuraiException";

class ControllerActionNotFound extends SamuraiException {

    constructor(route) {
        super(route.action + ' not found');
    }
}

export default ControllerActionNotFound;