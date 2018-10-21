var LinearObjectGroup = require('object-group/linear-object-group');
var StaggeredGridObjectGroup = require('object-group/staggered-grid-object-group');
var ConstraintsObjectGroup = require('object-group/constraints-object-group');

exports.GroupFactory = function(context, attrs) {
    if (attrs.type == 'linear') {
        return new LinearObjectGroup(context, attrs);
    } else if (attrs.type == 'staggered') {
        return new StaggeredGridObjectGroup(context, attrs);
    } else if (attrs.type == 'constraints') {
        return new ConstraintsObjectGroup(context, attrs);
    }
};
