var objToStr = require('./objToStr');

exports =
    Array.isArray ||
    function(val) {
        return objToStr(val) === '[object Array]';
    };

module.exports = exports;
