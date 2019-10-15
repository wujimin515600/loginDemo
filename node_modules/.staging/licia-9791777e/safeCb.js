var isFn = require('./isFn');
var isObj = require('./isObj');
var optimizeCb = require('./optimizeCb');
var matcher = require('./matcher');
var identity = require('./identity');

exports = function(val, ctx, argCount) {
    if (val == null) return identity;
    if (isFn(val)) return optimizeCb(val, ctx, argCount);
    if (isObj(val)) return matcher(val);
    return function(key) {
        return function(obj) {
            return obj == null ? undefined : obj[key];
        };
    };
};

module.exports = exports;
