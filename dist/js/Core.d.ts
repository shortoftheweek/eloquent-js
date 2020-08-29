import { Dispatcher } from 'dispatcher';
import { IDispatcher } from './Interfaces';
export default class Core extends Dispatcher implements IDispatcher {
    constructor(options?: object);
    trigger(eventName: string, data?: any): any;
    dispatch(eventName: string, data?: any): any;
    on(eventName: string, callback: (data?: any) => void): any;
    off(eventName: string, callback?: any): any;
}
