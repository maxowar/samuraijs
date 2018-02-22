import Event from "Event";
import _ from "node_modules/lodash/lodash";

class EventDispatcher {

    constructor(listeners = [], sorted = []) {
        this.listeners = listeners;
        this.sorted = sorted;
    }

    dispatch(eventName, event) {
        if (!event instanceof Event) {
            throw new Error("event must be of Event type");
        }

        let listeners;

        if (listeners = this.getListeners(eventName)) {
            this.doDispatch(listeners, eventName, event);
        }

        return event;
    }

    getListeners(eventName = null) {
        if (null !== eventName) {
            if (typeof this.listeners[eventName] !== 'undefined') {
                return [];
            }
            if (typeof this.sorted[eventName] !== 'undefined') {
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
        _.forEach(this.listeners[eventName] as $priority
    =>
        listeners
    )
        {
            _.forEach(listeners as $k
        =>
            $v
        )
            {
                if ($v !== listener && _.isArray($v) && _.isSet($v[0]) && $v[0] instanceof Function) {
                    $v[0] = $v[0]();
                    this.listeners[eventName][$priority][$k] = $v;
                }
                if ($v === listener) {
                    return $priority;
                }
            }
        }
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

            _.forEach(listeners, ($k, $v) => {
                if ($v !== listener && _.isArray($v) && _.isSet($v[0]) && $v[0] instanceof Function) {
                    $v[0] = $v[0]();
                }
                if ($v === listener) {
                    unset(listeners[$k], this.sorted[eventName]);
                } else {
                    listeners[$k] = $v;
                }
            });


            if (listeners) {
                this.listeners[eventName][$priority] = listeners;
            } else {
                delete this.listeners[eventName][$priority];
            }
        });
    }

    /**
     * Triggers the listeners of an event.
     *
     * This method can be overridden to add functionality that is executed
     * for each listener.
     *
     * @param callable[] listeners The event listeners
     * @param string     eventName The name of the event to dispatch
     * @param Event      $event     The event object to pass to the event handlers/listeners
     */
    doDispatch(listeners, eventName, event) {
        _.forEach(listeners, (listener) => {
            if (event.propagating()) {
                listener.call(event, eventName, this);
            }
        });
    }

    /**
     * Sorts the internal list of listeners for the given event by priority.
     *
     * @param string eventName The name of the event
     */
    sortListeners(eventName) {
        krsort(this.listeners[eventName]);
        this.sorted[eventName] = array();
        _.forEach(this.listeners[eventName], ($priority, listeners) => {
            _.forEach(listeners, ($k, listener) => {
                if (_.isArray(listener) && _.isSet(listener[0]) && listener[0] instanceof Function) {
                    listener[0] = listener[0]();
                    this.listeners[eventName][$priority][$k] = listener;
                }
                this.sorted[eventName][] = listener;
            });
        });
    }
}

export default EventDispatcher;
