var has = require('./has');
var detectMocha = require('./detectMocha');

if (Object.keys && !detectMocha()) {
    exports = Object.keys;
} else {
    exports = function(obj) {
        var ret = [];

        for (var key in obj) {
            if (has(obj, key)) ret.push(key);
        }

        return ret;
    };
}

module.exports = exports;
