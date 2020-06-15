'use strict';

import { expect } from 'chai';
import FilmModel from './models/FilmModel';
import FilmCollection from './collections/FilmCollection';
import {
    ActiveRecord,
    Collection,
    Model,
} from '../index';

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

});
