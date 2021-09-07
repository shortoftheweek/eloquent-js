import Dispatcher from './Dispatcher/Dispatcher';
import { IDispatcher } from './Interfaces';
export default class Core extends Dispatcher implements IDispatcher {
    static eloquentjsversion: string;
    constructor(options?: object);
    trigger(eventName: string, data?: any): void;
    dispatch(eventName: string, data?: any): void;
    on(eventName: string, callback: (data?: any) => void): void;
    off(eventName: string, callback?: any): void;
}
