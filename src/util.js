exports.integerFormat = function (val, radix) {
    var r = Math.pow(10, radix);
    var ret = '';

    for (var i = 10; i <= r; i *= 10) {
        ret = (val % i) + ret;
        val = Math.floor(val / 10);
    }

    return ret;
};

exports.isNullOrUndefined = function (obj) {
    return typeof obj == 'undefined' || obj == null;
};

exports.assert = function (condition, message) {
    if (!condition) {
        throw message || "Assertion Failed";
    }
};

exports.inherit = function (target, parent) {
    target.prototype = Object.create(parent.prototype);
    target.prototype.constructor = target;
};

exports.super = function () {
    exports.assert(arguments.length >= 3,
        'super function needs at least 3 arguments (target, fname, thisArg)');

    var target = arguments[0]
    var fname = arguments[1];
    var thisArg = arguments[2];
    var args = [];
    for (var i = 3; i < arguments.length; i++) {
        args[i-3] = arguments[i];
    }

    target.prototype[fname].apply(thisArg, args);
};

var objectId = 1;
var objectIdMap = {};
exports.generateObjectId = function (alias) {
    var id;
    if (alias) {
        if (!objectIdMap[alias]) objectIdMap[alias] = objectId++;
        id = objectIdMap[alias];
    } else {
        objectId++;
        id = objectId;
    }

    return id;
};
