import Controller from "../../../src/Samurai/Controller";

class DefaultController extends Controller{

    public counter;

    constructor() {
        this.counter = 0;

        super();
    }

    before() {
        console.log('DefaultController.before()');
    }

    after(event) {
        console.log('DefaultController.after()');

        let data = event.subject;

        console.log(data);
    }

    index() {
        console.log('DefaultController.index()');

        return "response";
    }
    
    add() {
        this.counter++;
    }
}

export default DefaultController;