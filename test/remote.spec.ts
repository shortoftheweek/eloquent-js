// 'use strict';

/**
 * @Todo we're using the shortoftheweek.app domain for requests, but
 * we shouldn't. We should have something mocked or local.
 */

import { expect } from 'chai';
import FilmModel from './models/FilmModel';
import FilmCollection from './collections/FilmCollection';
import {
    ActiveRecord,
    Collection,
    Model,
} from '../src/index';


// -----------------------------------------------------------------------------

const items: any = new FilmCollection([
    new FilmModel({ id: 1, name: 'Ashley', x: 1 }),
    new FilmModel({ id: 2, name: 'Briana', x: 2 }),
    new FilmModel({ id: 3, name: 'Charlotte', x: 3 }),
    new FilmModel({ id: 4, name: 'Danielle', x: 4 }),
    new FilmModel({ id: 5, name: 'Elizabeth', x: 5 }),
    new FilmModel({ id: 6, name: 'Fallon', x: 6 }),
]);

const options = {
    meta: {
        pagination: {
            total: 1938,
            count: 15,
            per_page: 15,
            current_page: 1,
            total_pages: 130,
        },
    },
};


// -----------------------------------------------------------------------------


/**
 * Remote Collection Tests
 */
describe('Remote Collection Tests', () => {

    // it('should url', () => {
    //     const collection: FilmCollection = FilmCollection.hydrate(items, options);
    //     const model: FilmModel = collection.at(0);

    //     // Get attribute
    //     // model.save();
    // });

    it('should delete', () => {
        // items[0].delete();
        items.delete({ id: 1 });

        // Get attribute
        // model.save();
    });

});
