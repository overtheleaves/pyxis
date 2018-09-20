var ImageObject = require('js/object/image-object.js');
var ShapeObject = require('js/object/shape-object.js');
var LinearObjectGroup = require('js/object/linear-object-group.js');
var StaggeredGridObjectGroup = require('js/object/staggered-grid-object-group.js');

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
