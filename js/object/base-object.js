/**
* BaseObject
*/
var util = require('js/util.js');

var BaseObject = function(context, attrs) {
    // assert
    util.assert(!util.isNullOrUndefined(attrs), 'Object must have attrs');
    util.assert(!util.isNullOrUndefined(context), 'Object must have context');

    // initialize properties
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.margin = util.isNullOrUndefined(attrs.margin) ?
    {top: 0, bottom: 0, left: 0, right: 0} :
    attrs.margin;
    if (util.isNullOrUndefined(this.margin.top)) this.margin.top = 0;
    if (util.isNullOrUndefined(this.margin.left)) this.margin.left = 0;
    if (util.isNullOrUndefined(this.margin.right)) this.margin.right = 0;
    if (util.isNullOrUndefined(this.margin.bottom)) this.margin.bottom = 0;

    this.parent = parent;
    this.range = attrs.range;
    this.align = attrs.align;
    this.weight = util.isNullOrUndefined(attrs.weight) ? 0.0 : attrs.weight;
    this.count = util.isNullOrUndefined(attrs.count) ? 1 : attrs.count;
    this.dist = util.isNullOrUndefined(attrs.dist) ? 'once' : attrs.dist;
};

BaseObject.prototype.setParent = function(parent) {
    util.assert(!util.isNullOrUndefined(parent), 'Object must have its parent');
    util.assert(!util.isNullOrUndefined(parent.width) && !util.isNullOrUndefined(parent.height),
    'parent must have width, height property');
    util.assert(!util.isNullOrUndefined(parent.x) && !util.isNullOrUndefined(parent.y),
    'parent must have x, y property');

    this.parent = parent;
};

/**
* Drawing Process
*/
BaseObject.prototype.requestDraw = function() {
    throw 'requestDraw should be implemented';
};

/**
* Layout Process
*/
BaseObject.prototype.requestMeasureRange = function(parentWidth, parentHeight) {
    var range = this.range;
    var margin = this.margin;

    if (!util.isNullOrUndefined(range)) {
        var widthOptions = range.width;
        var heightOptions = range.height;

        if (widthOptions.type == 'ratio') {
            this.width = widthOptions.value * parentWidth - margin.left - margin.right;
        } else if (widthOptions.type == 'absolute') {
            this.width = widthOptions.value > parentWidth ? parentWidth : widthOptions.value;
        }

        if (heightOptions.type == 'ratio') {
            this.height = heightOptions.value * parentHeight - margin.top - margin.bottom;
        } else if (heightOptions.type == 'absolute') {
            this.height = heightOptions.value > parentHeight ? parentHeight : heightOptions.value;
        }
    }
};

/**
* Layout Process
*/
BaseObject.prototype.requestChangePosition = function(x, y) {
    var margin = this.margin;
    this.x = x + margin.left;
    this.y = y + margin.top;
};

BaseObject.prototype.setMargin = function(margin) {
    util.assert(!util.isNullOrUndefined(margin), 'margin cannot be null or undefined');

    if (!util.isNullOrUndefined(margin.top)) this.margin.top = margin.top;
    if (!util.isNullOrUndefined(margin.left)) this.margin.left = margin.left;
    if (!util.isNullOrUndefined(margin.bottom)) this.margin.bottom = margin.bottom;
    if (!util.isNullOrUndefined(margin.right)) this.margin.right = margin.right;
};

exports = BaseObject;
