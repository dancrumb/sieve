'use strict';
var expect = require('chai').expect;
var sieve = require('./sieve');
var sieveObject = require('./sieve-object');
var _ = require('lodash');
var primesTo3000 = require('./primesTo3000.json').primes;

var sievers = {
    object: sieveObject.getPrimes,
    mutate: _.partial(sieve.getPrimes, 'mutate'),
    iterate: _.partial(sieve.getPrimes, 'iterate'),
    clone: _.partial(sieve.getPrimes, 'clone')
};

_.forEach(sievers, function(siever, name) {
    describe('"'+ name +'" returns primes that are less than maxPrime', function() {
        it('Returns an empty array if maxPrime < 2', function() {
            expect(siever(0)).to.deep.equal([]);
            expect(siever(1)).to.deep.equal([]);
        });
        it('Returns the right value for maxPrime === 2', function() {
            expect(siever(2)).to.deep.equal([2]);
        });
        it('Returns the right value for maxPrime <= 10', function() {
            expect(siever(3)).to.deep.equal([2,3]);
            expect(siever(4)).to.deep.equal([2,3]);
            expect(siever(5)).to.deep.equal([2,3,5]);
            expect(siever(6)).to.deep.equal([2,3,5]);
            expect(siever(7)).to.deep.equal([2,3,5,7]);
            expect(siever(8)).to.deep.equal([2,3,5,7]);
            expect(siever(9)).to.deep.equal([2,3,5,7]);
            expect(siever(10)).to.deep.equal([2,3,5,7]);
        });
        it('Handles large numbers', function() {
            expect(siever(3000)).to.deep.equal(primesTo3000
            );
        });
    });

});
