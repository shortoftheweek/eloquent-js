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
 * Tests Model / ActiveRecord
 */
describe('Basic Tests', () => {

    it('should hydrate with attributes', () => {
        const model: Model = new Model({
            foo: 'bar',
            x: 5,
        });

        // Get attribute
        const resultA: string = <string> model.attr('foo');
        const resultB: number = <number> model.attr('x');

        expect(resultA).to.equal('bar');
        expect(resultB).to.equal(5);
    });

    it('should set attribute', () => {
        const model: Model = new Model;

        // Set attribute
        model.set({ foo: 'bar' });

        // Get attribute
        const result: string = <string> model.attr('foo');

        expect(result).to.equal('bar');
    });

    it('should set multiple attributes', () => {
        const model: Model = new Model;

        // Set attribute
        model.set({
            foo: 'bar',
            x: 10,
        });

        // Get attribute
        const resultA: string = <string> model.attr('foo');
        const resultB: number = <number> model.attr('x');

        expect(resultA).to.equal('bar');
        expect(resultB).to.equal(10);
    });

    it('should unset attribute', () => {
        const model: Model = new Model;

        // Set attribute
        model.set({ foo: 'bar' });

        // Unset attribute
        model.unset('foo');

        // Get attribute
        const result: string = <string> model.attr('foo');

        expect(result).to.be.undefined;
    });

    it('should return JSON object', () => {
        const model: Model = new Model;
        const obj: object = {
            foo: 'bar',
            x: 10,
        };

        // Set attribute
        model.set(obj);

        // Get attribute
        const result: object = <object> model.toJSON();

        expect(result).to.eql(obj);
    });

});
