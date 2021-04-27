
import { Dispatcher } from 'dispatcher';
import { IDispatcher } from './Interfaces';

/**
 * Core
 *
 * Base level class related to core functionality of models, collections,
 * utlities, etc
 */
export default class Core extends Dispatcher implements IDispatcher {
  /**
   * [constructor description]
   * @param {object = {}} options
   */
  constructor(options: object = {}) {
    super();

    // Set options on class
    Object.assign(this, options);
  }

  trigger(eventName: string, data?: any) {
    return super.trigger(eventName, data);
  }

  dispatch(eventName: string, data?: any) {
    return super.dispatch(eventName, data);
  }

  on(eventName: string, callback: (data?: any) => void) {
    return super.on(eventName, callback);
  }

  off(eventName: string, callback?: any) {
    return super.off(eventName, callback);
  }
}
