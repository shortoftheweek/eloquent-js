import Dispatcher from './Dispatcher/Dispatcher';
import { IDispatcher } from './Interfaces';
export default class Core extends Dispatcher implements IDispatcher {
    static eloquentjsversion: string;
    constructor(options?: object);
    trigger(eventName: string, eventData?: any): void;
    dispatch(eventName: string, eventData?: any): void;
    on(eventName: string, callback: (eventData?: any) => void): void;
    off(eventName: string, callback?: any): void;
}
