import GenericEvent from "./GenericEvent";
import _ from "lodash";

class EventDispatcher {

    constructor(listeners = [], sorted = []) {
        this.listeners = listeners;
        this.sorted = sorted;
    }

    dispatch(eventName, event) {
        if (!event instanceof GenericEvent) {
            throw new TypeError("Event type required");
        }

        let listeners;

        if (listeners = this.getListeners(eventName)) {
            this.doDispatch(listeners, eventName, event);
        }

        return event;
    }

    getListeners(eventName = null) {
        if (null !== eventName) {
            if (typeof this.listeners[eventName] === 'undefined') {
                return [];
            }
            if (typeof this.sorted[eventName] === 'undefined') {
                this.sortListeners(eventName);
            }
            return this.sorted[eventName];
        }

        this.listeners._.forEach((value, index) => {
            if (this.sorted.indexOf(eventName) !== -1) {
                this.sortListeners(eventName);
            }
        });

        return this.sorted;
    }


    getListenerPriority(eventName, listener) {
        if (_.isEmpty(this.listeners[eventName])) {
            return;
        }
        if (_.isArray(listener) && _.isSet(listener[0]) && listener[0] instanceof Function) {
            listener[0] = listener[0]();
        }
        _.forEach(this.listeners[eventName], (priority, listeners) => {

            _.forEach(listeners, (k, v) => {
                if (v !== listener && _.isArray(v) && _.isSet(v[0]) && v[0] instanceof Function) {
                    v[0] = v[0]();
                    this.listeners[eventName][priority][k] = v;
                }
                if (v === listener) {
                    return priority;
                }
            });
        });
    }

    hasListeners(eventName = null) {
        if (eventName) {
            return this.listeners[eventName].length > 0;
        }

        _.forEach(this.listeners, (eventName, listeners) => {

        });

        return false;
    }

    addListener(eventName, listener, priority = 0) {
        if (!Array.isArray(this.listeners[eventName])) {
            this.listeners[eventName] = [];
        }

        if (!Array.isArray(this.listeners[eventName][priority])) {
            this.listeners[eventName][priority] = [];
        }

        this.listeners[eventName][priority].push(listener);
        delete this.sorted[eventName];
    }

    removeListener(eventName, listener) {
        if (_.isEmpty(this.listeners[eventName])) {
            return;
        }
        if (_.isArray(listener) && _.isSet(listener[0]) && listener[0] instanceof Function) {
            listener[0] = listener[0]();
        }
        _.forEach(this.listeners[eventName], (priority, listeners) => {

            _.forEach(listeners, (k, v) => {
                if (v !== listener && _.isArray(v) && _.isSet(v[0]) && v[0] instanceof Function) {
                    v[0] = v[0]();
                }
                if (v === listener) {
                    unset(listeners[k], this.sorted[eventName]);
                } else {
                    listeners[k] = v;
                }
            });


            if (listeners) {
                this.listeners[eventName][priority] = listeners;
            } else {
                delete this.listeners[eventName][priority];
            }
        });
    }

    doDispatch(listeners, eventName, event) {
        _.forEach(listeners, (listener) => {
            if (event.isPropagating()) {
                listener.call(null, event);
            }
        });
    }
    
    sortListeners(eventName) {
        this.listeners[eventName].sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if(a == b) {
                return 0;
            }
            if(a > b) {
                return 1;
            }
        });
        let sorted = [];
        let listeners = this.listeners;
        _.forEach(listeners[eventName], (listeners, priority) => {
            _.forEach(listeners, (listener, k) => {
                if (_.isArray(listener) && _.isSet(listener[0]) && listener[0] instanceof Function) {
                    listener[0] = listener[0]();
                    listeners[eventName][priority][k] = listener;
                }
                sorted.push(listener);
            });
        });
        this.listeners = listeners;
        this.sorted[eventName] = sorted;
    }
}

export default EventDispatcher;
