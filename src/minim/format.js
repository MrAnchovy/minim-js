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
