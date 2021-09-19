import Dispatcher from './Dispatcher/Dispatcher';
import { IDispatcher } from './Interfaces';

/**
 * Core
 *
 * Base level class related to core functionality of models, collections,
 * utlities, etc
 */
export default class Core extends Dispatcher implements IDispatcher {
    /**
     * To help us determine which version we really are using
     * considering all the problems we have with npm
     *
     * @type string
     */
    public static eloquentjsversion: string = '2.1.2';

    /**
     * [constructor description]
     * @param {object = {}} options
     */
    constructor(options: object = {}) {
        super();

        // Set options on class
        Object.assign(this, options);
    }

    trigger(eventName: string, eventData?: any) {
        return super.trigger(eventName, eventData);
    }

    dispatch(eventName: string, eventData?: any) {
        return super.dispatch(eventName, eventData);
    }

    on(eventName: string, callback: (eventData?: any) => void) {
        return super.on(eventName, callback);
    }

    off(eventName: string, callback?: any) {
        return super.off(eventName, callback);
    }
}
