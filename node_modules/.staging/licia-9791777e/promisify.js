var restArgs = require('./restArgs');
var root = require('./root');
var Promise = require('./Promise');

exports = function(fn, multiArgs) {
    return restArgs(function(args) {
        return new exports.Promise(function(resolve, reject) {
            args.push(
                restArgs(function callback(err, values) {
                    if (err) return reject(err);
                    if (!multiArgs) return resolve(values[0]);
                    resolve(values);
                })
            );
            fn.apply(this, args);
        });
    });
};

exports.Promise = root.Promise || Promise;

module.exports = exports;
