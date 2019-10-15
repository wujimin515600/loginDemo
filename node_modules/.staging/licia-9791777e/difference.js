var restArgs = require('./restArgs');
var flatten = require('./flatten');
var filter = require('./filter');
var contain = require('./contain');

exports = restArgs(function(arr, rest) {
    rest = flatten(rest);
    return filter(arr, function(val) {
        return !contain(rest, val);
    });
});

module.exports = exports;
