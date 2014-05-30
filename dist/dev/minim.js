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

/**
 * Formatting functions for Minim.js mathematics library.
 *
 * @copyright  Copyright © 2013-2014 [MrAnchovy](http://www.mranchovy.com/)
 * @author     [MrAnchovy](http://www.mranchovy.com/)
 * @license    [MIT](http://opensource.org/licenses/MIT)
 * @package    Minim
**/

/**
 * Format numbers with commas or spaces
 *
 * @param  integer  n          the number to format
 * @param  mixed    places     round to this number of decimal places, or false to leave floating
 * @param  hash     options    see below
**/
Minim.formatNumber = function (n, places, options) {
    var settings = Minim.extend({}, Minim.formatNumber.defaults, options);

    places = (places === undefined) ? settings.places         : places;
    parts  = (places === false)     ? n.toString().split('.') : n.toFixed(places).split('.');

    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, settings.sep) +
        (parts[1] ? settings.decimal + parts[1] : '');
};

/**
 * Defaults for Minim.formatNumber options
 *
 * @option  string  decimal    character to separate integer part from fractional part
 * @option  string  places     as per the function argument which overrides this setting if defined
 * @option  string  sep        character to separate groups of 3 digits before the decimal point
**/
Minim.formatNumber.defaults = {
  decimal:   '.',
  places:    false,
  sep:       ','
};

/**
 * Messages with optional L10N.
 *
 * This file is part of the Minim mathematics library for JavaScript.
 *
 * @link       http://www.minimmaths.org/
 * @copyright  Copyright 2013 © MrAnchovy http://www.mranchovy.com/
 * @license    MIT http://opensource.org/licenses/MIT
 * @namespace  Minim
**/
(function (M) {

"use strict";

/**
 * Inject variables into a message with optional translation.
 *
 * @todo    Use an array of preferred translations (e.g. en-AU, en-GB).
 *
 * @param   {string}  The message with $0, $1... placeholders for substitution.
 * @param   {array}   Variables to substitute.
 * @return  {string}  The message with varaibles substituted and translated if a translation exists.
**/
M.message = function (message, vars) {
    if (M.messages[0][message] !== undefined) {
        message = M.messages[0][message];
    }
    if (vars !== undefined) {
        if (Array.isArray(vars)) {
            for (var length = vars.length, i = 0; i < length; i++) {
                message = message.replace(new RegExp("\\$" + i, "g"), vars[i]);
            }
        } else {
            message = message.replace(new RegExp("\\$0", "g"), vars);
        }
    }
    return message;
};

/**
 * Empty message translations for I18N.
**/
M.messages = [{}];

})(Minim);
