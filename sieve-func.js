'use strict';
var _ = require('lodash');

function getSieve(maxPrime) {
    return {
        base: 2,
        numbers: _.times(maxPrime-2, _.constant(true))
    };
}

function isNotAMultipleOf (prime) {
    return function( isPrime, number) {
        return isPrime && (number + 1) % prime !== 0;
    };
}

function crossOutMultiples(sieve) {
    return {
        base: sieve.base,
        numbers: _.map(sieve.numbers, isNotAMultipleOf(sieve.base))
    };
}

function nextPrime(sieve) {
    var nextPrimeOffset = _.indexOf(sieve.numbers, true) + 1;
    if(nextPrimeOffset === 0) {
        return {
            numbers: []
        };
    } else {
        return {
            base: sieve.base + nextPrimeOffset,
            numbers: sieve.numbers.slice(nextPrimeOffset)
        }
    }
}

function getPrimeNumbers(sieve) {
    if(sieve.numbers.length === 0) {
        return sieve.base ? [sieve.base] : [];
    } else {
        return [sieve.base].concat(getPrimeNumbers(nextPrime(crossOutMultiples(sieve))));
    }
}

function getPrimes(maxPrime) {
    if(maxPrime < 2) {
        return [];
    }
    var sieve = getSieve(maxPrime);
    return getPrimeNumbers(sieve);
}

module.exports = {
    getPrimes : getPrimes
};