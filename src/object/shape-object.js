/**
* ShapeObject
*/
var BaseObject = require('object/base-object');
var BaseObjectGroup = require('object/base-object-group');
var util = require('util');

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

module.exports = ShapeObject;
