/**
* StaggeredGridObjectGroup
*/
var BaseObject = require('js/object/base-object.js');
var BaseObjectGroup = require('js/object/base-object-group.js');
var util = require('js/util.js');

var StaggeredGridObjectGroup = function (context, attrs) {
    BaseObjectGroup.call(this, context, attrs);
    this.column = attrs.column;
    this.columnMargin = util.isNullOrUndefined(attrs.columnMargin) ? 0 : attrs.columnMargin;
    this.rowMargin = util.isNullOrUndefined(attrs.rowMargin) ? 0 : attrs.rowMargin;
};
util.inherit(StaggeredGridObjectGroup, BaseObjectGroup);

StaggeredGridObjectGroup.prototype.getColumnWidth = function() {
    return ((this.width - this.columnMargin * (this.column - 1))
    / this.column);
};

StaggeredGridObjectGroup.prototype.requestMeasureRange = function(parentWidth, parentHeight) {
    util.super(BaseObject, 'requestMeasureRange', this, parentWidth, parentHeight);
    var columnWidth = this.getColumnWidth();

    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        c.requestMeasureRange(columnWidth, this.height);
    }
};

StaggeredGridObjectGroup.prototype.requestChangePosition = function(x, y) {
    util.super(BaseObject, 'requestChangePosition', this, x, y);

    var columnWidth = this.getColumnWidth();
    var childY = [];
    for (var i = 0; i < this.column; i++) {
        childY[i] = 0;
    }

    for (var i = 0; i < this.children.length; i++) {
        var c = this.children[i];
        var min = 0;

        // find column having min y
        for (var j = 0; j < this.column; j++) {
            if (childY[j] == 0) {
                min = j;
                break;
            }
            if (childY[min] > childY[j]) {
                min = j;
            }
        }

        var childX = this.x + columnWidth * min + this.columnMargin * min;
        c.requestChangePosition(childX, childY[min] + (childY[min] == 0 ? this.margin.top : this.rowMargin));
        childY[min] = c.y + c.height;
    }

    var maxHeight = 0;
    for (var i = 0; i < this.column; i++) {
        if (maxHeight < childY[i]) {
            maxHeight = childY[i];
        }
    }

    this.height = maxHeight;
};

StaggeredGridObjectGroup.prototype.requestDraw = function () {
    util.super(BaseObjectGroup, 'requestDraw', this);
};

exports = StaggeredGridObjectGroup;
