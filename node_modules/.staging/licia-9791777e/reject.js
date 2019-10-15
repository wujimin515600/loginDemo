var safeCb = require('./safeCb');
var negate = require('./negate');
var filter = require('./filter');
var types = require('./types');

exports = function(obj, predicate, ctx) {
    predicate = safeCb(negate(predicate), ctx);
    return filter(obj, predicate);
};

module.exports = exports;
