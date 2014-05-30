/**
 * Complex number operations for the Minim JavaScript mathematics library.
 *
 * @link       http://www.minimmaths.org/
 * @copyright  Copyright 2013 © MrAnchovy http://www.mranchovy.com/
 * @license    MIT http://opensource.org/licenses/MIT
 * @namespace  Minim
**/
(function (M) {

    "use strict";

    /**
     * Static class for complex number operations.
    **/
    M.Complex = {};

    // set shortcuts to the class
    var Cls = M.Complex;

    Cls.unsupported = function () {
        throw new Error(M.message("The requested function is not defined for $0.", M.message("complex numbers")));
    };

    Cls.add = function (a, b) {
        return [a[0] + b[0], a[1] + b[1]];
    };

    Cls.subtract = function (a, b) {
        return [a[0] - b[0], a[1] - b[1]];
    };

    Cls.multiply = function (a, b) {
        return [a[0] * b[0] - a[1] * b[1], a[1] * b[0] + a[0] * b[1]];
    };

    Cls.divide = function (a, b) {
        // the modulus of b squared |b^2|
        var modb2 = b[0] * b[0] + b[1] * b[1];
        return [(a[0] * b[0] + a[1] * b[1]) / modb2, (a[1] * b[0] - a[0] * b[1]) / modb2];
    };

    Cls.div = Cls.unsupported;
    Cls.mod = Cls.unsupported;
    Cls.divmod = Cls.unsupported;

    Cls.compare = Cls.unsupported;
    Cls.isEqualTo = Cls.unsupported;

    Cls.isNearlyEqualTo = function (a, b) {
        return M.almostEqual(a[0], b[0]) && M.almostEqual(a[1], b[1]);
    };

    Cls.isGreaterThan = Cls.unsupported;
    Cls.isLessThan = Cls.unsupported;

    Cls.signum = function () {
        // note that this is complex for a complex number so may not want to implement
        throw new Error(M.message("Not yet done."));
    };

    Cls.power = function (b) {
        throw new Error(M.message("Not yet done."));
    };

    Cls.squared = function (a) {
        return [a[0] * a[0] - a[1] * a[1], 2 * (a[0] * a[1])];
    };

    Cls.sqrt = function () {
        throw new Error(M.message("Not yet done."));
    };

    Cls.exp = function () {
        throw new Error(M.message("Not yet done."));
    };

    Cls.log = function () {
        throw new Error(M.message("Not yet done."));
    };


    Cls.incrementBy = function (a, b) {
        a[0] += b[0];
        a[1] += b[1];
    };

    Cls.decrementBy = function (a, b) {
        a[0] -= b[0];
        a[1] -= b[1];
    };

    Cls.multiplyBy = function (a, b) {
        a[0] = a[0] * b[0] - a[1] * b[1];
        a[1] = a[1] * b[0] + a[0] * b[1];
    };

    Cls.divideBy = function (a, b) {
        // the modulus of b squared |b^2|
        var modb2 = b[0] * b[0] + b[1] * b[1];
        a[0] = (a[0] * b[0] + a[1] * b[1]) / modb2;
        a[1] = (a[1] * b[0] - a[0] * b[1]) / modb2;
    };


    /**
     * Get the conjugate of a complex number.
     *
     * @return  {Complex}  A new object set to the conjugate of the current object's value.
    **/
    Cls.conjugate = function (a) {
        return [a[0], -a[1]];
    };

    /**
     * Get the real part of a complex number.
     *
     * @return  {float}  The real part of the current object's value.
    **/
    Cls.real = function (a) {
        return a[0];
    };

    /**
     * Get the imaginary part of a complex number.
     *
     * @return  {float}  The imaginary part of the current object's value.
    **/
    Cls.imaginary = function (a) {
        return a[1];
    };

    /**
     * Get the square of the modulus of a complex number.
     *
     * @return  {float}  The square of the modulus of the current object's value.
    **/
    Cls.modulusSquared = function (a) {
        return a[0] * a[0] + a[1] * a[1];
    };

    /**
     * Get the modulus of a complex number.
     *
     * @return  {float}  The modulus of the current object's value.
    **/
    Cls.modulus = function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    };

    /**
     * Get the argument of a complex number.
     *
     * @return  {float}  The argument of the current object's value.
    **/
    Cls.argument = function (a) {
        return Math.atan2(a[1], a[0]);
    };

    /**
     * Get the polar form of a complex number.
     *
     * @return  {Array}  The current object's value in [modulus, argument] polar form.
    **/
    Cls.toPolar = function (a) {
        return [Math.sqrt(a[0] * a[0] + a[1] * a[1]), Math.atan2(a[1], a[0])];
    };

    /**
     * Get the rectangular form of a complex number provided in polar form.
     *
     * @return  {Array}  The current object's value in [modulus, argument] polar form.
    **/
    Cls.fromPolar = function (a) {
        return [a[0] * cos(a[1]), a[0] * sin(a[1])];
    };

})(Minim || {});
