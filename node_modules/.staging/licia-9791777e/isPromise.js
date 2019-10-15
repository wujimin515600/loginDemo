var isObj = require('./isObj');
var isFn = require('./isFn');

exports = function(val) {
    return isObj(val) && isFn(val.then);
};

module.exports = exports;
