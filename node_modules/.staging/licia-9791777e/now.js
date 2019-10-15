exports =
    Date.now ||
    function() {
        return new Date().getTime();
    };

module.exports = exports;
