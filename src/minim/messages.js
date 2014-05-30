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
