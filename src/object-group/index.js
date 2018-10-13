var LinearObjectGroup = require('object-group/linear-object-group');
var StaggeredGridObjectGroup = require('object-group/staggered-grid-object-group');

exports.GroupFactory = function(context, attrs) {
    if (attrs.type == 'linear') {
        return new LinearObjectGroup(context, attrs);
    } else if (attrs.type == 'staggered') {
        return new StaggeredGridObjectGroup(context, attrs);
    }
};
