'use strict';
var _ = require('lodash');

function getSieve(maxPrime) {
    return _.times(maxPrime+1, function(number) { return number >=2; });
}

function nextPrime(start) {
    return _.indexOf(this.sieve, true, start+1);
}

function removeMultiples() {
    var prime = 2;
    do {
        this.removeMultiplesOf(prime);
        prime = this.nextPrime(prime);
    } while (prime > 2 && prime <= this.maxPrime);
}

function removeMultiplesOf(multiple) {
    for(var n= 2 * multiple; n < this.sieve.length; n += multiple) {
        this.sieve[n] = false;
    }
}

function PrimeGenerator (maxPrime) {
    this.sieve = this.createSieve(maxPrime);
    this.maxPrime = maxPrime;
}

PrimeGenerator.prototype.nextPrime = nextPrime;
PrimeGenerator.prototype.createSieve = getSieve;
PrimeGenerator.prototype.removeMultiples = removeMultiples;
PrimeGenerator.prototype.removeMultiplesOf = removeMultiplesOf;

PrimeGenerator.prototype.primes = function () {
    if(this.maxPrime < 2) {
        return [];
    }
    this.removeMultiples();

    return _.reduce(this.sieve, function (result, isPrime, number) {
        if(isPrime) {
            return result.concat(number);
        } else {
            return result;
        }
    }, []);

};



function getPrimes(maxPrime) {
    var primeGenerator = new PrimeGenerator(maxPrime);
    return primeGenerator.primes();
}

module.exports = {
    getPrimes : getPrimes
};