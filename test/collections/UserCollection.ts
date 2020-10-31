
import UserModel from '../models/UserModel';
import { Collection } from '../../src/index';

/**
 * User Collection
 *
 * @type Collection
 */
export default class UserCollection extends Collection
{
    /**
     * Endpoint key
     *
     * https://api.sotw.com/v1/{endpoint}
     *
     * @type string
     */
    public endpoint: string = 'user';

    /**
     * Model object instantiated by this collection
     *
     * @type UserModel
     */
    // @ts-ignore Because webpack attempts to autoload this
    public model: UserModel = UserModel;
}
