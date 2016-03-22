'use strict';
var sieveFunc = require('./sieve');
var sieveObj  = require('./sieve-object');
var Benchmark = require('Benchmark');

var suite = new Benchmark.Suite;
var TEST_LIMIT = 10000;
suite.add('sieve functional - iterate', function() {

        sieveFunc.getPrimes('iterate', TEST_LIMIT);
    })
    .add('sieve functional - clone', function() {
        sieveFunc.getPrimes('clone', TEST_LIMIT);
    })
    .add('sieve functional - mutate', function() {
        sieveFunc.getPrimes('mutate', TEST_LIMIT);
    })
    .add('sieve object', function() {
        sieveObj.getPrimes(TEST_LIMIT);
    })
    .on('complete', function() {
        this.each(function(result) {
            console.log(result.name + ': '+ result.hz +'/s');
        });
    })
    .run();
