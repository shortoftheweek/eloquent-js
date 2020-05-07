
'use strict';

var expect = require('chai').expect;
import Request from '../src/Request';

/**
 * Tests
 */
describe('Request Tests', () => {

    it('should return undefined', () => {
        var url = '';
        var request = new Request(url);

        var result = request.dataKey;
        var answer = undefined;

        expect(result).to.equal(answer);
    });

});
