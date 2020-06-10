
import FilmModel from '../models/FilmModel';
import { Collection } from '../../index';

/**
 * Film Collection
 *
 * @type Collection
 */
export default class FilmCollection extends Collection
{

    /**
     * Model object instantiated by this collection
     *
     * @type FilmModel
     */
    // @ts-ignore Because webpack attempts to autoload this
    public model: FilmModel = FilmModel;

}
