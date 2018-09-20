/**
* require simple version
*
* Usage:
* var object = require('js/object');    // js/object/index.js
* var object = require('js/object.js'); // js/object.js
* var object = require('https://localhost/pathname/js/object.js'); // absolute path
*/
var require = (function() {

    var cache = {};

    var getAbsolutePath = function (path) {
        var protocol = '';
        var host = '';

        // find protocol
        if (path.startsWith('http:')) {
            protocol = 'http:';
        } else if (path.startsWith('https:')) {
            protocol = 'https:';
        } else {
            protocol = location.protocol;
        }

        path = path.replace(protocol, '');

        // find hostname
        if (path.startsWith('//')) {
            var splits = path.split('/');
            if (splits.length >= 3) {
                host = splits[2];
            } else {
                // cannot find host, throw exception
                throw 'cannot find hostname';
            }
        } else {
            host = location.host;
        }

        path = path.replace('//' + host, '');

        // find pathname
        if (!path.startsWith('/')) {
            path = location.pathname + path;
        }

        // find js filename
        if (!path.endsWith('.js')) {
            path += '/index.js';
        }

        return protocol + '//' + host + '/' + path;
    };

    var proceed = function(exportsList, callback) {
        if (typeof exportsList == 'undefined' || exportsList == null) return;
        if (typeof callback == 'undefined' || callback == null) return;

        console.log(exportsList);
        callback.apply(exportsList);
    };

    var isExportsCompleted = function(exports) {
        return exports != null && typeof exports != 'undefined'
        && (Object.keys(exports).length > 0 || typeof exports == 'function');
    }

    var isAllExportsCompleted = function(exportsList) {
        for (var i = 0; i < exportsList.length; i++) {
            if (!exportsList[i].completed) {
                return false;
            }
        }
        return true;
    }

    return function(path) {
        var absolutePath = getAbsolutePath(path);

        if (typeof cache[absolutePath] == 'undefined' || cache[absolutePath] == null) {
            $.ajax({ url: absolutePath,
                    dataType: 'text',
                    async: false})
            .done(function (data) {
                var exports = (function () {
                    var exports = {};
                    eval(data);
                    return exports;
                })();
                cache[absolutePath] = exports;
            });
        }

        return cache[absolutePath];
    };
})();
