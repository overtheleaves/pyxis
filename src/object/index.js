var ImageObject = require('object/image-object');
var ShapeObject = require('object/shape-object');
var LinearObjectGroup = require('object/linear-object-group');
var StaggeredGridObjectGroup = require('object/staggered-grid-object-group');

exports.Factory = function(context, attrs) {
    if (attrs.type == 'image') {
        return new ImageObject(context, attrs);
    } else if (attrs.type == 'shape') {
        return new ShapeObject(context, attrs);
    }
};

exports.GroupFactory = function(context, attrs) {
    if (attrs.type == 'linear') {
        return new LinearObjectGroup(context, attrs);
    } else if (attrs.type == 'staggered') {
        return new StaggeredGridObjectGroup(context, attrs);
    }
};
