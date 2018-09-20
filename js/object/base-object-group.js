/**
* BaseObjectGroup
*/
var BaseObject = require('js/object/base-object.js');
var util = require('js/util.js');
var BaseObjectGroup = function (context, attrs) {
    BaseObject.call(this, context, attrs);

    this.children = [];
    this.scrollableX = util.isNullOrUndefined(attrs.scrollableX) ? false : attrs.scrollableX;
    this.scrollableY = util.isNullOrUndefined(attrs.scrollableY) ? false : attrs.scrollableY;
};

util.inherit(BaseObjectGroup, BaseObject);

BaseObjectGroup.prototype.addChild = function (child) {
    util.assert(!util.isNullOrUndefined(child), 'child cannot be null or undefined');

    child.setParent(this);
    this.children.push(child);
    this.requestDraw();
};

BaseObjectGroup.prototype.requestDraw = function() {
    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        c.requestDraw();
    }
};

BaseObjectGroup.prototype.setScrollableX = function (scrollable) {
    this.scrollableY = scrollable;
};

BaseObjectGroup.prototype.getScrollableX = function () {
    return this.scrollableY;
};

BaseObjectGroup.prototype.setScrollableY = function (scrollable) {
    this.scrollableY = scrollable;
};

BaseObjectGroup.prototype.getScrollableY = function () {
    return this.scrollableY;
};

exports = BaseObjectGroup;
