var ImageObject = require('object/image-object');
var ShapeObject = require('object/shape-object');

exports.Factory = function(context, attrs) {
    if (attrs.type == 'image') {
        return new ImageObject(context, attrs);
    } else if (attrs.type == 'shape') {
        return new ShapeObject(context, attrs);
    }
};
