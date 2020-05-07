
'use strict';

var expect = require('chai').expect;
import { Eloquent } from '../index';

/**
 * Setup
 * http://dummy.restapiexample.com/api/v1/employees
 */

class ModelDummyEmployees extends Eloquent
{
    public endpoint: string = 'employees';
    public limit: number = 10;
    protected baseUrl: string = 'http://dummy.restapiexample.com/api/v1';
}


/**
 * Tests
 */
describe('Eloquent Tests', () => {

    it('should return basic url', () => {
        var model = new Eloquent();

        expect(model.requestUrl()).to.have.string('/v1/?');
    });

    it('should have custom endpoint `films`', () => {
        var model = new Eloquent({
            endpoint: 'films',
        });

        expect(model.endpoint).to.equal('films');
    });

    it('should return films endpoint', () => {
        var model = new Eloquent({
            endpoint: 'films',
            limit: 30,
            page: 1,
        });

        expect(model.requestUrl()).to.have.string('/v1/films?');
    });

    it('should have limit 30', () => {
        var model = new Eloquent({
            limit: 30,
        });

        expect(model.requestUrl()).to.have.string('limit=30');
    });

    it('should have page 5', () => {
        var model = new Eloquent({
            page: 5,
        });

        expect(model.requestUrl()).to.have.string('page=5');
    });

    it('should have foo=bar query param', () => {
        var model = new Eloquent();
        var queryParams = { foo: 'bar' };

        expect(model.requestUrl(null, queryParams)).to.have.string('foo=bar');
    });

    it('should have different baseUrl', () => {
        var model = new Eloquent({
            baseUrl: 'https://api.sotw.com/v1',
            endpoint: 'films',
        });
        var requestUrl = model.requestUrl();

        var result = requestUrl;
        var answer = 'https://api.sotw.com/v1/films?limit=15&page=1';

        expect(result).to.equal(answer);
    });

});


/**
 * Tests
 */
describe('ModelDummyEmployees example Tests', () => {

    it('should have foo as endpoint', () => {
        var model = new ModelDummyEmployees();

        expect(model.endpoint).to.equal('employees');
    });

    it('should have limit of 10', () => {
        var model = new ModelDummyEmployees();

        expect(model.limit).to.equal(10);
    });

    it('should have api.google endpoint', () => {
        var model = new ModelDummyEmployees();

        expect(model.requestUrl()).to.have.string('http://dummy.restapiexample.com/api/v1');
    });

});
