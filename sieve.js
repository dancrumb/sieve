'use strict';
var _ = require('lodash');

var removers = {
    clone:  function (multiple, sieve) {
        var updatedSieve = _.clone(sieve);
        for(var n= 2 * multiple; n < updatedSieve.length; n += multiple) {
            updatedSieve[n] = false;
        }
        return updatedSieve;
    },
    mutate:  function (multiple, sieve) {
        for(var n= 2 * multiple; n < sieve.length; n += multiple) {
            sieve[n] = false;
        }
        return sieve;
    },
    iterate: function (multiple, sieve) {
        return _.map(sieve, function(isPrime, number) {
            if(number <= multiple) {
                return isPrime;
            } else {
                return isPrime && number % multiple !== 0;
            }
        });
    }
};

function getSieve(maxPrime) {
    return _.times(maxPrime+1, function(number) { return number >=2; });
}

function nextPrime(start, sieve) {
    return _.indexOf(sieve, true, start+1);
}

function removeMultiplesUpTo(maxPrime, sieve, remover) {
    var prime = 2;
    do {
        sieve = remover(prime, sieve);
        prime = nextPrime(prime, sieve);
    } while (prime > 2 && prime <= maxPrime);

    return sieve;
}

function getPrimes(remover, maxPrime) {
    if(maxPrime < 2) {
        return [];
    }
    var sieve = getSieve(maxPrime);
    sieve = removeMultiplesUpTo(maxPrime, sieve, removers[remover || 'iterate']);

    return _.reduce(sieve, function (result, isPrime, number) {
        if(isPrime) {
            return result.concat(number);
        } else {
            return result;
        }
    }, []);
}

module.exports = {
    getPrimes : getPrimes
};