var isObj = require('./isObj');
var isFn = require('./isFn');

var getPrototypeOf = Object.getPrototypeOf;
var ObjectCtr = {}.constructor;

exports = function(obj) {
    if (!isObj(obj)) return null;
    if (getPrototypeOf) return getPrototypeOf(obj);
    var proto = obj.__proto__;
    if (proto || proto === null) return proto;
    if (isFn(obj.constructor)) return obj.constructor.prototype;
    if (obj instanceof ObjectCtr) return ObjectCtr.prototype;
    return null;
};

module.exports = exports;
