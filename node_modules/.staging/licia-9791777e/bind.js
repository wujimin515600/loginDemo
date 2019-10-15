var restArgs = require('./restArgs');

exports = restArgs(function(fn, ctx, rest) {
    return restArgs(function(callArgs) {
        return fn.apply(ctx, rest.concat(callArgs));
    });
});

module.exports = exports;
