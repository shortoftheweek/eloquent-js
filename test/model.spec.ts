'use strict';

import { expect } from 'chai';
import FilmModel from './models/FilmModel';
import FilmCollection from './collections/FilmCollection';
import {
    ActiveRecord,
    Collection,
    Model,
} from '../src/index';

/**
 * Specific Model Tests
 */
describe('Specific Model Tests', () => {

    it('should hydrate with attributes', () => {
        const model: FilmModel = new FilmModel({
            foo: 'bar',
            x: 5,
        });

        // Get attribute
        const resultA: string = <string> model.attr('foo');
        const resultB: number = <number> model.attr('x');

        expect(resultA).to.equal('bar');
        expect(resultB).to.equal(5);
    });

    it('should hasMany', () =>
    {
        const model: FilmModel = new FilmModel({
            id: 5,
            foo: 'bar',
            x: 5,
            user: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ],
            firstUser: {
                id: 10,
                name: 'bob',
            },
        });

        // Get attribute
        // console.log(model.user.parent);
        // console.log(model.user.post_endpoint);
        // console.log(model.user.b.url);
            // console.log(model.getUrlByMethod('post'));
            console.log(model.user.getUrlByMethod('post'));
        // console.log(model.user.at(0).b.url);
        // console.log(model.firstUser.b.url);

        // expect(resultA).to.equal('bar');
        // expect(resultB).to.equal(5);
    });

});
