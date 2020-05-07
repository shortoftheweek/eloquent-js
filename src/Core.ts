
import { Dispatcher } from 'dispatcher';

/**
 * Core
 */
export default class Core extends Dispatcher
{

    constructor(options: object = {})
    {
        super();

        // Set options on class
        Object.assign(this, options);
    }

}
