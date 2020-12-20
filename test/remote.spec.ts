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

const items: any = [
    new FilmModel({ name: 'Ashley', x: 1 }),
    new FilmModel({ name: 'Briana', x: 2 }),
    new FilmModel({ name: 'Charlotte', x: 3 }),
    new FilmModel({ name: 'Danielle', x: 4 }),
    new FilmModel({ name: 'Elizabeth', x: 5 }),
    new FilmModel({ name: 'Fallon', x: 6 }),
];

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

    it('should iterate to "Briana"', () => {
        const collection: FilmCollection = FilmCollection.hydrate(items, options);
        let model: FilmModel = <FilmModel> collection.at(0);

        expect(model.attr('name')).to.equal('Ashley');

        model = <FilmModel> collection.next();

        expect(model.attr('name')).to.equal('Briana');
    });

    it('should fetch', async () => {
        const collection: FilmCollection = new FilmCollection;
        collection.baseUrl = 'https://api.shortoftheweek.app/v1';

        await collection
            .fetch()
            .then(() => {
                console.log(collection.at(0).id, collection.length, collection.meta);

                collection.fetchNext().then(() => {
                    console.log(collection.at(0).id, collection.length, collection.meta);
                });

                return collection;
            });

    });

});
