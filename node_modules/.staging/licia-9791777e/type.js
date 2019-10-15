var objToStr = require('./objToStr');
var isNaN = require('./isNaN');

exports = function(val) {
    var lowerCase =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : true;
    if (val === null) return lowerCase ? 'null' : 'Null';
    if (val === undefined) return lowerCase ? 'undefined' : 'Undefined';
    if (isNaN(val)) return lowerCase ? 'nan' : 'NaN';
    var ret = objToStr(val).match(regObj);
    if (!ret) return '';
    return lowerCase ? ret[1].toLowerCase() : ret[1];
};

var regObj = /^\[object\s+(.*?)]$/;

module.exports = exports;
