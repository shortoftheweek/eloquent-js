
import { Dispatcher } from 'dispatcher';

/**
 * Core
 *
 * Base level class related to core functionality of models, collections,
 * utlities, etc
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
