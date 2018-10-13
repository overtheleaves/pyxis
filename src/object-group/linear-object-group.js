/**
* LinearObjectGroup
*/
var BaseObject = require('object/base-object');
var BaseObjectGroup = require('object-group/base-object-group');
var util = require('util');

var VERTICAL = 'vertical';
var HORIZONTAL = 'horizontal';

var LinearObjectGroup = function (context, attrs) {
    BaseObjectGroup.call(this, context, attrs);

    this.orientation = util.isNullOrUndefined(attrs.orientation) ?
    VERTICAL :
    attrs.orientation.toLowerCase();
    this.verticalMargin = util.isNullOrUndefined(attrs.verticalMargin) ? 0 : attrs.verticalMargin;
    this.horizontalMargin = util.isNullOrUndefined(attrs.horizontalMargin) ? 0 : attrs.horizontalMargin;
};
util.inherit(LinearObjectGroup, BaseObjectGroup);

LinearObjectGroup.prototype.requestMeasureRange = function(parentWidth, parentHeight) {
    util.super(BaseObject, 'requestMeasureRange', this, parentWidth, parentHeight);

    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        c.requestMeasureRange(this.width, this.height);
    }
};

LinearObjectGroup.prototype.requestChangePosition = function(x, y) {
    util.super(BaseObject, 'requestChangePosition', this, x, y);

    x = this.x;
    y = this.y;

    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        c.requestChangePosition(x, y);

        if (this.orientation == VERTICAL) {
            y += c.height + (i < this.children.length - 1 ? this.verticalMargin : 0);
        } else {
            x += c.width + (i < this.children.length - 1 ? this.horizontalMargin : 0);
        }

    }

    if (this.orientation == VERTICAL) {
        this.height = y;
    } else {
        this.width = x;
    }
};

LinearObjectGroup.prototype.requestDraw = function () {
    util.super(BaseObjectGroup, 'requestDraw', this);
};

module.exports = LinearObjectGroup;
