import { Dispatcher } from 'dispatcher';
import { IDispatcher } from './Interfaces';
export default class Core extends Dispatcher implements IDispatcher {
    constructor(options?: object);
    trigger(eventName: string, data?: any): void;
    dispatch(eventName: string, data?: any): void;
    on(eventName: string, callback: (data?: any) => void): void;
    off(eventName: string, callback?: any): void;
}
