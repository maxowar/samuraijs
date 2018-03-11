import Route from "./Route";
import EventDispatcher from "./EventDispatcher/EventDispatcher";
import GenericEvent from "./EventDispatcher/GenericEvent";
import ControllerEvent from "./ControllerEvent";
import ControllerActionNotFound from "./Exception/ControllerActionNotFound";


class Samurai {

    constructor() {
        this.eventDispatcher = new EventDispatcher();
    }

    init(controllers) {
        this.controllers = controllers;
        
        this.eventDispatcher.addListener(ControllerEvent.BEFORE, function (event) {
            let controller = event.subject;

            if(typeof controller['before'] !== 'undefined') {
                if(!controller['before'].apply(this)) {
                    event.stop();
                }
            }
        });

        this.eventDispatcher.addListener(ControllerEvent.AFTER, function (event) {
            let controller = event.subject;

            if(typeof controller['after'] !== 'undefined') {
                controller['after'].apply(this, event);
            }
        });
    }

    execute(route) {
        if(typeof this.controllers[route.controller] === 'undefined') {
            throw new ControllerActionNotFound(route);
        }

        let controller = new this.controllers[route.controller];

        if(typeof controller[route.action] === 'undefined') {
            throw new ControllerActionNotFound(route);
        }

        this.eventDispatcher.dispatch(ControllerEvent.BEFORE, new GenericEvent(controller));

        // main action
        let result = controller[route.action].apply(this);

        this.eventDispatcher.dispatch(ControllerEvent.AFTER, new GenericEvent(result));
    }

    handle(route) {

        this.loadController(route.controller)
            .then((controller) => {
                if(typeof controller[route.action] === 'undefined') {
                    throw new ControllerActionNotFound(route);
                }

                // hook before
                if(typeof controller['before'] === 'undefined') {
                    controller['before'].apply(this);
                }

                this.eventDispatcher.dispatch('controller.before', new GenericEvent(controller));

                // main action
                let result = controller[route.action].apply(this);

                // hook after
                if(typeof controller['after'] === 'undefined') {
                    controller['after'].apply(this);
                }

                let event = this.eventDispatcher.dispatch('controller.after', new GenericEvent(result));
                
                return result;
            });
    }

    loadController(name) {
        var promise = new Promise(
            function (resolve, reject) {
                var client = new XMLHttpRequest();
                client.open('GET', './js/controller/' + name + 'Controller.js');
                client.send();

                client.onload = function () {
                    if(this.status == 200) {
                        resolve(this.response);
                    } else {
                        reject(this.statusText);
                    }
                };
                client.onerror = function() {
                    reject(this.statusText);
                };
            }
        );

        return promise.then((data) => {
            var code = new Function("exports", data);
            var exports;

            code(exports);
            
            return exports;
        });
    }

}

let framework = Samurai;

framework.Route = Route;

export default framework;