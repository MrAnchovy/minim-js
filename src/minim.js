/**
 * Minim mathematics library for JavaScript.
 *
 * @link       http://www.minimmaths.org/
 * @copyright  Copyright 2013 © MrAnchovy http://www.mranchovy.com/
 * @license    MIT http://opensource.org/licenses/MIT
 * @namespace  Minim
 * @version    0.1.1-dev
**/

var Minim = {
    /** Current version. */
    VERSION: '0.1.1-dev'
};

(function (M) {

    "use strict";

    /**
     * Copy properties to an object.
     *
     * This is a shallow copy so use with care with properties that are objects or arrays.
    **/
    M.extend = function (target) {
      var source;
      var length = arguments.length;
      for (var i = 1; i < length; i++) {
        source = arguments[i];
        for (var name in source) {
            target[name] = source[name];
          }
        }
      return target;
    };

    // important constants
    M.extend(M, {
        /** Convert degrees to radians. */
        DEG2RAD: Math.PI / 180,
        /** Convert radians to degrees. */
        RAD2DEG: 180 / Math.PI,
        /** The value of π/2. */
        PIOVER2: Math.PI / 2,
        /** The maximum integer value in IEEE 754 (2^53 - 1). */
        MAXINT: 9007199254740992,
        /** The error in a single operation in IEEE 754. */
        EPSILON: 1 / 9007199254740991,
        /** Acceptable relative difference in almost equal floats. */
        ALMOSTEQUAL: 1e-12,
        /** Acceptable absolute difference in almost equal floats near zero. */
        ALMOSTZERO: 1e-305,
    });

    /**
     * Caution: almostEqual is not transitive (almostEqual(a, b) && almostEqual(b, c)
     * does not imply almostEqual(a, c))
    **/
    M.almostEqual = function (a, b) {
        var diff = Math.abs(a - b);
        return (
            // test the absolute difference, this is needed for numbers near zero
            diff < Minim.ALMOSTZERO ||
            // test the relative difference
            diff < Math.max(Math.abs(a), Math.abs(b)) * Minim.ALMOSTEQUAL);
    };


    /**
     * Test for a valid integer
     *
     * see http://phpjs.org/functions/is_int/
     *
     * @param mixed x the candidate to test
     * @returns boolean true iff x is a valid integer
    **/
    M.isInteger = function (x) {
        return (
            x === +x    &&  // numerical strings etc.
            isFinite(x) &&  // +/- infinity and NaN
            // j shint doesn't like !(x % 1)     &&  // non-integers
            x % 1 === 0 &&  // non-integers
            Math.abs(x) <= M.MAXINT // cannot be held exactly
        );
    };

    /** Modules should extend this property with any (public) classes. */
    M.classes = {};

})(Minim);
