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
    M.Complex = {
        
    };

    /**
     * Constructor for complex number object.
     *
     * There is no validation on values provided to the constructor.
     *
     * @param  {float|array}  Real part or an array [real part, imaginary part].
     * @param  {float}        Imaginary part.
    **/
    M.classes.Complex = function (real, imaginary) {
        var current;

        this.value = function (value) {
            if (value === undefined) {
                return current;
            }
            current = value;
            return this;
        };

        if (real === undefined) {
            current = [0, 0];
        } else if (Array.isArray(real)) {
            current = [real[0], real[1]];
        } else {
            current = [real, imaginary === undefined ? 0 : imaginary];
        }

    };

    // set shortcuts to the class and prototype
    var Cls   = M.classes.Complex;
    var proto = M.classes.Complex.prototype;

    proto.unsupported = function () {
        throw new Error(M.message("The requested function is not defined for $0.", M.message("complex numbers")));
    };

    proto.add = function (b) {
        var a = this.value();
        b = b.value();
        return new Cls(a[0] + b[0], a[1] + b[1]);
    };

    proto.subtract = function (b) {
        var a = this.value();
        b = b.value();
        return new Cls(a[0] - b[0], a[1] - b[1]);
    };

    proto.multiply = function (b) {
        var a = this.value();
        b = b.value();
        return new Cls(a[0] * b[0] - a[1] * b[1], a[1] * b[0] + a[0] * b[1]);
    };

    proto.divide = function (b) {
        b = b.value();
        var a = this.value(),
        // the modulus of b squared |b^2|
        modb2 = b[0] * b[0] + b[1] * b[1];
        return new Cls((a[0] * b[0] + a[1] * b[1]) / modb2, (a[1] * b[0] - a[0] * b[1]) / modb2);
    };

    proto.div = proto.unsupported;
    proto.mod = proto.unsupported;
    proto.divmod = proto.unsupported;

    proto.compare = proto.unsupported;
    proto.isEqualTo = proto.unsupported;

    proto.isNearlyEqualTo = function (b) {
        var a = this.value();
        b = b.value();
        return M.almostEqual(a[0], b[0]) && M.almostEqual(a[1], b[1]);
    };

    proto.isGreaterThan = proto.unsupported;
    proto.isLessThan = proto.unsupported;

    proto.signum = function () {
        // note that this is complex for a complex number so may not want to implement
        throw new Error(M.message("Not yet done."));
    };

    proto.power = function (b) {
        throw new Error(M.message("Not yet done."));
    };

    proto.squared = function (b) {
        var a = this.value();
        b = b.value();
        return new Cls(a[0] * a[0] - a[1] * a[1], 2 * (a[0] * a[1]));
    };

    proto.sqrt = function () {
        throw new Error(M.message("Not yet done."));
    };

    proto.exp = function () {
        throw new Error(M.message("Not yet done."));
    };

    proto.log = function () {
        throw new Error(M.message("Not yet done."));
    };


    proto.incrementBy = function (b) {
        var a = this.value();
        b = b.value();
        this.value([a[0] + b[0], a[1] + b[1]]);
        return this; // chainable
    };

    proto.decrementBy = function (b) {
        var a = this.value();
        b = b.value();
        this.value([a[0] - b[0], a[1] - b[1]]);
        return this; // chainable
    };

    proto.multiplyBy = function (b) {
        var a = this.value();
        b = b.value();
        this.value([a[0] * b[0] - a[1] * b[1], a[1] * b[0] + a[0] * b[1]]);
        return this; // chainable
    };

    proto.divideBy = function (b) {
        b = b.value();
        var a = this.value(),
        // the modulus of b squared |b^2|
        modb2 = b[0] * b[0] + b[1] * b[1];
        this.value([(a[0] * b[0] + a[1] * b[1]) / modb2, (a[1] * b[0] - a[0] * b[1]) / modb2]);
        return this; // chainable
    };


    /**
     * Get the conjugate of a complex number.
     *
     * @return  {Complex}  A new object set to the conjugate of the current object's value.
    **/
    proto.conjugate = function () {
        var a = this.value();
        return new Cls(a[0], -a[1]);
    };

    /**
     * Get the real part of a complex number.
     *
     * @return  {float}  The real part of the current object's value.
    **/
    proto.real = function () {
        var a = this.value();
        return a[0];
    };

    /**
     * Get the imaginary part of a complex number.
     *
     * @return  {float}  The imaginary part of the current object's value.
    **/
    proto.imaginary = function () {
        var a = this.value();
        return a[1];
    };

    /**
     * Get the square of the modulus of a complex number.
     *
     * @return  {float}  The square of the modulus of the current object's value.
    **/
    proto.modulusSquared = function () {
        var a = this.value();
        return a[0] * a[0] + a[1] * a[1];
    };

    /**
     * Get the modulus of a complex number.
     *
     * @return  {float}  The modulus of the current object's value.
    **/
    proto.modulus = function () {
        var a = this.value();
        return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    };

    /**
     * Get the argument of a complex number.
     *
     * @return  {float}  The argument of the current object's value.
    **/
    proto.argument = function () {
        var a = this.value();
        return Math.atan2(a[1], a[0]);
    };

    /**
     * Get the polar form of a complex number.
     *
     * @return  {Array}  The current object's value in [modulus, argument] polar form.
    **/
    proto.polar = function () {
        var a = this.value();
        return [Math.sqrt(a[0] * a[0] + a[1] * a[1]), Math.atan2(a[1], a[0])];
    };

})(Minim);
