/**
* ShapeObject
*/
var BaseObject = require('js/object/base-object.js');
var BaseObjectGroup = require('js/object/base-object-group.js');
var util = require('js/util.js');

var ShapeObject = function(context, attrs) {
    BaseObject.call(this, context, attrs);

    // assert
    util.assert(!util.isNullOrUndefined(attrs.shape), 'ShapeObject must have shape info');

    this.shape = attrs.shape;
    this.fillStyle = attrs.fillStyle;
};

util.inherit(ShapeObject, BaseObject);

ShapeObject.prototype.requestDraw = function() {
    this.context.fillStyle = this.fillStyle;
    if (this.shape == 'rect') {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
};

exports = ShapeObject;
